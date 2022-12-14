import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import ReactGlobe from "react-globe";

import "pages/Onboarding/style.scss";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Dots from "./Dots";
import Marker from "assets/marker.jpg";
import Earth from "assets/earthmap_color.png";
import Countrycard from "assets/country-card.jpg";
import DarkToggle from "components/DarkToggle";
import { useCallback } from "react";

export default function Onboarding() {
  const [scrollIdx, setScrollIdx] = useState(1);
  const mainWrapperRef = useRef();
  const globe = useRef();
  const marker = useRef();
  const countrycard = useRef();
  const DIVIDER_HEIGHT = 5;
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = mainWrapperRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          mainWrapperRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(2);

          if (isMobile) {
            globe.current.style.transform = "translate(-50%, 50%) scale(0.5)";
            globe.current.style.left = "50%";
          } else {
            globe.current.style.left = "70%";
            globe.current.style.transform = "translate(-50%, 50%) scale(0.9)";
          }
          globe.current.style.bottom = "50%";
          marker.current.style.opacity = 1;
          countrycard.current.style.opacity = 1;
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(3);
          globe.current.style.opacity = "0";
          marker.current.style.opacity = 0;
          countrycard.current.style.opacity = 0;
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(4);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(5);
        } else {
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 5 + DIVIDER_HEIGHT * 5,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(5);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          mainWrapperRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          mainWrapperRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(1);
          if (isMobile) {
            globe.current.style.bottom = "-50vh";
          } else {
            globe.current.style.bottom = "-65vh";
          }
          globe.current.style.transform = "translate(-50%, 0) scale(1.5)";
          globe.current.style.left = "50%";
          marker.current.style.opacity = 0;
          countrycard.current.style.opacity = 0;
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          mainWrapperRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(2);
          globe.current.style.opacity = "1";
          marker.current.style.opacity = 1;
          countrycard.current.style.opacity = 1;
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(3);
        } else {
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(4);
        }
      }
    };

    const wrapperRefCurrent = mainWrapperRef.current;
    !isMobile && wrapperRefCurrent.addEventListener("wheel", wheelHandler);

    return () => {
      wrapperRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, [isMobile]);

  const onLoginClick = () => {
    navigate("/signup");
  };

  const onTopAreaClick = useCallback(() => {
    const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

    if (scrollIdx > 1) {
      //현재 1페이지
      mainWrapperRef.current.scrollTo({
        top: pageHeight * (scrollIdx - 2) + DIVIDER_HEIGHT * (scrollIdx - 2),
        left: 0,
        behavior: "smooth",
      });
      if (scrollIdx === 2) {
        globe.current.style.bottom = "-50vh";
        globe.current.style.transform = "translate(-50%, 0) scale(1.5)";
        globe.current.style.left = "50%";
        marker.current.style.opacity = 0;
        countrycard.current.style.opacity = 0;
      } else if (scrollIdx === 3) {
        globe.current.style.opacity = "1";
        marker.current.style.opacity = 1;
        countrycard.current.style.opacity = 1;
        countrycard.current.style.right = "8%";
      }
      setScrollIdx((prev) => prev - 1);
    }
  }, [scrollIdx]);

  const onBotAreaClick = useCallback(() => {
    const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

    if (scrollIdx < 5) {
      //현재 1페이지
      mainWrapperRef.current.scrollTo({
        top: pageHeight * scrollIdx + DIVIDER_HEIGHT * scrollIdx,
        left: 0,
        behavior: "smooth",
      });

      if (scrollIdx === 1) {
        globe.current.style.transform = "translate(-50%, 50%) scale(0.5)";
        globe.current.style.left = "50%";
        globe.current.style.bottom = "50%";
        marker.current.style.opacity = 1;
        countrycard.current.style.opacity = 1;
        countrycard.current.style.right = "8%";
      } else if (scrollIdx === 2) {
        globe.current.style.opacity = "0";
        marker.current.style.opacity = 0;
        countrycard.current.style.opacity = 0;
      }

      setScrollIdx((prev) => prev + 1);
    }
  }, [scrollIdx]);

  const localStorageDark = localStorage.getItem("dark");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorageDark === null || localStorageDark === "false")
      setIsDark(false);
    else setIsDark(true);
  }, [localStorageDark]);

  return (
    <div
      className={`main-wrapper ${isDark ? "dark" : ""}`}
      ref={mainWrapperRef}
    >
      <DarkToggle isDark={isDark} setIsDark={setIsDark} />
      <button className="login-btn" onClick={onLoginClick}>
        로그인
      </button>
      <Dots scrollIdx={scrollIdx} />
      <div className="globe" ref={globe}>
        <ReactGlobe
          height="90vh"
          width="100%"
          globeBackgroundTexture={null}
          globeTexture={Earth}
          globeCloudsTexture={null}
          options={{
            enableCameraZoom: false,
            pointLightPositionRadiusScales: [1, 1, -2],
            globeGlowCoefficient: 0,
            globeGlowColor: "#96b2ff",
            globeGlowPower: 2,
            globeGlowRadiusScale: 0.07,
          }}
        />
      </div>
      <img src={Marker} alt="marker" className="marker" ref={marker} />
      <img
        src={Countrycard}
        alt="countrycard"
        className="countrycard"
        ref={countrycard}
      />
      <div className="main-item">
        <Page1
          scrollIdx={scrollIdx}
          activePage={scrollIdx === 1 ? true : false}
        />
      </div>
      <div className="divider"></div>

      <div className="main-item">
        <Page2 activePage={scrollIdx === 2 ? true : false} />
      </div>
      <div className="divider"></div>

      <div className="main-item">
        <Page3 activePage={scrollIdx === 3 ? true : false} />
      </div>
      <div className="divider"></div>

      <div className="main-item">
        <Page4 activePage={scrollIdx === 4 ? true : false} />
      </div>
      <div className="divider"></div>

      <div className="main-item">
        <Page5 activePage={scrollIdx === 5 ? true : false} />
      </div>

      {isMobile && (
        <section className="onboarding-mobile-section">
          <div
            className="onboarding-mobile-area"
            onClick={onTopAreaClick}
          ></div>
          <div
            className="onboarding-mobile-area"
            onClick={onBotAreaClick}
          ></div>
        </section>
      )}
    </div>
  );
}
