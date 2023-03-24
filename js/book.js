const swordGold = document.querySelector("#sword-gold");
const pageLeft = document.querySelector("#page-left");
const pageRight = document.querySelector("#page-right");
const page = document.querySelector(".page img");
const pageReverse = document.querySelector(".page-reverse img");
const pageText = document.querySelector(".page-text");
const messageLeft = document.querySelector(".warrior.left .message");
let curPage = 1;

swordGold.addEventListener("click", () => {
  pageText.scrollIntoView({ behavior: 'smooth', block: 'end'});
});

const currentText = (curPage) => {
  return `url(../assets/story/page-text/page-text-${curPage}.svg)`
}

const onPageClick = () => {
  pageLeft.disabled = true;
  pageRight.disabled = true;
  pageText.style.backgroundImage = "none";
  pageText.style.opacity = "0";
  messageLeft.classList.remove("popup");
  messageLeft.classList.add("seen")
}

pageLeft.addEventListener("click", () => {
  if (curPage > 1) {
    onPageClick();
    pageReverse.classList.add("flip-page");
    curPage -= 1;
  }
});

pageRight.addEventListener("click", () => {
  if (curPage <= 8) {
    onPageClick();

    if (curPage < 8) {
      page.classList.add("flip-page");
      curPage += 1;
    } else {
      pageReverse.classList.add("flip-page-fast");
      curPage = 1;
    }
  }
});

const animationEnd = () => {
  pageText.style.backgroundImage = currentText(curPage);
  pageText.style.opacity = "1";
  pageLeft.disabled = false;
  pageRight.disabled = false;
}

page.addEventListener("animationend", () => {
  page.classList.remove("flip-page");
  animationEnd();
});
pageReverse.addEventListener("animationend", () => {
  pageReverse.classList.remove("flip-page", "flip-page-fast");
  animationEnd();
});

for (let i=1; i <= 8; i++) {
  let img=new Image();
  img.src=`../assets/story/page-text/page-text-${i}.svg`;
}