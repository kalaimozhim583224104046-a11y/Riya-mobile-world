
import { useEffect, useState } from "react";
import "./Order.css";

const API_URL = "http://localhost:5000";

const formatPrice = (price) =>
  `₹${Number(price).toLocaleString("en-IN")}`;

function Order() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("Cash on Delivery");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) throw new Error("Products load aagala.");

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid products response.");
        }

        setProducts(data);
        if (data.length) setSelectedProduct(String(data[0].id));
      } catch (err) {
        setError(err.message || "Backend connection failed.");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  const product = products.find(
    (item) => String(item.id) === selectedProduct
  );

  const total = product ? product.price * quantity : 0;

  async function handleOrder(event) {
    event.preventDefault();
    setError("");
    setOrderId(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const customerName = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    if (!customerName || !phone || !product) {
      setError("Name, phone number, product select pannu.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Quantity minimum 1 irukkanum.");
      return;
    }

    const orderData = {
      customer_name: customerName,
      phone,
      product_name: product.name,
      quantity,
      total_amount: total,
      payment_method: payment,
    };

    try {
      setSavingOrder(true);

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `Backend JSON response tharala (HTTP ${response.status}). Server route check pannu.`
        );
      }

      if (!response.ok) {
        throw new Error(result.message || "Order save aagala.");
      }

      setOrderId(result.orderId);
      form.reset();
      setQuantity(1);
      setPayment("Cash on Delivery");

      if (products.length) {
        setSelectedProduct(String(products[0].id));
      }
    } catch (err) {
      setError(err.message || "Order submit panna mudiyala.");
    } finally {
      setSavingOrder(false);
    }
  }

  if (loadingProducts) {
    return (
      <main className="order-page">
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="order-page">
      <section className="order-hero">
        <span>RIYA MOBILE WORLD</span>
        <h1>Place Your Order</h1>
        <p>Choose your favourite mobile and order with ease.</p>
      </section>

      <div className="order-layout">
        <section className="order-card product-preview">
          <h2>📱 Your Mobile</h2>

          <div className="product-image-wrap">
            {product ? (
              <div className="order-product-placeholder">
                <span>📱</span>
                <p>{product.brand}</p>
              </div>
            ) : (
              <p>No product available</p>
            )}
          </div>

          <h3>{product?.name || "Select a mobile"}</h3>
          <p className="product-price">
            {product ? formatPrice(product.price) : "—"}
          </p>

          <label htmlFor="product">Choose Mobile</label>
          <select
            id="product"
            value={selectedProduct}
            onChange={(event) => {
              setSelectedProduct(event.target.value);
              setOrderId(null);
            }}
            required
          >
            {products.map((item) => (
              <option key={item.id} value={String(item.id)}>
                {item.name} - {formatPrice(item.price)}
              </option>
            ))}
          </select>

          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(event) => {
              const value = Number(event.target.value);
              setQuantity(
                Number.isInteger(value) && value >= 1 ? value : 1
              );
              setOrderId(null);
            }}
            required
          />

          <div className="order-total">
            <span>💰 Total Amount</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </section>

        <section className="order-card">
          <h2>📝 Customer Details</h2>

          <form onSubmit={handleOrder}>
            <label htmlFor="customer-name">Full Name</label>
            <input
              id="customer-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            <label htmlFor="customer-phone">Phone Number</label>
            <input
              id="customer-phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel"
              required
            />

            <label htmlFor="customer-email">Email</label>
            <input
              id="customer-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />

            <label htmlFor="customer-address">Delivery Address</label>
            <textarea
              id="customer-address"
              name="address"
              placeholder="Enter your delivery address"
              rows={4}
              autoComplete="street-address"
            />

            <h2>💳 Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={payment === "Cash on Delivery"}
                onChange={(event) => setPayment(event.target.value)}
              />
              💵 Cash on Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Google Pay / UPI"
                checked={payment === "Google Pay / UPI"}
                onChange={(event) => setPayment(event.target.value)}
              />
              📲 Google Pay / UPI
            </label>

            {error && (
              <p className="order-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="place-order-btn"
              disabled={savingOrder || !product}
            >
              {savingOrder ? "Saving Order..." : "Place Order"}
            </button>

            {orderId !== null && (
              <div className="order-message" role="status">
                <h3>✅ Order Placed Successfully!</h3>
                <p>Your Order ID: {orderId}</p>
                <p>Total: {formatPrice(total)}</p>
                <p>Payment: {payment}</p>
              </div>
            )}
          </form>
        </section>
      </div>

      <section className="order-card progress-card">
        <h2>📦 Order Progress</h2>

        <div className="order-progress">
          {["Order Placed", "Confirmed", "Shipped", "Delivered"].map(
            (step, index) => (
              <div
                className={`progress-step ${
                  orderId !== null && index === 0 ? "completed" : ""
                }`}
                key={step}
              >
                <span className="progress-dot">
                  {orderId !== null && index === 0 ? "✓" : index + 1}
                </span>
                <span>{step}</span>
              </div>
            )
          )}
        </div>

        <small>
          Order progress will update when the order status is updated.
        </small>
      </section>

      <footer className="order-footer">
        <h2>📱 Riya Mobile World</h2>
        <p>Your trusted destination for mobile phones.</p>
        <p className="copyright">
          © {new Date().getFullYear()} Riya Mobile World. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default Order;
