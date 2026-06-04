import { useEffect, useRef, useState } from "react";
import "./EnvelopeIntro.css";

export function EnvelopeIntro({ hidden, onEnter, videoUrl }) {
  const videoRef = useRef(null);
  const [opening, setOpening] = useState(false);

  const guestName =
    new URLSearchParams(window.location.search).get("name");

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
    }, 2200);
  };

  return (
    <section
      className={`intro-envelope ${hidden ? "is-hidden" : ""
        } ${opening ? "is-opening" : ""}`}
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

        <span className="eyebrow">
          Together with their families
        </span>

        <h1 className="couple-name">
          Dinuka
          <span className="ampersand">&</span>
          Nimasha
        </h1>

        <p className="invitation-copy">
          Request the pleasure of your company
          <br />
          at our wedding celebration
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

            <strong>
              Dinuka &amp; Nimasha
            </strong>

            <em>26 August 2026</em>
          </div>

          <div className="envelope-front envelope-front-left"></div>
          <div className="envelope-front envelope-front-right"></div>
          <div className="envelope-front envelope-front-bottom"></div>

          <div className="envelope-flap">
            <div className="seal-text">
              D&amp;N
            </div>
          </div>

          <div className="envelope-line envelope-line-one"></div>
          <div className="envelope-line envelope-line-two"></div>
        </div>

        <div
          className="envelope-sparkles"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={`sparkle-${i}`}
              className="envelope-sparkle"
              style={{
                "--sparkle-index": i,
              }}
            />
          ))}
        </div>
      </div>

      <div className="tap-hint">
        Tap the seal to open ✨
      </div>

      <button
        className="skip-intro"
        type="button"
        onClick={handleOpen}
      >
        Open Invitation
      </button>
    </section>
  );
}