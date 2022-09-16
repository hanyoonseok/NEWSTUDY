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

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.city}`;
}

const options = {
  markerTooltipRenderer,
  enableCameraZoom: false,
};

export default function Globe() {
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);

  const onClickMarker = (marker, markerObject, event) => {
    console.log("event", event);
    setEvent({
      type: "CLICK",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(markerTooltipRenderer(marker));
  };

  const onDefocus = (previousFocus) => {
    setEvent({
      type: "DEFOCUS",
      previousFocus,
    });
    setDetails(null);
  };

  const markers = [
    {
      id: 1,
      city: "Singapore",
      color: "red",
      coordinates: [1.3521, 103.8198],
      value: 50,
    },
    {
      id: 2,
      city: "New York",
      color: "blue",
      coordinates: [40.73061, -73.935242],
      value: 25,
    },
    {
      id: 3,
      city: "San Francisco",
      color: "orange",
      coordinates: [37.773972, -122.431297],
      value: 35,
    },
    {
      id: 4,
      city: "Beijing",
      color: "gold",
      coordinates: [39.9042, 116.4074],
      value: 0,
    },
    {
      id: 5,
      city: "London",
      color: "green",
      coordinates: [51.5074, 0.1278],
      value: 80,
    },
  ];

  return (
    <div className="globe-box">
      {details && (
        <>
          {/* <div
            style={{
              background: "white",
              position: "absolute",
              fontSize: 20,
              bottom: 0,
              right: 0,
              padding: 12,
            }}
          >
            <p>{details}</p>
            <p>
              EVENT: type={event.type}, position=
              {JSON.stringify(event.pointerEventPosition)})
            </p>
          </div> */}
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
      />
    </div>
  );
}
