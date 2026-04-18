/** DB 키 ↔ 폼 필드 (홈 소개 `/`) */
export const HOME_FIELD_TO_DB_KEY = {
  heroKicker: "home_hero_kicker",
  heroHeadingMain: "home_hero_heading_main",
  heroHeadingAccent: "home_hero_heading_accent",
  heroBody: "home_hero_body",
  heroCtaSecondaryLabel: "home_hero_cta_secondary_label",
  heroCtaSecondaryHref: "home_hero_cta_secondary_href",
  heroCtaPrimaryLabel: "home_hero_cta_primary_label",
  heroCtaPrimaryHref: "home_hero_cta_primary_href",
  missionKicker: "home_mission_kicker",
  missionTitle: "home_mission_title",
  missionP1: "home_mission_p1",
  missionP2: "home_mission_p2",
  donateCtaTitle: "home_donate_cta_title",
  donateCtaBody: "home_donate_cta_body",
  donateCtaPrimaryLabel: "home_donate_cta_primary_label",
  donateCtaSecondaryLabel: "home_donate_cta_secondary_label",
  storiesKicker: "home_stories_kicker",
  storiesTitle: "home_stories_title",
  storiesSubtitle: "home_stories_subtitle",
} as const;

export type HomeMarketingField = keyof typeof HOME_FIELD_TO_DB_KEY;

export const HOME_MARKETING_FORM_FIELDS: readonly {
  field: HomeMarketingField;
  label: string;
  helper?: string;
  multiline?: boolean;
  section: string;
}[] = [
  { section: "히어로", field: "heroKicker", label: "히어로 상단 라벨" },
  {
    section: "히어로",
    field: "heroHeadingMain",
    label: "제목 (강조 전)",
    helper: "다음 칸과 이어져 한 줄 제목이 됩니다.",
  },
  {
    section: "히어로",
    field: "heroHeadingAccent",
    label: "제목 강조 구문",
    helper: "스타일상 포인트 색으로 표시됩니다.",
  },
  {
    section: "히어로",
    field: "heroBody",
    label: "히어로 본문",
    multiline: true,
  },
  { section: "히어로", field: "heroCtaSecondaryLabel", label: "보조 버튼 문구" },
  {
    section: "히어로",
    field: "heroCtaSecondaryHref",
    label: "보조 버튼 링크",
    helper: "예: #mission 또는 /news",
  },
  { section: "히어로", field: "heroCtaPrimaryLabel", label: "주요 버튼 문구" },
  {
    section: "히어로",
    field: "heroCtaPrimaryHref",
    label: "주요 버튼 링크",
    helper: "예: /donate",
  },
  { section: "미션", field: "missionKicker", label: "미션 라벨" },
  { section: "미션", field: "missionTitle", label: "미션 제목" },
  { section: "미션", field: "missionP1", label: "미션 본문 1", multiline: true },
  { section: "미션", field: "missionP2", label: "미션 본문 2", multiline: true },
  { section: "후원 CTA", field: "donateCtaTitle", label: "후원 CTA 제목" },
  {
    section: "후원 CTA",
    field: "donateCtaBody",
    label: "후원 CTA 본문",
    multiline: true,
  },
  {
    section: "후원 CTA",
    field: "donateCtaPrimaryLabel",
    label: "후원 CTA 첫 버튼",
  },
  {
    section: "후원 CTA",
    field: "donateCtaSecondaryLabel",
    label: "후원 CTA 두 번째 버튼",
  },
  { section: "소식", field: "storiesKicker", label: "소식 블록 라벨" },
  { section: "소식", field: "storiesTitle", label: "소식 블록 제목" },
  {
    section: "소식",
    field: "storiesSubtitle",
    label: "소식 블록 설명",
    multiline: true,
  },
];
