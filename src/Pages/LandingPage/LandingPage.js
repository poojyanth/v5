import React, { useEffect } from 'react';
import './LandingPage.css';
import LoadingAnimation from '../../Component/LoadingAnimation/LoadingAnimation';
import LandingNavbar from '../../Component/LandingNavbar/LandingNavbar';
import { useState } from 'react';


const LandingPage = () => {
  const [showFlask, setShowFlask] = useState(true);

  const image = 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG9ncmFwaGVyJTIwcGxhbmV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
  useEffect(() => {
    const windowLoaded = () => {
      const timer = setTimeout(() => {
        setShowFlask(false);
      }, 6000); // Show Fot-img-Flask after 5 seconds

      return () => clearTimeout(timer);
    };

    window.addEventListener('load', windowLoaded);

    return () => {
      window.removeEventListener('load', windowLoaded);
    };
  }, []);

  return (
    <>
      {showFlask ? <LoadingAnimation landing={showFlask} /> : 
      <>
        <div className='LandingPage'>
          <LandingNavbar />
          <div className='LandingPageBody'>
            <div className='LandingPageBodyLeft'>
              <div className='LandingPageBodyLeftText'>
                <div className='LandingPageBodyLeftText1'>
                  <div className='LandingPageBodyLeftText1Heading'>
                    FotFlask
                  </div>
                  <div className='LandingPageBodyLeftText1SubHeading'>
                    A Social Media Platform for Photographers
                  </div>
                </div>
                <div className='LandingPageBodyLeftText2'>
                  <div className='LandingPageBodyLeftText2Heading'>
                    Share your work
                  </div>
                  <div className='LandingPageBodyLeftText2SubHeading'>
                    Share your work with the world and get feedback from the
                    community
                  </div>
                </div>
                <div className='LandingPageBodyLeftText3'>
                  <div className='LandingPageBodyLeftText3Heading'>
                    Explore
                  </div>
                  <div className='LandingPageBodyLeftText3SubHeading'>
                    Explore the work of other photographers and get inspired
                  </div>
                </div>
              </div>
            </div>
            <div className='LandingPageBodyRight'>
              <div className='LandingPageBodyRightImage'>
                <img
                  src={image}
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </>}
    </>
  );
};

export default LandingPage;
