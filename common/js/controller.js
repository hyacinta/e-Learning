const setController = (video, type) => {
  $(".wrap").append(controllerUI(type));

  // 동작
  $(".controller__btnIndex").on("click", function () {
    $(".controller__index").toggleClass("open");
  });
  $(".index__btnClosed").on("click", function () {
    $(".controller__index").removeClass("open");
  });
  $(".index__btnMovePage").on("click", function () {
    movePage(Number($(this).attr("data-target")));
  });
  $(".controller__btnPlay").on("click", function () {
    operateVideo(video);
  });
  $(".controller__btnReplay").on("click", function () {
    operateVideo(video, 0);
    setSkipBtn(video);
  });
  $(".controller__btnVolume").on("click", function () {
    video.muted = !video.muted;
    $(".controller__btnVolume").toggleClass("mute", video.muted);
  });
  $(".controller__btnRateOpen").on("click", function () {
    $(".controller__playRate").toggleClass("open");
    setRateList(video);
  });
  $(".controller__btnScript").on("click", function () {
    console.log("script");
  });
  $(".controller__btnFullscreen").on("click", function () {
    console.log("fullscreen");
    $("video").fullscreen().toggle();
  });
  $(".controller__btnMovePrev").on("click", function () {
    movePage($(this).attr("class"));
  });
  $(".controller__btnMoveNext").on("click", function () {
    movePage($(this).attr("class"));
  });
};

const setRateList = (video) => {
  $(".playRate__list").html(
    rateListUI(getCookie("customRate") ? getCookie("customRate") : initRate)
  );

  // 동작
  $(".plalyRate__btnChangeRate").on("click", function () {
    $(".controller__playRate").removeClass("open");
    $(".playRate__btnOpen").html($(this).attr("data-rate"));
    video.playbackRate = $(this).attr("data-rate");
    setCookie("customRate", $(this).attr("data-rate"), 30);
  });
};
