import React, { useEffect, useRef } from 'react';
import "./carasol-image.css";

const images = [
  "/assets/Image (1).jpeg",
  " /assets/image (5).png ",
  "/assets/image__4_-removebg-preview.png",
  "/assets/staff-img (1).png",
  "/assets/staff-img (2).png",
  "/assets/staff-img2.jpg",
];
 

const DualDirectionCarousel = () => {
  const forwardRef = useRef(null);
  const reverseRef = useRef(null);

  useEffect(() => {
    const scrollCarousel = (ref, direction = 'forward') => {
      const container = ref.current;
      const scrollAmount = 1;

      const scroll = () => {
        if (container) {
          if (direction === 'forward') {
            container.scrollLeft += scrollAmount;
            if (container.scrollLeft >= container.scrollWidth / 2) {
              container.scrollLeft = 0;
            }
          } else {
            container.scrollLeft -= scrollAmount;
            if (container.scrollLeft <= 0) {
              container.scrollLeft = container.scrollWidth / 2;
            }
          }
          requestAnimationFrame(scroll);
        }
      };

      requestAnimationFrame(scroll);
    };

    scrollCarousel(forwardRef, 'forward');
    scrollCarousel(reverseRef, 'reverse');
  }, []);

  const allImages = [...images, ...images];

  return (
    <div className="dual-carousel-wrapper">
      <div className="carousel-wrapper">
        <h2 className="carousel-title">Popular Career Paths</h2>
        <div className="carousel" ref={forwardRef}>
          {allImages.map((src, index) => (
            <div className="carousel-item" key={`forward-${index}`}>
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-wrapper">
        {/* <h2 className="carousel-title">Emerging Opportunities</h2> */}
        <div className="carousel" ref={reverseRef}>
          {allImages.map((src, index) => (
            <div className="carousel-item" key={`reverse-${index}`}>
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DualDirectionCarousel;
