import "./WeddingFooter.css";

export function WeddingFooter({ showSeatingFinder }) {
  return (
    <footer className="wedding-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-text">
              <p className="footer-kicker">Celebrating</p>
              <h3>Dinuka &amp; Nimasha</h3>
              <p className="footer-couple-note">26.08.2026 • Badulla</p>
            </div>
          </div>

          <div className="footer-quick-links">
            <a href="#save-date" className="footer-link">Save the Date</a>
            <a href="#invitation" className="footer-link">Invitation</a>
            <a href="#heritage" className="footer-link">Our Heritage</a>
            {showSeatingFinder && <a href="#seating" className="footer-link">Seating Search</a>}
            <a href="#gallery" className="footer-link">Photo Gallery</a>
            <a href="#rsvp" className="footer-link">Confirm RSVP</a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-contacts">
            <p>Hotlines: <a href="tel:+94769055723">+94 76 905 5723</a> • <a href="tel:+94703901633">+94 70 390 1633</a></p>
            <p>Email Support: <a href="mailto:rinixoinfo@gmail.com">rinixoinfo@gmail.com</a></p>
          </div>

          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Dinuka &amp; Nimasha. Crafted with love. Powered by <strong>RinixoSystems</strong>.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
