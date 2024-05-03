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
