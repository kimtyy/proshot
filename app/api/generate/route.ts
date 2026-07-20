import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { buildPrompt, getStyle, type BgColor } from "../../lib/styles";

export const runtime = "nodejs";
export const maxDuration = 60;

interface ModelSuccessResult {
  success: true;
  imageUrl: string;
  timeSec: string;
}

interface ModelErrorResult {
  success: false;
  error: string;
}

type ModelResult = ModelSuccessResult | ModelErrorResult;

function toUserMessage(err: unknown, fallback: string): string {
  const errMsg = err instanceof Error ? err.message : String(err);
  if (errMsg.includes("not found") || errMsg.includes("404")) {
    return "모델을 찾을 수 없습니다. API 키에 권한이 없거나 지원되지 않는 모델입니다. (404)";
  }
  if (errMsg.includes("quota") || errMsg.includes("429")) {
    return "API 호출 속도 한도 초과. 잠시 후 다시 시도해 주세요. (429)";
  }
  return fallback;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const imageBase64: string | undefined = body.imageBase64;
    const styleId: string = body.styleId ?? body.style ?? "corporate";
    const bgColor: BgColor | undefined = body.bgColor;
    const rawCustomPrompt: string | undefined = body.customPrompt;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "셀카 사진을 먼저 업로드해 주세요." },
        { status: 400 }
      );
    }

    if (styleId === "custom") {
      const trimmed = rawCustomPrompt?.trim() ?? "";
      if (!trimmed) {
        return NextResponse.json(
          { error: "커스텀 스타일 설명을 입력해 주세요." },
          { status: 400 }
        );
      }
      if (trimmed.length > 500) {
        return NextResponse.json(
          { error: "커스텀 스타일 설명은 500자 이내로 입력해 주세요." },
          { status: 400 }
        );
      }
    } else if (!getStyle(styleId)) {
      return NextResponse.json(
        { error: "지원하지 않는 스타일입니다." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "서버 설정 오류: API 키가 구성되지 않았습니다." },
        { status: 500 }
      );
    }

    // Strip the data-URL prefix to get raw base64
    let rawBase64 = imageBase64;
    let mimeType = "image/jpeg"; // default

    const matches = imageBase64.match(/^data:(image\/\w+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      mimeType = matches[1];
      rawBase64 = matches[2];
    } else if (imageBase64.includes("base64,")) {
      rawBase64 = imageBase64.split("base64,")[1];
    }

    const prompt = buildPrompt({
      styleId,
      bgColor,
      customPrompt: rawCustomPrompt,
    });

    const ai = new GoogleGenAI({ apiKey });

    // Single attempt against one model; returns null if no image came back.
    const callModel = async (model: string): Promise<ModelSuccessResult | null> => {
      const startTime = Date.now();
      const interaction = await ai.interactions.create({
        model,
        input: [
          { type: "text", text: prompt },
          { type: "image", data: rawBase64, mime_type: mimeType }
        ],
        response_format: {
          type: "image",
          aspect_ratio: "3:4",
          image_size: "2K"
        }
      });
      const timeSec = ((Date.now() - startTime) / 1000).toFixed(1);

      if (interaction?.output_image?.data) {
        return {
          success: true,
          imageUrl: `data:image/png;base64,${interaction.output_image.data}`,
          timeSec
        };
      }
      return null;
    };

    // Lite lane: flash-lite first, flash as fallback
    const runLiteModel = async (): Promise<ModelResult> => {
      try {
        const result = await callModel("gemini-3.1-flash-lite-image");
        if (result) return result;
      } catch (err: unknown) {
        console.warn("[Lite Model] gemini-3.1-flash-lite-image failed. Trying fallback...", err);
      }

      try {
        const result = await callModel("gemini-3.1-flash-image");
        if (result) return result;
        return { success: false, error: "결과 이미지가 응답에 존재하지 않습니다." };
      } catch (err: unknown) {
        console.error("[Lite Model] gemini-3.1-flash-image failed.", err);
        return { success: false, error: toUserMessage(err, "가성비 모델 생성 실패") };
      }
    };

    // Pro lane
    const runProModel = async (): Promise<ModelResult> => {
      try {
        const result = await callModel("gemini-3-pro-image");
        if (result) return result;
        return { success: false, error: "결과 이미지가 응답에 존재하지 않습니다." };
      } catch (err: unknown) {
        console.error("Pro Model Error:", err);
        return { success: false, error: toUserMessage(err, "고화질 모델(gemini-3-pro-image) 생성 실패") };
      }
    };

    const [liteResult, proResult] = await Promise.all([runLiteModel(), runProModel()]);

    if (!liteResult.success && !proResult.success) {
      throw new Error(`모든 인공지능 모델 생성 실패.\n[Lite]: ${liteResult.error}\n[Pro]: ${proResult.error}`);
    }

    return NextResponse.json({
      lite: liteResult,
      pro: proResult
    });

  } catch (err: unknown) {
    console.error("Generate API Error:", err);

    const rawErrorMsg = err instanceof Error ? err.message : String(err);
    let clientErrorMessage = "AI 헤드샷 생성 처리 중 서버 오류가 발생했습니다. 다시 시도해 주세요.";

    if (rawErrorMsg.includes("API key") || rawErrorMsg.includes("key not found")) {
      clientErrorMessage = "서버 설정 오류: 인증 키에 문제가 발생했습니다. 관리자에게 문의하세요.";
    } else if (rawErrorMsg.includes("quota") || rawErrorMsg.includes("limit")) {
      clientErrorMessage = "서비스 호출 제한에 도달했습니다. 잠시 후 다시 시도해 주세요.";
    }

    return NextResponse.json(
      { error: clientErrorMessage },
      { status: 500 }
    );
  }
}
