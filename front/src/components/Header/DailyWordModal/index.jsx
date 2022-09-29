import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Word from "components/Word";
import React, { useEffect } from "react";
import "./style.scss";

export default function DailyWordModal({ close }) {
  const vocas = [
    {
      eng: "Administration",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩",
        },
        {
          id: 3,
          done: "화연연ㅇ여연",
        },
      ],
    },
    {
      eng: "SubiniSubiniSi",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩수콩수콩수콩수콩수콩수콩",
        },
        {
          id: 3,
          done: "수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩수콩",
        },
      ],
    },
    {
      eng: "SubiniSubiniSi",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩",
        },
        {
          id: 3,
          done: "화연연ㅇ여연",
        },
      ],
    },
    {
      eng: "SubiniSubiniSi",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩",
        },
        {
          id: 3,
          done: "화연연ㅇ여연",
        },
      ],
    },
    {
      eng: "SubiniSubiniSi",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩",
        },
        {
          id: 3,
          done: "화연연ㅇ여연",
        },
      ],
    },
    {
      eng: "SubiniSubiniSi",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩",
        },
        {
          id: 3,
          done: "화연연ㅇ여연",
        },
      ],
    },
    {
      eng: "SubiniSubiniSi",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩",
        },
        {
          id: 3,
          done: "화연연ㅇ여연",
        },
      ],
    },
    {
      eng: "SubiniSubiniSi",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩",
        },
        {
          id: 3,
          done: "화연연ㅇ여연",
        },
      ],
    },
    {
      eng: "SubiniSubiniSi",
      part: [
        {
          id: 0,
          done: "수콩수콩수콩",
        },
        {
          id: 3,
          mean: "화연연ㅇ여연",
        },
      ],
    },
  ];

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: none;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className="daily-word-modal" onClick={close}>
      <div
        className="daily-word-modal-body"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            DAILY <span>WORD</span>
          </h2>
          <button className="close" onClick={close}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <Word vocas={vocas} />
      </div>
    </div>
  );
}
