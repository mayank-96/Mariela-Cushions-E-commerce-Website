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
  let products = data
    .map(
      (product) =>
        `<div class="product-card" id="${product._id}">
          <a class="product-card-image" href="./product/product.html?id=${product._id}" >
            <img src="./images/${product.main_image}" alt="${product.name}" />
          </a>
          <p class="product-name">${product.name}</p>
          <p class="product-price">$ ${product.price} USD</p>
        </div>`
    )
    .join("");
  return products;
}

// CART======================================================================
// stop cart window bubbling ----------------------------------------------------
document.getElementById("cart").addEventListener("click", function (e) {
  e.stopPropagation();
});

// close the cart window ----------------------------------------------------
function closeCart() {
  document.getElementById("cart-window").style.display = "none";
}

// open the cart window ----------------------------------------------------
function openCart() {
  document.getElementById("cart-window").style.display = "block";
  calculateSubtotal();
}

// calculate subtotal
async function calculateSubtotal() {
  const res = await fetch("http://localhost:9000/api/cart/subtotal");
  const data = await res.json();

  if (res.ok) {
    document.getElementById("subtotal").innerHTML = `$ ${data.subtotal} USD`;
  }
}

// fetch card items --------------------------------------------------------
var cart_items;
window.addEventListener("DOMContentLoaded", async () => {
  cart_items = await getCartItems();
});

var cart_item_div = document.getElementById("cart-items");

// fetch data
async function getCartItems() {
  const res_pro = await fetch("http://localhost:9000/api/cart/");
  const res_cart = await fetch("http://localhost:9000/api/cart/cart_items");

  const data_product = await res_pro.json();
  const data_cart = await res_cart.json();

  if (res_pro.ok && res_cart.ok) {
    var card = createCartCard(data_product, data_cart);
    cart_item_div.innerHTML = card;
  }
  return data_product;
}

// create dynamic cards
function createCartCard(product, cart) {
  let cart_items = "";
  for (var i = 0; i < product.length; i++) {
    var cart_id = cart[i]._id;
    cart_items += `
      <div class="cart-item" id="${product[i]._id}">
        <div class="cart-image">
          <img src="./images/${product[i].main_image}" alt="${product[i].name}" />
        </div>
        <div class="cart-details">
          <p class="name">${product[i].name}</p>
          <p class="amount">$ ${product[i].price} USD</p>
          <p class="remove" onclick="removeItem('${cart_id}');">Remove</p>
        </div>
        <div class="quantity">
          <div class="minus-btn" onclick="changeQuantity('dec','${cart_id}');">-</div>
          <div class="quantity-value" id="quantity-value">${cart[i].quantity}</div>
          <div class="plus-btn" onclick="changeQuantity('inc','${cart_id}');">+</div>
        </div>
      </div>
      `;
  }
  return cart_items;
}

// delete cart item
async function removeItem(id) {
  let item = await fetch(`http://localhost:9000/api/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  getCartItems();
  calculateSubtotal();
}

// increment-decrement quantiy btn
async function changeQuantity(direction, id) {
  var quantity_value = document.getElementById("quantity-value");
  var quantity = parseInt(quantity_value.innerHTML);
  if (direction === "inc" && quantity >= 1) {
    quantity += 1;
  } else if (direction === "dec" && quantity >= 2) {
    quantity -= 1;
  }
  var data = {
    quantity: quantity,
  };
  let item = await fetch(`http://localhost:9000/api/cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  quantity_value.innerHTML = quantity;
  calculateSubtotal();
}
