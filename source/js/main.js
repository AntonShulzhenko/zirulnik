$( document ).ready(function() {

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
    var header = $('.header');
    var address = $('#address');
    var location = $('#location .location__drop-menu');
    var city = location.children();
    var headerClose = $('.header__close');
    var locationBtnText = $('#location .location__toggler span');

    city.on('click', function(e) {
      e.preventDefault();
      locationBtnText.text($(this).text());
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
});


// MAP
var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 50.437088, lng: 30.518767},
      zoom: 15,
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
  });

  var marker = new google.maps.Marker({
    position: {lat: 50.437088, lng: 30.518767},
    map: map
  });
}
