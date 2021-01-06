$(document).ready(() => {
  $(() => {
    $('#phone_key').mask('+7(000)000-00-00', {
      placeholder: '+7(___)___-__-__',
      clearIfNotMatch: true,
    });
    $('#footer_phone').mask('+7(000)000-00-00', {
      placeholder: '+7(___)___-__-__',
      clearIfNotMatch: true,
    });
  });

  $('.testi-slider').slick({
    infinite: true,
    dots: true,

    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    prevArrow: "<button type='button' class='slick-prev pull-left'></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'></button>",

    responsive: [{
      breakpoint: 1920,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    }, {
      breakpoint: 690,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    }, {

      breakpoint: 300,
      settings: {
        settings: "unslick", // destroys slick
      },
    }],

  });

  $('.item-header').click(function () {
    $('.accordion-item').removeClass('active');
    $(this)
      .parent()
      .addClass('active');
    $('.icon')
      .text('+')
      .css('line-height', '25px');
    $(this)
      .children('.icon')
      .text('-')
      .css('line-height', '21px');
  });

  $('form').submit(function () {
    // Change
    const th = $(this);
    $.ajax({
      type: 'POST',
      url: 'mail.php', // Change
      data: th.serialize(),
    }).done(() => {
      $('.forms-calldecor').addClass('active');
      setTimeout(() => {
        // Done Functions
        $('.forms-calldecor').removeClass('active');
        th.trigger('reset');
        // $.magnificPopup.close();
      }, 3000);
    });
    return false;
  });
});
