import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand flex items-center gap-2">
              <img
                src="/Logo.jpg"
                alt="ahmedsazgari logo"
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <span>
                ahmed<span>sazgari</span>
              </span>
            </Link>
            <p>
              Aerial drone & media specialist based in Helsinki, Finland.
              Crafting cinematic visuals from the sky.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Connect</h4>
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

        <div className="footer-bottom">
          <span>© 2026 ahmedsazgari. All rights reserved.</span>
          <span>
            Helsinki, Finland · <Link href="/contact">Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
