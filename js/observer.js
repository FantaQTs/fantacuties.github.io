const observer = new IntersectionObserver(entries => {
  
  entries.forEach(entry => {
    
    if (entry.isIntersecting) {

      let classes = ["feature", "value", "question"];
      if (!classes.some(className => entry.target.classList.contains(className))) {
        entry.target.classList.remove("hidden");
      };
      
      if (!entry.target.classList.contains("seen")) {
        if (entry.target.classList.contains("traveler")) {
          document.querySelector("#walk-map").disabled = true;
          entry.target.children[0].classList.add("active", "walk-map-1");
          entry.target.classList.add("seen");
        } else {
          entry.target.classList.add("popup");
        }
      }
    
    } else {
      let classes = ["doodle", "title", "button", "feature", "value", "question"];
      if (!classes.some(className => entry.target.classList.contains(className))) {
        entry.target.classList.remove("popup");
      };
      if (entry.target.classList.contains("icon")) {
        entry.target.classList.add("hidden");
      }
    }

  });
});

document.querySelectorAll(
  ".icon, .doodle, .message, .title, .button, .traveler, .feature, .value, .question"
).forEach((i) => {
  observer.observe(i);
});

document.querySelectorAll(".feature, .value, .question").forEach((i) => {
  i.addEventListener("animationend", () => {
    i.classList.remove("hidden");
  });
});
