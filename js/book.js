const sword90 = document.querySelector("#sword-90");
const flipPageLeft = document.querySelector("#flip-page-left");
const flipPageRight = document.querySelector("#flip-page-right");
const bookPage = document.querySelectorAll(".book-page > img");
const bookTexts = document.querySelectorAll(".book-text > img");
const messageFlipPage = document.querySelectorAll(".story .message");

let curPage = 1;

sword90.addEventListener("click", () => {
  bookTexts[0].scrollIntoView({ behavior: "smooth", block: "end"});
});

const onFlipPageClick = () => {
  flipPageLeft.disabled = true;
  flipPageRight.disabled = true;
  bookTexts[curPage-1].classList.remove("active");
  messageFlipPage.forEach((m) => {
    m.classList.remove("popup");
    m.classList.add("seen");
  });
}

flipPageLeft.addEventListener("click", () => {
  if (curPage > 1) {
    onFlipPageClick();
    bookPage[0].classList.add("flip-page");
    curPage -= 1;
  }
});

flipPageRight.addEventListener("click", () => {
  if (curPage < 8) {
    onFlipPageClick();
    bookPage[1].classList.add("flip-page");
    curPage += 1;
  } else if (curPage == 8) {
    onFlipPageClick();
    bookPage[0].classList.add("flip-page-fast");
    curPage = 1;
  }
});

bookPage.forEach((page) => {
  
  page.addEventListener("animationend", () => {
    page.classList.remove("flip-page", "flip-page-fast");
    bookTexts[curPage-1].classList.add("active");
    flipPageLeft.disabled = false;
    flipPageRight.disabled = false;
  });
});
