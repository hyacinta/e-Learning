// 북마크 정보
const bookMarkInfo = [
  { id: 1, synkTime: "00:02", title: "백다은 선생님의 Q & A" },
  { id: 2, synkTime: "00:10", title: "백다은 선생님의 Q & A" },
];

// 퀴즈 정보 및 설정
const initQuizChance = 2;
let quizChance = initQuizChance;
let currentQuizNumber = 1;
let myQuizResultArr = [];

const quizInfo = [
  {
    id: 1,
    type: "sa",
    oxExp: "",
    question: "Front-end 귤양의 개발로그 자바스크립트 평가 문제입니다.",
    additional: ["ㄱ. 자바스크립트", "ㄴ. Javascript", "ㄷ. Java", "ㄹ. React"],
    distractor: [
      "ㄱ - ㄴ - ㄷ - ㄹ",
      "ㄴ - ㄷ - ㄹ - ㄱ",
      "ㄷ - ㄹ - ㄱ - ㄴ",
      "ㄹ - ㄱ - ㄴ - ㄹ",
    ],
    answer: 1,
    explanation:
      "Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다.",
  },
  {
    id: 2,
    type: "ox",
    oxExp: "아래의 설명을 읽고 O, X를 선택하세요.",
    question: "Front-end 귤양의 개발로그 자바스크립트 평가 문제입니다.",
    additional: [],
    distractor: [],
    answer: "X",
    explanation:
      "Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다.",
  },
  {
    id: 3,
    type: "ju",
    oxExp: "",
    question: "Front-end 귤양의 개발로그 자바스크립트 평가 문제입니다.",
    additional: [],
    distractor: [],
    answer: ["정답", "정답12"],
    explanation:
      "Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다. Front-end 귤양의 개발로그 자바스크립트 평가 문제 해설입니다.",
  },
];
