const products = [
    { id: 1, name: "Bacon Burger", price: 95, stock: 30 },
    { id: 2, name: "Burger Combo", price: 40, stock: 50 },
    { id: 3, name: "Cheese Burger", price: 120, stock: 20 },
    { id: 4, name: "Classic Burger", price: 99, stock: 20 },
    { id: 5, name: "Iced Tea", price: 20, stock: 50 },
    { id: 6, name: "Pepsi", price: 30, stock: 50 },
    { id: 7, name: "Fruit Shake", price: 35, stock: 100 },
    { id: 8, name: "Blue Lemonade", price: 25, stock: 30 },
    { id: 9, name: "Ice Cream", price: 45, stock: 50 },
    { id: 10, name: "Cake", price: 30, stock: 50 },
    { id: 11, name: "Halo-Halo", price: 60, stock: 30 },
    { id: 12, name: "Chocolate Sundae", price: 35, stock: 40 },
    ];
    

const cart = [];

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product && product.stock > 0) {
    product.stock--;
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    document.getElementById(`stock${productId}`).textContent = `In Stock: ${product.stock}`;
    alert(`${product.name} added to cart.`);
  } else {
    alert(`Sorry, ${product ? product.name : "this product"} is out of stock.`);
  }
}

function openCart() {
    const cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";
    if (cart.length === 0) {
      cartList.innerHTML = "<li>Your cart is empty.</li>";
    } else {
      cart.forEach((item, index) => {
        cartList.innerHTML += `
          <li>
            ${item.name} x${item.qty} - ₱${item.price * item.qty}
            <button onclick="increaseQty(${item.id})">+</button>
            <button onclick="decreaseQty(${item.id})">-</button>
            <button onclick="removeFromCart(${index})">Remove</button>
          </li>
        `;
      });
    }
    document.getElementById("cartModal").style.display = "block";
  }

  
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function checkout() {
    const payment = document.getElementById("paymentMethod").value;
    const cash = parseFloat(document.getElementById("cashAmount").value) || 0;
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const change = cash - total;
  
    if (cash < total) {
      alert("Not enough cash.");
      return;
    }
  
    const receipt = cart.map(item => `<p>${item.name} x${item.qty} = ₱${item.qty * item.price}</p>`).join("");
    document.getElementById("receiptContent").innerHTML = `
      ${receipt}
      <hr>
      <p><strong>Total: ₱${total}</strong></p>
      <p>Cash: ₱${cash.toFixed(2)}</p>
      <p>Change: ₱${change.toFixed(2)}</p>
      <p>Payment Method: ${payment}</p>
    `;
    document.getElementById("receipt").classList.remove("d-none");
    document.getElementById("cartModal").style.display = "none";
    cart.length = 0; 
  }
  
  function increaseQty(productId) {
    const product = products.find(p => p.id === productId);
    if (product.stock > 0) {
      product.stock--;
      const item = cart.find(i => i.id === productId);
      item.qty++;
      document.getElementById(`stock${productId}`).textContent = `In Stock: ${product.stock}`;
      openCart();
    } else {
      alert("Out of stock.");
    }
  }
  
  function decreaseQty(productId) {
    const item = cart.find(i => i.id === productId);
    const product = products.find(p => p.id === productId);
    if (item.qty > 1) {
      item.qty--;
      product.stock++;
    } else {
      removeFromCart(cart.indexOf(item));
    }
    document.getElementById(`stock${productId}`).textContent = `In Stock: ${product.stock}`;
    openCart();
  }
  
  function removeFromCart(index) {
    const item = cart[index];
    const product = products.find(p => p.id === item.id);
    product.stock += item.qty;
    cart.splice(index, 1);
    document.getElementById(`stock${item.id}`).textContent = `In Stock: ${product.stock}`;
    openCart();
  }
  

