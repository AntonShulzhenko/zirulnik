(function($) {
  var loaderOverlay = $('.loader-overlay');
  var loadLogo      = $('.load-logo');

  Pace.on('done', function() {
    setTimeout(function() {
      loaderOverlay.css({
        'opacity':'0',
        'top': '-100%',
        'bottom':'auto'
      });

      setTimeout(function() {
        loaderOverlay.css({'display':'none'});
      }, 1000);

      loadLogo.animate({
        'top': 0
      });

      if($(window).width() > 768) {
        setTimeout(function() {
          firstScreenHeading.animate({
            'opacity': 1,
            'top': '0px'
          }, 700);

          firstScreenBtn.addClass('animated scale');
        }, 500);
      }
    }, 500);
  });

  var firstScreenHeading = $('.first-screen__h1');
  var firstScreenBtn     = $('.first-screen__btn');

  if($(window).width() > 768) {
    firstScreenHeading.css({
      'opacity': 0,
      'top': '40px'
    });

    firstScreenBtn.css('opacity', 0);
  }

  $("#services-carousel").owlCarousel({
    navigation : true,
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem : true,
    navigationText :	["<i class='ion-ios-arrow-thin-left'></i>","<i class='ion-ios-arrow-thin-right'></i>"],
    pagination : false
  });

  $("#slogan-carousel").owlCarousel({
    navigation : true,
    slideSpeed : 700,
    paginationSpeed : 400,
    singleItem : true,
    navigationText :	["<i class='ion-ios-arrow-thin-left'></i>","<i class='ion-ios-arrow-thin-right'></i>"],
    pagination : false,
    stagePadding: 50,
    transitionStyle : "fade"
  });

  $('.contacts-window-carousel').owlCarousel({
    navigation : true,
    slideSpeed : 300,
    paginationSpeed : 400,
    navigationText :	["<i class='ion-ios-arrow-thin-left'></i>","<i class='ion-ios-arrow-thin-right'></i>"],
    pagination : false,
    items : 3,
    addClassActive : true,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [980,3],
    itemsTablet: [768,3],
    itemsTabletSmall: false,
    itemsMobile : [479,3]
  });

  // MAIN PAGE GALLERY
  var swiper = new Swiper('#gallery', {
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    paginationClickable: true,
    spaceBetween: 20,
    freeMode: true,
    nextButton: '.gallery__arrow_next',
    prevButton: '.gallery__arrow_prev'
  });

  var gallery = $('.gallery__item').data('gallery');
  // /MAIN PAGE GALLERY

  function toggleMainNav() {
    var main         = $('.main');
    var slideWindow  = $('.slide-window');
    var nav          = $('.main-nav');
    var closeBtn     = $('.slide-window__close');
    var menuBtn      = $('.header__menu-btn');
    var registration = $('.registration');
    var registrBtn   = $('.header__register-btn');

    function toggleMenu(btn, content) {
      btn.on('click', function() {
        main.addClass('trans');
        setTimeout(function() {
          slideWindow.addClass('slide');
          content.addClass('db');
          setTimeout(function() {
            content.addClass('shown');
          }, 600);
        }, 300);
      });

      closeBtn.on('click', function() {
        slideWindow.removeClass('slide');
        content.removeClass('shown');
        setTimeout(function() {
          content.removeClass('db');
        }, 500);
        setTimeout(function() {
          main.removeClass('trans');
        }, 500);
      });
    }
    toggleMenu(menuBtn, nav);
    toggleMenu(registrBtn, registration);
  }

  toggleMainNav();

  // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
  $('.dropdown').on('show.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).addClass('animated');
      $(this).find('.dropdown-toggle').addClass('animated');
  });

  // ADD SLIDEUP ANIMATION TO DROPDOWN //
  $('.dropdown').on('hide.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).removeClass('animated');
      $(this).find('.dropdown-toggle').removeClass('animated');
  });

  var logoSm = $('.logo-sm');

  $(window).on('scroll', function() {
    if($(window).scrollTop() > 135) {
      logoSm.css('opacity', 1);
    } else {
      logoSm.css('opacity', 0);
    }
  });

  function chooseLocation() {
    var header          = $('.header');
    var address         = $('#address');
    var street          = address.children();
    var location        = $('#location .location__drop-menu');
    var city            = location.children();
    var headerClose     = $('.header__close');
    var locationBtnText = $('#location .location__toggler span');
    var streets         = ['вул. Шота Руставеллі, 33-А', '	бул. Незалежності, 2-Б'];

    city.on('click', function(e) {
      e.preventDefault();
      locationBtnText.text($(this).text());

      if($(this).text() == 'Киев') {
        street.text(streets[0]);
      } else {
        street.text(streets[1]);
      }
    });

    if ($(window).width() < 768) {
      city.on('click', function() {
        header.css('height', '102px');
        address.addClass('db');
        headerClose.addClass('db');

        setTimeout(function() {
          address.addClass('shown');
          headerClose.addClass('shown');
        }, 200);
      });

      headerClose.on('click', function() {
        address.removeClass('db shown');
        header.css('height', '50px');
        $(this).removeClass('db shown');
      });
    }
  }
  chooseLocation();

  // VALIDATION
  function formValidation() {
    $('.footer__form').submit(function(e) {
      validation._email('.footer__input');
      e.preventDefault();
    });

    var rePhone = /^\+\d{5}-\d{3}-\d{2}-\d{2}$/;
    var regForm = $('.registration__form');
    var phoneInput = $('.registration__tel');

    phoneInput.mask('+380**-***-**-**', {placeholder: '+380**-***-**-**'});

    regForm.submit(function(e) {
      var phoneInputVal = phoneInput.val();
      var validPhoneNumber = rePhone.test(phoneInputVal);
      if(!validPhoneNumber) {
        alert('Введите корректный номер телефона');
        e.preventDefault();
      }
    });
  }
  formValidation();

  function scrollFadeEffect() {
    var overlay = $('body').find('.scroll-fade-overlay');
    var fadeContainer = $('body').find('.scroll-fade').children('.container');
    var overlayHeight = overlay.height();
    var scale = 0.4 / overlayHeight;

    $(window).on('scroll', function() {
      var wScroll = $(window).scrollTop();
      var amount = (scale * wScroll) + 0.6;
      amount = (amount <= 1) ? amount : 1;
      overlay.css('background-color', 'rgba(0,0,0,' + amount + ')');
      fadeContainer.css({
        'opacity': 1 - (wScroll / overlayHeight) * 2,
        'transform': 'scale(' + (1 + (wScroll / 5000)) +')'
      });
    });
  }
  scrollFadeEffect();

  function bbWindow() {
    var bbWindow = $('.best-bshop');
    var bbToggler = $('.best-bshop__toggler');

    bbWindow.addClass('is-shown');

    if($(window).width() > 768) {
      bbToggler.on('click', function() {
        bbWindow.toggleClass('is-shown');
      });
    }
  }
  bbWindow();

  $('.scroll-to').on('click', function () {
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top;
    $('html:not(:animated),body:not(:animated)').animate({
      scrollTop: destination
    }, 1100);
    return false;
  });

  $('.table').footable({
    breakpoints: {
      phone: 480,
      tablet: 700
    }
  });
})(jQuery);

var wow = new WOW(
  {
    boxClass     : 'wow',
    animateClass : 'animated',
    offset       : 200,
    mobile       : false,
    live         : true
  }
);
wow.init();

// MAP
var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 50.437088, lng: 30.518767},
      zoom: 15,
      scrollwheel: false,
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
  });

  var contentString = '<div class="map-info-window">'+
    '<p class="map-info-window__p">Шота Руставели 33-А</p>'+
    '<div class="map-info-window__arrow"></div>'+
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  infowindow.setPosition({lat: 50.437088, lng: 30.518767});

  infowindow.open(map);

  // Info Window
  $(document).ready(function() {
    google.maps.event.addListener(infowindow, 'domready', function() {
      var iwOuter = $('.gm-style-iw');

      var iwBackground = iwOuter.prev();

      iwBackground.children(':nth-child(2)').css({'display' : 'none'});

      iwBackground.children(':nth-child(4)').css({'display' : 'none'});

      iwOuter.parent().parent().css({left: '140px'});

      iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'display: none !important;'});

      iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'display: none !important;'});

      var iwCloseBtn = iwOuter.next();

      iwCloseBtn.css({
        display: 'none'
      });
    });
  });
}
