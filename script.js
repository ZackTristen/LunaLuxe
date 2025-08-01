// две карусели
document.addEventListener("DOMContentLoaded", function () {
  const myCarouselOne = document.getElementById("carouselOne");
  const myCarouselTwo = document.getElementById("carouselTwo");

  if (!myCarouselOne || !myCarouselTwo) {
    console.error("Одна или обе карусели не найдены.");
    return;
  }

  const carouselOne = bootstrap.Carousel.getOrCreateInstance(myCarouselOne, {
    interval: false,
    wrap: true,
  });
  const carouselTwo = bootstrap.Carousel.getOrCreateInstance(myCarouselTwo, {
    interval: false,
    wrap: true,
  });

  const indicatorsAll = document.querySelectorAll(
    ".carousel-indicators button"
  );

  const innerAll = document.querySelectorAll(".carousel-inner");

  if (!indicatorsAll.length || !innerAll.length) {
    console.warn("Не все необходимые элементы карусели найдены.");
    return;
  }

  indicatorsAll.forEach((IndicatorBtn) =>
    IndicatorBtn.addEventListener("click", goToIndicatorCarousels)
  );

  innerAll.forEach((CarouselInner) =>
    CarouselInner.addEventListener("mouseenter", pauseCarousels)
  );
  innerAll.forEach((CarouselInner) =>
    CarouselInner.addEventListener("mouseleave", resumeCarousels)
  );

  function goToIndicatorCarousels(e) {
    e.preventDefault();
    let clickedIndicator = e.target.dataset.bsSlideTo;
    carouselOne.to(clickedIndicator);
    carouselTwo.to(clickedIndicator);
  }

  function pauseCarousels(e) {
    carouselOne.pause();
    carouselTwo.pause();
  }

  function resumeCarousels(e) {
    carouselOne.cycle();
    carouselTwo.cycle();
  }

  const carouselTwoElement = document.getElementById("carouselTwo");
  carouselTwoElement.addEventListener("mouseenter", pauseCarousels);
  carouselTwoElement.addEventListener("mouseleave", resumeCarousels);
});

// слайдер с картинками первый
$(document).ready(function () {
  $(".your-slider").slick({
    centerMode: true, // Режим центрирования
    centerPadding: "40px", // Отступы по бокам
    slidesToShow: 3, // Количество видимых слайдов
    slidesToScroll: 1, // Прокрутка по 1 слайду
    infinite: true, // Бесконечная прокрутка
    focusOnSelect: true, // Фокус при выборе
    arrows: true, // Стрелки навигации
    dots: false, // Отключить точки
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerPadding: "40px",
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          centerPadding: "40px",
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  });
});

// анимация карточек блоков

// карточки квадраты
document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".square-block");

  function checkVisibility() {
    blocks.forEach((block) => {
      const blockPosition = block.getBoundingClientRect();
      const screenPosition = window.innerHeight / 1.3;

      if (blockPosition.top < screenPosition) {
        block.classList.add("visible");
      }
    });
  }

  // Проверяем при загрузке
  checkVisibility();

  // И при скролле
  window.addEventListener("scroll", checkVisibility);
});

// надпись продукты
document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".products-wrapper");

  function checkVisibility() {
    blocks.forEach((block) => {
      const blockPosition = block.getBoundingClientRect();
      const screenPosition = window.innerHeight / 1.3;

      if (blockPosition.top < screenPosition) {
        block.classList.add("visible");
      }
    });
  }

  // Проверяем при загрузке
  checkVisibility();

  // И при скролле
  window.addEventListener("scroll", checkVisibility);
});

// слайдер доработать
$(document).ready(function () {
  const $slider = $(".testimonial-slider");

  // Инициализация Slick Slider
  $slider.slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: false,
    speed: 400,
    cssEase: "ease-in-out",
    autoplay: false,
    pauseOnHover: false,
    initialSlide: 3,
    responsive: [],
  });

  // Функция для обновления стилей соседних слайдов
  function updateNeighbors() {
    const currentSlide = $slider.slick("slickCurrentSlide");
    const totalSlides = $slider.slick("getSlick").slideCount;

    // Удаляем все временные классы
    $(".slick-slide", $slider).removeClass(
      "slick-prev-neighbor slick-next-neighbor slick-current"
    );

    // Добавляем классы для текущего и соседних слайдов
    $(
      '.slick-slide[data-slick-index="' + currentSlide + '"]',
      $slider
    ).addClass("slick-current");

    const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    const nextSlide = (currentSlide + 1) % totalSlides;

    $('.slick-slide[data-slick-index="' + prevSlide + '"]', $slider).addClass(
      "slick-prev-neighbor"
    );
    $('.slick-slide[data-slick-index="' + nextSlide + '"]', $slider).addClass(
      "slick-next-neighbor"
    );
  }

  // Функция для анимации SVG
  function animateBrandSVG(index) {
    $(".brand svg").css({
      fill: "#d39000",
      transform: "scale(1)",
      transition: "all 0.3s ease",
    });

    $(`.brand[data-slide="${index}"] svg`).css({
      fill: "#000000",
      transform: "scale(1.1)",
    });
  }

  // Функция для перехода к слайду
  function goToSlide(index) {
    $(".brand").removeClass("active");
    $(`.brand[data-slide="${index}"]`).addClass("active");
    $slider.slick("slickGoTo", index);
    animateBrandSVG(index);
  }

  // Обработчики событий
  $slider.on("init afterChange", updateNeighbors);

  $(".brand").on("mouseenter", function () {
    const slideIndex = $(this).data("slide");
    goToSlide(slideIndex);
  });

  $slider.on("afterChange", function (event, slick, currentSlide) {
    const slideCount = $(".brand").length;
    const realIndex = currentSlide % slideCount;
    $(".brand").removeClass("active");
    $(`.brand[data-slide="${realIndex}"]`).addClass("active");
    animateBrandSVG(realIndex);
  });

  // Инициализация
  $(`.brand[data-slide="3"]`).addClass("active");
  animateBrandSVG(3);
});

function centerBrandNavigation() {
  const brandsWrapper = document.querySelector(".brands-wrapper");
  const targetBrand = document.querySelector('.brand[data-slide="3"]'); // Или brandsWrapper.querySelectorAll('.brand')[3]

  if (!brandsWrapper || !targetBrand) return;

  // Получаем позицию элемента относительно контейнера
  const wrapperRect = brandsWrapper.getBoundingClientRect();
  const brandRect = targetBrand.getBoundingClientRect();

  // Рассчитываем scrollLeft для центрирования
  const scrollLeft = brandRect.left - wrapperRect.left + brandsWrapper.scrollLeft - (wrapperRect.width / 2) + (brandRect.width / 2);

  // Применяем прокрутку
  brandsWrapper.scrollTo({
    left: scrollLeft,
    behavior: "auto" // Мгновенная прокрутка
  });
}

// Запускаем после загрузки
window.addEventListener('load', centerBrandNavigation);
document.addEventListener('DOMContentLoaded', centerBrandNavigation);

// На всякий случай добавляем задержку
setTimeout(centerBrandNavigation, 300);

// Запускаем после загрузки
document.addEventListener("DOMContentLoaded", centerBrandNavigation);



// надпись "приемущества" плавное появление
document.addEventListener("DOMContentLoaded", function () {
  const adventsContent = document.querySelector(".advents-content");

  function checkSlide() {
    // Определяем позицию блока относительно верхнего края экрана
    const slideInAt =
      window.scrollY + window.innerHeight - adventsContent.offsetHeight / 2;
    // Определяем нижнюю границу блока
    const isHalfShown = slideInAt > adventsContent.offsetTop;
    // Определяем верхнюю границу блока
    const isNotScrolledPast =
      window.scrollY < adventsContent.offsetTop + adventsContent.offsetHeight;

    // Если блок появился на экране, добавляем класс 'active'
    if (isHalfShown && isNotScrolledPast) {
      adventsContent.classList.add("active");
    } else {
      // (Опционально) Если блок ушел с экрана, удаляем класс 'active'
      // adventsContent.classList.remove('active');
    }
  }

  // Добавляем прослушиватель события 'scroll'
  window.addEventListener("scroll", checkSlide);
});

$(".dream-slider").slick({
  dots: false,
  infinite: false,
  speed: 300,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

// кнопка наверх
// Получаем кнопку
const toTopButton = document.getElementById("toTopButton");

// Добавляем обработчик клика
toTopButton.addEventListener("click", function () {
  // Плавная прокрутка наверх
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
