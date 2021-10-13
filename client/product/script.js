// GO TO TOP BUTTON ==============================================================
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

// TOGGLE MENU =====================================================================
function toggleMenu() {
  var menu = document.getElementById("menu").classList;
  if (menu.contains("open")) {
    menu.replace("open", "close");
  } else {
    menu.replace("close", "open");
  }
}

// STOP BUBBLING ON CART =======================================================
document.getElementById("cart").addEventListener("click", function (e) {
  e.stopPropagation();
});

// CLOSE THE CART WINDOW =======================================================
function closeCart() {
  document.getElementById("cart-window").style.display = "none";
}

function openCart() {
  document.getElementById("cart-window").style.display = "block";
}

// FETCH PRODUCT HERO IMAGE ===========================================================
// get product id
var params = {};
location.search
  .slice(1)
  .split("&")
  .forEach(function (pair) {
    pair = pair.split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  });

var hero_banner_div = document.getElementById("hero-banner-card");
var product_data;
window.addEventListener("DOMContentLoaded", async () => {
  product_data = await getHeroData(params.id);
  document.getElementById(
    "product-image"
  ).style.backgroundImage = `url(../images/${product_data.main_image})`;
});

// fetch data
async function getHeroData(id) {
  const res = await fetch(`http://localhost:9000/api/product/${id}`);
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    var card = createBannerCard(data);
    hero_banner_div.innerHTML = card;
  }
  return data;
}

// create dynamic cards
function createBannerCard(data) {
  let banner_card = `
    <div class="card">
    <div class="img-slider" id="product-image">
      <div class="banner-nav">
        <a
          href="#banner"
          class="banner-back"
          onclick="changeProductImage('back');"
        >
          <img src="../images/back.png" alt="back" />
        </a>
        <a
          href="#banner"
          class="banner-next"
          onclick="changeProductImage('next');"
        >
          <img src="../images/next.png" alt="next" />
        </a>
      </div>
    </div>
    <div class="shop">
      <div class="details">
        <p class="name">${data.name}</p>
        <p class="price">${data.price}</p>
        <p class="description">
          ${data.description}
        </p>
      </div>
      <div class="form">
        <p class="label">quantity</p>
        <form class="shop-form" action="" method="post" name="shop-form">
          <input
            class="form-styling"
            type="number"
            name="quantity"
            placeholder="1"
          />
          <div class="btn">Add to cart</div>
        </form>
      </div>
    </div>
  </div>
  `;
  return banner_card;
}

// change product image

function changeProductImage(direction) {
  const banner = [product_data.main_image, ...product_data.images];
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
