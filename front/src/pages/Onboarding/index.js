import { useState, useRef, useEffect } from "react";

import "./style.scss";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Dots from "./Dots";

export default function Onboarding() {
  const [scrollIdx, setScrollIdx] = useState(1);
  const mainWrapperRef = useRef();
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
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          mainWrapperRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(3);
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
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          mainWrapperRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIdx(2);
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
      <div className="main-item">
        <Page1 />
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
