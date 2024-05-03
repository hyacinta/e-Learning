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
  $(".controller__btnHelp").on("click", function () {
    console.log("help");
  });
  $(".controller__btnPlay").on("click", function () {
    operateVideo(video);
  });
  $(".controller__btnReplay").on("click", function () {
    operateVideo(video, 0);
    if (pageInfo[currentPage - 1].subType === "video-i") {
      setSkipBtn(video);
    }
  });
  $(".controller__btnVolume").on("click", function () {
    video.muted = !video.muted;
    $(".controller__btnVolume").toggleClass("mute", video.muted);
    $(".controller__btnVolume .controller__bubble").html(
      video.muted ? "음량켜기" : "음량끄기"
    );

    if (!video.muted) {
      updateProgress($(".volume__progress .progress__bar"), video.volume * 100);
      return;
    }
    updateProgress($(".volume__progress .progress__bar"), 0);
  });
  $(".controller__btnRateOpen").on("click", function () {
    $(".controller__playRate").toggleClass("open");
    setRateList(video);
  });
  $(".controller__btnScript").on("click", function () {
    console.log("script");
  });
  $(".controller__btnFullscreen").on("click", function () {
    $("video").fullscreen().toggle();
  });
  $(".controller__btnMovePrev").on("click", function () {
    movePage($(this).attr("class"));
  });
  $(".controller__btnMoveNext").on("click", function () {
    movePage($(this).attr("class"));
  });

  // 영상 progress 마우스 동작
  $(".videoTime__progress").on("mousedown", function (e) {
    if (pageInfo[currentPage - 1].type !== "videoPage") return;
    isProgressDraggable = true;
    videoProgressEvent(video, $(this), e);
  });
  $(".videoTime__progress").on("mousemove", function (e) {
    if (!isProgressDraggable || pageInfo[currentPage - 1].type !== "videoPage")
      return;
    videoProgressEvent(video, $(this), e);
  });
  $(".videoTime__progress").on("mouseup", function (e) {
    if (pageInfo[currentPage - 1].type !== "videoPage") return;
    videoProgressEvent(video, $(this), e);
    isProgressDraggable = false;
  });

  // 음량 progress 마우스 동작
  $(".volume__progress").on("mousedown", function (e) {
    if (pageInfo[currentPage - 1].type !== "videoPage") return;
    isProgressDraggable = true;
    volumeProgressEvent(video, $(this), e);
  });
  $(".volume__progress").on("mousemove", function (e) {
    if (!isProgressDraggable || pageInfo[currentPage - 1].type !== "videoPage")
      return;
    volumeProgressEvent(video, $(this), e);
  });
  $(".volume__progress").on("mouseup", function (e) {
    if (pageInfo[currentPage - 1].type !== "videoPage") return;
    volumeProgressEvent(video, $(this), e);
    isProgressDraggable = false;
  });

  $(document).on("mouseup", function (e) {
    if (!isProgressDraggable) return;
    isProgressDraggable = false;
  });

  // 키보드 컨트롤 동작
  $(document).keydown(function (e) {
    const key = e.keyCode;

    switch (key) {
      case 32:
        // spacebar : 영상 재생
        operateVideo(video);
        break;

      case 37:
        // ← : 영상 10초 전 이동
        video.currentTime = video.currentTime - 10;
        break;

      case 39:
        // → : 영상 10초 후 이동
        video.currentTime =
          video.currentTime + 10 >= video.duration
            ? video.duration
            : video.currentTime + 10;
        break;

      case 38:
        // ↑ : 음량 올리기
        video.volume += 0.1;

        setCookie("customVolume", video.volume, 30);
        updateProgress(
          $(".volume__progress .progress__bar"),
          video.volume * 100
        );
        break;

      case 40:
        // ↓ : 음량 줄이기
        video.volume -= 0.1;

        setCookie("customVolume", video.volume, 30);
        updateProgress(
          $(".volume__progress .progress__bar"),
          video.volume * 100
        );
        break;

      case 33:
        // pageup : 이전 페이지 이동
        movePage("controller__btnMovePrev");
        break;

      case 34:
        // pagedown : 다음 페이지 이동
        movePage("controller__btnMoveNext");
        break;
    }
  });
};

const setRateList = (video) => {
  $(".playRate__list").html(
    rateListUI(getCookie("customRate") ? getCookie("customRate") : initRate)
  );

  // 동작
  $(".plalyRate__btnChangeRate").on("click", function () {
    $(".controller__playRate").removeClass("open");
    $(".controller__btnRateOpen").html($(this).attr("data-rate"));
    video.playbackRate = $(this).attr("data-rate");
    setCookie("customRate", $(this).attr("data-rate"), 30);
  });
};
