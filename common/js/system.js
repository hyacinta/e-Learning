// 시스템 설정
const device = checkDevice();
const currentChapter = getCurrentURL("chapter");
let currentPageNumber = getCurrentURL("page");
let currentPage = currentPageNumber - 1;
const initVolume = 0.7;

// 초기화면 불러오기
$(document).ready(() => {
  setHeader();
  setContents(pageInfo[currentPage]);
});

const setHeader = () => {
  $(".wrap").append(headerUI(lessonInfo[currentPage]));
};

const setContents = (info) => {
  const { type, subType } = info;

  $(".wrap").append(contentsUI());

  if (useContentsTitle) {
    $(".contents").append(contentsTitleUI(info));
  }

  if (type === "videoPage") {
    setVideoPage(subType);
    return;
  }
  setQuiz();
};

const setVideoPage = (type) => {
  $(".contents").append(videoPageUI());

  switch (type) {
    case "video-i":
      setSkipBtn();
      break;
    case "video-o":
      setOutroBtn();
      break;
    default:
      setBookMark();
      break;
  }
  setController();
};
const setSkipBtn = () => {
  $(".videoPage").append(skipUI());

  // 동작
  $(".videoPage__btnSkip").on("click", function () {
    console.log("skip");
  });
};
const setBookMark = () => {
  $(".videoPage").append(bookMarkUI());

  // 동작
  $(".bookMark__btnListOpen").on("click", function () {
    $(".videoPage__bookMark").toggleClass("open");
  });
  setBookMarkList();
};
const setBookMarkList = () => {
  $(".bookMark__list").html(bookMarkListUI());

  // 동작
  $(".videoPage__btnSkip").on("click", function () {
    console.log("북마크 리스트");
  });
};
const setOutroBtn = () => {
  $(".videoPage").append(outroUI());

  // 동작
  $(".videoPage__btnSkip").on("click", function () {
    console.log("outro");
  });
};

const setQuiz = () => {
  $(".contents").append(quizWrapUI());
  setQuizPaper(quizInfo[currentQuizNumber - 1]);
};
const setQuizPaper = (info) => {
  $(".quizWrap").html(quizPaperUI(info));
  setController();
  // $(".quizPaper").append(answerSheetUI(info));

  // 동작
  $(".answerSheet__btnNextStep").on("click", function () {
    currentQuizNumber += 1;

    currentQuizNumber > quizInfo.length
      ? setQuizResult()
      : setQuizPaper(quizInfo[currentQuizNumber - 1]);
  });
};
const setQuizResult = () => {
  $(".quizWrap").html(quizResultUI());

  $(".quizResult__btnRetry").on("click", function () {
    currentQuizNumber = 1;
    setQuizPaper(quizInfo[currentQuizNumber - 1]);
  });
};
