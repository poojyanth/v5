import './test.css';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MyComponent = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const sectionWork = gsap.utils.toArray(".section-work");

    gsap.to(sectionWork, {
      xPercent: -100 * (sectionWork.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#work",
        pin: true,
        scrub: 1,
        markers: true,
        end: () => `+=${wrapperRef.current.offsetWidth}`
      }
    });
  }, []);

  return (
    <div>
      <section className="section" id="about"></section>
      <section className="section" id="work">
        <div ref={wrapperRef} id="wrapper-work">
          <div className="section-work">
            <h1>Work</h1>
          </div>
          <div className="section-work">
            <h1>Korw</h1>
          </div>
          <div className="section-work">
            <h1>Wrok</h1>
            <div id="trigger">giga</div>
          </div>
        </div>
      </section>
      <section className="section" id="contact">
        contact
      </section>
    </div>
  );
};

export default MyComponent;
