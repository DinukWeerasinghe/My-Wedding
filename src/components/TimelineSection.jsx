export function TimelineSection() {
  const timelineItems = [
    { num: "01", time: "9:10 AM", title: "Ceremony Begins", desc: "A warm welcome as family and friends gather to celebrate." },
    { num: "02", time: "9:15 AM", title: "Poruwa Ceremony", desc: "Traditional ceremonial rituals begin with spiritual blessings and marital bonds." },
    { num: "03", time: "12:00 PM", title: "Lunch & Reception", desc: "Share a delicious, loving meal and capture beautiful pictures together." },
    { num: "04", time: "3:30 PM", title: "Going Away", desc: "Graceful farewell blessings as the couple prepares for their new lifetime together." },
  ];

  return (
    <section className="section timeline-section" id="agenda" aria-labelledby="agendaTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Wedding lineup</span>
          <h2 id="agendaTitle">The Wedding Lineup</h2>
        </div>

        <div className="agenda-list reveal">
          {timelineItems.map((item, idx) => (
            <article className={`agenda-row ${idx % 2 === 1 ? 'agenda-row--reverse' : ''}`} key={item.title}>
              <div className="agenda-time-wrap">
                <span className="agenda-time">{item.time}</span>
              </div>
              <div className="agenda-center">
                <span className="agenda-line"></span>
                <span className="agenda-dot"></span>
                <span className="agenda-line"></span>
              </div>
              <div className="agenda-content">
                <span className="agenda-meta">{item.num}</span>
                <h3 className="agenda-label">{item.title}</h3>
                <p className="agenda-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
