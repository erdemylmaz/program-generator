let width = document.querySelector(".day-text").getBoundingClientRect().width;

const hoverDiv = document.querySelector(".hover-effect");
const header = document.querySelector(".days-list");

hoverDiv.style.width = `${width}px`;

let dayTexts = document.querySelectorAll(".day-text");

let selectedDayIndex = 0;

onLeave = () => {
  let day = dayTexts[selectedDayIndex];
  hoverDiv.style.left = `${day.offsetLeft}px`;
  hoverDiv.style.top = `${day.offsetTop}px`;
};

onHover = (e) => {
  let xPosition = e.target.offsetLeft;
  let yPosition = e.target.offsetTop;

  hoverDiv.style.left = `${xPosition}px`;
  hoverDiv.style.top = `${yPosition}px`;
};

dayTexts.forEach((dayText) => {
  dayText.addEventListener("mouseenter", onHover);
});

header.addEventListener("mouseleave", onLeave);
