$( document ).ready(function() {

  function toggleMainNav() {
    var nav     = $('.main-nav');
    var navBtn  = $('.main-nav__close');
    var menuBtn = $('.header__menu-btn');

    navBtn.on('click', function() {
      nav.slideUp();
    });

    menuBtn.on('click', function() {
      nav.slideDown();
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
