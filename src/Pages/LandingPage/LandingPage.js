import React, { useEffect } from "react";
import "./LandingPage.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import ShutterPNG from "../../Component/Images/shutter.png";
import Image1 from "../../Component/Images/Screenshot 2024-01-14 104337.png";
import Image2 from "../../Component/Images/Screenshot 2024-01-14 104346.png";
import Image3 from "../../Component/Images/Screenshot 2024-01-14 151002.png";
import Polygon1 from "../../Component/Images/Polygon 1.svg";
import Basketball from "../../Component/Images/basketball.jpg";
import LoadingAnimation from "../../Component/LoadingAnimation/LoadingAnimation";
import LandingNavbar from "../../Component/LandingNavbar/LandingNavbar";
import LandingLoginSignup from "../../Component/LandingLoginSignup/LandingLoginSignup";
import { useState } from "react";

const LandingPage_LoadingCont = {
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
};

const fotoflask = {
  position: "absolute",
  display: "flex",
  marginBottom: "20px",
  justifyContent: "space-between",
  alignItems: "center",
  height: "1rem",
  width: "25vw",
  fontFamily: "'Montserrat Alternates', sans-serif",
  fontSize: "100px",
};

const foto = {
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  height: "1rem",
  width: "25vw",
  right: "150px",
};

const flask = {
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  height: "1rem",
  width: "25vw",
  left: "120px",
};

const landingpage_style = {
  backgroundColor: 'var(--secondary-color)',
  opacity: 0,
};

const section = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "2vh 0",
  width: "100vw",
  position: "relative",
};

const section1BGImage = {
  height: "100%",
  width: "inherit",
  background: `url(${Basketball}) no-repeat center center  `,
  backgroundSize: "cover",
  border: "none",
  margin: "2vh  3vw",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [showFlask, setShowFlask] = useState(true);
  const [showLoginContainer, setShowLoginContainer] = useState(false); // [1
  const [loginSignup, setLoginSignup] = useState(0); // [1
  const landinglogoref = useRef(null);
  const landingpageref = useRef(null);
  const navbarlogoref = useRef(null);
  const LoginContainerRef = useRef(null);
  const Section1MainTextRef = useRef(null);
  const Section1SubTextRef = useRef(null);
  const sec1PolygonRef = useRef(null);

  const image =
    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG9ncmFwaGVyJTIwcGxhbmV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80";
  useEffect(() => {
    const windowLoaded = () => {
      const timer = setTimeout(() => {
        setShowFlask(false);
      }, 6000); // Show Fot-img-Flask after 5 seconds

      return () => clearTimeout(timer);
    };

    window.addEventListener("load", windowLoaded);

    return () => {
      window.removeEventListener("load", windowLoaded);
    };
  }, []);

  var t2 = gsap.timeline({ repeat: 0 });

  useEffect(() => {
    const logo = landinglogoref.current;
    const landingpage = landingpageref.current;
    const navbarlogo = navbarlogoref.current;
    const Section1MainText = Section1MainTextRef.current;
    const Section1SubText = Section1SubTextRef.current;
    const sec1Polygon = sec1PolygonRef.current;

    t2.set(Section1MainText, { y: '+=50', opacity: 0 })
      .set(Section1SubText, { y: '+=50', opacity: 0 })
      .set(sec1Polygon, { opacity: 0 })
      .set('.Sec1LeftImage', { opacity: 0 , y: '+=50'})
    .to(logo, {      
      duration: 0.5,
      y: "-45.5vh",
      x: "-39.95vw",
      scale: 0.4,
      ease: "power1.in",
    })
      .to(
        landingpage,
        { duration: 1, opacity: 1, ease: "power2.inOut" },
        "-==0"
      )
      .to(navbarlogo, { duration: 1, opacity: 1, ease: "power2.inOut" })
      .to(sec1Polygon, { duration: 1, opacity: 0.5, ease: "power2.inOut" })
      .to(Section1MainText, { opacity: 1, y: '-=50' })
      .to('.Sec1LeftImage', { opacity: 1, y: '-=50' }, '+=0.5')
      .to(Section1SubText, { opacity: 1, y: '-=50' })
      .to(logo, { duration: 2, opacity: 0, ease: "power2.inOut" }, "+=3")
      .to(logo, { display: "none" }, "+=1");

    return () => {
      t2.kill();
    };
  }, [showFlask]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFlask(false);
    }, 7000); // Show Fot-img-Flask after 5 seconds

    return () => clearTimeout(timer);
  }, [window.location]);

  useEffect(() => {
    const landingPageElement = document.querySelector(".LandingPage");

    if (landingPageElement) {
      if (showLoginContainer) {
        t2.kill();
        landingPageElement.style.filter = "blur(5px)";
        // set html scroll to none
        document.getElementsByTagName("html")[0].style.overflowY = "hidden";
        const loginContainer = LoginContainerRef.current;
        const logo = landinglogoref.current;
        const navbarlogo = navbarlogoref.current;
        const t3 = gsap.timeline({ repeat: 0 });

        t3.to(
          navbarlogo,
          { duration: 0.001, opacity: 0, ease: "linear" },
          "-=0.1"
        )
          .to(loginContainer, {
            duration: 0.1,
            x: "-50vw",
            opacity: 0.9,
            ease: "linear",
          })
          .to(logo, {
            duration: 0.1,
            y: "0",
            x: "-20vw",
            filter: "blur(0px)",
            opacity: 1,
            display: "flex",
            zIndex: 10,
            scale: 0.8,
            ease: "power1.inOut",
          });
        return () => {
          t3.kill();
        };
      } else {
        t2.play();
        landingPageElement.style.filter = "blur(0px)";
        // set html scroll to auto
        document.getElementsByTagName("html")[0].style.overflowY = "auto";
        const loginContainer = LoginContainerRef.current;
        const logo = landinglogoref.current;
        const navbarlogo = navbarlogoref.current;

        const t3 = gsap.timeline({ repeat: 0 });
        t3.to(loginContainer, {
          duration: 0.1,
          x: "0vw",
          opacity: 0,
          ease: "linear",
        })
          .to(logo, {
            duration: 0.1,
            y: "-45.5vh",
            x: "-39.95vw",
            scale: 0.4,
            ease: "power1.inOut",
          })
          .to(navbarlogo, { duration: 0.01, opacity: 1, ease: "linear" }, "+=5")
          .to(logo, { display: "none" }, "+=0.5");
        return () => {
          t3.kill();
        };
      }
    }
  }, [showLoginContainer]);

  const handleLandingPageClick = (e) => {
    alert("LandingPage clicked");
    console.log(e.target);
    setShowLoginContainer(false);
    setLoginSignup(0);
  };

  return (
    <>
      {showFlask ? (
        <LoadingAnimation landing={showFlask} />
      ) : (
        <>
          <div
            className="LandingPage_LoadingCont"
            ref={landinglogoref}
            style={LandingPage_LoadingCont}
          >
            <div
              className="shutterPNG"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={ShutterPNG}
                alt="Shutter"
                style={{
                  width: "70px",
                  height: "70px",
                  position: "relative",
                  left: "-40px",
                }}
              />
            </div>
            <div className="Fotoflask" style={fotoflask}>
              <div className="Foto" style={foto}>
                Fot
              </div>
              <div className="Flask" style={flask}>
                Flask
              </div>
            </div>
          </div>

          <LandingLoginSignup
            LoginContainerRef={LoginContainerRef}
            loginSignup={loginSignup}
            setLoginSignup={setLoginSignup}
            setShowLoginContainer={setShowLoginContainer}
          />

          <div
            className="LandingPage"
            ref={landingpageref}
            style={landingpage_style}
          >
            <LandingNavbar
              navbarlogoref={navbarlogoref}
              setLoginSignup={setLoginSignup}
              setShowLoginContainer={setShowLoginContainer}
            />
            <div className="LandingPageBody">
              <section className="LandingPageBodySection1" style={section}>
                <div
                  className="Section1BGImage"
                  id="Section1BGImage"
                  style={section1BGImage}
                  
                >
                  <div className="LandingPageBodySection1Right">
                    <img
                      src={Image2}
                      className="Sec1LeftImage"
                      width="250px"
                      style={{ position: "absolute", top: "25%", left: "5%" }}
                      alt="LandingPageBodySection1Right"
                    />
                    <img
                      src={Image3}
                      className="Sec1LeftImage"
                      width="250px"
                      style={{ position: "absolute", top: "25%", left: "25%" }}
                      alt="LandingPageBodySection1Right"
                    />
                    <img
                      src={Image1}
                      className="Sec1LeftImage"
                      width="250px"
                      style={{ position: "absolute", top: "15%", left: "15%" }}
                      alt="LandingPageBodySection1Right"
                    />
                  </div>
                  <div
                    className="LandingPageBodySection1LeftText"
                    style={{
                      width: "50%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                    ref={sec1PolygonRef}
                      src={Polygon1}
                      style={{
                        position: "absolute",
                        opacity: "0.5",
                        width: "90%",
                        height: "79%",
                      }}
                      alt="LandingPageBodySection1Left"
                    />
                    <p ref={Section1MainTextRef}
                      className="Section1MainText"
                      style={{
                        fontFamily: "montserrat alternates",
                        zIndex: 10,
                        fontSize: "3pc",
                        color: "white",
                        margin: 0,
                      }}
                    >
                      Welcome to{" "}
                      <span style={{ fontSize: "5.5pc", fontWeight: "500" }}>
                        FotoFlask
                      </span>
                    </p>
                    <p ref={Section1SubTextRef}
                      className="Section1SubText"
                      style={{ color: "white", fontSize: "1pc", fontWeight: 500, zIndex: 10 }}
                    >
                      Where Photography Meets Community!
                    </p>
                  </div>
                </div>
              </section>
              <section className="LandingPageBodySection2" style={section}>
                <p className="Section2MainText" style={{ height: "20px" }}>
                  Section 2
                </p>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LandingPage;
