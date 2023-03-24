const description = document.querySelectorAll(".description .container");

description.forEach((d, i, a) => {
  d.addEventListener("animationiteration", e => {
    if (e.target != d) return;
    d.classList.add("paused");
    a[!i + 0].classList.remove("paused");
  });
});
