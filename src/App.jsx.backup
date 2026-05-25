import { useEffect, useMemo, useRef, useState } from "react";
import { MUSIC_SOURCE, RSVP_ENDPOINT } from "./config.js";

const weddingDate = new Date("2026-08-26T09:10:00+05:30");
const saveDateVideoUrl = "/Wedding Save the Date Video.mp4";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding detail placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding couple placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    alt: "Invitation card placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding flowers placeholder",
  },
];

const timelineItems = [
  {
    icon: "flower-2",
    time: "Morning",
    title: "Guest Arrival",
    description: "A warm welcome as family and friends gather for the celebration.",
  },
  {
    icon: "heart-handshake",
    time: "9.10 AM",
    title: "Poruwa Ceremony",
    description: "The traditional ceremony begins with blessings, grace, and love.",
  },
  {
    icon: "sparkles",
    time: "After Ceremony",
    title: "Wedding Celebration",
    description: "Celebrate the beginning of a beautiful new chapter together.",
  },
  {
    icon: "utensils",
    time: "Midday",
    title: "Lunch / Reception",
    description: "Share a lovingly prepared meal with our families and guests.",
  },
  {
    icon: "camera",
    time: "Afternoon",
    title: "Blessings & Photography",
    description: "Gentle memories, portraits, blessings, and a graceful farewell.",
  },
];

function getCountdown() {
  const distance = Math.max(weddingDate.getTime() - Date.now(), 0);

  return {
    days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(3, "0"),
    hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, "0"),
  };
}

function makeFloatingItems(count, type) {
  return Array.from({ length: count }, (_, index) => {
    if (type === "petal") {
      return {
        id: `${type}-${index}`,
        left: `${Math.random() * 100}%`,
        drift: `${(Math.random() * 160 - 80).toFixed(0)}px`,
        duration: `${14 + Math.random() * 10}s`,
        delay: `${Math.random() * -20}s`,
        scale: 0.6 + Math.random() * 1,
        rotation: Math.random() * 360,
        blurStart: 0 + Math.random() * 2,
      };
    }

    return {
      id: `${type}-${index}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${2.5 + Math.random() * 3.5}s`,
      delay: `${Math.random() * 4}s`,
    };
  });
}

function useLucideIcons(dependencies = []) {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, dependencies);
}

function App() {
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [introClosed, setIntroClosed] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);
  const [videoFallback, setVideoFallback] = useState(false);
  const [toast, setToast] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryAutoPlay, setGalleryAutoPlay] = useState(true);

  const musicRef = useRef(null);
  const saveDateVideoRef = useRef(null);
  const heroBackdropRef = useRef(null);
  const toastTimerRef = useRef(null);
  const galleryIntervalRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
  const petals = useMemo(() => makeFloatingItems(isMobile ? 14 : 24, "petal"), [isMobile]);
  const sparkles = useMemo(() => makeFloatingItems(isMobile ? 16 : 28, "sparkle"), [isMobile]);

  useLucideIcons([musicPlaying, submitting, introClosed]);

  useEffect(() => {
    document.body.classList.toggle("intro-active", !introClosed);
  }, [introClosed]);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setLoadingHidden(true), 650);
    const introTimer = window.setTimeout(() => closeIntro(), 5600);

    return () => {
      window.clearTimeout(loadingTimer);
      window.clearTimeout(introTimer);
    };
  }, []);

  const [guestName, setGuestName] = useState("your");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    if (nameParam) {
      // Decode and capitalize the name
      const decodedName = decodeURIComponent(nameParam).replace(/_/g, " ");
      setGuestName(decodedName + "'s");
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  // Gallery slideshow auto-advance
  useEffect(() => {
    if (!galleryAutoPlay) {
      if (galleryIntervalRef.current) {
        window.clearInterval(galleryIntervalRef.current);
        galleryIntervalRef.current = null;
      }
      return;
    }

    galleryIntervalRef.current = window.setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000); // 3 seconds per image

    return () => {
      if (galleryIntervalRef.current) {
        window.clearInterval(galleryIntervalRef.current);
      }
    };
  }, [galleryAutoPlay]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setBackToTopVisible(y > 700);

      if (heroBackdropRef.current) {
        heroBackdropRef.current.style.transform = `translateY(${Math.min(y * 0.04, 32)}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 4200);
  }

  function closeIntro() {
    setIntroClosed(true);
    setEnvelopeOpened(true);
    document.querySelector("#save-date")?.scrollIntoView({ behavior: "smooth", block: "start" });
    saveDateVideoRef.current?.play().catch(() => {});
    
    // Auto-play music when envelope opens (with user gesture handled by browser)
    if (musicRef.current && MUSIC_SOURCE && musicRef.current.paused) {
      musicRef.current.play().catch(() => {
        // Fallback: Let user tap music button to start
        console.log("Auto-play blocked, user can tap music button to start");
      });
      setMusicPlaying(true);
    }
  }

  async function toggleMusic() {
    if (!MUSIC_SOURCE) {
      showToast("Music is ready. Add a music file path in src/config.js first.");
      return;
    }

    if (!musicRef.current) return;

    if (musicRef.current.paused) {
      try {
        await musicRef.current.play();
        setMusicPlaying(true);
      } catch (error) {
        showToast("Tap once more to allow music playback on this device.");
      }
    } else {
      musicRef.current.pause();
      setMusicPlaying(false);
    }
  }

  async function sendRsvpToGoogleSheet(payload) {
    if (!RSVP_ENDPOINT.trim().startsWith("https://script.google.com/")) {
      throw new Error("RSVP endpoint is not configured.");
    }

    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
  }

  async function handleRsvpSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") || "Guest";

    const rsvpPayload = {
      event: "Dinuka & Nimasha Wedding",
      name,
      guests: formData.get("guests"),
      attendance: formData.get("attendance"),
      message: formData.get("message"),
      submittedAt: new Date().toISOString(),
      pageUrl: window.location.href,
    };

    setSubmitting(true);

    try {
      await sendRsvpToGoogleSheet(rsvpPayload);
      console.info("RSVP submission sent", rsvpPayload);
      showToast(`Thank you, ${name}. Your RSVP has been sent.`);
      form.reset();
    } catch (error) {
      console.error("RSVP submission failed", error);
      showToast("RSVP is not connected yet. Check your Apps Script URL in src/config.js.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={`loading-screen ${loadingHidden ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loading-mark">D &amp; N</div>
        <div className="loading-line"></div>
      </div>

      <audio ref={musicRef} loop preload="none" src={MUSIC_SOURCE || undefined}></audio>

      <button className={`utility-button music-toggle ${musicPlaying ? "is-playing" : ""}`} type="button" onClick={toggleMusic} aria-label="Toggle background music" title="Toggle music">
        <i data-lucide={musicPlaying ? "volume-2" : "volume-x"} aria-hidden="true"></i>
        <span>Music</span>
      </button>

      <button className={`utility-button back-to-top ${backToTopVisible ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" title="Back to top">
        <i data-lucide="arrow-up" aria-hidden="true"></i>
        <span>Top</span>
      </button>

      <div className="petal-field" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              "--drift": petal.drift,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              transform: `scale(${petal.scale})`,
            }}
          ></span>
        ))}
      </div>

      <div className="sparkle-field" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDuration: sparkle.duration,
              animationDelay: sparkle.delay,
            }}
          ></span>
        ))}
      </div>

      <EnvelopeIntro hidden={introClosed} onEnter={closeIntro} />

      <main>
        <SaveDateSection
          videoRef={saveDateVideoRef}
          videoFallback={videoFallback}
          onVideoError={() => setVideoFallback(true)}
        />
        <HeroSection heroBackdropRef={heroBackdropRef} guestName={guestName} />
        <CountdownSection countdown={countdown} />
        <TimelineSection />
        <LocationSection />
        <GallerySection 
          images={galleryImages} 
          currentIndex={galleryIndex}
          setCurrentIndex={setGalleryIndex}
          setAutoPlay={setGalleryAutoPlay}
          autoPlay={galleryAutoPlay}
        />
        <RsvpSection onSubmit={handleRsvpSubmit} submitting={submitting} />
        <ClosingSection />
      </main>

      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

function EnvelopeIntro({ hidden, onEnter }) {
  const handleEnvelopeClick = (e) => {
    // Only trigger on envelope element or its children
    if (e.currentTarget === e.target || e.currentTarget.contains(e.target)) {
      onEnter();
    }
  };

  return (
    <section className={`intro-envelope ${hidden ? "is-hidden" : ""}`} id="introEnvelope" aria-label="Opening wedding envelope animation">
      {/* BACKGROUND VIDEO: Plays behind the envelope. Replace with your video URL if desired. */}
      <video 
        className="envelope-bg-video" 
        autoPlay 
        muted 
        loop 
        playsInline
        preload="metadata"
      >
        <source src="/Wedding Save the Date Video.mp4" type="video/mp4" />
      </video>

      <div className="intro-copy">
        <span className="eyebrow">You are invited</span>
        <h1>Dinuka &amp; Nimasha</h1>
      </div>

      <div 
        className="envelope-stage" 
        aria-hidden="true"
        onClick={handleEnvelopeClick}
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

        {/* Subtle sparkle effects on envelope open */}
        <div className="envelope-sparkles" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`sparkle-${i}`} className="envelope-sparkle" style={{
              '--sparkle-index': i,
            }}></span>
          ))}
        </div>
      </div>

      <button className="skip-intro" type="button" onClick={onEnter}>
        Enter invitation
      </button>
    </section>
  );
}

function SaveDateSection({ videoRef, videoFallback, onVideoError }) {
  return (
    <section className="section save-date-section" id="save-date" aria-labelledby="saveDateTitle">
      <div className="section-inner save-date-inner">
        <div className="video-shell reveal">
          <div className={`video-frame ${videoFallback ? "has-fallback" : ""}`}>
            <video
              ref={videoRef}
              className="save-date-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
              onError={onVideoError}
            >
              {/* SAVE THE DATE VIDEO: Replace public/Wedding Save the Date Video.mp4 with your final save-the-date video if needed. */}
              <source src={saveDateVideoUrl} type="video/mp4" />
            </video>

            {/* FALLBACK IMAGE: Replace this URL with your save-the-date poster or invitation card image. */}
            <img
              className="video-fallback"
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80"
              alt="Soft wedding floral fallback"
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

function HeroSection({ heroBackdropRef, guestName }) {
  return (
    <section className="section hero-invitation" id="invitation" aria-labelledby="invitationTitle">
      <div className="hero-backdrop" ref={heroBackdropRef} aria-hidden="true"></div>
      <div className="section-inner invitation-grid">
        <div className="photo-wrap reveal">
          <div className="photo-bloom"></div>
          {/* COUPLE PHOTO: Replace this placeholder URL with your couple photo. */}
          <img
            src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1100&q=80"
            alt="Couple portrait placeholder"
            loading="lazy"
          />
          <div className="photo-caption">26 August 2026</div>
        </div>

        <div className="invitation-panel reveal">
          <span className="eyebrow">Together with their families</span>
          <p>We are delighted to invite you</p>
          <h2 id="invitationTitle">Dinuka &amp; Nimasha</h2>
          <p>Request the honour of <strong>{guestName}</strong> presence</p>
          <div className="floral-divider" aria-hidden="true">
            <span className="divider-line"></span>
            <span className="divider-icon">❀</span>
            <span className="divider-line"></span>
          </div>
          <div className="invitation-details">
            <span>Poruwa ceremony at 9.10 AM</span>
            <span>Capital City Hotel, Badulla</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountdownSection({ countdown }) {
  return (
    <section className="section countdown-section" id="countdown" aria-labelledby="countdownTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Counting every moment</span>
          <h2 id="countdownTitle">Until We Celebrate</h2>
        </div>
        <div className="countdown-grid reveal" aria-live="polite">
          <CountCard value={countdown.days} label="Days" />
          <CountCard value={countdown.hours} label="Hours" />
          <CountCard value={countdown.minutes} label="Minutes" />
          <CountCard value={countdown.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}

function CountCard({ value, label }) {
  return (
    <div className="count-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function TimelineSection() {
  return (
    <section className="section timeline-section" id="agenda" aria-labelledby="agendaTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Wedding day</span>
          <h2 id="agendaTitle">A Gentle Timeline</h2>
          <div className="floral-divider" aria-hidden="true">
            <span className="divider-line"></span>
            <span class="divider-icon">❀</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* AGENDA: Edit, remove, or add timeline items in the timelineItems array near the top of this file. */}
        <div className="timeline">
          {timelineItems.map((item) => (
            <article className="timeline-item reveal" key={item.title}>
              <div className="timeline-icon">
                <i data-lucide={item.icon} aria-hidden="true"></i>
              </div>
              <div className="timeline-content">
                <span>{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="section location-section" id="location" aria-labelledby="locationTitle">
      <div className="section-inner location-grid">
        <div className="section-heading reveal">
          <span className="eyebrow">Venue</span>
          <h2 id="locationTitle">Capital City Hotel, Badulla</h2>
          <p>We would be honoured to welcome you at Capital City Hotel, Badulla.</p>
          <div className="button-row">
            <a
              className="premium-button"
              href="https://www.google.com/maps/search/?api=1&query=Capital%20City%20Hotel%20Badulla"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="map-pin" aria-hidden="true"></i>
              Open in Google Maps
            </a>
            <a
              className="premium-button premium-button-light"
              href="https://www.google.com/maps/dir/?api=1&destination=Capital%20City%20Hotel%20Badulla"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="navigation" aria-hidden="true"></i>
              Get Directions
            </a>
          </div>
        </div>

        <div className="map-card reveal">
          {/* GOOGLE MAP EMBED: Replace the iframe src below with your exact Google Maps embed link. */}
          <iframe
            title="Map to Capital City Hotel, Badulla"
            src="https://www.google.com/maps?q=Capital%20City%20Hotel%20Badulla&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

function GallerySection({ images, currentIndex, setCurrentIndex, setAutoPlay, autoPlay }) {
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const handleThumbClick = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="galleryTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Memories</span>
          <h2 id="galleryTitle">Our Little Gallery</h2>
        </div>

        <div className="gallery-wrapper reveal">
          {/* Main Gallery Display */}
          <div className="gallery-main-container">
            <div className="gallery-main-frame">
              {images.map((image, index) => (
                <div
                  key={image.src}
                  className={`gallery-main-item ${index === currentIndex ? 'is-active' : ''}`}
                >
                  <img src={image.src} alt={image.alt} />
                  <div className="photo-bloom" aria-hidden="true"></div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              className="gallery-arrow gallery-arrow-left"
              onClick={handlePrev}
              aria-label="Previous photo"
              title="Previous"
            >
              <i data-lucide="chevron-left" aria-hidden="true"></i>
            </button>
            <button
              className="gallery-arrow gallery-arrow-right"
              onClick={handleNext}
              aria-label="Next photo"
              title="Next"
            >
              <i data-lucide="chevron-right" aria-hidden="true"></i>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="gallery-thumbs-container">
            {images.map((image, index) => (
              <button
                key={`thumb-${index}`}
                className={`gallery-thumb ${index === currentIndex ? 'is-active' : ''}`}
                onClick={() => handleThumbClick(index)}
                aria-label={`View photo ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : undefined}
              >
                <img src={image.src} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>

          {/* Image Counter */}
          <div className="gallery-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </section>
  );
}

function RsvpSection({ onSubmit, submitting }) {
  return (
    <section className="section rsvp-section" id="rsvp" aria-labelledby="rsvpTitle">
      <div className="section-inner rsvp-grid">
        <div className="rsvp-copy reveal">
          <span className="eyebrow">RSVP</span>
          <h2 id="rsvpTitle">Please Confirm Your Attendance</h2>
          <p>Your presence will truly make this day memorable for our family.</p>
          <p>Please confirm your attendance.</p>

          <div className="contact-actions">
            <a className="premium-button" href="tel:+94769055723">
              <i data-lucide="phone" aria-hidden="true"></i>
              Call Dinuka - 076 90 55 723
            </a>
            <a className="premium-button premium-button-light" href="tel:+94703901633">
              <i data-lucide="phone" aria-hidden="true"></i>
              Call Nimasha - 070 39 01 633
            </a>
            <a className="premium-button" href="https://wa.me/94769055723" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle" aria-hidden="true"></i>
              WhatsApp Dinuka
            </a>
            <a className="premium-button premium-button-light" href="https://wa.me/94703901633" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle" aria-hidden="true"></i>
              WhatsApp Nimasha
            </a>
          </div>
        </div>

        <form className="rsvp-form reveal" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label>
            <span>Number of guests</span>
            <input type="number" name="guests" min="1" max="20" defaultValue="1" required />
          </label>

          <fieldset>
            <legend>Attendance</legend>
            <div className="attendance-options">
              <label>
                <input type="radio" name="attendance" value="Yes" defaultChecked />
                <span>Yes</span>
              </label>
              <label>
                <input type="radio" name="attendance" value="No" />
                <span>No</span>
              </label>
              <label>
                <input type="radio" name="attendance" value="Maybe" />
                <span>Maybe</span>
              </label>
            </div>
          </fieldset>

          <label>
            <span>Message</span>
            <textarea name="message" rows="5" placeholder="Leave a note for the couple"></textarea>
          </label>

          <button className="submit-button" type="submit" disabled={submitting}>
            <i data-lucide={submitting ? "loader-circle" : "send"} aria-hidden="true"></i>
            {submitting ? "Sending RSVP" : "Submit RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="section closing-section" id="closing" aria-labelledby="closingTitle">
      <div className="section-inner closing-inner reveal">
        <span className="eyebrow">With love</span>
        <h2 id="closingTitle">Dinuka &amp; Nimasha</h2>
        <p>Thank you for being part of our story.</p>
      </div>
    </section>
  );
}

export default App;
