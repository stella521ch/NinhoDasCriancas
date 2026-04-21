-- 홈 마케팅 site_content 문구에 명시적 줄바꿈(\n) 반영
-- 기존 시드(20260421130000)의 긴 문장을 쉼표/문장 경계 기준으로 개행
-- 이미 덮어쓴 값이 있으면 그대로 덮어씀 (의도: 일괄 정리)

UPDATE public.site_content
SET value = '하교 후 빈 시간을 안전하게 채우고,
식사·학습·놀이와 정서적 돌봄으로 하루를 지켜 주는 공간입니다.'
WHERE key = 'home_hero_body';

UPDATE public.site_content
SET value = '방과 후 시간은 아이에게는 자유이지만,
때로는 위험과 외로움으로 이어집니다.
어린이 둥지는 지역 안에서 신뢰할 수 있는 방과 후 공동체를 세우고,
한 끼와 한 마디가 쌓여 내일의 자신감이 되도록 돕습니다.'
WHERE key = 'home_mission_p1';

UPDATE public.site_content
SET value = '2018년부터 이어 온 관계 속에서 2025년,
''어린이 둥지''라는 이름으로 공간을 정비했습니다.
후원과 기도로 함께해 주시는 분들이 있기에 매주 문을 열 수 있습니다.'
WHERE key = 'home_mission_p2';

UPDATE public.site_content
SET value = '후원은 식재료·교재·공간 유지비로 이어집니다.
정기 후원은 계획을 세우는 데 큰 도움이 됩니다.'
WHERE key = 'home_donate_cta_body';

UPDATE public.site_content
SET value = 'Supabase에 게시된 글이 있으면 자동으로 가져옵니다.
없을 때는 샘플 소식을 보여 드립니다.'
WHERE key = 'home_stories_subtitle';
