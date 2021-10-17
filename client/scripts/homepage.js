// FETCH HERO IMAGE =========================================================
var banner_index = 0;
var all_banners;
window.addEventListener("DOMContentLoaded", async () => {
  all_banners = await getHeroImages(banner_index);
});

var hero_banner_div = document.getElementById("hero-banner-card");

// fetch data
async function getHeroImages(index) {
  const res = await fetch(
    "https://cushion-ecommerce.herokuapp.com/api/banner/"
  );
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

// FETCH ALL PRODUCTS =========================================================
window.addEventListener("DOMContentLoaded", () => {
  getProducts();
});

var products_div = document.getElementById("products");

// fetch data
async function getProducts() {
  const res = await fetch(
    "https://cushion-ecommerce.herokuapp.com/api/product/"
  );
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
          <a class="product-card-image" href="./product.html?id=${product._id}" >
            <img src="./images/${product.main_image}" alt="${product.name}" />
          </a>
          <p class="product-name">${product.name}</p>
          <p class="product-price">$ ${product.price} USD</p>
        </div>`
    )
    .join("");
  return products;
}

// CART =========================================================

// stop cart window bubbling
document.getElementById("cart").addEventListener("click", function (e) {
  e.stopPropagation();
});

// close the cart window
function closeCart() {
  document.getElementById("cart-window").style.display = "none";
  document.getElementById("checkout-disabled").style.display = "none";
}

// open the cart window
async function openCart() {
  document.getElementById("cart-window").style.display = "block";
  calculateSubtotal();
}

// calculate subtotal
async function calculateSubtotal() {
  const res = await fetch(
    "https://cushion-ecommerce.herokuapp.com/api/cart/subtotal"
  );
  const data = await res.json();

  if (res.ok) {
    document.getElementById("subtotal").innerHTML = `$ ${data.subtotal} USD`;
  }
}

// fetch card items
var cart_items;
window.addEventListener("DOMContentLoaded", async () => {
  cart_items = await getCartItems();
});

var cart_item_div = document.getElementById("cart-items");

// fetch data
async function getCartItems() {
  const res_pro = await fetch(
    "https://cushion-ecommerce.herokuapp.com/api/cart/"
  );
  const res_cart = await fetch(
    "https://cushion-ecommerce.herokuapp.com/api/cart/cart_items"
  );

  const data_product = await res_pro.json();
  const data_cart = await res_cart.json();

  if (res_pro.ok && res_cart.ok) {
    var card = createCartCard(data_product, data_cart);
    cart_item_div.innerHTML = card;
    calculateSubtotal();
  }
  return data_product;
}

// create dynamic cards
function createCartCard(product, cart) {
  let cart_items = "";
  for (var i = 0; i < product.length; i++) {
    var cart_id = cart[i]._id;
    var product_id = product[i]._id;
    cart_items += `
        <div class="cart-item" id="${product[i]._id}">
          <div class="cart-image">
            <img src="./images/${product[i].main_image}" alt="${product[i].name}" />
          </div>
          <div class="cart-details">
            <p class="name">${product[i].name}</p>
            <p class="amount">$ ${product[i].price} USD</p>
            <p class="remove" onclick="removeItem('${cart_id}','${product_id}');">Remove</p>
          </div>
          <div class="quantity">
            <div class="minus-btn" onclick="changeQuantity('dec','${cart_id}');">-</div> 
            <div class="quantity-value" id="${cart_id}-quantity">${cart[i].quantity}</div>
            <div class="plus-btn" onclick="changeQuantity('inc','${cart_id}');">+</div>
          </div>
        </div>
        `;
  }
  console.log(cart_items);
  return cart_items;
}

// delete cart item
async function removeItem(cart_item_id, product_id) {
  let item = await fetch(
    `https://cushion-ecommerce.herokuapp.com/api/cart/${cart_item_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  getCartItems();
}

// increment-decrement quantiy btn
async function changeQuantity(direction, id) {
  var quantity_value = document.getElementById(`${id}-quantity`);
  var quantity = parseInt(quantity_value.innerHTML);
  if (direction === "inc" && quantity >= 1) {
    quantity += 1;
  } else if (direction === "dec" && quantity >= 2) {
    quantity -= 1;
  }
  var data = {
    quantity: quantity,
  };
  let item = await fetch(
    `https://cushion-ecommerce.herokuapp.com/api/cart/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  quantity_value.innerHTML = quantity;
  calculateSubtotal();
}

// checkout disabled btn
function checkoutBtn() {
  document.getElementById("checkout-disabled").style.display = "block";
}
