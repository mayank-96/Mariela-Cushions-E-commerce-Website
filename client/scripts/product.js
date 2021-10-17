// FETCH PRODUCT HERO IMAGE =========================================================

// get product id from the url
var params = {};
let present_in_cart = false;
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
  ).style.backgroundImage = `url(./images/${product_data.main_image})`;

  if (present_in_cart) {
    document.getElementById("checkout-btn").innerHTML = "Go to cart 🡪";
    document.getElementById("checkout-btn").attributes.onclick.value =
      "openCart()";
  }
});

// fetch data
async function getHeroData(id) {
  const res = await fetch(
    `https://cushion-ecommerce.herokuapp.com/api/product/${id}`
  );
  const data = await res.json();
  if (res.ok) {
    var card = await createBannerCard(data);
    hero_banner_div.innerHTML = card;
  }
  return data;
}

// create dynamic cards
async function createBannerCard(data) {
  const res = await fetch(`https://cushion-ecommerce.herokuapp.com/api/cart/`);
  const cart_data = await res.json();
  for (var item in cart_data) {
    if (params.id === cart_data[item]._id) {
      present_in_cart = true;
    }
  }

  let banner_card = `
    <div class="card">
    <div class="img-slider" id="product-image">
      <div class="banner-nav">
        <a
          href="#banner"
          class="banner-back"
          onclick="changeProductImage('back');"
        >
          <img src="./images/back.png" alt="back" />
        </a>
        <a
          href="#banner"
          class="banner-next"
          onclick="changeProductImage('next');"
        >
          <img src="./images/next.png" alt="next" />
        </a>
      </div>
    </div>
    <div class="shop">
      <div class="details">
        <p class="name">${data.name}</p>
        <p class="price">$ ${data.price} USD</p>
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
            id="quantity"
            value="1"
            min="1"
          />
          <div class="btn" id="checkout-btn" onclick="addItem('${data._id}');">Add to cart</div>
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
  ).style.backgroundImage = `url(./images/${banner[index]})`;
}

// FETCH SIMILAR PRODUCTS =========================================================
window.addEventListener("DOMContentLoaded", () => {
  getSimilarProducts(params.id);
});

var products_div = document.getElementById("similar-products");

// fetch data
async function getSimilarProducts(id) {
  const res = await fetch(
    `https://cushion-ecommerce.herokuapp.com/api/product/similar/${id}`
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
  if (params.id === product_id) {
    document.getElementById("checkout-btn").innerHTML = "Add to cart";
    document.getElementById(
      "checkout-btn"
    ).attributes.onclick.value = `addItem('${product_id}');`;
  }
  present_in_cart = false;
  getCartItems();
}

async function addItem(id) {
  var q = document.getElementById("quantity").value;
  const data = {
    product_id: id,
    quantity: q,
  };
  let item = await fetch(`https://cushion-ecommerce.herokuapp.com/api/cart/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  document.getElementById("checkout-btn").innerHTML = "Go to cart 🡪";
  document.getElementById("checkout-btn").attributes.onclick.value =
    "openCart()";
  getCartItems();
  openCart();
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
