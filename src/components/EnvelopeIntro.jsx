import { useEffect, useRef, useState } from "react";
import "./EnvelopeIntro.css";
// 1. Import your downloaded seal image here (e.g., place it in your src/assets folder)
import actualSealImg from "/public/wax-seal.png";

export function EnvelopeIntro({ hidden, onEnter, videoUrl }) {
  const videoRef = useRef(null);
  const [opening, setOpening] = useState(false);

  const guestName = new URLSearchParams(window.location.search).get("name");

  useEffect(() => {
    if (hidden) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch(() => { });
    }
  }, [hidden]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    setTimeout(() => {
      onEnter();
    }, 2400);
  };

  return (
    <section
      className={`intro-envelope ${hidden ? "is-hidden" : ""} ${opening ? "is-opening" : ""}`}
      id="introEnvelope"
      aria-label="Wedding Invitation"
    >
      <video
        ref={videoRef}
        className="envelope-bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="intro-overlay" aria-hidden="true"></div>

      <div className="intro-copy">
        {guestName && (
          <div className="guest-name">
            Dear {decodeURIComponent(guestName)}
          </div>
        )}

        <h1 className="couple-name">
          Dinuka <span className="ampersand">&</span> Nimasha
        </h1>

        <p className="invitation-copy">
          Request the pleasure of your company<br />at our wedding celebration
        </p>
      </div>

      <div
        className="envelope-stage"
        onClick={handleOpen}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
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

          {/* Flap is now empty, letting it rotate cleanly */}
          <div className="envelope-flap"></div>

          {/* MOVED OUTSIDE: Seal is now on the top layer of the envelope structure */}
          <div className="seal-text">
            <img src={actualSealImg} alt="Wax Seal" className="actual-seal-image" />
          </div>
        </div>
      </div>

      <div className="tap-hint">Tap the seal to open ✨</div>
    </section>
  );
}