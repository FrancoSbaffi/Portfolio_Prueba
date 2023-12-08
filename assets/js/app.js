

// LOADING SCREEN

const svg = document.getElementById("svg");
const tl = gsap.timeline();
const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

tl.from(".loader-wrap-heading h1", {
  delay: 1,
  y: 200,
  skewY: 10,
}).to(".loader-wrap-heading h1", {
  delay: 1.5,
  y: -200,
  skewY: 10,
});
tl.to(svg, {
  duration: 0.8,
  attr: { d: curve },
  ease: "power2.easeIn",
}).to(svg, {
  duration: 0.8,
  attr: { d: flat },
  ease: "power2.easeOut",
});
tl.to(".loader-wrap", {
  y: -1500,
});
tl.to(".loader-wrap", {
  zIndex: -1,
  display: "none",
});
tl.from(
  ".container h1",
  {
    y: 100,
    opacity: 0,
  },
  "-=1.5"
);

// CURSOR 

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
    "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990",
  "#fd3990"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

// CLOCK

const timeArea = document.querySelector(".time");

const timePeriod = document.querySelector(".time-per");

const tik = () => {

    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    
    if (minutes < 10) {
        minutes = "0" + minutes; 
    }

    if (seconds < 10) {
        seconds = "0" + seconds; 
    }

    const ampm = (hours >= 12) ? "pm" : "am";

    const time = `${hours}:${minutes}:${seconds}`;

    timeArea.innerHTML = time;
    timePeriod.innerHTML = ampm;

    setTimeout(tik, 1000);

};

tik();

// NAME

const el = document.querySelector(".title");

let elWidth = el.offsetWidth;
let windowWidth = window.innerWidth;

let mouseX = 0;
let prevMouseX = 0;

let skewTarget = 0;
let translateTarget = 0;

let skewWithEasing = 0;
let translateWithEasing = 0;

let skewEasingFactor = 0.1;
let translateEasingFactor = 0.05;

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize); // Corregido el nombre de la función

function handleMouseMove(e) {
    mouseX = e.pageX;
}

function handleResize(e) { // Corregido el nombre de la función
    elWidth = el.offsetWidth;
    windowWidth = window.innerWidth;
}

function lerp(start, end, factor) {
    return (1 - factor) * start + factor * end;
}

function animateMe() {
    skewTarget = mouseX - prevMouseX;
    prevMouseX = mouseX;

    translateTarget = (elWidth - windowWidth) / windowWidth * mouseX * -1;
    skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);
    skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -75), 75);

    translateWithEasing = lerp(
        translateWithEasing,
        translateTarget,
        translateEasingFactor
    );

    el.style.transform = `translateX(${translateWithEasing}px) skew(${skewWithEasing}deg)`; 
    window.requestAnimationFrame(animateMe);
}

window.requestAnimationFrame(animateMe);

