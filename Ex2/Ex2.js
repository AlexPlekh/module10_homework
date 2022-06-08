// Задание 2

/* Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. */

const button = document.querySelector(".j-btn");

button.addEventListener("click", () => displayScreenInfo());

function displayScreenInfo() {
    let width = window.screen.width;
    let height = window.screen.height;
    alert(`Высота экрана ${height} пикселей, ширина экрана ${width} пикселей`);
};