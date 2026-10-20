
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");
const app = express();

app.use(cors());
app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Test backend
app.get("/", (req, res) => {
  res.json({
    message: "Riya Mobile World Backend is running!"
  });
});

// Get products
app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "iPhone 15", price: 65000, brand: "Apple" },
    { id: 2, name: "Samsung S25", price: 75000, brand: "Samsung" },
    { id: 3, name: "OnePlus 12", price: 55000, brand: "OnePlus" },
    { id: 4, name: "Vivo V30", price: 35000, brand: "Vivo" }
  ];

  res.json(products);
});

// Place order
app.post("/api/orders", (req, res) => {
  console.log("ORDER REQUEST RECEIVED:", req.body);

  const {
    customer_name,
    phone,
    product_name,
    quantity,
    total_amount,
    payment_method
  } = req.body;

  if (
    !customer_name ||
    !phone ||
    !product_name ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    !Number.isFinite(total_amount) ||
    total_amount <= 0 ||
    !payment_method
  ) {
    return res.status(400).json({
      message: "Please provide valid order details."
    });
  }

  try {
    const result = db.prepare(`
      INSERT INTO orders (
        customer_name,
        phone,
        product_name,
        quantity,
        total_amount,
        payment_method
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      customer_name,
      phone,
      product_name,
      quantity,
      total_amount,
      payment_method
    );

    return res.status(201).json({
      message: "Order saved successfully!",
      orderId: result.lastInsertRowid
    });
  } catch (error) {
    console.error("Order save error:", error.message);

    return res.status(500).json({
      message: "Unable to save order."
    });
  }
});

// Handle unknown routes
app.use((req, res) => {
  console.log("ROUTE NOT FOUND:", req.method, req.url);

  res.status(404).json({
    message: "Route not found",
    method: req.method,
    url: req.url
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
