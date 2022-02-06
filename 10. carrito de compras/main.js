const db = {
  methods: {
    find: (id) => {
      return db.items.find((item) => item.id === id);
    },
    remove: (items) => {
      items.forEach((item) => {
        const product = db.methods.find(item.id);
        product.qty = product.qty - item.qty;
      });

      console.log(db);
    },
  },
  items: [
    {
      id: 0,
      title: "Funko Pop",
      price: 250,
      qty: 5,
    },
    {
      id: 1,
      title: "Harry Potter DVD",
      price: 345,
      qty: 50,
    },
    {
      id: 2,
      title: "Phillips Hue",
      price: 1300,
      qty: 80,
    },
  ],
};

const shoppingCart = {
  items: [],
  methods: {
    add: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);
      if (cartItem) {
        if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
          cartItem.qty++;
        } else {
          alert("No hay más inventario");
        }
      } else {
        shoppingCart.items.push({ id, qty });
      }
    },
    remove: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);

      if (cartItem.qty - 1 > 0) {
        cartItem.qty--;
      } else {
        shoppingCart.items = shoppingCart.items.filter(
          (item) => item.id !== id
        );
      }
    },
    count: () => {
      return shoppingCart.items.reduce((acc, item) => acc + item.qyt, 0);
    },
    get: (id) => {
      const index = shoppingCart.items.findIndex((item) => item.id === id);
      return index >= 0 ? shoppingCart.items[index] : null;
    },
    getTotal: () => {
      let total = 0;
      shoppingCart.items.forEach((item) => {
        const found = db.methods.find(item.id);
        total += found.price * item.qty;
      });
      return total;
    },
    hasInventory: (id, qty) => {
      return db.items.find((item) => item.id === id).qty - qty >= 0;
    },
    purchase: () => {
      db.methods.remove(shoppingCart.items);
    },
  },
};

renderStore();

function renderStore() {
  const html = db.items.map((item) => {
    return `
        <div class="item">
            <div class="title">${item.title}</div>
            <div class="price">${numberToCurrency(item.price)}</div>
            <div class="qty">${item.qty} units</div>
            <div class="actions"><button class="add" data-id="${
              item.id
            }">Add to the shopping cart</button></div>
        </div>`;
  });

  document.querySelector("#store-container").innerHTML = html.join("");

  document.querySelectorAll(".item .actions .add").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      const item = db.methods.find(id);

      if (item && item.qty - 1 > 0) {
        shoppingCart.methods.add(id, 1);
        console.log(db, shoppingCart);
        renderShoppingCart();
      } else {
        alert("Ya no hay existencia de ese artículo");
      }
    });
  });
}

function renderShoppingCart() {
  const html = shoppingCart.items.map((item) => {
    const dbItem = db.methods.find(item.id);
    return `
            <div class="item">
                <div class="title">${dbItem.title}</div>
                <div class="price">${numberToCurrency(dbItem.price)}</div>
                <div class="qty">${item.qty} units</div>
                <div class="subtotal">Subtotal: ${numberToCurrency(
                  item.qty * dbItem.price
                )}</div>
                <div class="actions">
                    <button class="addOne" data-id="${dbItem.id}">+</button>
                    <button class="removeOne" data-id="${dbItem.id}">-</button>
                </div>
            </div>
        `;
  });
  const closeButton = `
  <div class="cart-header">
    <button id="bClose">Close</button>
  </div>`;
  const purchaseButton =
    shoppingCart.items.length > 0
      ? `<div class="cart-actions">
    <button id="bPurchase">Terminar compra</button>
  </div>`
      : "";
  const total = shoppingCart.methods.getTotal();
  const totalDiv = `<div class="total">Total: ${numberToCurrency(total)}</div>`;
  document.querySelector("#shopping-cart-container").innerHTML =
    closeButton + html.join("") + totalDiv + purchaseButton;

  document.querySelector("#shopping-cart-container").classList.remove("hide");
  document.querySelector("#shopping-cart-container").classList.add("show");

  document.querySelectorAll(".addOne").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      shoppingCart.methods.add(id, 1);
      renderShoppingCart();
    });
  });

  document.querySelectorAll(".removeOne").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      shoppingCart.methods.remove(id, 1);
      renderShoppingCart();
    });
  });

  document.querySelector("#bClose").addEventListener("click", (e) => {
    document.querySelector("#shopping-cart-container").classList.remove("show");
    document.querySelector("#shopping-cart-container").classList.add("hide");
  });
  const bPurchase = document.querySelector("#bPurchase");
  if (bPurchase) {
    bPurchase.addEventListener("click", (e) => {
      shoppingCart.methods.purchase();
    });
  }
}

function numberToCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(n);
}
