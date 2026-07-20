import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const imageBase64: string | undefined = body.imageBase64;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "얼굴 사진을 먼저 업로드해 주세요." },
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

    const prompt = `당신은 30년 경력의 동양 철학 및 관상학(마의상법 등) 대가입니다.
제공된 사용자의 정면 얼굴 사진을 분석하여 상세하고 흥미로운 관상 분석 결과 및 운세를 반환해 주세요.

분석 기준:
1. 오관(이마, 눈썹, 눈, 코, 입, 턱)의 모양과 형태적 특징을 면밀히 관찰하고 관상학적으로 해석해 주세요. (6개 부위 모두 분석 포함)
2. 부위별 관상에 기반하여 4대 운세(재물운, 연애/배우자운, 직업/성공운, 건강운)에 대한 1~5점 사이의 점수와 상세한 해설을 도출해 주세요.
3. 종합 관상 점수(1~100점)와 첫인상 총평을 도출해 주세요.
4. 이 사람의 관상에서 느껴지는 분위기와 가장 잘 맞는 동물상(호랑이상, 고양이상, 강아지상, 공룡상 등) 및 닮은꼴 연예인/위인을 도출해 주세요.
5. 대인관계나 운세를 극대화할 수 있는 인상 관리(메이크업, 헤어스타일, 웃는 표정 연습 등)에 대한 실질적인 조언을 적어주세요.

반드시 한국어로 작성하고, 다음 JSON 형식으로만 응답해 주세요:
{
  "overallScore": 88,
  "summary": "총평 한 줄 요약",
  "features": [
    {
      "name": "이마",
      "value": "분석된 이마 형태의 요약 (예: 넓고 시원한 이마)",
      "description": "관상학적 해설"
    },
    {
      "name": "눈썹",
      "value": "분석된 눈썹 형태의 요약 (예: 짙고 일직선인 눈썹)",
      "description": "관상학적 해설"
    },
    {
      "name": "눈",
      "value": "분석된 눈 형태의 요약 (예: 가로로 길고 또렷한 눈)",
      "description": "관상학적 해설"
    },
    {
      "name": "코",
      "value": "분석된 코 형태의 요약 (예: 콧대가 곧고 오뚝한 코)",
      "description": "관상학적 해설"
    },
    {
      "name": "입",
      "value": "분석된 입 형태의 요약 (예: 입술 선이 뚜렷하고 꼬리가 올라간 입)",
      "description": "관상학적 해설"
    },
    {
      "name": "턱",
      "value": "분석된 턱 형태의 요약 (예: 단단하고 둥근 턱)",
      "description": "관상학적 해설"
    }
  ],
  "fortunes": {
    "wealth": { "score": 5, "description": "재물운 상세 해설" },
    "love": { "score": 4, "description": "연애운 상세 해설" },
    "career": { "score": 4, "description": "직업운 상세 해설" },
    "health": { "score": 4, "description": "건강운 상세 해설" }
  },
  "celebrity": "닮은꼴 동물상 또는 닮은 연예인 정보",
  "advice": "종합적인 보완 및 인생 조언"
}`;

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: rawBase64,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("모델 응답이 비어 있습니다.");
    }

    const data = JSON.parse(responseText.trim());
    return NextResponse.json(data);

  } catch (err: unknown) {
    console.error("Face Reading API Error:", err);
    let errorMessage = "관상 분석 처리 중 오류가 발생했습니다. 다시 시도해 주세요.";
    const rawErrorMsg = err instanceof Error ? err.message : String(err);
    
    if (rawErrorMsg.includes("API key") || rawErrorMsg.includes("key not found")) {
      errorMessage = "서버 설정 오류: 인증 키에 문제가 발생했습니다.";
    } else if (rawErrorMsg.includes("quota") || rawErrorMsg.includes("limit")) {
      errorMessage = "서비스 호출 제한에 도달했습니다. 잠시 후 다시 시도해 주세요.";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
