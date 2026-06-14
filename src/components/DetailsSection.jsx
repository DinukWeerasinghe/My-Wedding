import "./DetailsSection.css";

const weddingDetails = {
  date: "26 August 2026",
  time: "9:00 AM onwards",
  venue: "Capital City Hotel, Badulla",
  dressCode: "Formal Attire",
};

export function DetailsSection() {
  return (
    <section className="section details-section" id="details" aria-labelledby="detailsTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Celebration Details</span>
          <h2 id="detailsTitle">Wedding Details</h2>
        </div>

        <div className="details-grid reveal">
          <DetailCard icon="calendar" label="Date" value={weddingDetails.date} />
          <DetailCard icon="clock" label="Time" value={weddingDetails.time} />
          <DetailCard icon="map-pin" label="Venue" value={weddingDetails.venue} />
          <DetailCard icon="sparkles" label="Dress Code" value={weddingDetails.dressCode} />
        </div>

        <div className="details-note reveal">
          <p>We kindly request your RSVP by <strong>15 July 2026</strong></p>
        </div>
      </div>
    </section>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="detail-card">
      <div className="detail-icon">
        <i data-lucide={icon} aria-hidden="true"></i>
      </div>
      <div className="detail-content">
        <span className="detail-label">{label}</span>
        <strong className="detail-value">{value}</strong>
      </div>
    </div>
  );
}
