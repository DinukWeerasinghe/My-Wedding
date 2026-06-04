import { useEffect, useRef, useState } from "react";
import "./EnvelopeIntro.css";
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

    // Give animation timeline ample time to extend smoothly before going to the home invitation page
    setTimeout(() => {
      onEnter();
    }, 2500);
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

      {/* The isolated center circular blur vignette container */}
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

          {/* Clean rotating background flap layer */}
          <div className="envelope-flap"></div>

          {/* Securely configured on top of the front geometric flaps */}
          <div className="seal-text">
            <img src={actualSealImg} alt="Wax Seal" className="actual-seal-image" />
          </div>
        </div>
      </div>

      <div className="tap-hint">Tap the seal to open ✨</div>
    </section>
  );
}