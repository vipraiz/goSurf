$(function () {
  new WOW().init();

  $('[href^="#"]').on('click', function(){
    let href = $(this).attr('href'), elem = $(document).find(href);
    if(elem.length > 0) {
      let posY = elem.eq(0).offset().top;
      $('html, body').animate({
        scrollTop: posY
      }, 1000);
    }
    return false;
  });

  $('.menu-btn').on('click', function(){
    $('.header__aside-menu').toggleClass('active');
  });

  $('.header__slider').slick({
    infinite: true,
    swipe: false,
    fade: true,
    prevArrow: '<img class="slider-arrows slider-arrows__left" src="img/arrows-left.svg" alt="">',
    nextArrow: '<img class="slider-arrows slider-arrows__right" src="img/arrows-right.svg" alt="">',
    asNavFor: '.slider-dots'
  });

  $('.slider-dots').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.header__slider',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 601,
        settings: "unslick"
      }
    ]
  });

  $('.surf-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    swipeToSlide: true,
    prevArrow: '<img class="slider-arrows slider-arrows__left" src="img/arrows-left.svg" alt="">',
    nextArrow: '<img class="slider-arrows slider-arrows__right" src="img/arrows-right.svg" alt="">',
    asNavFor: '.slider-map',
    responsive: [
      {
        breakpoint: 1156,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 901,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 587,
        settings: {
          slidesToShow: 1,
          centerMode: true
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  });

  $('.slider-map').slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.surf-slider',
    responsive: [
      {
        breakpoint: 961,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 901,
        settings: {
          slidesToShow: 2,
          centerMode: true
        }
      },
      {
        breakpoint: 711,
        settings: {
          slidesToShow: 1,
          centerMode: true
        }
      }
    ]
  });

  $('.holder__slider').slick({
    infinite: true,
    fade: true,
    swipe: false,
    prevArrow: '<img class="slider-arrows slider-arrows__left" src="img/arrows-left.svg" alt="">',
    nextArrow: '<img class="slider-arrows slider-arrows__right" src="img/arrows-right.svg" alt="">',
  });

  $('.shop__slider').slick({
    infinite: true,
    fade: true,
    swipe: false,
    prevArrow: '<img class="slider-arrows slider-arrows__left" src="img/arrows-left.svg" alt="">',
    nextArrow: '<img class="slider-arrows slider-arrows__right" src="img/arrows-right.svg" alt="">',
  });

  $('<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="../img/plus.svg" alt=""></div><div class="quantity-button quantity-down"><img src="../img/minus.svg" alt=""></div></div>').insertAfter('.quantity input');
  $('.quantity').each(function() {
    var spinner = $(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find('.quantity-up'),
      btnDown = spinner.find('.quantity-down'),
      min = input.attr('min'),
      max = input.attr('max');

    btnUp.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });
  });

  $('.quantity-button').on('click', function () {
    let parents = $(this).parents('.holder-slider__info');
    let n = $('.nights', parents).val();
    let p = $('.people', parents).val();
    calculatePrise(parents);
    
    $('.nights').each(function(){
      if($(this).attr('max') >= n && $(this).attr('min') <= n)
      {
        $(this).val(n);
        parents = $(this).parents('.holder-slider__info');
        calculatePrise(parents);
      }
    });

    $('.people').each(function(){
      if($(this).attr('max') >= p && $(this).attr('min') <= p)
      {
        $(this).val(p);
        parents = $(this).parents('.holder-slider__info');
        calculatePrise(parents);
      }
    });
	});

	$('.quantity').each(function () {
    var parents = $(this).parents('.holder-slider__info');
    calculatePrise(parents);
  });

  $('.product-box__circle').on('click', function(){
    $(this).toggleClass('active');
  });
  
});

function calculatePrise(parents){
  let nights_value = $('.summ', parents).data('nights'), 
  nights_count = $('.nights', parents).val(),
  people_value = $('.summ', parents).data('people'), 
  people_count = $('.people', parents).val(),
  summ = people_value * people_count * ((people_count < 5) ? 1 : 4 / 5) - nights_value * ((nights_count == 1) ? 3 / 4 : (nights_count < 4) ? 1 : (nights_count < 6) ? 3 / 2 : 2) - 3;

  $('.summ', parents).html('$' + summ);
}