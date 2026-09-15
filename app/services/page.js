import Link from "next/link";
import FaqAccordion from "../components/FaqAccordion";

const faqItems = [
  {
    question: "Do I need a permit for drone flights in Helsinki?",
    answer:
      "I hold all necessary EU drone operator certifications and permits. For most residential and commercial shoots, no additional permits are required I handle all the paperwork and airspace clearances.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery is 3–5 business days depending on the package. The All-in-One Suite includes priority 48-hour delivery. Rush delivery is available on request for an additional fee.",
  },
  {
    question: "What equipment do you use?",
    answer:
      "I fly a DJI Mini 4 Pro with a 1/1.3-inch CMOS sensor for exceptional image quality, paired with ND filters, and a professional 360 camera for immersive virtual tours.",
  },
  {
    question: "Can you fly in bad weather?",
    answer:
      "Safety is my top priority. Flights are rescheduled free of charge in case of heavy rain, strong winds, or low visibility. I'll work with you to find the best alternative date.",
  },
  {
    question: "Do you travel outside Helsinki?",
    answer:
      "Absolutely. I regularly work across Finland and Europe. Travel costs are calculated based on distance and are quoted transparently before booking. Long-term projects get discounted rates.",
  },
  {
    question: "Who owns the final footage?",
    answer:
      "You receive full commercial usage rights to all delivered media. I retain the right to use select shots in my portfolio unless an exclusive agreement is requested.",
  },
];

export const metadata = {
  title: "Services & Pricing — ahmedsazgari | Aerial Drone Services",
  description:
    "Professional aerial drone services in Helsinki — transparent pricing and FAQ.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="section-container">
          <div className="section-header fade-up">
            <span className="section-tag">Services & Pricing</span>
            <h1 className="section-title">Transparent Packages, Premium Results</h1>
            <p className="section-subtitle">
              Clear pricing with no hidden fees. Every package includes professional
              editing, color grading, and delivery in your preferred format.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section-container">
          <div className="pricing-grid">
            <div className="pricing-card fade-up">
              <span className="market-rate">Market Rate: 150€</span>
              <h3 className="pricing-name">Starter Aerial</h3>
              <div className="pricing-price">
                <span className="currency">€</span>120
              </div>
              <p className="pricing-period">per session · ~1 hour</p>

              <ul className="pricing-features">
                <li>Up to 1 hour flight time</li>
                <li>10 edited 4K photos</li>
                <li>1 edited aerial video clip</li>
                <li>Basic color grading</li>
                <li>Delivery within 3 days</li>
                <li>Commercial usage rights</li>
              </ul>

              <Link
                href="/contact"
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book Starter Aerial
              </Link>
            </div>

            <div className="pricing-card featured fade-up">
              <span className="pricing-badge">Most Popular</span>
              <span className="market-rate">Market Rate: 210€</span>
              <h3 className="pricing-name">360 Tour</h3>
              <div className="pricing-price">
                <span className="currency">€</span>170
              </div>
              <p className="pricing-period">per location · ~2 hours</p>

              <ul className="pricing-features">
                <li>Up to 2 hours on location</li>
                <li>1 interactive 360 tour</li>
                <li>Embedded hotspots & navigation</li>
                <li>Custom branding & logo</li>
                <li>Mobile & desktop optimized</li>
                <li>Delivery within 5 days</li>
              </ul>

              <Link
                href="/contact"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book 360 Tour
              </Link>
            </div>

            <div className="pricing-card fade-up">
              <span className="market-rate">Market Rate: 380€</span>
              <h3 className="pricing-name">All-in-One Suite</h3>
              <div className="pricing-price">
                <span className="currency">€</span>300
              </div>
              <p className="pricing-period">full package · ~4 hours</p>

              <ul className="pricing-features">
                <li>Up to 4 hours on location</li>
                <li>20 edited 4K photos</li>
                <li>3 edited aerial video clips</li>
                <li>1 interactive 360 tour</li>
                <li>Social media ready reels</li>
                <li>Priority 48h delivery</li>
              </ul>

              <Link
                href="/contact"
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book All-in-One
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section">
        <div className="section-container">
          <div className="section-header fade-up">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know before booking your aerial project.
            </p>
          </div>

          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section">
        <div className="section-container text-center fade-up">
          <h2 className="section-title">Not Sure Which Package Fits?</h2>
          <p className="section-subtitle mb-4">
            Send me a message and I&apos;ll recommend the perfect solution for your project.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Get a Free Consultation →
          </Link>
        </div>
      </section>
    </>
  );
}
