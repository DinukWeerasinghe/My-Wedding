import "./HeroSection.css";

export function HeroSection({ heroBackdropRef, guestName, showSeatingFinder }) {
  return (
    <section className="section hero-invitation" id="invitation" aria-labelledby="invitationTitle">
      <div className="hero-backdrop" ref={heroBackdropRef} aria-hidden="true"></div>
      <div className="section-inner invitation-grid">
        <div className="photo-wrap reveal">
          <div className="photo-bloom"></div>
          <img
            src="/images/home_photo.webp"
            alt="Dinuka & Nimasha Wedding Portrait"
            loading="lazy"
          />
          <div className="photo-caption">26 August 2026</div>
        </div>

        <div className="invitation-panel reveal">
          <span className="eyebrow">Together with their families</span>
          <p className="invite-subtitle">We are delighted to invite you</p>
          <h2 id="invitationTitle">Dinuka &amp; Nimasha</h2>
          <p className="invite-for">Request the honour of <strong>{guestName}</strong> presence</p>

          <div className="floral-divider" aria-hidden="true">
            <span className="divider-line"></span>
            <span className="divider-icon">❀</span>
            <span className="divider-line"></span>
          </div>

          <div className="invitation-details">
            <span>Poruwa Ceremony at 9.10 AM</span>
            <span>Capital City Hotel, Badulla</span>
          </div>

          <div className="hero-invite-actions">
            <a href="#rsvp" className="premium-button">
              <i data-lucide="send" aria-hidden="true"></i>
              RSVP Now
            </a>
            {showSeatingFinder && (
              <a href="#seating" className="premium-button premium-button-light">
                <i data-lucide="search" aria-hidden="true"></i>
                Find My Seat
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
