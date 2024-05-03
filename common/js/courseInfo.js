// 기능 설정
const useContentsTitle = true;
const useScript = true;
const useOutroDown = true;
const useOutroPrint = true;

// 과정 정보
const course = "Front-end Developer 귤양의 개발로그";
const introSkipTime = 13;
const outroSkipTime = 10;

const lessonInfo = [
  { id: 1, title: "웹 접근성을 고려한 e-learning 영상 player 개발" },
  { id: 2, title: "2차시명입니다." },
  { id: 3, title: "3차시명입니다." },
  { id: 4, title: "4차시명입니다." },
  { id: 5, title: "5차시명입니다." },
  { id: 6, title: "6차시명입니다." },
  { id: 7, title: "7차시명입니다." },
  { id: 8, title: "8차시명입니다." },
  { id: 9, title: "9차시명입니다." },
  { id: 10, title: "10차시명입니다." },
  { id: 11, title: "11차시명입니다." },
  { id: 12, title: "12차시명입니다." },
  { id: 13, title: "13차시명입니다." },
  { id: 14, title: "14차시명입니다." },
  { id: 15, title: "15차시명입니다." },
];
const pageGroup = [
  { id: 1, groupTitle: "Front-end", group: [1] },
  { id: 2, groupTitle: "Developer", group: [2] },
  { id: 3, groupTitle: "귤양의 개발로그", group: [3, 4] },
];
const pageInfo = [
  {
    id: 1,
    type: "videoPage",
    subType: "video-i",
    title: "주제 & 목표",
    exp: "",
  },
  {
    id: 2,
    type: "videoPage",
    subType: "video",
    title: "본 학습",
    exp: "",
  },
  {
    id: 3,
    type: "page",
    subType: "quiz",
    title: "평가",
    exp: "이번 시간에 배운 내용을 바탕으로 퀴즈를 풀어보세요.",
  },
  {
    id: 4,
    type: "videoPage",
    subType: "video-o",
    title: "정리 & 맺음",
    exp: "",
  },
];

const helpInfo = [
  { id: 1, type: "pageView", title: "화면 안내" },
  { id: 2, type: "keyControls", title: "키보드 제어" },
];
const pageViewInfo = [
  {
    id: 1,
    exp: "차시명입니다.",
  },
  {
    id: 2,
    exp: "과정명입니다.",
  },
  {
    id: 3,
    exp: "북마크 버튼은 해당 소주제로 이동이 가능합니다.",
  },
  {
    id: 4,
    exp: "SKIP 버튼은 오프닝 영상을 건너 띌 수 있습니다.",
  },
  {
    id: 5,
    exp: "INDEX 버튼은 학습 구조를 확인하고, 해당 페이지로 이동할 수 있습니다.",
  },
  {
    id: 6,
    exp: "학습도우미 버튼은 키보드 제어 방법 및 학습 화면의 구성에 대해 확인할 수 있습니다.",
  },
  {
    id: 7,
    exp: "재생/일시정지, 다시보기, 음량 조절, 배속 조절이 가능한 버튼으로 학습 영상을 제어할 수 있습니다.",
  },
  {
    id: 8,
    exp: "전체화면 버튼은 영상을 전체화면으로 볼 수 있습니다.",
  },
  {
    id: 9,
    exp: "전체 페이지와 현재 페이지를 표시하고, 이전 페이지 혹은 다음 페이지로 이동할 수 있습니다.",
  },
];
let currentHelpPage = 1;
