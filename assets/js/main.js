
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


// открытие и закрытие бургер-меню
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


// Модальное окно
let modalTrue = document.querySelector('.modal__true');
let modalFalse = document.querySelector('.modal__false');
let closeModalBtns = document.querySelectorAll('.close-btn');

window.addEventListener('click', function(event)  {
  if(event.target === modalTrue) {    
    modalTrue.style.display = 'none';
  } else if(event.target === modalFalse) {    
    modalFalse.style.display = 'none';
  }
});

closeModalBtns.forEach((closeModalBtn) => {
  closeModalBtn.addEventListener('click', function() {       
    modalTrue.style.display = 'none';
    modalFalse.style.display = 'none';
    });
  });


// Валидность форм
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error===0) {
      modalTrue.style.display = 'flex';   
      let formName = document.querySelector('#formName');
      let formEmail = document.querySelector('#formEmail');
      let formMessage = document.querySelector('#formMessage');
      console.log('Имя: ' + formName.value);
      console.log('Email: ' + formEmail.value);
      console.log('Сообщение: ' + formMessage.value);

      /*
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('ошибка обработки данных');
        form.classList.remove('_sending');
      }
      */
    } else {
      modalFalse.style.display = 'flex';
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if(emailTest(input)) {
          formAddError(input);
          error++;
        } 
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  //Функция теста email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});


