const Dot = ({ num, scrollIdx }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        border: "1px solid lightgray",
        borderRadius: 999,
        backgroundColor: scrollIdx === num ? "#fdb814" : "transparent",
        transitionDuration: 1000,
        transition: "background-color 0.5s",
      }}
    ></div>
  );
};

const Dots = ({ scrollIdx }) => {
  return (
    <div style={{ position: "fixed", top: "50%", right: 100 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: 20,
          height: 100,
        }}
      >
        <Dot num={1} scrollIdx={scrollIdx}></Dot>
        <Dot num={2} scrollIdx={scrollIdx}></Dot>
        <Dot num={3} scrollIdx={scrollIdx}></Dot>
      </div>
    </div>
  );
};

export default Dots;
