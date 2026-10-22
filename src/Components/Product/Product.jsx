
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

import iphone from "../../assets/images (1).jpg";
import samsung from "../../assets/images.jpg";
import oneplus from "../../assets/images (2).jpg";
import vivo from "../../assets/images (1).jpg";

const productData = [
  { id: 1, name: "iPhone 15", price: 65000, brand: "Apple" },
  { id: 2, name: "Samsung S25", price: 75000, brand: "Samsung" },
  { id: 3, name: "OnePlus 12", price: 55000, brand: "OnePlus" },
  { id: 4, name: "Vivo V30", price: 35000, brand: "Vivo" },
];

function Product() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productData);
    setLoading(false);
  }, []);

  const imageMap = {
    "iPhone 15": iphone,
    "Samsung S25": samsung,
    "OnePlus 12": oneplus,
    "Vivo V30": vivo,
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.brand}`
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.brand.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="product-tag">EXPLORE OUR COLLECTION</p>
        <h1>Our Products</h1>
        <p>Find the smartphone that matches your style.</p>
      </section>

      <section className="product-content">
        <h2>Discover Your Next Phone</h2>
        <p className="product-subtitle">
          Browse our mobile collection and explore prices.
        </p>

        <div className="product-controls">
          <div className="product-search">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Search mobile or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />

            {search && (
              <button type="button" onClick={() => setSearch("")}>
                Clear
              </button>
            )}
          </div>

          <select
            className="product-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by brand"
          >
            <option value="All">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Vivo">Vivo</option>
          </select>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <p className="product-count">
              Showing {filteredProducts.length} products
            </p>

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <article className="mobile-card" key={product.id}>
                    <div className="mobile-image-area">
                      <img
                        src={imageMap[product.name]}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.style.visibility = "hidden";
                        }}
                      />
                      <span className="mobile-brand">
                        {product.brand}
                      </span>
                    </div>

                    <div className="mobile-details">
                      <h3>{product.name}</h3>
                      <p className="mobile-price">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                      <Link to="/order" className="product-order-btn">
                        Order Now →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="product-empty">
                <span>📱</span>
                <h3>No products found</h3>
                <p>Try another search or brand.</p>
                <button type="button" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Product;
