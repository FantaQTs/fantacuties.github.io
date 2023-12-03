const walkMap = document.querySelector("#walk-map");
const toggleAllCheckpoints = document.querySelector("#toggle-all-checkpoints");

const traveler = document.querySelectorAll(".traveler > img");
const checkpoints = document.querySelectorAll(".checkpoints > img");
const allCheckpoints = checkpoints[checkpoints.length - 1];

const messageToggleAllCheckpoints = document.querySelector(".map .message");
const messageWalkMap = document.querySelector(".platform .message");

let allCheckpointsToggled = false;
let messageToggleAllCheckpointsSeen = false;
let curCheckpoint = 1;

toggleAllCheckpoints.addEventListener("click", () => {
  if (!allCheckpointsToggled) {
    allCheckpoints.classList.add("active");
  } else {
    allCheckpoints.classList.remove("active");
  }
  allCheckpointsToggled = !allCheckpointsToggled;

  if (!mapMessageSeen) {
    messageToggleAllCheckpoints.classList.add("seen");
    messageToggleAllCheckpoints.classList.remove("popup");
    messageToggleAllCheckpointsSeen = true;
  }
});

walkMap.addEventListener("click", () => {
  checkpoints[curCheckpoint-1].classList.remove("active");
  traveler[curCheckpoint-1].classList = "";

  if (curCheckpoint == 6) {
    curCheckpoint = 0;
  }

  walkMap.disabled = true;
  
  curCheckpoint += 1;
  traveler[curCheckpoint-1].classList.add("active");
  traveler[curCheckpoint-1].classList.add(`walk-map-${curCheckpoint}`);

  if (!messageToggleAllCheckpointsSeen) {
    [messageToggleAllCheckpoints, messageWalkMap].forEach((e) => {
      e.classList.add("seen");
      e.classList.remove("popup");
    });
    messageToggleAllCheckpointsSeen = true;
  }
});

traveler.forEach(t => {
  t.addEventListener("animationend", () => {
    checkpoints[curCheckpoint-1].classList.add("active");
    walkMap.disabled = false;
  });
});
