$(function () {
  var d = $(window).width();
  var b = $(window).height();
  $(".section.started").css({
    height: b,
  });
  $(window).on("load", function () {
    $(".preloader .spinner").fadeOut(function () {
      $(".preloader").fadeOut();
      $("body").addClass("ready");
    });
  });
  $(".typed-title").typed({
    stringsElement: $(".typing-title"),
    backDelay: 5000,
    typeSpeed: 0,
    loop: true,
  });
  var c = $("#video-bg").YTPlayer();
  if ($(".section.started").length) {
    $(window).on("scroll", function () {
      var e = $(window).scrollTop();
      $(".top-menu ul li a").each(function () {
        var f = $(this);
        var g = $(f.attr("href"));
        if (g.offset().top <= e + 270) {
          $(".top-menu ul li").removeClass("active");
          f.closest("li").addClass("active");
        }
      });
    });
  }
  if ($(".section.started").length) {
    $(".top-menu ul li a").on("click", function () {
      var f = $(this).attr("href");
      var e = parseFloat($(f).offset().top);
      $("body,html").animate(
        {
          scrollTop: e - 80,
        },
        800
      );
      return false;
    });
  }
  $(".page").on("click", ".menu-btn", function () {
    if ($(".top-menu").hasClass("active")) {
      $(".top-menu").removeClass("active");
      $(this).removeClass("active");
    } else {
      $(".top-menu").addClass("active");
      $(this).addClass("active");
    }
    return false;
  });
  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= b) {
      $(".mouse-btn").fadeOut();
    }
    if ($(this).scrollTop() <= b) {
      $(".mouse-btn").fadeIn();
    }
    if ($(this).scrollTop() <= b) {
      $(".top-menu ul li").removeClass("active");
    }
  });
  if ($("#video-bg").length) {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() >= b - 10) {
        $("#video-bg").YTPPause();
      }
      if ($(this).scrollTop() <= b - 10) {
        $("#video-bg").YTPPlay();
      }
    });
  }
  $(".section").on("click", ".mouse-btn", function () {
    $("body,html").animate(
      {
        scrollTop: b - 112,
      },
      800
    );
  });
  if ($(window).scrollTop() > 100) {
    $("header").addClass("filled");
  } else {
    $("header").removeClass("filled");
  }
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
      $("header").addClass("filled");
    } else {
      $("header").removeClass("filled");
    }
  });
  var a = $(".box-items");
  a.imagesLoaded(function () {
    a.multipleFilterMasonry({
      itemSelector: ".box-item",
      filtersGroupSelector: ".filters",
      percentPosition: true,
      gutter: 0,
    });
  });
  $(".filters label").on("change", 'input[type="radio"]', function () {
    if ($(this).is(":checked")) {
      $(".f_btn").removeClass("active");
      $(this).closest(".f_btn").addClass("active");
    }
    $(".has-popup").magnificPopup({
      type: "inline",
      overflowY: "auto",
      closeBtnInside: true,
      mainClass: "mfp-fade",
    });
  });
  $(".has-popup").magnificPopup({
    type: "inline",
    overflowY: "auto",
    closeBtnInside: true,
    mainClass: "mfp-fade",
  });
  $(".post-lightbox").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    },
  });
  $("#cform").validate({
    rules: {
      name: {
        required: true,
      },
      tel: {
        required: true,
      },
      message: {
        required: true,
      },
      subject: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
    },
    success: "valid",
    submitHandler: function () {
      $.ajax({
        url: "mailer/feedback.php",
        type: "post",
        dataType: "json",
        data:
          "name=" +
          $("#cform").find('input[name="name"]').val() +
          "&tel=" +
          $("#cform").find('input[name="tel"]').val() +
          "&email=" +
          $("#cform").find('input[name="email"]').val() +
          "&subject=" +
          $("#cform").find('input[name="subject"]').val() +
          "&message=" +
          $("#cform").find('textarea[name="message"]').val(),
        beforeSend: function () {},
        complete: function () {},
        success: function (e) {
          $("#cform").fadeOut();
          $(".alert-success").delay(1000).fadeIn();
        },
      });
    },
  });
  $("#blog-form").validate({
    rules: {
      name: {
        required: true,
      },
      message: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
    },
    success: "valid",
    submitHandler: function () {
      $("#blog-form").fadeOut();
      $(".alert-success").delay(1000).fadeIn();
    },
  });
});
