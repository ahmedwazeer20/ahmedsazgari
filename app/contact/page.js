export const metadata = {
  title: "Contact — ahmedsazgari | Start Your Aerial Project",
  description:
    "Get in touch with ahmedsazgari for aerial drone photography, videography, 360 tours and commercial media projects in Helsinki.",
};

export default function ContactPage() {
  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="section-container">
          <div className="section-header fade-up">
            <span className="section-tag">Inquiry & Contact</span>
            <h1 className="section-title">Let&apos;s Create Something Amazing</h1>
            <p className="section-subtitle">
              Tell me about your project and I&apos;ll get back to you within 24 hours
              with a tailored proposal.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section-container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info fade-up">
              <h3>Get in Touch</h3>
              <p>
                Based in Helsinki, available for projects across Finland and Europe.
                Whether you need a single aerial shot or a full production I&apos;m here to help.
              </p>

              <div className="contact-detail">
                <div className="contact-detail-icon">📧</div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <div className="contact-detail-value">ahmedwazeer20@gmail.com</div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">📍</div>
                <div>
                  <div className="contact-detail-label">Location</div>
                  <div className="contact-detail-value">Helsinki, Finland</div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">⏱</div>
                <div>
                  <div className="contact-detail-label">Response Time</div>
                  <div className="contact-detail-value">Within 24 hours</div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">🌍</div>
                <div>
                  <div className="contact-detail-label">Service Area</div>
                  <div className="contact-detail-value">Finland & Europe</div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="footer-heading" style={{ marginBottom: "1rem" }}>
                  Follow Along
                </h4>
                <div className="footer-social">
                  <a href="#" aria-label="Portfolio">
                    📷
                  </a>
                  <a
                    href="https://youtube.com/@ahmed_sazgari?si=ldaVoXjdIiP1L0hP"
                    aria-label="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ▶
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ahmed-ali1120/"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5 1.12 1 2.5 1s2.48 1.119 2.48 2.5zM.22 8.24h4.56V23H.22V8.24zM8.19 8.24h4.37v2.01h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V23h-4.56v-6.28c0-1.5-.03-3.42-2.08-3.42-2.09 0-2.41 1.63-2.41 3.31V23H8.19V8.24z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/ahmed_sazgari/?hl=en"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4.2" />
                      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-up">
              <form
                id="contactForm"
                className="contact-form"
                action="https://formspree.io/f/mwlkzjpv"
                method="POST"
              >
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service" name="service" defaultValue="starter-aerial">
                    <option value="starter-aerial">Starter Aerial (125€)</option>
                    <option value="360-tour">360 Tour (175€)</option>
                    <option value="all-in-one">All-in-One Suite (320€)</option>
                    <option value="custom">Custom Project</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="details">Project Details *</label>
                  <textarea
                    id="details"
                    name="details"
                    placeholder="Tell me about your project location, timeline, goals, and any specific requirements..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Send Inquiry →
                </button>

                <p className="text-muted mt-2" style={{ fontSize: "0.8rem", textAlign: "center" }}>
                  Your information is kept private and never shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
