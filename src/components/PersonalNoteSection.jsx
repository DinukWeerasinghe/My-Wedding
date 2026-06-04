export function PersonalNoteSection() {
  return (
    <section className="section personal-note-section" id="note" aria-labelledby="noteTitle">
      <div className="section-inner note-grid reveal">
        <div className="note-image-wrap">
          <img
            src="/images/rsvp.webp"
            alt="Dinuka and Nimasha Candid Smile Portrait"
            className="note-portrait-img"
            loading="lazy"
          />
        </div>
        <div className="note-content">
          <span className="note-eyebrow">A Special Note</span>
          <h2 id="noteTitle">To Our Lovely Guests</h2>

          <p className="note-text">
            With hearts full of love and gratitude, we are so happy to celebrate this beautiful chapter of our lives with you. Your presence means more to us than words can truly express, and having you by our side makes this day even more meaningful.
          </p>
          <p className="note-text">
            Thank you for your love, your blessings, and for being part of our journey. We cannot wait to share laughter, joy, and unforgettable memories with the people who mean so much to us.
          </p>

          <div className="note-signature">
            <span className="signature-salutation">With all our love,</span>
            <div className="signature-names">Nimasha &amp; Dinuka</div>
          </div>
        </div>
      </div>
    </section>
  );
}
