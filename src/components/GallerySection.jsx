import { useState, useEffect } from "react";

export function GallerySection({ images, onOpenLightbox }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState(null);
  const [direction, setDirection] = useState("next");
  const [animating, setAnimating] = useState(false);

  const goTo = (idx, dir) => {
    if (animating || idx === currentIndex) return;
    setAnimating(true);
    setOutgoingIndex(currentIndex);
    setCurrentIndex(idx);
    setDirection(dir);
  };

  useEffect(() => {
    if (outgoingIndex !== null) {
      const timer = setTimeout(() => {
        setOutgoingIndex(null);
        setAnimating(false);
      }, 700); // matches CSS slide animation duration
      return () => clearTimeout(timer);
    }
  }, [outgoingIndex]);

  useEffect(() => {
    if (animating) return;
    const interval = setInterval(() => {
      const nextIdx = (currentIndex + 1) % images.length;
      goTo(nextIdx, "next");
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, animating, images.length]);

  const handleNav = (idx) => {
    if (animating || idx === currentIndex) return;
    const dir = idx > currentIndex ? "next" : "prev";
    goTo(idx, dir);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    goTo(nextIdx, "next");
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    goTo(prevIdx, "prev");
  };

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="galleryTitle">
      <div className="section-inner">
        <div className="gallery-head reveal">
          <span className="eyebrow">Memories</span>
          <h2 id="galleryTitle">Moments of Love</h2>
          <div className="gallery-divider"></div>
          <p className="gallery-desc">
            Holding onto the laughter, the quiet moments, and the little sparks of magic that brought us here… every step, every dream, leading to our forever. ✨💍
          </p>
        </div>

        {/* Gallery Carousel Layout */}
        <div className="couple-gallery-container reveal">
          <div className="photo-bloom"></div>
          <div className="couple-gallery">
            <div className="gallery-main">
              {outgoingIndex !== null && (
                <img
                  src={images[outgoingIndex].src}
                  alt={images[outgoingIndex].alt}
                  className={`gallery-main-img carousel-out-${direction === "next" ? "left" : "right"}`}
                />
              )}
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                onClick={() => onOpenLightbox(currentIndex)}
                className={`gallery-main-img ${outgoingIndex !== null ? `carousel-in-${direction === "next" ? "right" : "left"}` : ""}`}
                style={outgoingIndex !== null ? { zIndex: 2 } : {}}
              />
              
              <div className="gallery-nav-arrows">
                <button
                  type="button"
                  className="gallery-arrow gallery-arrow-left"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="gallery-arrow gallery-arrow-right"
                  onClick={handleNext}
                  aria-label="Next photo"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Scrolling Thumbnails */}
            <div className="gallery-thumbs">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={`gallery-thumb ${index === currentIndex ? "active" : ""}`}
                  onClick={() => handleNav(index)}
                  aria-label={`Show photo ${index + 1}`}
                >
                  <img src={image.src} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>

            {/* Custom counter below the gallery */}
            <div className="gallery-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
