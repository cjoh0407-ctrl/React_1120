const menuData = [
  {
    id: 1,
    category: "전체 메뉴"
  },
  {
    id: 2,
    category: "세트 메뉴",
    items: [
      { id: 201, name: "진심 모둠 초밥", price: 12900, image: process.env.PUBLIC_URL + "/img/set_menu/201.jpg", description: "신선한 해산물로 만든 다양한 초밥 모둠 세트" },
      { id: 202, name: "상무 스페셜 초밥", price: 26900, image: process.env.PUBLIC_URL + "/img/set_menu/202.jpg", description: "프리미엄 해산물로 구성된 특별 초밥 세트" },
      { id: 203, name: "상무 모둠 초밥", price: 22900, image: process.env.PUBLIC_URL + "/img/set_menu/203.jpg", description: "다양한 맛의 초밥을 즐길 수 있는 모둠 세트" },
      { id: 204, name: "미식가 초밥 세트", price: 29900, image: process.env.PUBLIC_URL + "/img/set_menu/204.jpg", description: "고급스러운 맛을 위한 미식가 추천 세트" },
      { id: 205, name: "참치트리플", price: 10900, image: process.env.PUBLIC_URL + "/img/set_menu/205.jpg", description: "부드러운 참치 3종 초밥 세트" },
      { id: 206, name: "활어트리플", price: 7200, image: process.env.PUBLIC_URL + "/img/set_menu/206.jpg", description: "신선한 활어 3종 초밥 세트" },
      { id: 207, name: "연어트리플", price: 6400, image: process.env.PUBLIC_URL + "/img/set_menu/207.jpg", description: "고소한 연어 3종 초밥 세트" },
      { id: 208, name: "새우트리플", price: 6000, image: process.env.PUBLIC_URL + "/img/set_menu/208.jpg", description: "달콤한 새우 3종 초밥 세트" },
      { id: 209, name: "어린이 초밥 세트", price: 9000, image: process.env.PUBLIC_URL + "/img/set_menu/209.jpg", description: "아이들도 좋아하는 간단한 초밥 세트" },
      { id: 210, name: "새우 초밥 3종 세트", price: 21000, image: process.env.PUBLIC_URL + "/img/set_menu/210.jpg", description: "다양한 새우 초밥의 특별 세트" },
      { id: 211, name: "연어 초밥 3종 세트", price: 23000, image: process.env.PUBLIC_URL + "/img/set_menu/211.jpg", description: "풍부한 맛의 연어 초밥 세트" },
      { id: 212, name: "미니멀 초밥 세트", price: 9900, image: process.env.PUBLIC_URL + "/img/set_menu/212.jpg", description: "간단하게 즐기는 미니 초밥 세트" },
      { id: 213, name: "철판 초밥 세트", price: 17900, image: process.env.PUBLIC_URL + "/img/set_menu/213.png", description: "뜨거운 철판에 구운 초밥 세트" },
      { id: 214, name: "이달의 초밥 세트", price: 19000, image: process.env.PUBLIC_URL + "/img/set_menu/214.png", description: "매달 바뀌는 특별 초밥 세트" },
      { id: 215, name: "연어 + 소고기불초밥", price: 16500, image: process.env.PUBLIC_URL + "/img/set_menu/215.jpg", description: "연어와 소고기불초밥의 조화로운 세트" },
      { id: 216, name: "연어 + 참치초밥", price: 17500, image: process.env.PUBLIC_URL + "/img/set_menu/216.jpg", description: "연어와 참치의 풍미 있는 세트" },
      { id: 217, name: "장어 + 소고기불초밥", price: 17500, image: process.env.PUBLIC_URL + "/img/set_menu/217.jpg", description: "장어와 소고기불초밥의 특별 세트" },
      { id: 218, name: "활어 + 소고기불초밥", price: 17500, image: process.env.PUBLIC_URL + "/img/set_menu/218.jpg", description: "활어와 소고기불초밥의 맛있는 세트" },
      { id: 219, name: "활어 + 연어초밥", price: 17500, image: process.env.PUBLIC_URL + "/img/set_menu/219.jpg", description: "활어와 연어의 신선한 세트" },
      { id: 220, name: "점심특선 A", price: 10900, image: process.env.PUBLIC_URL + "/img/set_menu/220.jpg", description: "점심시간에 추천하는 초밥 세트 A" },
      { id: 221, name: "점심특선 B", price: 13900, image: process.env.PUBLIC_URL + "/img/set_menu/221.jpg", description: "점심시간에 추천하는 초밥 세트 B" },
      { id: 222, name: "점심특선 C", price: 11900, image: process.env.PUBLIC_URL + "/img/set_menu/222.jpg", description: "점심시간에 추천하는 초밥 세트 C" }
    ]
  },
  {
    id: 3,
    category: "단품 메뉴",
    items: [
      { id: 301, name: "후토마끼(Half)", price: 12000, image: process.env.PUBLIC_URL + "/img/one_menu/301.jpg", description: "큼직한 재료로 만든 반쪽 후토마끼" },
      { id: 302, name: "활어초밥(10P)", price: 19000, image: process.env.PUBLIC_URL + "/img/one_menu/302.jpg", description: "신선한 활어로 만든 초밥 10P" },
      { id: 303, name: "참치초밥(10P)", price: 21000, image: process.env.PUBLIC_URL + "/img/one_menu/303.jpg", description: "부드러운 참치로 만든 초밥 10P" },
      { id: 304, name: "장어초밥(8P)", price: 19000, image: process.env.PUBLIC_URL + "/img/one_menu/304.jpg", description: "달콤한 장어로 만든 초밥 8P" },
      { id: 305, name: "연어초밥(8P)", price: 16000, image: process.env.PUBLIC_URL + "/img/one_menu/305.jpg", description: "고소한 연어로 만든 초밥 8P" },
      { id: 306, name: "소고기불초밥(8P)", price: 16000, image: process.env.PUBLIC_URL + "/img/one_menu/306.jpg", description: "불맛 나는 소고기로 만든 초밥 8P" },
      { id: 307, name: "새우초밥(10P)", price: 12000, image: process.env.PUBLIC_URL + "/img/one_menu/307.jpg", description: "달콤한 새우로 만든 초밥 10P" },
      { id: 308, name: "광어묵은지초밥(5P)", price: 12000, image: process.env.PUBLIC_URL + "/img/one_menu/308.jpg", description: "광어와 묵은지로 만든 초밥 5P" },
      { id: 309, name: "계란초밥(5P)", price: 6000, image: process.env.PUBLIC_URL + "/img/one_menu/309.jpg", description: "부드러운 계란으로 만든 초밥 5P" },
      { id: 310, name: "간장새우초밥(5P)", price: 9000, image: process.env.PUBLIC_URL + "/img/one_menu/310.jpg", description: "간장 맛의 새우로 만든 초밥 5P" },
      { id: 311, name: "갈릭버터새우초밥(5P)", price: 11000, image: process.env.PUBLIC_URL + "/img/one_menu/311.jpg", description: "마늘 버터 맛의 새우로 만든 초밥 5P" },
      { id: 312, name: "버터갈릭연어초밥(5P)", price: 11000, image: process.env.PUBLIC_URL + "/img/one_menu/312.jpg", description: "버터 마늘 맛의 연어로 만든 초밥 5P" },
      { id: 313, name: "유부초밥(5P)", price: 6000, image: process.env.PUBLIC_URL + "/img/one_menu/313.jpg", description: "부드러운 유부로 만든 초밥 5P" },
      { id: 314, name: "후토마끼(1줄)", price: 23000, image: process.env.PUBLIC_URL + "/img/one_menu/314.png", description: "큼직한 재료로 만든 후토마끼 1줄" }
    ]
  },
  {
    id: 4,
    category: "선택 초밥",
    items: [
      { id: 401, name: "안키모(1P)", price: 2200, image: process.env.PUBLIC_URL + "/img/choice_menu/401.jpg", description: "부드러운 간으로 만든 초밥 1P" },
      { id: 402, name: "성게알초밥(1P)", price: 4500, image: process.env.PUBLIC_URL + "/img/choice_menu/402.jpg", description: "신선한 성게알로 만든 초밥 1P" },
      { id: 403, name: "적신초밥(1P)", price: 3800, image: process.env.PUBLIC_URL + "/img/choice_menu/403.jpg", description: "달콤한 적신으로 만든 초밥 1P" },
      { id: 404, name: "전복초밥(1P)", price: 3800, image: process.env.PUBLIC_URL + "/img/choice_menu/404.jpg", description: "부드러운 전복으로 만든 초밥 1P" },
      { id: 405, name: "네기도로초밥(1P)", price: 3500, image: process.env.PUBLIC_URL + "/img/choice_menu/405.jpg", description: "부드러운 네기도로로 만든 초밥 1P" },
      { id: 406, name: "가리비초밥(1P)", price: 3500, image: process.env.PUBLIC_URL + "/img/choice_menu/406.jpg", description: "신선한 가리비로 만든 초밥 1P" },
      { id: 407, name: "도미양념구이초밥(1P)", price: 2500, image: process.env.PUBLIC_URL + "/img/choice_menu/407.jpg", description: "양념한 도미로 만든 초밥 1P" },
      { id: 408, name: "단새우초밥(1P)", price: 2200, image: process.env.PUBLIC_URL + "/img/choice_menu/408.jpg", description: "달콤한 단새우로 만든 초밥 1P" },
      { id: 409, name: "날치알초밥(1P)", price: 1800, image: process.env.PUBLIC_URL + "/img/choice_menu/409.jpg", description: "톡톡한 날치알로 만든 초밥 1P" },
      { id: 410, name: "갑오징어초밥(1P)", price: 1800, image: process.env.PUBLIC_URL + "/img/choice_menu/410.jpg", description: "부드러운 갑오징어로 만든 초밥 1P" },
      { id: 411, name: "홍새우초밥(1P)", price: 2200, image: process.env.PUBLIC_URL + "/img/choice_menu/411.jpg", description: "신선한 홍새우로 만든 초밥 1P" },
      { id: 412, name: "계란초밥(1P)", price: 1200, image: process.env.PUBLIC_URL + "/img/choice_menu/412.jpg", description: "부드러운 계란으로 만든 초밥 1P" },
      { id: 413, name: "장어초밥(1P)", price: 2800, image: process.env.PUBLIC_URL + "/img/choice_menu/413.jpg", description: "달콤한 장어로 만든 초밥 1P" },
      { id: 414, name: "참치초밥(1P)", price: 2200, image: process.env.PUBLIC_URL + "/img/choice_menu/414.jpg", description: "부드러운 참치로 만든 초밥 1P" },
      { id: 415, name: "연어초밥(1P)", price: 2200, image: process.env.PUBLIC_URL + "/img/choice_menu/415.jpg", description: "고소한 연어로 만든 초밥 1P" },
      { id: 416, name: "소라초밥(1P)", price: 1800, image: process.env.PUBLIC_URL + "/img/choice_menu/416.jpg", description: "신선한 소라로 만든 초밥 1P" },
      { id: 417, name: "황새치뱃살초밥(1P)", price: 2800, image: process.env.PUBLIC_URL + "/img/choice_menu/417.jpg", description: "부드러운 황새치뱃살로 만든 초밥 1P" },
      { id: 418, name: "소고기불초밥(1P)", price: 2200, image: process.env.PUBLIC_URL + "/img/choice_menu/418.jpg", description: "불맛 나는 소고기로 만든 초밥 1P" },
      { id: 419, name: "새우초밥(1P)", price: 1500, image: process.env.PUBLIC_URL + "/img/choice_menu/419.jpg", description: "달콤한 새우로 만든 초밥 1P" },
      { id: 420, name: "묵은지광어초밥(1P)", price: 2500, image: process.env.PUBLIC_URL + "/img/choice_menu/420.jpg", description: "묵은지와 광어로 만든 초밥 1P" },
      { id: 421, name: "도미초밥(1P)", price: 2500, image: process.env.PUBLIC_URL + "/img/choice_menu/421.jpg", description: "부드러운 도미로 만든 초밥 1P" },
      { id: 422, name: "광어초밥(1P)", price: 2200, image: process.env.PUBLIC_URL + "/img/choice_menu/422.jpg", description: "신선한 광어로 만든 초밥 1P" },
      { id: 423, name: "광어지느러미초밥(1P)", price: 2500, image: process.env.PUBLIC_URL + "/img/choice_menu/423.jpg", description: "부드러운 광어지느러미로 만든 초밥 1P" },
      { id: 424, name: "간장새우초밥(1P)", price: 1800, image: process.env.PUBLIC_URL + "/img/choice_menu/424.jpg", description: "간장 맛의 새우로 만든 초밥 1P" }
    ]
  },
  {
    id: 5,
    category: "사시미",
    items: [
      { id: 501, name: "참다랑어회(오도로,대뱃살8p/160g)", price: 35000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/501.jpg", description: "부드러운 참다랑어 오도로와 대뱃살 8P" },
      { id: 502, name: "참다랑어회(주도로,중뱃살8p/160g)", price: 30000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/502.jpg", description: "고급스러운 참다랑어 주도로와 중뱃살 8P" },
      { id: 503, name: "참다랑어회(아카미,붉은속살8p/160g)", price: 19000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/503.jpg", description: "신선한 참다랑어 아카미 8P" },
      { id: 504, name: "황새치뱃살(8p)", price: 19000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/504.jpg", description: "부드러운 황새치뱃살 8P" },
      { id: 505, name: "황새치뱃살(16p)", price: 38000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/504.jpg", description: "부드러운 황새치뱃살 16P" },
      { id: 506, name: "연어회(8p/160g)", price: 16000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/505.jpg", description: "고소한 연어회 8P" },
      { id: 507, name: "연어회(16p/320g)", price: 32000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/505.jpg", description: "고소한 연어회 16P" },
      { id: 508, name: "연어,대광어회(8p/160g)", price: 18000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/506.jpg", description: "연어와 대광어의 조화로운 8P" },
      { id: 509, name: "연어,대광어회(16p/320g)", price: 36000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/506.jpg", description: "연어와 대광어의 조화로운 16P" },
      { id: 510, name: "모둠회(16p)", price: 38000, image: process.env.PUBLIC_URL + "/img/sashimi_menu/507.jpg", description: "다양한 해산물로 만든 모둠회 16P" }
    ]
  },
  {
    id: 6,
    category: "사이드",
    items: [
      { id: 601, name: "연어아보카도샐러드", price: 15900, image: process.env.PUBLIC_URL + "/img/side_menu/601.jpg", description: "연어와 아보카도의 상큼한 샐러드" },
      { id: 602, name: "오뎅나베", price: 18000, image: process.env.PUBLIC_URL + "/img/side_menu/602.jpg", description: "뜨거운 국물에 담긴 오뎅 나베" },
      { id: 603, name: "조개술찜", price: 15000, image: process.env.PUBLIC_URL + "/img/side_menu/603.jpg", description: "신선한 조개로 만든 술찜" },
      { id: 604, name: "세비체", price: 12800, image: process.env.PUBLIC_URL + "/img/side_menu/604.jpg", description: "상큼한 레몬으로 마린한 세비체" },
      { id: 605, name: "시오콘부 오이샐러드", price: 6000, image: process.env.PUBLIC_URL + "/img/side_menu/605.jpg", description: "시오콘부와 오이의 시원한 샐러드" },
      { id: 606, name: "오징어다리튀김", price: 8000, image: process.env.PUBLIC_URL + "/img/side_menu/606.jpg", description: "바삭한 오징어다리 튀김" },
      { id: 607, name: "돈코츠 라멘", price: 10000, image: process.env.PUBLIC_URL + "/img/side_menu/607.jpg", description: "진한 돈코츠 국물의 라멘" },
      { id: 608, name: "지라시덮밥", price: 12000, image: process.env.PUBLIC_URL + "/img/side_menu/608.png", description: "다양한 해산물로 덮은 덮밥" },
      { id: 609, name: "카이센동", price: 19000, image: process.env.PUBLIC_URL + "/img/side_menu/609.png", description: "신선한 해산물로 덮은 덮밥" },
      { id: 610, name: "메밀소바", price: 6900, image: process.env.PUBLIC_URL + "/img/side_menu/610.jpg", description: "시원한 메밀국수의 소바" },
      { id: 611, name: "가츠오우동", price: 7900, image: process.env.PUBLIC_URL + "/img/side_menu/611.jpg", description: "가츠오 국물의 우동" },
      { id: 612, name: "왕새우튀김(3P)", price: 12000, image: process.env.PUBLIC_URL + "/img/side_menu/612.jpg", description: "큼직한 왕새우 튀김 3P" },
      { id: 613, name: "왕새우튀김(5P)", price: 20000, image: process.env.PUBLIC_URL + "/img/side_menu/612.jpg", description: "큼직한 왕새우 튀김 5P" },
      { id: 614, name: "돈까스", price: 9900, image: process.env.PUBLIC_URL + "/img/side_menu/613.jpg", description: "바삭한 돈까스" },
      { id: 615, name: "도미머리구이", price: 15000, image: process.env.PUBLIC_URL + "/img/side_menu/614.jpg", description: "구운 도미머리의 별미" },
      { id: 616, name: "메로구이", price: 16000, image: process.env.PUBLIC_URL + "/img/side_menu/615.jpg", description: "부드러운 메로 구이" },
      { id: 617, name: "연어머리구이", price: 15000, image: process.env.PUBLIC_URL + "/img/side_menu/616.jpg", description: "구운 연어머리의 풍미" }
    ]
  }
];

export default menuData;
