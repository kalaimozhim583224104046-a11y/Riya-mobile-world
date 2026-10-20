
import "./About.css";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-tag">GET TO KNOW US</p>
          <h1>About Riya Mobile World</h1>
          <p>
            Your trusted destination for discovering
            smartphones that connect you to what matters.
          </p>
        </div>
      </section>

      <section className="about-container">
        <div className="about-intro">
          <div className="about-icon">📱</div>
          <div>
            <h2>Who We Are</h2>
            <p>
              Welcome to Riya Mobile World! We are a mobile
              shopping website designed to help customers
              explore different smartphones, compare prices,
              and find a phone that suits their needs.
            </p>
            <p>
              From browsing mobile models to placing an order,
              our goal is to make your shopping experience
              simple, convenient, and enjoyable.
            </p>
          </div>
        </div>

        <h2 className="about-section-title">What We Aim For</h2>

        <div className="about-cards">
          <article className="about-card mission-card">
            <div className="about-card-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To make browsing smartphones and exploring
              mobile prices easy and convenient for customers.
            </p>
          </article>

          <article className="about-card vision-card">
            <div className="about-card-icon">🌟</div>
            <h3>Our Vision</h3>
            <p>
              To build a user-friendly mobile shopping
              experience with clear information and simple
              navigation.
            </p>
          </article>

          <article className="about-card values-card">
            <div className="about-card-icon">🤝</div>
            <h3>Our Values</h3>
            <p>
              We value simplicity, helpful information,
              convenient browsing, and a positive customer
              experience.
            </p>
          </article>
        </div>

        <section className="about-why">
          <h2>Why Explore Riya Mobile World?</h2>

          <div className="about-benefits">
            <div>
              <span>🔎</span>
              <p>Easy Product Search</p>
            </div>
            <div>
              <span>📱</span>
              <p>Explore Mobile Models</p>
            </div>
            <div>
              <span>💰</span>
              <p>View Product Prices</p>
            </div>
            <div>
              <span>🛍️</span>
              <p>Simple Order Navigation</p>
            </div>
          </div>
        </section>

        <div className="about-bottom">
          <h2>Find Your Next Smartphone</h2>
          <p>Explore our mobile collection and discover your options.</p>
          <a href="/products" className="about-button">
            Explore Products →
          </a>
        </div>
      </section>
    </main>
  );
}

export default About;
