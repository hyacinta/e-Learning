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
let isPopupOpen = false;

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
  $(".contents").append(contentsTitleUI(info));

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
  video[0].volume = 0.5;
  setController(video, type);
};
const setQuizPaper = (info) => {
  $(".quizWrap").html(quizPaperUI(info));

  quizChance = info.type === "ox" ? 1 : quizChance;

  // 동작
  $(".distractor__btnSelect").on("click", function () {
    quizSolve(info, $(this).attr("data-select"), $(this));
  });
  $(".distractor__btnConfirm").on("click", function () {
    quizSolve(info, $(".distractor__input").val(), $(this));
  });
};
const setAnswerSheet = (info) => {
  $(".quizPaper").append(answerSheetUI(info));

  // 동작
  $(".answerSheet__btnNextStep").on("click", function () {
    currentQuiz += 1;
    quizChance = initQuizChance;

    currentQuiz > quizInfo.length
      ? setQuizResult()
      : setQuizPaper(quizInfo[currentQuiz - 1]);
  });
};

const setAlertMessage = () => {
  $(".quizWrap").append(alertUI());
};
const setQuizResult = () => {
  $(".quizWrap").html(quizResultUI());
  $(".title__exp").remove();

  $(".quizResult__btnRetry").on("click", function () {
    currentQuiz = 1;
    myQuizResult = [];
    setQuizPaper(quizInfo[currentQuiz - 1]);
  });
};

const setHelp = (video) => {
  $(".wrap").append(helpUI());
  setNavList(currentHelpPage);
  setHelpContent();
  if (pageInfo[currentPage - 1].type !== "page") {
    video.pause();
  }

  // 동작
  $(".help__btnClosed").on("click", function () {
    $(".help").remove();

    if (pageInfo[currentPage - 1].type !== "page") {
      video.play();
    }
  });
};
const setNavList = (currentHelp) => {
  $(".nav__list").html(helpNavListUI(currentHelp));

  // 동작
  $(".nav__btnChangeContents").on("click", function () {
    currentHelpPage = $(this).attr("data-help");
    setNavList(currentHelpPage);

    setHelpContent();
  });
};
const setHelpContent = () => {
  switch (helpInfo[currentHelpPage - 1].type) {
    case "pageView":
      $(".help__contents").html(pageViewUI());
      break;

    default:
      $(".help__contents").html(keyControlsUI());
      break;
  }
};
