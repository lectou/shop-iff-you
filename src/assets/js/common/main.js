$(window).on("load", function () {

  // $(".load").addClass("active");
  // window.setTimeout(function () {
  //   $(".load").removeClass("active");
  // }, 1000);

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".overlay-block").addClass("overlay-active");
    } else {
      $(".overlay-block").removeClass("overlay-active")
    }
  });

  let burgerToggle = function () {
    $(".overlay-menu").toggleClass("active");
    $("body").toggleClass("no-scroll");
  }

  $(".burger").on("click", burgerToggle);
  $(".close").on("click", burgerToggle);

  $(".decrement").on("click", function () {
    let n = $(this).parent(".count").find(".count__number");
    let q = Number(n.val()) - 1;
    if (q) {
      n.val(q);
    }
  });

  $(".increment").on("click", function () {
    let n = $(this).parent(".count").find(".count__number");
    let q = Number(n.val()) + 1;
    n.val(q);
  });

  $(".sliderbig").slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: false,
    variableWidth: true,
  });
  $(".slider").slick({
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    focusOnSelect: true,
    verticalSwiping: true,
    asNavFor: ".sliderbig",
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 930,
        settings: {
          arrows: true,
          vertical: false,
          adaptiveHeight: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          verticalSwiping: false,
          dots: true,
          prevArrow: "<img src='assets/images/slider/icons/left.png' class='prev'>",
          nextArrow: "<img src='assets/images/slider/icons/right.png' class='next'>"
        }
      },
      {
        breakpoint: 510,
        settings: {
          arrows: false,
          vertical: false,
          dots: false,
          adaptiveHeight: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          focusOnSelect: true,
          verticalSwiping: false,
          dots: true,
        }
      },
      {
        breakpoint: 450,
        settings: {
          arrows: false,
          vertical: false,
          dots: false,
          adaptiveHeight: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          focusOnSelect: true,
          verticalSwiping: false,
          dots: true,
        }
      },
      {
        breakpoint: 360,
        settings: {
          arrows: false,
          vertical: false,
          dots: false,
          adaptiveHeight: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          verticalSwiping: false,
          dots: true,
        }
      },
      {
        breakpoint: 420,
        settings: {
          arrows: false,
          vertical: false,
          dots: false,
          adaptiveHeight: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          verticalSwiping: false,
          dots: true,
        }
      }
    ]
  });

  $(".review-slider").slick({
    dots: true,
    arrows: false,
    adaptiveHeight: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

})
