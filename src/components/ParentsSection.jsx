export function ParentsSection() {
  return (
    <section className="section parents-section" id="heritage" aria-labelledby="heritageTitle">
      <div className="section-inner">
        <div className="parents-card reveal">
          <span className="eyebrow">A Union of Families</span>
          <h2 id="heritageTitle">With Love &amp; Blessings</h2>

          <div className="parents-grid">
            <div className="parents-side bride-parents">
              <span className="family-role">Bride's Family</span>
              <h3>Mr. &amp; Mrs. Wijesiri</h3>
              <p>Family of Badulla</p>
            </div>

            <div className="parents-amp" aria-hidden="true">&amp;</div>

            <div className="parents-side groom-parents">
              <span className="family-role">Groom's Family</span>
              <h3>Mr. &amp; Mrs. Weerasinghe</h3>
              <p>Family of Colombo</p>
            </div>
          </div>

          <div className="parents-note">
            <p>We invite you to share this sacred moment as our families join together in grace and celebratory harmony.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
