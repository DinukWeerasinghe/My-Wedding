import "./SaveDateSection.css";

export function SaveDateSection({ videoRef, videoFallback, onVideoError, videoUrl, introClosed }) {
  return (
    <section className="section save-date-section" id="save-date" aria-labelledby="saveDateTitle">
      <div className="section-inner save-date-inner">
        <div className="video-shell reveal">
          <div className={`video-frame ${videoFallback ? "has-fallback" : ""}`}>
            {introClosed && (
              <video
                ref={videoRef}
                className="save-date-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/home_photo.webp"
                onError={onVideoError}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            )}

            <img
              className="video-fallback"
              src="/images/home_photo.webp"
              alt="Dinuka and Nimasha Portrait Fallback"
              loading="lazy"
            />

            <div className="video-overlay" aria-hidden="true"></div>
            <div className="save-date-text">
              <p id="saveDateTitle">Save the Date</p>
              <h2>Dinuka &amp; Nimasha</h2>
              <span>26.08.2026</span>
            </div>
          </div>
        </div>

        <a className="scroll-indicator" href="#invitation" aria-label="Scroll to invitation">
          <span>Scroll to Continue</span>
          <i data-lucide="chevron-down" aria-hidden="true"></i>
        </a>
      </div>
    </section>
  );
}
