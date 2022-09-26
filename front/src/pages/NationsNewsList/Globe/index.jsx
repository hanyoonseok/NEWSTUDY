import React, { useState } from "react";
import ReactGlobe from "react-globe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
// import optional tippy styles for tooltip support
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import GlobeImg from "assets/globe_diffuse.jpg";
import Earth from "assets/earthmap.jpg";
import Kor from "assets/kor.jpg";
import TrendDesign from "assets/trend-circle-design.png";
import { useEffect } from "react";

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.city}`;
}

const options = {
  markerTooltipRenderer,
  enableCameraZoom: false,
  focusDistanceRadiusScale: 3,
};

export default function Globe({ markers, selectedIdx, setReceiveIdx }) {
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  const [focus, setFocus] = useState([37.541, 126.986]);

  useEffect(() => {
    setFocus(markers[selectedIdx].coordinates);
    setDetails(markerTooltipRenderer(markers[selectedIdx]));
    return () => {};
  }, [selectedIdx]);

  const onClickMarker = (marker, markerObject, event) => {
    // console.log("event", event);
    // console.log("marker", marker.id);
    // console.log("markerObject", markerObject);
    setEvent({
      type: "CLICK",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(markerTooltipRenderer(marker));
    setReceiveIdx(marker.id);
  };

  const onDefocus = (previousFocus) => {
    setEvent({
      type: "DEFOCUS",
      previousFocus,
    });
    setDetails(null);
  };

  return (
    <div className="globe-box">
      {details && (
        <>
          <div className="nation-info-card">
            <img src={Kor} alt="" className="nation-info-flag" />
            <h1 className="nation-info-name">
              {markers[selectedIdx].city}, {markers[selectedIdx].kor}{" "}
            </h1>
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
                  <img
                    src={TrendDesign}
                    alt=""
                    className="trend-circle-design"
                  />
                </div>
                <div className="trend-amount">
                  <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                  &nbsp; ▲
                </div>
              </div>
              <div className="nation-info-trend">
                <div className="trend-circle">
                  <img
                    src={TrendDesign}
                    alt=""
                    className="trend-circle-design"
                  />
                </div>
                <div className="trend-amount">
                  <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                  &nbsp; ▲
                </div>
              </div>
              <div className="nation-info-trend">
                <div className="trend-circle">
                  <img
                    src={TrendDesign}
                    alt=""
                    className="trend-circle-design"
                  />
                </div>
                <div className="trend-amount">
                  <FontAwesomeIcon icon={faCircle} /> &nbsp;&nbsp; <b>60 </b>
                  &nbsp; ▲
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ReactGlobe
        height="100%"
        globeBackgroundTexture={null}
        // globeTexture={GlobeImg}
        globeTexture={Earth}
        markers={markers}
        options={options}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
        focus={focus}
      />
    </div>
  );
}
