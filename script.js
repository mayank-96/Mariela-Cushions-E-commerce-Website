// GO TO TOP BUTTON
var mybutton = document.getElementById("top-btn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.offsetWidth > 980 &&
    (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// TOGGLE MENU
function toggleMenu() {
  var menu = document.getElementById("menu").classList;
  if (menu.contains("open")) {
    menu.replace("open", "close");
  } else {
    menu.replace("close", "open");
  }
}

// CHANGE HERO IMAGE

function changeBanner(direction) {
  const banner = [
    "./images/hero-banner-1.jpg",
    "./images/hero-banner-2.jpg",
    "./images/hero-banner-3.jpg",
    "./images/hero-banner-4.jpg",
  ];
  const currBanner =
    document.getElementById("hero-banner").attributes.src.value;
  var index = banner.indexOf(currBanner);

  if (direction === "next") {
    index = (index + 1) % banner.length;
  } else {
    index = index - 1;
    if (index === -1) {
      index = banner.length - 1;
    }
  }

  document.getElementById("hero-banner").attributes.src.value = banner[index];
}
