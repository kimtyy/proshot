export type CategoryId = "business" | "id" | "fun" | "custom" | "face_reading";

export interface StyleCategory {
  id: CategoryId;
  label: string;
  emoji: string;
  description: string;
}

export interface StyleDef {
  id: string;
  category: CategoryId;
  label: string;
  description: string;
  emoji: string;
  /** English edit instruction sent to the image model */
  prompt: string;
  /** Overrides the default identity-preservation suffix (e.g. cartoon styles) */
  identityNote?: string;
  /** Styles that support background color selection (ID photos) */
  supportsBgColor?: boolean;
  /** Styles whose results make sense on a print sheet */
  printable?: boolean;
}

export const CATEGORIES: StyleCategory[] = [
  {
    id: "business",
    label: "비즈니스",
    emoji: "💼",
    description: "이력서·링크드인·사내 프로필용 헤드샷",
  },
  {
    id: "id",
    label: "증명·여권",
    emoji: "🪪",
    description: "규격에 맞춘 증명사진과 여권사진",
  },
  {
    id: "fun",
    label: "컨셉·재미",
    emoji: "🎨",
    description: "SNS를 뒤집을 이색 컨셉 사진",
  },
  {
    id: "custom",
    label: "커스텀",
    emoji: "✍️",
    description: "원하는 스타일을 직접 글로 설명",
  },
  {
    id: "face_reading",
    label: "관상보기",
    emoji: "🔮",
    description: "얼굴 분석을 통한 AI 관상 및 운세 분석",
  },
];

export type BgColor = "white" | "blue" | "gray";

export const BG_COLORS: { id: BgColor; label: string; swatch: string; prompt: string }[] = [
  { id: "white", label: "흰색", swatch: "#ffffff", prompt: "plain pure white background" },
  { id: "blue", label: "연한 파랑", swatch: "#cfe4f7", prompt: "solid soft light blue studio background" },
  { id: "gray", label: "연한 회색", swatch: "#e5e7eb", prompt: "solid light gray studio background" },
];

export const STYLES: StyleDef[] = [
  // ───────── 비즈니스 ─────────
  {
    id: "corporate",
    category: "business",
    label: "비즈니스 정장",
    description: "단정한 수트와 셔츠 룩",
    emoji: "👔",
    prompt:
      "Convert the clothing to a clean, professional dark blue business blazer with a white collar shirt and a necktie. Solid light gray background.",
  },
  {
    id: "studio",
    category: "business",
    label: "스튜디오",
    description: "인물 부각 실내 스튜디오 조명",
    emoji: "📸",
    prompt:
      "Apply soft, flattering studio portrait lighting. Clean professional indoor studio backdrop.",
  },
  {
    id: "outdoor",
    category: "business",
    label: "야외 자연광",
    description: "화사하고 입체감 있는 자연광",
    emoji: "🌤️",
    prompt:
      "Apply bright, natural outdoor sunlight lighting with soft bokeh background representing a high-end corporate campus or clean park.",
  },
  // ───────── 증명·여권 ─────────
  {
    id: "id_photo",
    category: "id",
    label: "취업용 증명사진",
    description: "정장 착용, 규격 프레이밍",
    emoji: "🪪",
    supportsBgColor: true,
    printable: true,
    prompt:
      "Convert into a formal Korean ID photo (jeungmyeong-sajin): head-and-shoulders framing centered in the frame, facing directly forward at the camera, calm confident expression with a slight natural smile, neat dark suit jacket over a crisp white dress shirt, tidy hair away from the face, perfectly even flat studio lighting with no shadows on the face or background.",
  },
  {
    id: "passport",
    category: "id",
    label: "여권·비자 사진",
    description: "국제 규정 준수 화이트 배경",
    emoji: "🛂",
    printable: true,
    prompt:
      "Convert into a passport-compliant photo: face directly forward at the camera, neutral expression with mouth closed, both eyes open and clearly visible, ears visible where possible, hair tidy and off the face, absolutely even lighting with zero shadows on the face or background, plain pure white background, head centered and occupying the standard passport proportion of the frame.",
  },
  {
    id: "student",
    category: "id",
    label: "학생증·사원증",
    description: "밝고 단정한 캐주얼 정장",
    emoji: "🎓",
    supportsBgColor: true,
    printable: true,
    prompt:
      "Convert into a bright, friendly ID badge photo: head-and-shoulders framing facing forward, warm natural smile, smart-casual outfit (neat collared shirt or clean knitwear), soft even studio lighting.",
  },
  // ───────── 컨셉·재미 ─────────
  {
    id: "yearbook",
    category: "fun",
    label: "90년대 졸업앨범",
    description: "레트로 미국 하이스쿨 감성",
    emoji: "📒",
    prompt:
      "Transform into a nostalgic 1990s American high school yearbook portrait: retro hairstyle, vintage 90s outfit, the classic blue-gray laser beam studio backdrop, soft focus and subtle film grain.",
  },
  {
    id: "idol",
    category: "fun",
    label: "아이돌 데뷔 프로필",
    description: "K-pop 데뷔조 비주얼",
    emoji: "🌟",
    prompt:
      "Transform into a K-pop idol debut profile photo: flawless dewy idol-style skin, trendy stylish stage outfit, dreamy pastel studio background with soft glowing lighting, magazine-quality retouching.",
  },
  {
    id: "kdrama",
    category: "fun",
    label: "K-드라마 포스터",
    description: "시네마틱 무드의 주인공",
    emoji: "🎬",
    prompt:
      "Transform into a Korean drama official poster portrait: cinematic moody lighting, romantic wistful atmosphere, shallow depth of field, film-like color grading, elegant styling worthy of a lead role.",
  },
  {
    id: "magazine",
    category: "fun",
    label: "패션 매거진 커버",
    description: "하이패션 에디토리얼 화보",
    emoji: "🖤",
    prompt:
      "Transform into a high-fashion magazine cover portrait: bold editorial studio lighting, designer outfit, confident powerful expression, clean minimal backdrop, Vogue-style composition.",
  },
  {
    id: "noir",
    category: "fun",
    label: "흑백 감성 화보",
    description: "필름 느낌의 모노크롬 아트",
    emoji: "🎞️",
    prompt:
      "Transform into a black-and-white fine-art studio portrait: dramatic Rembrandt lighting, deep rich shadows, timeless monochrome film look, artistic and emotional.",
  },
  {
    id: "cartoon",
    category: "fun",
    label: "3D 애니 캐릭터",
    description: "애니메이션 영화 주인공처럼",
    emoji: "🧸",
    identityNote:
      "Keep a strong, instantly recognizable resemblance to the person's face and features.",
    prompt:
      "Transform into a charming 3D animated movie character portrait in the style of a modern animation studio: big expressive eyes, soft global illumination, stylized but adorable look.",
  },
  {
    id: "age_10",
    category: "fun",
    label: "10년 후의 나",
    description: "자연스러운 연륜과 초반 변화",
    emoji: "🧑",
    prompt:
      "Modify the portrait to show the person 10 years older. Add very subtle natural fine lines around the eyes and forehead. Maintain the original lighting, hairstyle, background, clothing, and facial features. Focus on realistic and gentle age progression.",
  },
  {
    id: "age_20",
    category: "fun",
    label: "20년 후의 나",
    description: "눈가 주름과 기품 있는 중년",
    emoji: "👨",
    prompt:
      "Modify the portrait to show the person 20 years older, representing a middle-aged adult. Add natural wrinkles on the forehead, under the eyes, and around the mouth. Introduce a few subtle gray strands in the hair. Maintain the original background, clothing, and facial structure.",
  },
  {
    id: "age_30",
    category: "fun",
    label: "30년 후의 나",
    description: "이마 주름과 희끗희끗한 머리칼",
    emoji: "👴",
    prompt:
      "Modify the portrait to show the person 30 years older, representing a mature senior. Add distinct natural wrinkles on the forehead, deep crow's feet around the eyes, and natural laugh lines. Transform the hair to have significant gray and white hairs. Maintain the original pose, clothing, and background.",
  },
];

export const DEFAULT_IDENTITY_NOTE =
  "Preserve the person's exact face, identity and features completely unchanged. Photorealistic professional quality.";

export function getStyle(id: string): StyleDef | undefined {
  return STYLES.find((s) => s.id === id);
}

/** Build the final English prompt sent to the model. */
export function buildPrompt(opts: {
  styleId: string;
  bgColor?: BgColor;
  customPrompt?: string;
}): string {
  const { styleId, bgColor, customPrompt } = opts;

  if (styleId === "custom" && customPrompt) {
    return `Edit this portrait photo as follows: ${customPrompt.trim()}. ${DEFAULT_IDENTITY_NOTE}`;
  }

  const style = getStyle(styleId);
  if (!style) {
    return `Professional business headshot. ${DEFAULT_IDENTITY_NOTE}`;
  }

  let prompt = style.prompt;
  if (style.supportsBgColor) {
    const bg = BG_COLORS.find((b) => b.id === (bgColor ?? "white")) ?? BG_COLORS[0];
    prompt += ` Background: ${bg.prompt}.`;
  }
  return `${prompt} ${style.identityNote ?? DEFAULT_IDENTITY_NOTE}`;
}
