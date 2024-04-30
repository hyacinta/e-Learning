// 시스템 설정
const device = checkDevice();
const currentChapter = getCurrentURL("chapter");
let currentPageNumber = getCurrentURL("page");
let currentPage = currentPageNumber - 1;
const initVolume = 0.7;

// 초기화면 불러오기
$(document).ready(() => {
  setHeader();
  setController();
});

const setHeader = () => {
  $(".wrap").append(headerUI(lessonInfo[currentPage]));
};
