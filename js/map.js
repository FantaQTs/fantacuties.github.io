const footstep = document.querySelector("#footstep");
const traveler = document.querySelectorAll(".traveler img");
const checkpoint = document.querySelector(".checkpoint img");
const checkpointAll = document.querySelector(".checkpoint-all");
const toggleCheckpoint = document.querySelector("#toggle-checkpoint");
const mapMessage = document.querySelector(".map .message");
const footstepMessage = document.querySelector(".footstep .message");
let checkpointToggled = false;
let mapMessageSeen = false;
let curCheckpoint = 1;

toggleCheckpoint.addEventListener("click", () => {
  if (!checkpointToggled) {
    checkpointAll.classList.add("active");
  } else {
    checkpointAll.classList.remove("active");
  }
  checkpointToggled = !checkpointToggled;

  if (!mapMessageSeen) {
    mapMessage.classList.add("seen");
    mapMessage.classList.remove("popup");
    mapMessageSeen = true;
  }
});

footstep.addEventListener("click", () => {
  checkpoint.classList.remove("active");

  if (curCheckpoint == 6) {
    curCheckpoint = 0;
  }

  footstep.disabled = true;

  curCheckpoint += 1;
  traveler[curCheckpoint-1].classList.add("active");
  traveler[curCheckpoint-1].classList.add(`walk-${curCheckpoint}`);

  if (!mapMessageSeen) {
    [mapMessage, footstepMessage].forEach((e) => {
      e.classList.add("seen");
      e.classList.remove("popup");
    });
    mapMessageSeen = true;
  }
});

traveler.forEach(t => {
  t.addEventListener("animationend", () => {
    t.className = "";
    checkpoint.style.transform = `translate3d(0, calc(-100%/6*${curCheckpoint-1}), 0)`;
    checkpoint.classList.add("active");
    footstep.disabled = false;
  });
});
