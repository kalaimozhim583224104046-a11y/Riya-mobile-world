
import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Thank you ${form.name}! Your message has been received.`);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <span className="contact-tag">WE ARE HERE FOR YOU</span>
        <h1>
          Let's Talk <span>Technology.</span>
        </h1>
        <p>
          Have a question about a phone or your order?
          Our team is ready to help you.
        </p>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <span className="contact-small-title">GET IN TOUCH</span>
          <h2>We'd love to hear from you!</h2>
          <p className="contact-description">
            Need help choosing your next smartphone?
            Send us a message and we'll help you find the right one.
          </p>

          <div className="contact-info-card">
            <div className="contact-icon">✉</div>
            <div>
              <h3>Email Us</h3>
              <p>support@riyamobileworld.com</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">☎</div>
            <div>
              <h3>Call Us</h3>
              <p>Contact our customer support team</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">📍</div>
            <div>
              <h3>Visit Our Store</h3>
              <p>RIYA MOBILE WORLD</p>
            </div>
          </div>

          <div className="contact-note">
            <span>✦</span>
            <p>Questions, feedback, or support — we're listening.</p>
          </div>
        </div>

        <div className="contact-form-card">
          <h2>Send us a message</h2>
          <p>Fill in the details below.</p>

          <form onSubmit={handleSubmit}>
            <div className="contact-input-row">
              <div className="contact-field">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label>Your Message</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit">
              Send Message <span>→</span>
            </button>
          </form>

          <div className="contact-secure">
            🔒 Your information stays private.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
