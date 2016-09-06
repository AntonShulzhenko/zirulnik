$( document ).ready(function() {

  function toggleMainNav() {
    var main    = $('.main');
    var nav     = $('.main-nav');
    var navBtn  = $('.main-nav__close');
    var menuBtn = $('.header__menu-btn');

    menuBtn.on('click', function() {
      main.addClass('trans');
      setTimeout(function() {
        nav.addClass('show');
      }, 300);
    });

    navBtn.on('click', function() {
      nav.removeClass('show');
      setTimeout(function() {
        main.removeClass('trans');
      }, 500);
    });
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

});
