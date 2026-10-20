
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import iphone from "../../assets/images (1).jpg";
import samsung from "../../assets/images (1).jpg";
import oneplus from "../../assets/images (2).jpg";
import vivo from "../../assets/images.jpg";

function Home() {
  const [search, setSearch] = useState("");
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json();
      })
      .then((data) => {
        setPhones(data);
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

  const extraDetails = {
    "iPhone 15": {
      oldPrice: "₹79,900",
      discount: "19% OFF",
    },
    "Samsung S25": {
      oldPrice: "₹85,000",
      discount: "12% OFF",
    },
    "OnePlus 12": {
      oldPrice: "₹64,999",
      discount: "15% OFF",
    },
    "Vivo V30": {
      oldPrice: "₹39,999",
      discount: "12% OFF",
    },
  };

  const brands = [
    {
      name: "Apple",
      tagline: "Think Different",
      className: "apple",
      image: iphone,
    },
    {
      name: "Samsung",
      tagline: "Innovation for All",
      className: "samsung",
      image: samsung,
    },
    {
      name: "OnePlus",
      tagline: "Never Settle",
      className: "oneplus",
      image: oneplus,
    },
    {
      name: "Vivo",
      tagline: "Capture Every Moment",
      className: "vivo",
      image: vivo,
    },
  ];

  const categories = [
    { icon: "📱", name: "Smartphones", text: "Explore mobile phones" },
    { icon: "🎧", name: "Audio", text: "Earbuds and headphones" },
    { icon: "⌚", name: "Smartwatches", text: "Wear your technology" },
    { icon: "🔌", name: "Accessories", text: "Chargers and more" },
  ];

  const filteredPhones = phones.filter((phone) =>
    `${phone.name} ${phone.brand}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <main className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            ✨ YOUR SMARTPHONE DESTINATION
          </span>

          <h1>
            Upgrade Your
            <br />
            <span>Tech Lifestyle.</span>
          </h1>

          <p>
            Discover your favourite smartphones, explore top brands
            and find exciting offers at Riya Mobile World.
          </p>

          <div className="hero-buttons">
            <a href="#products" className="shop-btn">
              Shop Mobiles <span>→</span>
            </a>
            <a href="#top-brands" className="hero-outline-btn">
              Explore Brands
            </a>
          </div>

          <div className="hero-highlights">
            <div>
              <strong>Top Brands</strong>
              <span>Popular smartphones</span>
            </div>
            <div>
              <strong>Great Choices</strong>
              <span>Phones for everyone</span>
            </div>
            <div>
              <strong>Easy Shopping</strong>
              <span>Browse with ease</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>
          <div className="hero-product hero-product-back">
            <img src={samsung} alt="Samsung smartphone" />
          </div>
          <div className="hero-product hero-product-front">
            <img src={iphone} alt="iPhone smartphone" />
          </div>
          <div className="hero-floating-card">
            <span>RIYA MOBILE WORLD</span>
            <strong>Find Your Next Phone!</strong>
            <a href="#products">Explore Collection →</a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="home-benefits">
        <div className="benefit-item">
          <span>🚚</span>
          <div>
            <h3>Delivery Options</h3>
            <p>Ask about delivery</p>
          </div>
        </div>
        <div className="benefit-item">
          <span>🛡️</span>
          <div>
            <h3>Quality Selection</h3>
            <p>Explore popular brands</p>
          </div>
        </div>
        <div className="benefit-item">
          <span>💳</span>
          <div>
            <h3>Easy Ordering</h3>
            <p>Simple order process</p>
          </div>
        </div>
        <div className="benefit-item">
          <span>💬</span>
          <div>
            <h3>Customer Support</h3>
            <p>We're here to help</p>
          </div>
        </div>
      </section>

      {/* TOP BRANDS */}
      <section className="top-brands-section" id="top-brands">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-label">POPULAR COLLECTION</p>
              <h2 className="section-title">
                Explore Top <span>Brands</span>
              </h2>
              <p className="section-subtitle">
                Smartphones from your favourite brands, all in one place.
              </p>
            </div>
            <a href="#products" className="view-all-link">
              Explore All →
            </a>
          </div>

          <div className="brand-grid">
            {brands.map((brand) => (
              <button
                type="button"
                className={`brand-card ${brand.className}`}
                key={brand.name}
                onClick={() => {
                  setSearch(brand.name);
                  document.getElementById("products")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <div className="brand-image-wrap">
                  <img src={brand.image} alt={brand.name} />
                </div>
                <div className="brand-info">
                  <h3>{brand.name}</h3>
                  <p>{brand.tagline}</p>
                  <span>Explore Collection →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS FROM BACKEND */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-label">HANDPICKED FOR YOU</p>
              <h2 className="section-title">
                Our Latest <span>Mobiles</span>
              </h2>
              <p className="section-subtitle">
                Find the right smartphone for your lifestyle.
              </p>
            </div>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search iPhone, Samsung, OnePlus, Vivo..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search mobiles"
            />
            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
              >
                Clear ✕
              </button>
            )}
          </div>

          {loading && <p>Loading mobiles...</p>}
          {error && <p>{error}</p>}

          {!loading && !error && (
            <div className="product-grid">
              {filteredPhones.map((phone) => {
                const details = extraDetails[phone.name] || {};
                const image = imageMap[phone.name] || iphone;
                const brand = phone.brand.toUpperCase();

                return (
                  <article className="product-card" key={phone.id}>
                    <div className="product-image-wrap">
                      <span className="product-badge">
                        {details.discount || "SPECIAL"}
                      </span>

                      <Link
                        to="/products"
                        aria-label={`View ${phone.name}`}
                        className="product-image-link"
                      >
                        <img
                          src={image}
                          alt={phone.name}
                          className="product-image"
                        />
                      </Link>

                      <span className="product-brand-chip">{brand}</span>
                    </div>

                    <div className="product-info">
                      <p className="product-brand">{brand}</p>
                      <h3>{phone.name}</h3>

                      <div className="product-rating">
                        <span>★ ★ ★ ★ ★</span>
                        <small>Popular pick</small>
                      </div>

                      <div className="product-price-row">
                        <p className="product-price">
                          ₹{Number(phone.price).toLocaleString("en-IN")}
                        </p>
                        {details.oldPrice && <del>{details.oldPrice}</del>}
                      </div>

                      <Link to="/order" className="order-btn">
                        Order Now <span>→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!loading && !error && filteredPhones.length === 0 && (
            <div className="no-results">
              <span>🔎</span>
              <h3>No mobiles found</h3>
              <p>Try another mobile name or brand.</p>
              <button onClick={() => setSearch("")}>
                Show All Mobiles
              </button>
            </div>
          )}

          <div className="products-more">
            <Link to="/products">Explore All Products →</Link>
          </div>
        </div>
      </section>

      {/* SPECIAL DEALS */}
      <section className="home-deal-banner">
        <div className="deal-content">
          <span className="deal-tag">SPECIAL DEALS</span>
          <h2>
            Big Dreams.
            <br />
            <span>Smart Choices.</span>
          </h2>
          <p>
            Explore selected smartphones and discover
            offers available in our collection.
          </p>
          <a href="#products" className="deal-btn">
            Explore Deals →
          </a>
        </div>

        <div className="deal-visual">
          <div className="deal-orbit"></div>
          <div className="deal-phone">
            <img src={oneplus} alt="Featured smartphone" />
          </div>
          <div className="deal-note">
            <span>YOUR NEXT</span>
            <strong>Favourite Phone 📱</strong>
          </div>
          <span className="deal-star">✦</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="category-section" id="categories">
        <div className="container">
          <p className="section-label">MORE TO EXPLORE</p>
          <h2 className="section-title">
            Shop by <span>Category</span>
          </h2>
          <p className="section-subtitle">
            Discover gadgets and accessories for everyday life.
          </p>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to="/products"
                className="category-card"
                key={category.name}
              >
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.text}</p>
                <span className="category-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE RIYA */}
      <section className="why-section">
        <div className="container">
          <div className="why-heading">
            <p className="section-label">THE RIYA EXPERIENCE</p>
            <h2 className="section-title">
              Why Choose <span>Us?</span>
            </h2>
            <p className="section-subtitle">
              A convenient way to explore your next smartphone.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <span>📱</span>
              <h3>Popular Brands</h3>
              <p>Explore smartphones from leading brands.</p>
            </div>
            <div className="why-card">
              <span>🏷️</span>
              <h3>Special Offers</h3>
              <p>Discover offers on selected products.</p>
            </div>
            <div className="why-card">
              <span>📦</span>
              <h3>Easy Ordering</h3>
              <p>Browse products and place your order.</p>
            </div>
            <div className="why-card">
              <span>🤝</span>
              <h3>Customer Support</h3>
              <p>Contact us whenever you need assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="home-bottom-banner">
        <div>
          <span className="bottom-banner-tag">
            YOUR NEXT UPGRADE STARTS HERE
          </span>
          <h2>Your Next Phone Is Waiting!</h2>
          <p>
            Discover smartphones, compare your choices
            and find your next favourite device.
          </p>
        </div>
        <a href="#products" className="shop-btn">
          Shop Mobiles <span>→</span>
        </a>
      </section>
    </main>
  );
}

export default Home;
