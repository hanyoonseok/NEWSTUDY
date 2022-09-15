import { useCallback, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircle } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";
import NewsCard from "components/NewsCard";
import Filter from "components/Filter";
import FilterModal from "components/FilterModal";
// import Temp from "assets/temp.jpg";
import Kor from "assets/kor.jpg";
// import TrendDesign from "assets/trend-circle-design.png";

//////////////////////////////////////////////////// 지구본 관련 import
// 원근법 변환 라이브러리
// 원근법 : 3차원을 2차원으로 옮길때? 근데 왜 필요하지 2차원->3차원 아닌가..흠
import PerspectiveTransform from "./PerspectiveTransform";

// 위도나, 경도 값이 변화하는걸 알기 쉽게 보여주는 그래픽 사용자 인터페이스임
// 조작(?)한다는 느낌... 원래 코드에 오른쪽 상단에 있던거
import * as dat from "dat.gui";

// js 성능 모니터 도구
import Stats from "stats-js";

// 애니메이션 라이브러리
import { TweenMax } from "gsap/all";
import { useEffect } from "react";

export default function NationsNewsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const nations = [
    {
      eng: "SOUTH KOREA",
      kor: "대한민국",
    },
    {
      eng: "JAPAN",
      kor: "일본",
    },
    {
      eng: "SINGAPORE",
      kor: "싱가포르",
    },
    {
      eng: "UNITEDSTATE KINGDOM",
      kor: "영국",
    },
    {
      eng: "TAIWAN",
      kor: "대만",
    },
  ];

  let news = [
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
    {
      img: Kor,
      title:
        "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
      body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
      date: "Wed, September 7, 2022",
      category: "SPORTS",
      level: "c",
    },
  ];

  const onPrevClick = useCallback(() => {
    setSelectedIdx((prev) => (prev === 0 ? nations.length - 1 : prev - 1));
  }, []);

  const onNextClick = useCallback(() => {
    setSelectedIdx((prev) => (prev === nations.length - 1 ? 0 : prev + 1));
  }, []);

  const onFilterClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onCloseClick = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  //////////////////////////////////////////// 지구본

  // gui 초기 설정 값
  var config = {
    percent: 0,
    lat: 0,
    lng: 0,
    segX: 14,
    segY: 12,
    isHaloVisible: true,
    isPoleVisible: true,
    autoSpin: false,
    zoom: 0,

    skipPreloaderAnimation: false,

    goToExeter: function () {
      goTo(50.7244072, -3.583587);
    },
  };

  var stats;
  // var imgs;
  // var preloader;
  // var preloadPercent;
  var globeDoms;
  var vertices;

  var world;
  var worldBg;
  var globe;
  var globeContainer;
  var globePole;
  var globeHalo;

  var pixelExpandOffset = 1.5;
  var rX = 0;
  var rY = 0;
  var rZ = 0;
  var sinRX;
  var sinRY;
  var sinRZ;
  var cosRX;
  var cosRY;
  var cosRZ;
  var dragX;
  var dragY;
  var dragLat;
  var dragLng;

  var isMouseDown = false;
  var isTweening = false;
  var tick = 1;

  var URLS = {
    // bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_bg.jpg",
    diffuse:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_diffuse.jpg",
    halo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_halo.png",
  };

  var transformStyleName = PerspectiveTransform.transformStyleName;

  const init = () => {
    console.log("========================== init ===================");
    world = document.querySelector(".world");
    worldBg = document.querySelector(".world-bg");
    worldBg.style.backgroundImage = "url(" + URLS.bg + ")";
    globe = document.querySelector(".world-globe");
    globeContainer = document.querySelector(".world-globe-doms-container");
    globePole = document.querySelector(".world-globe-pole");
    globeHalo = document.querySelector(".world-globe-halo");
    globeHalo.style.backgroundImage = "url(" + URLS.halo + ")";

    regenerateGlobe();

    // var gui = new dat.GUI();
    // gui.add(config, "lat", -90, 90).listen();
    // gui.add(config, "lng", -180, 180).listen();
    // gui.add(config, "isHaloVisible");
    // gui.add(config, "isPoleVisible");
    // gui.add(config, "autoSpin");
    // gui.add(config, "goToExeter");
    // gui.add(config, "zoom", 0, 1).listen();

    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = 0;
    stats.domElement.style.top = 0;
    // document.body.appendChild(stats.domElement);

    // events
    world.ondragstart = function () {
      return false;
    };
    world.addEventListener("mousedown", onMouseDown);
    world.addEventListener("mousemove", onMouseMove);
    world.addEventListener("mouseup", onMouseUp);
    world.addEventListener("touchstart", touchPass(onMouseDown));
    world.addEventListener("touchmove", touchPass(onMouseMove));
    world.addEventListener("touchend", touchPass(onMouseUp));

    loop();
  };

  const touchPass = (func) => {
    console.log("========================== touchPass ===================");

    return function (evt) {
      evt.preventDefault();
      func.call(this, {
        pageX: evt.changedTouches[0].pageX,
        pageY: evt.changedTouches[0].pageY,
      });
    };
  };

  const onMouseDown = (evt) => {
    isMouseDown = true;
    dragX = evt.pageX;
    dragY = evt.pageY;
    dragLat = config.lat;
    dragLng = config.lng;
  };

  const onMouseMove = (evt) => {
    if (isMouseDown) {
      var dX = evt.pageX - dragX;
      var dY = evt.pageY - dragY;
      config.lat = clamp(dragLat + dY * 0.5, -90, 90);
      config.lng = clampLng(dragLng - dX * 0.5, -180, 180);
    }
  };

  const onMouseUp = (evt) => {
    if (isMouseDown) {
      isMouseDown = false;
    }
  };

  // 지구본 다시 그려주는 함수 같다
  const regenerateGlobe = () => {
    console.log(
      "========================== regenerateGlobe ===================",
    );

    var dom, domStyle;
    var x, y;
    globeDoms = [];
    while ((dom = globeContainer.firstChild)) {
      globeContainer.removeChild(dom);
    }

    var segX = config.segX;
    var segY = config.segY;
    console.log("segX,segY", segX, segY);
    var diffuseImgBackgroundStyle = "url(" + URLS.diffuse + ")";
    var segWidth = (1600 / segX) | 0;
    var segHeight = (800 / segY) | 0;

    vertices = [];

    var verticesRow;
    var radius = 536 / 2;

    var phiStart = 0;
    var phiLength = Math.PI * 2;

    var thetaStart = 0;
    var thetaLength = Math.PI;

    for (y = 0; y <= segY; y++) {
      verticesRow = [];

      for (x = 0; x <= segX; x++) {
        var u = x / segX;
        var v = 0.05 + (y / segY) * (1 - 0.1);

        var vertex = {
          x:
            -radius *
            Math.cos(phiStart + u * phiLength) *
            Math.sin(thetaStart + v * thetaLength),
          y: -radius * Math.cos(thetaStart + v * thetaLength),
          z:
            radius *
            Math.sin(phiStart + u * phiLength) *
            Math.sin(thetaStart + v * thetaLength),
          phi: phiStart + u * phiLength,
          theta: thetaStart + v * thetaLength,
        };
        verticesRow.push(vertex);
      }
      vertices.push(verticesRow);
    }

    for (y = 0; y < segY; ++y) {
      for (x = 0; x < segX; ++x) {
        dom = document.createElement("div");
        domStyle = dom.style;
        domStyle.position = "absolute";
        domStyle.width = segWidth + "px";
        domStyle.height = segHeight + "px";
        domStyle.overflow = "hidden";
        domStyle[PerspectiveTransform.transformOriginStyleName] = "0 0";
        domStyle.backgroundImage = diffuseImgBackgroundStyle;

        // console.log("domStyle", domStyle);
        // console.log("dom", dom);
        // console.log("segWidth", segWidth);
        // console.log("segHeight", segHeight);
        // 여기서 에러남
        dom.perspectiveTransform = new PerspectiveTransform(
          dom,
          segWidth,
          segHeight,
        );
        dom.topLeft = vertices[y][x];
        dom.topRight = vertices[y][x + 1];
        dom.bottomLeft = vertices[y + 1][x];
        dom.bottomRight = vertices[y + 1][x + 1];
        domStyle.backgroundPosition =
          -segWidth * x + "px " + -segHeight * y + "px";
        globeContainer.appendChild(dom);
        globeDoms.push(dom);
      }
    }
  };

  const loop = () => {
    requestAnimationFrame(loop);
    stats.begin();
    // render();
    stats.end();
  };

  const render = () => {
    if (config.autoSpin && !isMouseDown && !isTweening) {
      config.lng = clampLng(config.lng - 0.2);
    }

    rX = (config.lat / 180) * Math.PI;
    rY = ((clampLng(config.lng) - 270) / 180) * Math.PI;

    globePole.style.display = config.isPoleVisible ? "block" : "none";
    globeHalo.style.display = config.isHaloVisible ? "block" : "none";

    var ratio = Math.pow(config.zoom, 1.5);
    pixelExpandOffset = 1.5 + ratio * -1.25;
    ratio = 1 + ratio * 3;
    globe.style[transformStyleName] = "scale3d(" + ratio + "," + ratio + ",1)";
    ratio = 1 + Math.pow(config.zoom, 3) * 0.3;
    worldBg.style[transformStyleName] =
      "scale3d(" + ratio + "," + ratio + ",1)";

    transformGlobe();
  };

  const clamp = (x, min, max) => {
    return x < min ? min : x > max ? max : x;
  };

  const clampLng = (lng) => {
    return ((lng + 180) % 360) - 180;
  };

  const transformGlobe = () => {
    var dom, perspectiveTransform;
    var x, y, v1, v2, v3, v4, vertex, verticesRow, i, len;
    if ((tick ^= 1)) {
      sinRY = Math.sin(rY);
      sinRX = Math.sin(-rX);
      sinRZ = Math.sin(rZ);
      cosRY = Math.cos(rY);
      cosRX = Math.cos(-rX);
      cosRZ = Math.cos(rZ);

      var segX = config.segX;
      var segY = config.segY;

      for (y = 0; y <= segY; y++) {
        verticesRow = vertices[y];
        for (x = 0; x <= segX; x++) {
          rotate((vertex = verticesRow[x]), vertex.x, vertex.y, vertex.z);
        }
      }

      for (y = 0; y < segY; y++) {
        for (x = 0; x < segX; x++) {
          dom = globeDoms[x + segX * y];

          v1 = dom.topLeft;
          v2 = dom.topRight;
          v3 = dom.bottomLeft;
          v4 = dom.bottomRight;

          expand(v1, v2);
          expand(v2, v3);
          expand(v3, v4);
          expand(v4, v1);

          perspectiveTransform = dom.perspectiveTransform;
          perspectiveTransform.topLeft.x = v1.tx;
          perspectiveTransform.topLeft.y = v1.ty;
          perspectiveTransform.topRight.x = v2.tx;
          perspectiveTransform.topRight.y = v2.ty;
          perspectiveTransform.bottomLeft.x = v3.tx;
          perspectiveTransform.bottomLeft.y = v3.ty;
          perspectiveTransform.bottomRight.x = v4.tx;
          perspectiveTransform.bottomRight.y = v4.ty;
          perspectiveTransform.hasError = perspectiveTransform.checkError();

          if (
            !(perspectiveTransform.hasError = perspectiveTransform.checkError())
          ) {
            perspectiveTransform.calc();
          }
        }
      }
    } else {
      for (i = 0, len = globeDoms.length; i < len; i++) {
        perspectiveTransform = globeDoms[i].perspectiveTransform;
        if (!perspectiveTransform.hasError) {
          perspectiveTransform.update();
        } else {
          perspectiveTransform.style[transformStyleName] =
            "translate3d(-8192px, 0, 0)";
        }
      }
    }
  };

  const goTo = (lat, lng) => {
    var dX = lat - config.lat;
    var dY = lng - config.lng;
    var roughDistance = Math.sqrt(dX * dX + dY * dY);
    isTweening = true;
    TweenMax.to(config, roughDistance * 0.01, {
      lat: lat,
      lng: lng,
      ease: "easeInOutSine",
    });
    TweenMax.to(config, 1, {
      delay: roughDistance * 0.01,
      zoom: 1,
      ease: "easeInOutSine",
      onComplete: function () {
        isTweening = false;
      },
    });
  };

  const rotate = (vertex, x, y, z) => {
    let x0 = x * cosRY - z * sinRY;
    let z0 = z * cosRY + x * sinRY;
    let y0 = y * cosRX - z0 * sinRX;
    z0 = z0 * cosRX + y * sinRX;

    var offset = 1 + z0 / 4000;
    let x1 = x0 * cosRZ - y0 * sinRZ;
    y0 = y0 * cosRZ + x0 * sinRZ;

    vertex.px = x1 * offset;
    vertex.py = y0 * offset;
  };

  // shameless stole and edited from threejs CanvasRenderer
  const expand = (v1, v2) => {
    var x = v2.px - v1.px,
      y = v2.py - v1.py,
      det = x * x + y * y,
      idet;

    if (det === 0) {
      v1.tx = v1.px;
      v1.ty = v1.py;
      v2.tx = v2.px;
      v2.ty = v2.py;
      return;
    }

    idet = pixelExpandOffset / Math.sqrt(det);

    x *= idet;
    y *= idet;

    v2.tx = v2.px + x;
    v2.ty = v2.py + y;
    v1.tx = v1.px - x;
    v1.ty = v1.py - y;
  };

  useEffect(() => {
    init();

    return () => {};
  }, []);
  //////////////////////////////////////////////////

  return (
    <section className="nationsnews-container">
      <article className="nationsnews-globe-container">
        <div className="world">
          <div className="world-bg"></div>
          <div className="world-globe">
            <div className="world-globe-pole"></div>
            <div className="world-globe-doms-container"></div>
            <div className="world-globe-halo"></div>
          </div>
        </div>
        {/* <img src={Temp} alt="" className="globe-img" />
        <div className="nation-info-card">
          <img src={Kor} alt="" className="nation-info-flag" />
          <h1 className="nation-info-name">SOUTH KOREA, 대한민국</h1>
          <div className="nation-info-taglist">
            <div className="nation-info-tag">
              <b>#</b> &nbsp;수빈
            </div>
            <div className="nation-info-tag">
              <b>#</b> &nbsp;수빈
            </div>
            <div className="nation-info-tag">
              <b>#</b> &nbsp;수빈
            </div>
            <div className="nation-info-tag">
              <b>#</b> &nbsp;수빈
            </div>
          </div>
          <div className="nation-info-trendlist">
            <div className="nation-info-trend">
              <div className="trend-circle">
                <img src={TrendDesign} alt="" className="trend-circle-design" />
              </div>
              <div className="trend-amount">
                <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                &nbsp; ▲
              </div>
            </div>
            <div className="nation-info-trend">
              <div className="trend-circle">
                <img src={TrendDesign} alt="" className="trend-circle-design" />
              </div>
              <div className="trend-amount">
                <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                &nbsp; ▲
              </div>
            </div>
            <div className="nation-info-trend">
              <div className="trend-circle">
                <img src={TrendDesign} alt="" className="trend-circle-design" />
              </div>
              <div className="trend-amount">
                <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                &nbsp; ▲
              </div>
            </div>
          </div>
        </div> */}
      </article>
      <article className="nationsnews-list-container">
        <div className="list-title-container">
          <div className="arrow-btn-wrapper" onClick={onPrevClick}>
            <button className="left-arrow-btn"></button>
          </div>
          <div className="nations-name-container">
            <h1 className="nation-eng-name">{nations[selectedIdx].eng}</h1>
            <h4 className="nation-kor-name">{nations[selectedIdx].kor}</h4>
          </div>
          <div className="arrow-btn-wrapper" onClick={onNextClick}>
            <button className="right-arrow-btn"></button>
          </div>
        </div>
        <div className="filter-container">
          <Filter clickHandler={onFilterClick} />
        </div>
        <div className="nationsnews-list">
          {news.map((e, i) => {
            return <NewsCard news={e} key={i} />;
          })}
        </div>
      </article>
      {isModalOpen && <FilterModal closeHandler={onCloseClick} />}
    </section>
  );
}
