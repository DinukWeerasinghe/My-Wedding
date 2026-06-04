export function LocationSection() {
  return (
    <section className="section location-section" id="location" aria-labelledby="locationTitle">
      <div className="section-inner location-grid">
        <div className="section-heading reveal">
          <span className="eyebrow">Venue</span>
          <h2 id="locationTitle">Capital City Hotel, Badulla</h2>
          <p>We would be honoured to welcome you at Capital City Hotel, Badulla.</p>
          <div className="button-row">
            <a
              className="premium-button"
              href="https://www.google.com/maps/search/?api=1&query=Capital%20City%20Hotel%20Badulla"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="map-pin" aria-hidden="true"></i>
              Open in Google Maps
            </a>
            <a
              className="premium-button premium-button-light"
              href="https://www.google.com/maps/dir/?api=1&destination=Capital%20City%20Hotel%20Badulla"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="navigation" aria-hidden="true"></i>
              Get Directions
            </a>
          </div>
        </div>

        <div className="map-card reveal">
          <iframe
            title="Map to Capital City Hotel, Badulla"
            src="https://www.google.com/maps?q=Capital%20City%20Hotel%20Badulla&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
