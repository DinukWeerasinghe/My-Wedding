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



      {/* Floating Sparkles/Particles */}
      <div className="intro-sparkles" aria-hidden="true">
        <span className="intro-sparkle"></span>
        <span className="intro-sparkle"></span>
        <span className="intro-sparkle"></span>
        <span className="intro-sparkle"></span>
        <span className="intro-sparkle"></span>
        <span className="intro-sparkle"></span>
        <span className="intro-sparkle"></span>
        <span className="intro-sparkle"></span>
      </div>

      {/* Transparent Floral Corners Frame */}


      <div className="intro-content">
        {/* Top Gold Flourish */}
        <div className="decor-container" aria-hidden="true">
          <svg className="gold-decor-line" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gold-gradient-decor" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor="#c8a86a" />
                <stop offset="50%" stopColor="#ead8b8" />
                <stop offset="80%" stopColor="#c8a86a" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d="M 10 10 L 135 10" stroke="url(#gold-gradient-decor)" strokeWidth="0.8" opacity="0.8" />
            <circle cx="150" cy="10" r="3" fill="#ead8b8" />
            <path d="M 144 10 L 140 7 L 136 10 L 140 13 Z" fill="#c8a86a" />
            <path d="M 156 10 L 160 7 L 164 10 L 160 13 Z" fill="#c8a86a" />
            <path d="M 165 10 L 290 10" stroke="url(#gold-gradient-decor)" strokeWidth="0.8" opacity="0.8" />
          </svg>
        </div>

        <div className="intro-copy">
          {guestName && (
            <div className="guest-name">
              Dear {decodeURIComponent(guestName).replace(/_/g, " ")}
            </div>
          )}

          <h1 className="couple-name">
            <div className="couple-name-first">
              Dinuka <span className="ampersand-gold">&</span>
            </div>
            <div className="couple-name-second">
              Nimasha
            </div>
          </h1>

          <p className="invitation-copy">
            Request the pleasure of your company<br />at our wedding celebration
          </p>
        </div>

        {/* Bottom Gold Flourish */}
        <div className="decor-container" aria-hidden="true">
          <svg className="gold-decor-line" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 10 L 135 10" stroke="url(#gold-gradient-decor)" strokeWidth="0.8" opacity="0.8" />
            <circle cx="150" cy="10" r="3" fill="#ead8b8" />
            <path d="M 144 10 L 140 7 L 136 10 L 140 13 Z" fill="#c8a86a" />
            <path d="M 156 10 L 160 7 L 164 10 L 160 13 Z" fill="#c8a86a" />
            <path d="M 165 10 L 290 10" stroke="url(#gold-gradient-decor)" strokeWidth="0.8" opacity="0.8" />
          </svg>
        </div>
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

      <div className="interactive-controls">
        {/* Tap Hint with Leaves */}
        <div className="tap-hint">
          <svg className="leaf-sprig left-sprig" viewBox="0 0 24 24" fill="none" stroke="#ead8b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 21C8 20 15 15 17 10M17 10C18.5 8 20 5 21 3M17 10C15.5 11.5 13 12 11 12.5M14 13.5C12 15 9.5 15.5 7.5 15.5M19 7.5C17.5 9 15 9.5 13 9.5M20.5 4.5C19 6 16.5 6.5 14.5 6.5" />
          </svg>
          <span className="tap-hint-text">Tap the seal to open</span>
          <svg className="leaf-sprig right-sprig" viewBox="0 0 24 24" fill="none" stroke="#ead8b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 21C8 20 15 15 17 10M17 10C18.5 8 20 5 21 3M17 10C15.5 11.5 13 12 11 12.5M14 13.5C12 15 9.5 15.5 7.5 15.5M19 7.5C17.5 9 15 9.5 13 9.5M20.5 4.5C19 6 16.5 6.5 14.5 6.5" />
          </svg>
        </div>

        {/* Pill Button Container with dividers */}
        <div className="open-button-container">
          <button
            className="open-invitation-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            disabled={opening}
            aria-label="Open wedding invitation"
          >
            {opening ? "Opening..." : "Open Invitation"}
          </button>
        </div>
      </div>
    </section>
  );
}