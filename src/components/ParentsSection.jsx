import "./ParentsSection.css";

export function ParentsSection({ guestDisplayName }) {
  return (
    <section className="section parents-section" id="heritage" aria-labelledby="inviteTitle">

      {/* Ambient glow orbs */}
      <div className="invite-orb invite-orb--1" aria-hidden="true"></div>
      <div className="invite-orb invite-orb--2" aria-hidden="true"></div>

      <div className="section-inner">
        <div className="invite-card reveal">

          {/* Animated border shimmer layer */}
          <div className="invite-border-shimmer" aria-hidden="true"></div>

          {/* Inner decorative border */}
          <div className="invite-border" aria-hidden="true">
            {/* Corner ornaments */}
            <span className="invite-corner invite-corner--tl" aria-hidden="true">✦</span>
            <span className="invite-corner invite-corner--tr" aria-hidden="true">✦</span>
            <span className="invite-corner invite-corner--bl" aria-hidden="true">✦</span>
            <span className="invite-corner invite-corner--br" aria-hidden="true">✦</span>
          </div>

          {/* Wedding rings SVG — floats gently */}
          <div className="invite-rings" aria-hidden="true">
            <svg viewBox="0 0 80 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shine rays */}
              <line x1="40" y1="2" x2="40" y2="7"  stroke="#c9a060" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="33" y1="4" x2="35" y2="8"  stroke="#c9a060" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="47" y1="4" x2="45" y2="8"  stroke="#c9a060" strokeWidth="1.2" strokeLinecap="round"/>
              {/* Left ring */}
              <circle cx="30" cy="32" r="16" stroke="url(#ringGradL)" strokeWidth="2.2" fill="none"/>
              {/* Right ring */}
              <circle cx="50" cy="32" r="16" stroke="url(#ringGradR)" strokeWidth="2.2" fill="none"/>
              {/* Diamond */}
              <polygon points="40,14 43,19 40,22 37,19" stroke="#c9a060" strokeWidth="1.4" fill="none"/>
              <defs>
                <linearGradient id="ringGradL" x1="14" y1="16" x2="46" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#dfc68a"/>
                  <stop offset="100%" stopColor="#c9a060"/>
                </linearGradient>
                <linearGradient id="ringGradR" x1="34" y1="16" x2="66" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c9a060"/>
                  <stop offset="100%" stopColor="#dfc68a"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Header */}
          <p className="invite-header" id="inviteTitle">
            We Are Delighted To Invite You
          </p>

          {/* Parents block */}
          <div className="invite-parents">
            <div className="invite-family">
              <span className="invite-family-role">The Loving Son Of</span>
              <strong className="invite-family-name">Mr. &amp; Mrs. Weerasinghe</strong>
            </div>

            <span className="invite-together">Together With</span>

            <div className="invite-family">
              <span className="invite-family-role">The Loving Daughter Of</span>
              <strong className="invite-family-name">Mr. &amp; Mrs. Wijesiri</strong>
            </div>
          </div>

          {/* Couple names */}
          <div className="invite-names-wrap">
            <span className="invite-divider-line" aria-hidden="true"></span>
            <h2 className="invite-names">Dinuka &amp; Nimasha</h2>
            <span className="invite-divider-line" aria-hidden="true"></span>
          </div>

          {/* Honour line */}
          <p className="invite-honour">Request the Honour of Your Presence</p>

          {/* Guest name — shows URL param or dotted blank line */}
          <div className={`invite-guest-line ${guestDisplayName ? "invite-guest-line--named" : ""}`}>
            <span className="invite-guest-label">Mr. &amp; Mrs. / Ms.</span>
            {guestDisplayName
              ? <span className="invite-guest-name">{guestDisplayName}</span>
              : <span className="invite-guest-dots" aria-hidden="true"></span>
            }
          </div>

          {/* Date & Venue */}
          <div className="invite-event">
            <p className="invite-date">On August 26, 2026</p>
            <p className="invite-venue">At Capital City Hotel</p>
            <p className="invite-location">Badulla</p>
          </div>

          {/* Divider with diamond */}
          <div className="invite-hr" aria-hidden="true">
            <span></span>
            <span className="invite-hr-diamond">◇</span>
            <span></span>
          </div>

          {/* Closing note */}
          <p className="invite-note">
            Your presence will truly make this day memorable for our family.
            We look forward to seeing you there.
          </p>

          {/* Ceremony time */}
          <p className="invite-ceremony">
            <em>(Poruwa Ceremony at 9:10 AM)</em>
          </p>

        </div>
      </div>
    </section>
  );
}
