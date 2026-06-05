// noinspection typescript.react.portability.i18next.jsx-not-internationalized
/* eslint-disable i18next/no-literal-string */
import { useEffect, useMemo, useRef, useState } from "react";
import { MUSIC_SOURCE, RSVP_ENDPOINT } from "./config.js";
import "./styles.css";

// Custom hooks
import { useLucideIcons } from "./hooks/useLucideIcons.js";

// Section Components
import { EnvelopeIntro } from "./components/EnvelopeIntro.jsx";
import { SaveDateSection } from "./components/SaveDateSection.jsx";
import { HeroSection } from "./components/HeroSection.jsx";
import { ParentsSection } from "./components/ParentsSection.jsx";
import { DetailsSection } from "./components/DetailsSection.jsx";
import { CountdownSection } from "./components/CountdownSection.jsx";
import { SeatingSection } from "./components/SeatingSection.jsx";
import { TimelineSection } from "./components/TimelineSection.jsx";
import { GallerySection } from "./components/GallerySection.jsx";
import { PersonalNoteSection } from "./components/PersonalNoteSection.jsx";
import { LocationSection } from "./components/LocationSection.jsx";
import { RsvpSection } from "./components/RsvpSection.jsx";
import { WeddingFooter } from "./components/WeddingFooter.jsx";

const weddingDate = new Date("2026-08-26T09:10:00+05:30");
const saveDateVideoUrl = "/Wedding Save the Date Video.mp4";
const introVideo = "/intro.mp4";
const SHOW_SEATING_FINDER = false; // Toggle to true to display seating finder buttons and lookup forms

// 12 Real Wedding Images from the couple's assets
const galleryImages = [
  { src: "/images/photo10.webp", alt: "Dinuka & Nimasha - Elegant Pose" },
  { src: "/images/photo11.webp", alt: "Dinuka & Nimasha - Joyful Walk" },
  { src: "/images/photo12.webp", alt: "Dinuka & Nimasha - Ring Exchange" },
  { src: "/images/photo1.webp", alt: "Dinuka & Nimasha - Studio Portrait" },
  { src: "/images/photo2.webp", alt: "Dinuka & Nimasha - Candid Smile" },
  { src: "/images/photo3.webp", alt: "Dinuka & Nimasha - Soft Gaze" },
  { src: "/images/photo4.webp", alt: "Dinuka & Nimasha - Gentle Hug" },
  { src: "/images/photo5.webp", alt: "Dinuka & Nimasha - Outdoor Romance" },
  { src: "/images/photo6.webp", alt: "Dinuka & Nimasha - Sunset Love" },
  { src: "/images/photo7.webp", alt: "Dinuka & Nimasha - Traditional Gown" },
  { src: "/images/photo8.webp", alt: "Dinuka & Nimasha - Groom Portrait" },
  { src: "/images/photo9.webp", alt: "Dinuka & Nimasha - Bride Portrait" },
];

// Preloaded seating data for Table Seating search
const seatingDatabase = [
  { name: "Dinuka Weerasinghe", table: "1", tableName: "Bridal Table" },
  { name: "Nimasha Wijesiri", table: "1", tableName: "Bridal Table" },
  { name: "Mr. Wijesiri", table: "2", tableName: "Bride's Immediate Family" },
  { name: "Mrs. Wijesiri", table: "2", tableName: "Bride's Immediate Family" },
  { name: "Mr. Weerasinghe", table: "2", tableName: "Groom's Immediate Family" },
  { name: "Mrs. Weerasinghe", table: "2", tableName: "Groom's Immediate Family" },
  { name: "Amara Wijesiri", table: "2", tableName: "Bride's Immediate Family" },
  { name: "Pathum Weerasinghe", table: "3", tableName: "Groom's Close Family" },
  { name: "Ruwan Perera", table: "4", tableName: "Groom's Best Friends" },
  { name: "Kasun Fernando", table: "4", tableName: "Groom's Best Friends" },
  { name: "Sanduni Silva", table: "5", tableName: "Bride's College Friends" },
  { name: "Sajith Jayasinghe", table: "5", tableName: "Bride's College Friends" },
  { name: "Priyantha Jayawardena", table: "6", tableName: "Groom's Relatives" },
  { name: "Malkanthi Gunawardena", table: "6", tableName: "Bride's Relatives" },
  { name: "Tharindu Edirisinghe", table: "7", tableName: "University Colleagues" },
  { name: "Dilhani Senanayake", table: "8", tableName: "Family Friends" },
];

function getCountdown() {
  const distance = Math.max(weddingDate.getTime() - Date.now(), 0);

  const daysVal = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hoursVal = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutesVal = Math.floor((distance / (1000 * 60)) % 60);
  const secondsVal = Math.floor((distance / 1000) % 60);

  return {
    days: String(daysVal).padStart(2, "0"),
    hours: String(hoursVal).padStart(2, "0"),
    minutes: String(minutesVal).padStart(2, "0"),
    seconds: String(secondsVal).padStart(2, "0"),
    // Percentages for neomorphic circular tracks
    daysPct: daysVal > 365 ? 1 : daysVal / 365,
    hoursPct: hoursVal / 24,
    minutesPct: minutesVal / 60,
    secondsPct: secondsVal / 60,
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
        scale: 0.6 + Math.random() * 0.8,
        rotation: Math.random() * 360,
        blurred: Math.random() > 0.5,
      };
    }

    if (type === "heart") {
      return {
        id: `${type}-${index}`,
        left: `${8 + Math.random() * 84}%`,
        sway: `${(Math.random() * 120 - 60).toFixed(0)}px`,
        duration: `${11 + Math.random() * 8}s`,
        delay: `${Math.random() * -14}s`,
        scale: (0.55 + Math.random() * 0.55).toFixed(2),
        opacity: (0.18 + Math.random() * 0.24).toFixed(2),
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

  // Table Seating search states
  const [seatingQuery, setSeatingQuery] = useState("");
  const [seatingResult, setSeatingResult] = useState(null);
  const [searchedName, setSearchedName] = useState("");

  // Gallery grid lightbox states
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const musicRef = useRef(null);
  const saveDateVideoRef = useRef(null);
  const heroBackdropRef = useRef(null);
  const toastTimerRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
  const petals = useMemo(() => makeFloatingItems(isMobile ? 12 : 22, "petal"), [isMobile]);
  const sparkles = useMemo(() => makeFloatingItems(isMobile ? 14 : 26, "sparkle"), [isMobile]);
  const hearts = useMemo(() => makeFloatingItems(isMobile ? 5 : 9, "heart"), [isMobile]);

  useLucideIcons([musicPlaying, submitting, introClosed, seatingResult, lightboxIndex]);

  useEffect(() => {
    document.body.classList.toggle("intro-active", !introClosed);
  }, [introClosed]);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setLoadingHidden(true), 650);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  const [guestName, setGuestName] = useState("your");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    if (nameParam) {
      const decodedName = decodeURIComponent(nameParam).replace(/_/g, " ");
      setGuestName(decodedName + "'s");
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(interval);
  }, []);

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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [introClosed]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setBackToTopVisible(y > 700);

      if (heroBackdropRef.current) {
        heroBackdropRef.current.style.transform = `translateY(${Math.min(y * 0.05, 40)}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!introClosed || !saveDateVideoRef.current) return;

    const videoElement = saveDateVideoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => { });
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElement);
    return () => {
      observer.unobserve(videoElement);
    };
  }, [introClosed]);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 4200);
  }

  function closeIntro() {
    setIntroClosed(true);
    setEnvelopeOpened(true);
    document.querySelector("#save-date")?.scrollIntoView({ behavior: "smooth", block: "start" });
    saveDateVideoRef.current?.play().catch(() => { });

    if (musicRef.current && MUSIC_SOURCE && musicRef.current.paused) {
      musicRef.current.play().catch(() => {
        console.log("Audio autoplay blocked by browser");
      });
      setMusicPlaying(true);
    }
  }

  async function toggleMusic() {
    if (!MUSIC_SOURCE) {
      showToast("Music source is ready. Set MUSIC_SOURCE path in src/config.js.");
      return;
    }

    if (!musicRef.current) return;

    if (musicRef.current.paused) {
      try {
        await musicRef.current.play();
        setMusicPlaying(true);
      } catch (error) {
        showToast("Tap once more to enable audio playback.");
      }
    } else {
      musicRef.current.pause();
      setMusicPlaying(false);
    }
  }

  // Seating search execution
  function handleSeatingSearch(e) {
    e.preventDefault();
    if (!seatingQuery.trim()) {
      showToast("Please enter your name to find your table.");
      return;
    }

    const normalizedQuery = seatingQuery.trim().toLowerCase();
    const match = seatingDatabase.find(guest => guest.name.toLowerCase().includes(normalizedQuery));

    if (match) {
      setSeatingResult(match);
      setSearchedName(match.name);
    } else {
      setSeatingResult({ notFound: true });
      setSearchedName(seatingQuery);
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
      phone: formData.get("phone"),
      guests: formData.get("guests"),
      attendance: formData.get("attendance"),
      liquor: formData.get("liquor") || "Not specified",
      message: formData.get("message"),
      submittedAt: new Date().toISOString(),
      pageUrl: window.location.href,
    };

    setSubmitting(true);

    try {
      await sendRsvpToGoogleSheet(rsvpPayload);
      showToast(`Thank you, ${name}! Your RSVP has been received.`);
      form.reset();
    } catch (error) {
      console.error("RSVP submission failed", error);
      showToast("RSVP endpoint unavailable. Check config.js connection.");
    } finally {
      setSubmitting(false);
    }
  }

  // Lightbox handlers
  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <>
      <div className={`loading-screen ${loadingHidden ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loading-mark">D &amp; N</div>
        <div className="loading-line"></div>
      </div>

      <audio ref={musicRef} loop preload="none" src={MUSIC_SOURCE || undefined}></audio>

      {/* Floating Action Audio FAB */}
      <button className={`utility-button music-toggle ${musicPlaying ? "is-playing" : ""}`} type="button" onClick={toggleMusic} aria-label="Toggle background music" title="Toggle music">
        <i data-lucide={musicPlaying ? "volume-2" : "volume-x"} aria-hidden="true"></i>
        <span>Music</span>
      </button>

      {/* Back to Top */}
      <button className={`utility-button back-to-top ${backToTopVisible ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" title="Back to top">
        <i data-lucide="arrow-up" aria-hidden="true"></i>
        <span>Top</span>
      </button>

      {/* Background Falling Petals */}
      <div className="petal-field" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className={`petal ${petal.blurred ? "petal--blurred" : ""}`}
            style={{
              left: petal.left,
              "--drift": petal.drift,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              transform: `scale(${petal.scale}) rotate(${petal.rotation}deg)`,
            }}
          ></span>
        ))}
      </div>

      {/* Background Sparkles */}
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

      {/* Background Floating Hearts */}
      <div className="heart-field" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              "--sway": heart.sway,
              "--heart-scale": heart.scale,
              "--heart-opacity": heart.opacity,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
            }}
          ></span>
        ))}
      </div>

      <EnvelopeIntro hidden={introClosed} onEnter={closeIntro} videoUrl={introVideo} />

      <main>
        {/* Section 1: Save the Date Video */}
        <SaveDateSection
          videoRef={saveDateVideoRef}
          videoFallback={videoFallback}
          onVideoError={() => setVideoFallback(true)}
          videoUrl={saveDateVideoUrl}
          introClosed={introClosed}
          isMobile={isMobile}
        />

        {/* Section 2: Hero Invitation Card */}
        <HeroSection heroBackdropRef={heroBackdropRef} guestName={guestName} showSeatingFinder={SHOW_SEATING_FINDER} />

        {/* Section 3: Parents & Family Heritage */}
        <ParentsSection />

        {/* Section 4: Celebrations Details */}
        <DetailsSection />

        {/* Section 5: Neomorphic Circular Countdown */}
        <CountdownSection countdown={countdown} />

        {/* Section 6: Interactive Seating Finder Search */}
        {SHOW_SEATING_FINDER && (
          <SeatingSection
            seatingQuery={seatingQuery}
            setSeatingQuery={setSeatingQuery}
            seatingResult={seatingResult}
            searchedName={searchedName}
            onSearch={handleSeatingSearch}
            onClear={() => { setSeatingQuery(""); setSeatingResult(null); }}
          />
        )}

        {/* Section 7: Alternate Day Lineup Timeline */}
        <TimelineSection />

        {/* Section 8: Image Grid Collage with Lightbox */}
        <GallerySection images={galleryImages} onOpenLightbox={handleOpenLightbox} />

        {/* Section 9: Personal Note to Guests */}
        <PersonalNoteSection />

        {/* Section 10: Map & Locations */}
        <LocationSection />

        {/* Section 11: RSVP Google Form Submission */}
        <RsvpSection onSubmit={handleRsvpSubmit} submitting={submitting} />
      </main>

      {/* Footer Branding section */}
      <WeddingFooter showSeatingFinder={SHOW_SEATING_FINDER} />

      {/* Fullscreen Photo Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-modal" onClick={handleCloseLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={handleCloseLightbox} aria-label="Close photo details">
            <i data-lucide="x" aria-hidden="true"></i>
          </button>

          <button className="lightbox-nav-btn lightbox-nav-left" onClick={handlePrevLightbox} aria-label="Previous photo">
            <i data-lucide="chevron-left" aria-hidden="true"></i>
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].alt} className="lightbox-img" />
            <div className="lightbox-caption">{galleryImages[lightboxIndex].alt}</div>
          </div>

          <button className="lightbox-nav-btn lightbox-nav-right" onClick={handleNextLightbox} aria-label="Next photo">
            <i data-lucide="chevron-right" aria-hidden="true"></i>
          </button>

          <div className="lightbox-counter">{lightboxIndex + 1} / {galleryImages.length}</div>
        </div>
      )}

      {/* Toast Alert Popups */}
      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

export default App;
