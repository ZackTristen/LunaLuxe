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