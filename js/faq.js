const questions = document.querySelectorAll(".question");
const cursors = document.querySelectorAll(".sword-fire");
const answers = document.querySelectorAll(".answer");
let curQuestion = 0;

questions.forEach((q, i) => {
  q.addEventListener("click", () => {
    if (curQuestion != i) {
      cursors[2*curQuestion].style.visibility = "hidden";
      cursors[2*curQuestion+1].style.visibility = "hidden";
      answers[curQuestion].style.display = "none";

      cursors[2*i].style.visibility = "visible";
      cursors[2*i+1].style.visibility = "visible";
      answers[i].style.display = "block";

      curQuestion = i;
    }
  });
});
