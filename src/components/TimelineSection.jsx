import "./TimelineSection.css";

export function TimelineSection() {
  const timelineItems = [
    {
      num: "01",
      time: "9:00 AM",
      title: "Ceremony Begins",
      desc: "Doors open as loved ones arrive, filling the hall with warmth, laughter and the quiet buzz of anticipation. A moment to savour before the magic unfolds.",
      icon: "✨",
      accent: "gold",
    },
    {
      num: "02",
      time: "9:10 AM",
      title: "Poruwa Ceremony",
      desc: "Draped in tradition and sacred blessings, Dinuka and Nimasha step onto the Poruwa to unite their hearts and families in an age-old rite of love.",
      icon: "🌸",
      accent: "rose",
    },
    {
      num: "03",
      time: "11:30 AM",
      title: "Bar Is Opening",
      desc: "The celebration truly begins! Raise a glass to the happy couple — champagne, cocktails and good cheer are now flowing freely. Cheers! 🥂",
      icon: "🍾",
      accent: "gold",
    },
    {
      num: "04",
      time: "12:00 PM",
      title: "Open Lunch Buffet",
      desc: "A lavish spread prepared with love — savour every bite as you mingle, make memories and toast to a lifetime of happiness together.",
      icon: "🍽️",
      accent: "rose",
    },
    {
      num: "05",
      time: "1:30 PM",
      title: "Bar Closing",
      desc: "Last call, friends! One final toast to the newlyweds before we close the bar and move on to even more beautiful moments ahead.",
      icon: "🥤",
      accent: "gold",
    },
    {
      num: "06",
      time: "1:40 PM",
      title: "Group Photo Session",
      desc: "Gather together for timeless portraits — these are the frames that will hang on walls and warm hearts for generations to come.",
      icon: "📸",
      accent: "rose",
    },
    {
      num: "07",
      time: "2:30 PM",
      title: "Dancing Floor Opens",
      desc: "The music rises, the lights dim, and the dance floor is yours. Let your feet speak what words cannot — joy, love and pure celebration.",
      icon: "💃",
      accent: "gold",
    },
    {
      num: "08",
      time: "4:08 PM",
      title: "Couple Departs",
      desc: "As the sun begins its golden descent, Dinuka and Nimasha bid farewell — stepping hand in hand into their beautiful new chapter. With love, always.",
      icon: "🕊️",
      accent: "rose",
    },
  ];

  return (
    <section className="section timeline-section" id="agenda" aria-labelledby="agendaTitle">
      {/* Decorative background rings */}
      <div className="timeline-bg-ring timeline-bg-ring--1" aria-hidden="true"></div>
      <div className="timeline-bg-ring timeline-bg-ring--2" aria-hidden="true"></div>

      <div className="section-inner">
        <div className="section-heading timeline-heading reveal">
          <span className="eyebrow">Wedding Day Agenda</span>
          <h2 id="agendaTitle">The Wedding Lineup</h2>
          <p className="timeline-subtitle">
            Every precious moment, lovingly planned for you
          </p>
        </div>

        <div className="agenda-list">
          {/* Central spine line */}
          <div className="agenda-spine" aria-hidden="true"></div>

          {timelineItems.map((item, idx) => (
            <article
              className={`agenda-row reveal ${idx % 2 === 0 ? "agenda-row--left" : "agenda-row--right"}`}
              key={item.title}
              style={{ "--delay": `${idx * 80}ms` }}
            >
              {/* Card */}
              <div className={`agenda-card agenda-card--${item.accent}`}>
                <div className="agenda-card-header">
                  <span className="agenda-icon" aria-hidden="true">{item.icon}</span>
                  <span className="agenda-num">{item.num}</span>
                </div>
                <time className="agenda-time">{item.time}</time>
                <h3 className="agenda-label">{item.title}</h3>
                <p className="agenda-desc">{item.desc}</p>
              </div>

              {/* Central node */}
              <div className="agenda-node" aria-hidden="true">
                <span className="agenda-node-dot"></span>
                <span className="agenda-node-ring"></span>
              </div>

              {/* Spacer on the opposite side */}
              <div className="agenda-spacer" aria-hidden="true"></div>
            </article>
          ))}
        </div>

        {/* End flourish */}
        <div className="timeline-end reveal" aria-hidden="true">
          <span className="timeline-end-icon">💕</span>
          <span className="timeline-end-line"></span>
          <span className="timeline-end-text">With Love — Dinuka &amp; Nimasha</span>
          <span className="timeline-end-line"></span>
        </div>
      </div>
    </section>
  );
}
