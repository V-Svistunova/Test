// Подключение slick-slider
$('.publications__list').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      },
    }
  ]
});

$('.header__btn-menu').on('click', function () {
  $('.header__btn-menu').toggleClass('header__btn-menu--active'),
  $('.header__content').toggleClass('header__content--active')
  });  

$('.header__link').on('click', function () {
    $('.header__btn-menu').removeClass('header__btn-menu--active'),
    $('.header__content').removeClass('header__content--active')
  });

// Плавный переход по якорям
let anchors = document.querySelectorAll('a[href*="#"]');

for(let anchor of anchors) {
  anchor.addEventListener('click', function(event) {
    event.preventDefault();
    let blockID = anchor.getAttribute('href');
    document.querySelector(blockID).scrollIntoView({
      block: "start",
      behavior: "smooth",
    })
  })
}