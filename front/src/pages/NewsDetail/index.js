import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faGlobe,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

import "./style.scss";
import NewsCard from "components/NewsCard";

export default function NewsDetail() {
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const news = {
    img: "",
    title:
      "An Overseas news story that fits the difficulty An Overseas news story that fits the difficulty",
    body: "My time with SKT has already been such an amazing journey, and Im thankful for every day of it. Earlier this year, I felt myselfgradually getting weaker. It was like my skills were getting worseand the rest of the world was gaining on me. I’ve often wonderedwhat makes me great at League of Legends, and the best way I candescribe it is that I structure my playstyle through calculation andintuition. I’m always learning new things. I can predict eventsbefore they happen, and that helps me to be in the right place andmake the right play a step sooner than everyone else. For a whilethere it felt like my intuition was off, and I didn’t know if Icould recover. But right now I feel like I can play forever. At the",
    date: "Wed, September 7, 2022",
    category: "SPORTS",
    level: "c",
  };

  return (
    <div className="newsdetail-container">
      <div className="back-btn-wrapper">
        <button className="back-btn"></button>
      </div>
      <div className="newsdetail-content-div">
        <section className="news-section">
          <h1 className="news-title">
            An Overseas news story that fits the difficulty
          </h1>
          <p className="news-date">Wed, September 7, 2022</p>
          <h3 className="news-subtitle">VOCABULARY</h3>
          <div className="news-hot-word">
            <section className="words-container">
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
              <div className="word-drug">word</div>
            </section>
            <section className="functions-container">
              <div className="icon-row">
                <i>
                  <FontAwesomeIcon icon={faVolumeUp} />
                </i>
                <div className="icon-desc">발음듣기</div>
              </div>
              <div className="icon-row">
                <i>
                  <FontAwesomeIcon icon={faGlobe} />
                </i>
                <div className="icon-desc">번역보기</div>
              </div>
              <div className="icon-row">
                <i>
                  <FontAwesomeIcon icon={faBookmark} />
                </i>
                <div className="icon-desc">스크랩</div>
              </div>
            </section>
          </div>
          <p className="news-article">
            This weekend, we’ll be back at STAPLES Center going against Samsung
            Galaxy in the world championship final. As always, we expect to win.
            <br />
            My time with SKT has already been such an amazing journey, and I’m
            thankful for every day of it. Earlier this year, I felt myself
            gradually getting weaker. It was like my skills were getting worse
            and the rest of the world was gaining on me. I’ve often wondered
            what makes me great at League of Legends, and the best way I can
            describe it is that I structure my playstyle through calculation and
            intuition. I’m always learning new things. I can predict events
            before they happen, and that helps me to be in the right place and
            make the right play a step sooner than everyone else. For a while
            there it felt like my intuition was off, and I didn’t know if I
            could recover. But right now I feel like I can play forever. At the
          </p>
        </section>
        <section className="related-article-section">
          <h3 className="news-subtitle">Related Articles</h3>
          <div className="news-card-wrapper">
            <NewsCard news={news} />
            <NewsCard news={news} />
            <NewsCard news={news} />
          </div>
        </section>
      </div>
    </div>
  );
}
