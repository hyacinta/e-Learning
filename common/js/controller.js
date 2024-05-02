const setController = (video, type) => {
  $(".wrap").append(controllerUI(type));

  // 동작
  $(".controller__btnIndex").on("click", function () {
    $(".controller__index").toggleClass("open");
  });
  $(".index__btnClosed").on("click", function () {
    $(".controller__index").removeClass("open");
  });
  $(".controller__btnRateOpen").on("click", function () {
    $(".controller__playRate").toggleClass("open");
    setRateList();
  });
};

const setRateList = () => {
  $(".playRate__list").html(rateListUI(initRate));

  // 동작
  $(".plalyRate__btnChangeRate").on("click", function () {
    $(".controller__playRate").removeClass("open");
  });
};
