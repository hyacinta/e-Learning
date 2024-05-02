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

  switch (type) {
    case "videoPage":
      setVideoPage(subType);
      break;
    default:
      setQuiz();
      break;
  }
  setController();
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
  setQuizPaper();
};
const setQuizPaper = () => {};
