import React, { useState } from "react";
import ReactGlobe from "react-globe";
// import optional tippy styles for tooltip support
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import Earth from "assets/earthmap_color.png";
import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.city}`;
}

const options = {
  markerTooltipRenderer,
  enableCameraZoom: false,
  focusDistanceRadiusScale: 3,
  // pointLightPositionRadiusScales: [1, 1, -2],
  // globeGlowCoefficient: 0,
  // globeGlowColor: "#96b2ff",
  // globeGlowPower: 1,
  // globeGlowRadiusScale: 0.07,
};

export default function Globe({ markers, selectedIdx, setSelectedIdx }) {
  // const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  const [focus, setFocus] = useState([37.541, 126.986]);
  const [hashtags, setHashTags] = useState([]);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    setFocus(markers[selectedIdx].coordinates);
    setDetails(markerTooltipRenderer(markers[selectedIdx]));
    getNationKeywords(markers[selectedIdx].c_id);
    return () => {};
  }, [selectedIdx]);

  const onClickMarker = (marker, markerObject, event) => {
    // setEvent({
    //   type: "CLICK",
    //   marker,
    //   markerObjectID: markerObject.uuid,
    //   pointerEventPosition: { x: event.clientX, y: event.clientY },
    // });
    // setDetails(markerTooltipRenderer(marker));
    setSelectedIdx(marker.id);
    // getNationKeywords(marker.c_id);
  };

  const onDefocus = (previousFocus) => {
    // setEvent({
    //   type: "DEFOCUS",
    //   previousFocus,
    // });
    setDetails(null);
  };

  const getNationKeywords = useCallback(async (cid) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${userState.accessToken}`,
      },
    };
    const nationKeywordsResponse = await axios.get(
      `/daily/world/${cid}`,
      headers,
    );
    setHashTags(nationKeywordsResponse.data.map((e) => e.eng).slice(0, 3));
  }, []);

  return (
    <div className="globe-box">
      {details && (
        <>
          <div className="nation-info-card">
            <img
              src={markers[selectedIdx].img}
              alt=""
              className="nation-info-flag"
            />
            <h1 className="nation-info-name">
              {markers[selectedIdx].city}, {markers[selectedIdx].kor}{" "}
            </h1>
            <div className="nation-info-taglist">
              {hashtags.map((tag, i) => {
                return (
                  <div className="nation-info-tag" key={i}>
                    <b>#</b>
                    {tag.replace(/^./, tag[0].toUpperCase())}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <ReactGlobe
        height="100%"
        globeBackgroundTexture={null}
        globeCloudsTexture={null}
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
