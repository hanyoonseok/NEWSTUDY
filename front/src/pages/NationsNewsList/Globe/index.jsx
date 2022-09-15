import React, { useState } from "react";
import ReactGlobe from "react-globe";

// import optional tippy styles for tooltip support
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import GlobeImg from "assets/globe_diffuse.jpg";
import Earth from "assets/earthmap.jpg";

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.city} (Value: ${marker.value})`;
}

const options = {
  markerTooltipRenderer,
};

export default function Globe() {
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: "CLICK",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(markerTooltipRenderer(marker));
  }
  function onDefocus(previousFocus) {
    setEvent({
      type: "DEFOCUS",
      previousFocus,
    });
    setDetails(null);
  }

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
        <div
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
        </div>
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
