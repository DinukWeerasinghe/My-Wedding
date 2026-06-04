export function CountdownSection({ countdown }) {
  return (
    <section className="section countdown-section" id="countdown" aria-labelledby="countdownTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Counting every moment</span>
          <h2 id="countdownTitle">Until We Celebrate</h2>
        </div>

        {/* Neomorphic circular rings row */}
        <div className="cd-neo-row reveal" aria-live="polite">
          <CircularCountCard value={countdown.days} label="Days" pct={countdown.daysPct} />
          <CircularCountCard value={countdown.hours} label="Hours" pct={countdown.hoursPct} />
          <CircularCountCard value={countdown.minutes} label="Minutes" pct={countdown.minutesPct} />
          <CircularCountCard value={countdown.seconds} label="Seconds" pct={countdown.secondsPct} />
        </div>
      </div>
    </section>
  );
}

function CircularCountCard({ value, label, pct }) {
  // SVG Calculations for circle progress track (Radius = 40, Circumference = 2 * PI * 40 = 251.2)
  const radius = 40;
  const circ = 2 * Math.PI * radius;
  const strokeOffset = circ - (pct * circ);

  return (
    <div className="ring-card" aria-label={`${value} ${label}`}>
      <div className="ring-container">
        <svg className="ring-svg" viewBox="0 0 100 100">
          <circle className="ring-track" cx="50" cy="50" r={radius} />
          <circle
            className="ring-bar"
            cx="50"
            cy="50"
            r={radius}
            strokeDasharray={circ}
            strokeDashoffset={strokeOffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="ring-inner">
          <strong className="ring-value">{value}</strong>
          <span className="ring-label">{label}</span>
        </div>
      </div>
    </div>
  );
}
