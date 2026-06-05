import "./RsvpSection.css";

export function RsvpSection({ onSubmit, submitting }) {
  return (
    <section className="section rsvp-section" id="rsvp" aria-labelledby="rsvpTitle">
      <div className="section-inner rsvp-grid">
        <div className="rsvp-copy reveal">
          <span className="eyebrow">RSVP</span>
          <h2 id="rsvpTitle">Please Confirm Your Attendance</h2>
          <p>Your presence will truly make this day memorable for our family.</p>
          <p>Kindly fill out the confirmation details below or get in touch with us directly.</p>

          <div className="contact-actions">
            <a className="premium-button" href="tel:+94769055723">
              <i data-lucide="phone" aria-hidden="true"></i>
              Call Dinuka - 076 90 55 723
            </a>
            <a className="premium-button premium-button-light" href="tel:+94703901633">
              <i data-lucide="phone" aria-hidden="true"></i>
              Call Nimasha - 070 39 01 633
            </a>
            <a className="premium-button" href="https://wa.me/94769055723" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle" aria-hidden="true"></i>
              WhatsApp Dinuka
            </a>
            <a className="premium-button premium-button-light" href="https://wa.me/94703901633" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle" aria-hidden="true"></i>
              WhatsApp Nimasha
            </a>
          </div>
        </div>

        <form className="rsvp-form reveal" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label>
            <span>Phone Number</span>
            <input type="tel" name="phone" autoComplete="tel" required placeholder="e.g. 077 123 4567" />
          </label>

          <label>
            <span>Number of guests</span>
            <input type="number" name="guests" min="1" max="20" defaultValue="1" required />
          </label>

          <fieldset>
            <legend>Attendance</legend>
            <div className="attendance-options">
              <label>
                <input type="radio" name="attendance" value="Yes" defaultChecked />
                <span>Yes, I will attend</span>
              </label>
              <label>
                <input type="radio" name="attendance" value="No" />
                <span>Sorry, I cannot come</span>
              </label>
              <label>
                <input type="radio" name="attendance" value="Maybe" />
                <span>Maybe</span>
              </label>
            </div>
          </fieldset>

          {/* 🥂 Beverage Preference */}
          <fieldset>
            <legend>
              <span className="legend-icon">🥂</span> Beverage Preference
            </legend>
            <p className="fieldset-hint">Will you be enjoying liquor at the reception?</p>
            <div className="beverage-options">
              <label className="beverage-label">
                <input type="radio" name="liquor" value="Yes, liquor" defaultChecked />
                <span className="beverage-chip">
                  <span className="beverage-emoji">🍾</span>
                  Yes, I'll have liquor
                </span>
              </label>
              <label className="beverage-label">
                <input type="radio" name="liquor" value="No, soft drinks only" />
                <span className="beverage-chip">
                  <span className="beverage-emoji">🥤</span>
                  Soft drinks only
                </span>
              </label>
            </div>
          </fieldset>

          <label>
            <span>Message</span>
            <textarea name="message" rows="4" placeholder="Leave a loving note for the couple..."></textarea>
          </label>

          <button className="submit-button" type="submit" disabled={submitting}>
            <i data-lucide={submitting ? "loader-circle" : "send"} aria-hidden="true"></i>
            {submitting ? "Sending RSVP..." : "Submit RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}
