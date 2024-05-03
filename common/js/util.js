// 효과음
const nextBubbleSound = new Audio("../common/sound/next.mp3");
const clickSound = new Audio("../common/sound/click.mp3");
const alertSound = new Audio("../common/sound/alert.mp3");
const trueSound = new Audio("../common/sound/true.mp3");
const falseSound = new Audio("../common/sound/false.mp3");

const endEffect = () => {
  nextBubbleSound.volume = initVolume;
  nextBubbleSound.play();
};
const clickEffect = () => {
  clickSound.volume = initVolume;
  clickSound.play();
};
const alertEffect = () => {
  alertSound.volume = initVolume;
  alertSound.play();
};
const trueEffect = () => {
  trueSound.volume = initVolume;
  trueSound.play();
};
const falseEffect = () => {
  falseSound.volume = initVolume;
  falseSound.play();
};

// 1자리 숫자 2자리(문자열)로 변경
const iToStr = (num) => (num < 10 ? "0" + num : num);

// % 계산
const getPerc = (numerator, denominator) => (numerator * 100) / denominator;

// 쿠키 저장
const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

// 쿠키 가져오기
const getCookie = (key) => {
  key = new RegExp(key + "=([^;]*)"); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
  return key.test(document.cookie) ? unescape(RegExp.$1) : false; // 인자로 받은 키에 해당하는 키가 있으면 값을 반환
};

// 현재 디바이스 확인
const checkDevice = () => {
  const userAgent = navigator.userAgent;
  const mobileRegex = [
    /mobile/i,
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  return mobileRegex.some((mobile) => userAgent.match(mobile)) ? "m" : "p";
};

// 현재 차시, 페이지 확인
const getCurrentURL = (target) => {
  const url = this.location.href.split("/");
  return target === "chapter"
    ? Number(url[url.length - 2])
    : Number(url[url.length - 1].split(".")[0]);
};

// 시간 형식 변경
const convertToMin = (playTime) => {
  const min = Math.floor(playTime / 60);
  const sec = Math.floor(playTime - min * 60);
  return iToStr(min) + ":" + iToStr(sec);
};
const convertToMinArr = (playTime) => {
  const min = Math.floor(playTime / 60);
  const sec = Math.floor(playTime - min * 60);
  return [iToStr(min), iToStr(sec)];
};
const convertToSec = (playTime) => {
  const temp = playTime.split(":");
  const min = temp[0] * 60;
  const sec = temp[1] * 1;
  return min + sec;
};

const movePage = (thisBtn) => {
  if (
    (currentPage === 1 && thisBtn === "controller__btnMovePrev") ||
    (currentPage === totalPage && thisBtn === "controller__btnMoveNext")
  ) {
    alert(currentPage === 1 ? "첫 페이지 입니다." : "마지막 페이지 입니다.");
  } else {
    currentPage =
      thisBtn === "controller__btnMoveNext"
        ? currentPage + 1
        : thisBtn === "controller__btnMovePrev"
        ? currentPage - 1
        : thisBtn;
    window.open(iToStr(currentPage) + ".html", "_self");
  }
};

const operateVideo = (video, currentTime) => {
  isVideoPlay = typeof currentTime === "number" ? true : !isVideoPlay;
  $(".controller__btnPlay").toggleClass("pause", !isVideoPlay);

  video.currentTime =
    typeof currentTime === "number" ? currentTime : video.currentTime;

  if (isVideoPlay) {
    video.play();
    return;
  }
  video.pause();
};

const isVideoState = (video, target, time) => {
  isVideoPlay = !video.paused;
  $(".controller__btnPlay").toggleClass("pause", isVideoPlay);

  if (typeof target === "string") {
    $(`.videoTime__${target} .videoTime__min`).text(convertToMinArr(time)[0]);
    $(`.videoTime__${target} .videoTime__sec`).text(convertToMinArr(time)[1]);
  }
  $(".controller__btnPlay .controller__bubble").html(
    isVideoPlay ? "일시정지" : "재생하기"
  );
};

// progress 클릭 위치 구하기 (%)
const getProgressPosition = (targetBlock, e) => {
  const movePoint = e.pageX - targetBlock.offset().left;
  const fullWidth = targetBlock.width();
  const calc = getPerc(movePoint, fullWidth);
  return calc > 100 ? 100 : calc < 0 ? 0 : calc;
};

// progressBar update
const updateProgress = (targetBlock, perc) => {
  targetBlock.css("width", perc + "%");
};

// progress 영상 제어
const videoProgressEvent = (video, targetProgress, e) => {
  const duration = video.duration;
  const movePositionPerc = getProgressPosition(targetProgress, e);
  updateProgress($(".videoTime__progress .progress__bar"), movePositionPerc);
  video.currentTime = (duration * movePositionPerc) / 100;
};

// progress 음량 제어
const volumeProgressEvent = (video, targetProgress, e) => {
  const movePositionPerc = getProgressPosition(targetProgress, e);
  updateProgress($(".volume__progress .progress__bar"), movePositionPerc);
  video.muted = movePositionPerc ? false : true;
  video.volume = movePositionPerc ? movePositionPerc / 100 : 0;
  setCookie("customVolume", video.volume, 30);
  $(".controller__btnVolume").toggleClass("mute", video.muted);
};

// print
const summary_print = (target) => {
  $(".print").html(printFrame(target));
  print_win.focus();
  print_win.print();
  print_win.blur();
};
