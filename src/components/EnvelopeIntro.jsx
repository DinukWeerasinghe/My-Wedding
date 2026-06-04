import { useEffect, useRef } from "react";

export function EnvelopeIntro({ hidden, onEnter, videoUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (hidden) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch(() => { });
    }
  }, [hidden]);

  return (
    <section className={`intro-envelope ${hidden ? "is-hidden" : ""}`} id="introEnvelope" aria-label="Opening wedding envelope invitation">
      <video ref={videoRef} className="envelope-bg-video" autoPlay muted loop playsInline preload="metadata">
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="intro-copy">
        <span className="eyebrow">You are invited</span>
        <h1>Dinuka &amp; Nimasha</h1>
      </div>

      <div
        className="envelope-stage"
        aria-hidden="true"
        onClick={onEnter}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onEnter();
          }
        }}
      >
        <div className="envelope">
          <div className="envelope-back"></div>
          <div className="envelope-card">
            <span>Save the Date</span>
            <strong>Dinuka &amp; Nimasha</strong>
            <em>26 August 2026</em>
          </div>
          <div className="envelope-front envelope-front-left"></div>
          <div className="envelope-front envelope-front-right"></div>
          <div className="envelope-front envelope-front-bottom"></div>
          <div className="envelope-flap">
            <div className="seal-text">D&amp;N</div>
          </div>
          <div className="envelope-line envelope-line-one"></div>
          <div className="envelope-line envelope-line-two"></div>
        </div>

        <div className="envelope-sparkles" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`sparkle-${i}`} className="envelope-sparkle" style={{
              '--sparkle-index': i,
            }}></span>
          ))}
        </div>
      </div>

      <button className="skip-intro" type="button" onClick={onEnter}>
        Open Invitation
      </button>
    </section>
  );
}
