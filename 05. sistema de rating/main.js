const ratingContainer = document.querySelector(".rating");
let currentValue = 0;
const limit = 10;

html = Array.from(Array(limit)).map((item, i) => {
  return `<div class="item item-${i}" data-pos="${i}"></div>`;
});

ratingContainer.innerHTML = html.join("");

document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    const pos = item.getAttribute("data-pos");

    if (currentValue === parseInt(pos) + 1) {
      return;
    }
    document.querySelectorAll(".item").forEach((item) => {
      if (item.classList.contains("item-full")) {
        item.classList.remove("item-full");
      }
    });
    for (let i = 0; i <= pos; i++) {
      const item = document.querySelector(`.item-${i}`);
      if (!item.classList.contains("item-full")) {
        item.classList.add("item-full");
      }
    }
    currentValue = parseInt(pos) + 1;
  });

  item.addEventListener("click", (e) => {
    const pos = item.getAttribute("data-pos");
    currentValue = parseInt(pos) + 1;
    console.log(currentValue);
  });
});
