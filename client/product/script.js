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

// CHANGE PRODUCT IMAGE

function changeProductImage(direction) {
  const banner = ["PinkCushion.jpg", "PinkCushion-1.jpg", "PinkCushion-2.jpg"];
  var img = document.getElementById("product-image");
  var imgStyle = img.currentStyle || window.getComputedStyle(img, false);
  var imgLink = imgStyle.backgroundImage.slice(4, -1).replace(/"/g, "");
  var splitLink = imgLink.split("/");
  var currBanner = splitLink.at(-1);
  var index = banner.indexOf(currBanner);

  if (direction === "next") {
    index = (index + 1) % banner.length;
  } else {
    index = index - 1;
    if (index === -1) {
      index = banner.length - 1;
    }
  }
  document.getElementById(
    "product-image"
  ).style.backgroundImage = `url(../images/${banner[index]})`;
}

// ----------------------------------------------------
// STOP BUBBLING ON CART
document.getElementById("cart").addEventListener("click", function (e) {
  e.stopPropagation();
});

// CLOSE THE CART WINDOW
function closeCart() {
  document.getElementById("cart-window").style.display = "none";
}

function openCart() {
  document.getElementById("cart-window").style.display = "block";
}

// ----------------------------
var params = {};
location.search
  .slice(1)
  .split("&")
  .forEach(function (pair) {
    pair = pair.split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  });
console.log(params);
