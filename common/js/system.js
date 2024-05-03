// 시스템 설정
const device = checkDevice();
const currentChapter = getCurrentURL("chapter");
let currentPage = getCurrentURL("page");
const totalPage = pageInfo.length;
const initVolume = 0.7;
const initRate = "1.0";
const rateList = ["0.9", "1.0", "1.2", "1.5", "2.0"];

// 동작 상태 설정
let isVideoPlay = device !== "m" ? true : false;
let isProgressDraggable = false;

// 초기화면 불러오기
$(document).ready(() => {
  $("title").text(course);
  setHeader();
  setContents(pageInfo[currentPage - 1]);
});

const setHeader = () => {
  $(".wrap").append(headerUI(lessonInfo[currentPage - 1]));
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
  setQuiz(type);
};

const setVideoPage = (type) => {
  $(".contents").append(videoPageUI());

  const video = $(".video");

  switch (type) {
    case "video-i":
      setSkipBtn(video[0]);
      break;
    case "video-o":
      if (useOutroDown || useOutroPrint) {
        setOutroBtn();
      }
      break;
    default:
      setBookMark(video[0]);
      break;
  }
  setController(video[0]);

  video.on("loadedmetadata", () => {
    isVideoState(video[0], "total", video[0].duration);

    video[0].playbackRate = getCookie("customRate")
      ? getCookie("customRate")
      : initRate;

    video[0].volume = getCookie("customVolume")
      ? getCookie("customVolume")
      : initVolume;
    updateProgress(
      $(".volume__progress .progress__bar"),
      (getCookie("customVolume") ? getCookie("customVolume") : initVolume) * 100
    );
  });

  video.on("timeupdate", () => {
    const totalTime = video[0].duration;
    const currentTime = video[0].currentTime;
    const outroTime = totalTime - outroSkipTime;
    const pageType = pageInfo[currentPage - 1].subType;
    const videoPerc = getPerc(currentTime, totalTime);

    isVideoState(video[0], "current", currentTime);

    updateProgress($(".videoTime__progress .progress__bar"), videoPerc);

    if (pageType === "video-i" && currentTime >= introSkipTime) {
      $(".videoPage__btnSkip").remove();
    }

    if (pageType === "video-o" && currentTime >= outroTime) {
      $(".videoPage__outro").remove("");
    } else if (pageType === "video-o" && currentTime <= outroTime) {
      setOutroBtn();
    }
  });

  video.on("ended", () => {
    isVideoState(video[0]);
  });
};

const setSkipBtn = (video) => {
  $(".videoPage").append(skipUI());

  // 동작
  $(".videoPage__btnSkip").on("click", function () {
    operateVideo(video, introSkipTime);
    $(".videoPage__btnSkip").remove();
  });
};

const setBookMark = (video) => {
  $(".videoPage").append(bookMarkUI());

  // 동작
  $(".bookMark__btnListOpen").on("click", function () {
    $(".videoPage__bookMark").toggleClass("open");
    if (!$(".videoPage__bookMark.open").length) return;
    setBookMarkList(video);
  });
};
const setBookMarkList = (video) => {
  $(".bookMark__list").html(bookMarkListUI(video));

  // 동작
  $(".bookMark__btnMoveTime").on("click", function () {
    $(".videoPage__bookMark").removeClass("open");

    operateVideo(
      video,
      convertToSec(bookMarkInfo[$(this).attr("data-synk") - 1].synkTime)
    );
  });
};

const setOutroBtn = () => {
  $(".videoPage").append(outroUI());

  // 동작
  $(".videoPage__btnPrint").on("click", function () {
    summary_print($(this).attr("data-print"));
  });
};

const setQuiz = (type) => {
  $(".contents").append(quizWrapUI());
  setQuizPaper(quizInfo[currentQuiz - 1]);

  const video = $(".audio");
  setController(video, type);
};
const setQuizPaper = (info) => {
  $(".quizWrap").html(quizPaperUI(info));

  // $(".quizPaper").append(answerSheetUI(info));

  // 동작
  $(".answerSheet__btnNextStep").on("click", function () {
    currentQuiz += 1;

    currentQuiz > quizInfo.length
      ? setQuizResult()
      : setQuizPaper(quizInfo[currentQuiz - 1]);
  });
};
const setQuizResult = () => {
  $(".quizWrap").html(quizResultUI());

  $(".quizResult__btnRetry").on("click", function () {
    currentQuiz = 1;
    setQuizPaper(quizInfo[currentQuiz - 1]);
  });
};
