import { useState, useRef, useEffect } from "react";

import "./style.scss";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Dots from "./Dots";
import TEMP from "assets/temp.jpg";
import Marker from "assets/marker.jpg";
import Countrycard from "assets/country-card.jpg";

export default function Onboarding() {
  const [scrollIdx, setScrollIdx] = useState(1);
  const mainWrapperRef = useRef();
  const globe = useRef();
  const marker = useRef();
  const countrycard = useRef();
  const DIVIDER_HEIGHT = 5;

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = mainWrapperRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
      console.log(scrollTop);

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          mainWrapperRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(2);
          globe.current.style.bottom = "50%";
          globe.current.style.transform = "translate(-50%, 50%) scale(0.75)";
          globe.current.style.left = "70%";
          marker.current.style.opacity = 1;
          countrycard.current.style.opacity = 1;
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(3);
          globe.current.style.opacity = "0";
          marker.current.style.opacity = 0;
          countrycard.current.style.opacity = 0;
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, down");
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(3);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          mainWrapperRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          mainWrapperRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(1);
          globe.current.style.bottom = "-60vh";
          globe.current.style.transform = "translate(-50%, 0) scale(1.5)";
          globe.current.style.left = "50%";
          marker.current.style.opacity = 0;
          countrycard.current.style.opacity = 0;
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          mainWrapperRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(2);
          globe.current.style.opacity = "1";
          marker.current.style.opacity = 1;
          countrycard.current.style.opacity = 1;
        }
      }
    };

    const wrapperRefCurrent = mainWrapperRef.current;
    wrapperRefCurrent.addEventListener("wheel", wheelHandler);

    return () => {
      wrapperRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <div className="main-wrapper" ref={mainWrapperRef}>
      <Dots scrollIdx={scrollIdx} />
      <img src={TEMP} alt="" className="globe" ref={globe} />
      <img src={Marker} alt="marker" className="marker" ref={marker} />
      <img
        src={Countrycard}
        alt="countrycard"
        className="countrycard"
        ref={countrycard}
      />

      <div className="main-item">
        <Page1 scrollIdx={scrollIdx} />
      </div>
      <div className="divider"></div>
      <div className="main-item">
        <Page2 />
      </div>
      <div className="divider"></div>
      <div className="main-item">
        <Page3 />
      </div>
    </div>
  );
}
