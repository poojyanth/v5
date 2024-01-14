import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ShutterPNG from '../../Component/Images/shutter.png';

const fotoflask = {
  position: 'absolute',
  display: 'flex',
  marginBottom: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '1rem',
  width: '25vw',
  fontFamily: "'Montserrat Alternates', sans-serif",
  fontSize: '100px',
};

const Loadingcontainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

const foto = {
  display: 'flex',
  position: 'absolute',
  opacity: 0,
  justifyContent: 'center',
  alignItems: 'center',
  height: '1rem',
  width: '25vw',
  right: '150px',
};

const flask = {
  display: 'flex',
  position: 'absolute',
  opacity: 0,
  justifyContent: 'center',
  alignItems: 'center',
  height: '1rem',
  width: '25vw',
  left: '120px',
};

const LoadingAnimation2 = () => { 
  const shutterRef = useRef(null);
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    const shutter = shutterRef.current;

    var t1 = gsap.timeline({ repeat: 0 });

    if (!windowLoaded) {
      t1.to(shutter, { duration: 2, rotation: 1000, ease: 'linear' });
    }
    else{
      t1.to(shutter, { duration: 2, rotation: 1200, ease: 'linear' });
      t1.to(shutter, { duration: 2, scale: 0.7, x: '-=40', ease: 'power2.inOut' }, "-=25%");
      t1.add(() => {
        gsap.to('.Foto', { duration: 1, opacity: 1, ease: "power1.inOut" });
        gsap.to('.Flask', { duration: 1, opacity: 1, ease: 'power1.inOut' });
      });
    }

    return () => {
      t1.kill(); // Cleanup the timeline on unmount
    };
  }, [windowLoaded]);

  useEffect(() => {
    const handleWindowLoad = () => {
      setWindowLoaded(true);
    };

    window.addEventListener('load', handleWindowLoad);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  return (
    <div className='loading-container' style={Loadingcontainer}>
      <div className='shutterPNG' style={{width: '100%', height: '100%', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
        <img
          ref={shutterRef}
          src={ShutterPNG}
          alt="Shutter"
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      <div className="Fotoflask" style={fotoflask}>
        <div className='Foto' style={foto}>Fot</div>
        <div className='Flask' style={flask}>Flask</div>
      </div>
    </div>
  );
};

export default LoadingAnimation2;
