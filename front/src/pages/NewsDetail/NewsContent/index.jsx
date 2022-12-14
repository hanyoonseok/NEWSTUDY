import React from "react";

import "./style.scss";

export default function NewsContent({
  content,
  newsKeywords,
  isTranslated,
  thumbnail,
  onWordDrugClick,
}) {
  const upperNewsKeywords = newsKeywords.map((e) => e.toUpperCase());
  const highlightKeywords = (string) => {
    const parsedContent = [];
    string = string.replace(/(?:\r\n|\r|\n)/g, "\n\n"); //줄바꿈을 문자열에 적용

    //키워드에 포함된 단어에 하이라이팅
    string.split(" ").forEach((element, i) => {
      if (upperNewsKeywords.includes(element.toUpperCase())) {
        parsedContent.push(
          <b
            className="newsdetail-content-keyword"
            key={i}
            onClick={() => onWordDrugClick(element)}
          >{`${element} `}</b>,
        );
      } else {
        parsedContent.push(`${element} `);
      }
    });

    return parsedContent;
  };

  const renderContent = () => {
    return content;
  };

  return (
    <>
      {isTranslated ? (
        <>{renderContent()}</>
      ) : (
        content.split("@@div").map((e, i) =>
          e.substring(0, 3) === "img" ? (
            e.substring(e.length - (e.length - 3)) !== thumbnail && (
              <div className="newsdetail-content-img-wrapper" key={i}>
                <img
                  src={e.substring(e.length - (e.length - 3))}
                  alt="기사 본문 이미지"
                  className="newsdetail-content-img"
                />
              </div>
            )
          ) : e.substring(0, 8) === "subtitle" ? (
            <h3 className="newsdetail-content-subtitle" key={i}>
              <b>“</b>{" "}
              {highlightKeywords(e.substring(e.length - (e.length - 8)))}{" "}
              <b>”</b>
            </h3>
          ) : (
            <p className="newsdetail-content-body" key={i}>
              {highlightKeywords(e)}
            </p>
          ),
        )
      )}
    </>
  );
}
