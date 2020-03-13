'use strict';
$(document).ready(function() {
  $('.testi-slider').slick({
    infinite: true,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    //   autoplay       : true,
    autoplaySpeed: 5000,
    arrows: false,
    prevArrow: "<button type='button' class='slick-prev pull-left'></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'></button>",
  });

  $('.item-header').click(function() {
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
});

const formCalcul = $('#price-form');
let formData = formCalcul.serializeJSON();

showHideBlocks();

// цена разработки типовой секции
const typicalSectionPrice = 2000;
const uniquePagePrice = 5000;
const generalPagePrice = 2500;

const oneCarouselPrice = 1500;
const oneModalsPrice = 900;
const oneCalculatePrice = 8500;
const onePortfolioPrice = 1800;

const wordpressUniquePrice = 1500;
const wordpressGeneralPrice = 1000;
const wordpressSectionPrice = 300;
const wordpressCalculatePrice = 4000;
const wordpressPortfolioPrice = 500;

formCalcul.on('click keyup change', 'input, select, textatea', function() {
  formData = formCalcul.serializeJSON();
  console.log(formData);
  showHideBlocks();

  let totalPrice = 0;
  totalPrice =
    formData['lpb-unique'] * uniquePagePrice +
    formData['lpb-general'] * generalPagePrice +
    formData['lpb-section'] * typicalSectionPrice +
    formData['pages-unique-blog'] * uniquePagePrice +
    formData['pages-general-blog'] * generalPagePrice +
    formData['pages-unique'] * uniquePagePrice +
    formData['pages-general'] * generalPagePrice +
    formData['pages-section'] * typicalSectionPrice +
    formData['carousel'] * oneCarouselPrice +
    formData['modals'] * oneModalsPrice +
    formData['calculate'] * oneCalculatePrice +
    formData['block-portfolio'] * onePortfolioPrice;

  //расчитать стоимость адаптивности
  let indexAdaptivCost = 1;
  if (formData['mobilepoint'] == 0 || formData['mobile'] != 'on') {
    indexAdaptivCost = 1;
  } else if (formData['mobilepoint'] == 5) {
    indexAdaptivCost = 1.3;
  } else if (formData['mobilepoint'] == 7) {
    indexAdaptivCost = 1.5;
  } else if (formData['mobilepoint'] == 9) {
    indexAdaptivCost = 1.7;
  } else if (formData['mobilepoint'] == 10) {
    indexAdaptivCost = 2.5;
  } else {
    indexAdaptivCost = 1;
  }
  console.log(indexAdaptivCost);

  // Другие индексы
  let pixelPerfect = 1;
  if (formData['PixelPerfect'] == 'on') {
    pixelPerfect = 1.5;
  }
  console.log(pixelPerfect);

  let retinaReady = 1;
  if (formData['RetinaReady'] == 'on') {
    retinaReady = 1.1;
  }
  let googlePageSpeed = 1;
  if (formData['GooglePageSpeed'] == 'on') {
    googlePageSpeed = 1.1;
  }
  let speedWork = 1;
  if (formData['SpeedWork'] == 'on') {
    speedWork = 1.7;
  }
  console.log('pixelPerfect:', pixelPerfect);
  console.log('retinaReady:', retinaReady);
  console.log('googlePageSpeed:', googlePageSpeed);
  console.log('speedWork:', speedWork);

  let cmsPosadka = 1;
  if (formData['cms'] == 'onlylayout') {
    cmsPosadka = 0;
  } else if (formData['cms'] == 'WordPress') {
    cmsPosadka =
      formData['lpb-unique'] * wordpressUniquePrice +
      formData['lpb-general'] * wordpressGeneralPrice +
      formData['lpb-section'] * wordpressSectionPrice +
      formData['pages-unique-blog'] * wordpressUniquePrice +
      formData['pages-general-blog'] * wordpressGeneralPrice +
      formData['pages-unique'] * wordpressUniquePrice +
      formData['pages-general'] * wordpressGeneralPrice +
      formData['pages-section'] * wordpressSectionPrice +
      formData['carousel'] * 0 +
      formData['modals'] * 0 +
      formData['calculate'] * wordpressCalculatePrice +
      formData['block-portfolio'] * wordpressPortfolioPrice;
  } else if (formData['cms'] == 'October') {
    cmsPosadka = 7000;
  } else {
    cmsPosadka = 0;
  }
  console.log('cmsPosadka:', cmsPosadka);
  console.log('totalPrice:', totalPrice);
  totalPrice =
    totalPrice *
    indexAdaptivCost *
    pixelPerfect *
    retinaReady *
    googlePageSpeed *
    speedWork;
  totalPrice = totalPrice + cmsPosadka;

  console.log('totalPrice', totalPrice);
  $('#cost_final span').text(totalPrice);
});
function showHideBlocks() {
  if (formData.mobile == 'on') {
    $('[data-name="mobile"]').show(1000);
  } else {
    $('[data-name="mobile"]').hide(1000);
    $('[name="mobilepoint"]')[0].checked = true;
  }

  if (formData.dosite == 'sitevisitka') {
    $('[data-name="site"]').show();

    $('[data-name="landing"]').hide();
    $('[data-name="blog"]').hide();
    $('[data-name="landingplusblog"]').hide();
    // обнулили но не lpb-section pages-unique
    // pages-general
    $('[name="pages-unique-blog"]').val('0');
    $('[name="pages-general-blog"]').val('0');
    $('[name="pages-section"]').val('0');
    $('[name="lpb-section"]').val('0');
    $('[name="lpb-unique"]').val('0');
    $('[name="lpb-general"]').val('0');
  } else if (formData.dosite == 'blog') {
    $('[data-name="landing"]').hide();
    $('[data-name="site"]').hide();
    $('[data-name="landingplusblog"]').hide();
    $('[data-name="blog"]').show();
    // обнулили но не lpb-section pages-unique-blog
    // pages-general-blog

    $('[name="pages-unique"]').val('0');
    $('[name="pages-general"]').val('0');
    $('[name="pages-section"]').val('0');
    $('[name="lpb-section"]').val('0');
    $('[name="lpb-unique"]').val('0');
    $('[name="lpb-general"]').val('0');
  } else if (formData.dosite == 'landingplusblog') {
    $('[data-name="landingplusblog"]').show();
    $('[data-name="landing"]').hide();
    $('[data-name="site"]').hide();
    $('[data-name="blog"]').hide();
    // обнулили но не lpb-section lpb-unique lpb-general
    $('[name="pages-unique"]').val('0');
    $('[name="pages-general"]').val('0');
    $('[name="pages-section"]').val('0');
    $('[name="pages-unique-blog"]').val('0');
    $('[name="pages-general-blog"]').val('0');
  } else if (formData.dosite == 'landing') {
    $('[data-name="landing"]').show();
    $('[data-name="site"]').hide();
    $('[data-name="blog"]').hide();
    $('[data-name="landingplusblog"]').hide();
    // обнулили но не pages-section
    $('[name="pages-unique"]').val('0');
    $('[name="pages-general"]').val('0');
    $('[name="lpb-section"]').val('0');
    $('[name="lpb-unique"]').val('0');
    $('[name="lpb-general"]').val('0');
    $('[name="pages-unique-blog"]').val('0');
    $('[name="pages-general-blog"]').val('0');
  }
}
