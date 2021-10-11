// GO TO TOP BUTTON ------------------------------------------------------------
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

// TOGGLE MENU ------------------------------------------------------------
function toggleMenu() {
  var menu = document.getElementById("menu").classList;
  if (menu.contains("open")) {
    menu.replace("open", "close");
  } else {
    menu.replace("close", "open");
  }
}

// STOP BUBBLING ON CART ----------------------------------------------------
document.getElementById("cart").addEventListener("click", function (e) {
  e.stopPropagation();
});

// CLOSE THE CART WINDOW ----------------------------------------------------
function closeCart() {
  document.getElementById("cart-window").style.display = "none";
}

// OPEN THE CART WINDOW ----------------------------------------------------
function openCart() {
  document.getElementById("cart-window").style.display = "block";
}

// FETCH HERO IMAGE ------------------------------------------------------------
var banner_index = 0;
var all_banners;
window.addEventListener("DOMContentLoaded", async () => {
  all_banners = await getHeroImages(banner_index);
});

var hero_banner_div = document.getElementById("hero-banner-card");

// fetch data
async function getHeroImages(index) {
  const res = await fetch("http://localhost:9000/api/banner/");
  const data = await res.json();
  if (res.ok) {
    var card = createBannerCard(data[index]);
    hero_banner_div.innerHTML = card;
  }
  return data;
}

// create dynamic cards
function createBannerCard(data) {
  let banner_card = `<div class="banner-image">
  <img
    src="./images/${data.image}"
    alt="hero-image"
    id="hero-banner"
  />
</div>
<div class="banner-info">
  <p class="banner-sub">${data.title}</p>
  <p class="banner-main">${data.body}</p>
  <a href="${data.button_href_id}"
    ><p class="banner-sub underline">${data.button}</p></a
  >
</div>`;
  return banner_card;
}

// change hero banner
function changeBanner(direction) {
  if (direction === "next") {
    banner_index = (banner_index + 1) % all_banners.length;
  } else {
    banner_index = banner_index - 1;
    if (banner_index === -1) {
      banner_index = all_banners.length - 1;
    }
  }

  getHeroImages(banner_index);
}

// FETCH ALL PRODUCTS ------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  getProducts();
});

var products_div = document.getElementById("products");

// fetch data
async function getProducts() {
  const res = await fetch("http://localhost:9000/api/product/");
  const data = await res.json();
  if (res.ok) {
    var card = createProductCard(data);
    products_div.innerHTML = card;
  }
}

// create dynamic cards
function createProductCard(data) {
  console.log(data);
  let products = data
    .map(
      (product) =>
        `<div class="product-card" id="${product._id}">
          <a class="product-card-image" href="./product/product.html" >
            <img src="./images/${product.main_image}" alt="${product.name}" />
          </a>
          <p class="product-name">${product.name}</p>
          <p class="product-price">${product.price}</p>
        </div>`
    )
    .join("");
  return products;
}

// HANDLE PRODUCT ---------------------------------------------------------
