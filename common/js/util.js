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

// 1자리 숫자 2자리(문자열)로 변경
const iToStr = (num) => (num < 10 ? "0" + num : num);
