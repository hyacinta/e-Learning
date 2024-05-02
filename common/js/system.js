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

  const video = $(".video");

  switch (type) {
    case "video-i":
      setSkipBtn(video[0]);
      break;
    case "video-o":
      setOutroBtn();
      break;
    default:
      setBookMark(video[0]);
      break;
  }
  setController(video[0]);

  video.on("loadedmetadata", () => {
    console.log("시작전");
  });
  video.on("timeupdate", () => {
    console.log("재생중");
  });
  video.on("ended", () => {
    console.log("끝");
  });
};
const setSkipBtn = (video) => {
  $(".videoPage").append(skipUI());

  // 동작
  $(".videoPage__btnSkip").on("click", function () {
    video.currentTime = introSkipTime;
  });
};
const setBookMark = (video) => {
  $(".videoPage").append(bookMarkUI());

  // 동작
  $(".bookMark__btnListOpen").on("click", function () {
    $(".videoPage__bookMark").toggleClass("open");
    setBookMarkList(video);
  });
};
const setBookMarkList = (video) => {
  $(".bookMark__list").html(bookMarkListUI(video));

  // 동작
  $(".bookMark__btnMoveTime").on("click", function () {
    $(".videoPage__bookMark").removeClass("open");

    video.currentTime = convertToSec(
      bookMarkInfo[$(this).attr("data-synk") - 1].synkTime
    );
  });
};
const setOutroBtn = () => {
  $(".videoPage").append(outroUI());

  // 동작
  $(".videoPage__btnDown").on("click", function () {
    console.log("outro down");
  });
  $(".videoPage__btnPrint").on("click", function () {
    console.log("outro print");
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
