
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

import iphone from "../../assets/images (1).jpg";
import samsung from "../../assets/images.jpg";
import oneplus from "../../assets/images (2).jpg";
import vivo from "../../assets/images (1).jpg";

function Product() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Products load failed");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Products load aagala. Backend-ai check pannu.");
        setLoading(false);
      });
  }, []);

  const imageMap = {
    "iPhone 15": iphone,
    "Samsung S25": samsung,
    "OnePlus 12": oneplus,
    "Vivo V30": vivo,
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.brand}`
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
              <button
                onClick={() => setSearch("")}
                type="button"
              >
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

        {loading && <p>Loading products...</p>}

        {error && (
          <div className="product-empty">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="product-count">
              Showing {filteredProducts.length} products
            </p>

            {filteredProducts.length > 0 && (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <article className="mobile-card" key={product.id}>
                    <div className="mobile-image-area">
                      <img
                        src={imageMap[product.name] || iphone}
                        alt={product.name}
                      />

                      <span className="mobile-brand">
                        {product.brand}
                      </span>
                    </div>

                    <div className="mobile-details">
                      <h3>{product.name}</h3>

                      <p className="mobile-price">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>

                      <Link
                        to="/order"
                        className="product-order-btn"
                      >
                        Order Now →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="product-empty">
                <span>📱</span>
                <h3>No products found</h3>
                <p>
                  Search and brand filter match aagala.
                  Try another search or reset filters.
                </p>

                <button
                  onClick={resetFilters}
                  type="button"
                >
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
