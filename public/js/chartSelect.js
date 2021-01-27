// $('#ChartButtons').on('click', 'button', function(){
//     console.log("helloworld")
// })

// $("#ChartButtons").click(function() {
//     $("#ChartButtons").css("background-color", "white");
//     $(this).css("background-color", "red");
// });

const target = window.document.getElementsByTagName("h1")[0];

const flickerLetter = (letter) =>
  `<span style="animation: text-flicker-in-glow ${
    Math.random() * 4
  }s linear both ">${letter}</span>`;
const colorLetter = (letter) =>
  `<span style="color: hsla(${
    Math.random() * 360
  }, 100%, 80%, 1);">${letter}</span>`;
const flickerAndColorText = (text) =>
  text.split("").map(flickerLetter).map(colorLetter).join("");
const neonGlory = (target) =>
  (target.innerHTML = flickerAndColorText(target.textContent));

neonGlory(target);
target.onclick = ({ target }) => neonGlory(target);

$("#Chart1").click(function () {
  $(".background").css(
    "background",
    "url(../assets/Background2.jpeg) center fixed"
  );
});

$("#Chart2").click(function () {
  $(".background").css(
    "background",
    "url(../assets/Background1.jpeg) center fixed"
  );
});

$("#Chart3").click(function () {
  $(".background").css(
    "background",
    "url(../assets/Background3.jpeg) center fixed"
  );
});

$("#Chart4").click(function () {
  $(".background").css(
    "background",
    "url(../assets/Background4.jpeg) center fixed"
  );
});

$("#Chart5").click(function () {
  $(".background").css(
    "background",
    "url(../assets/Background88.jpeg) center fixed"
  );
});

function myFunction() {
  document.getElementById("panel").style.display = "block";
}

const [red, green, blue] = [69, 111, 225];
const section1 = document.querySelector(".section1");

window.addEventListener("scroll", () => {
  let y = 1 + (window.scrollY || window.pageYOffset) / 150;
  y = y < 1 ? 1 : y; // ensure y is always >= 1 (due to Safari's elastic scroll)
  const [r, g, b] = [red / y, green / y, blue / y].map(Math.round);
  section1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

var startGame = document.getElementById("startGame");

startGame.onclick = function () {
  location.href = "/api/actors";
};
