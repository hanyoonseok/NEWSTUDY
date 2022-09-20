import "./style.scss";
export default function BackBtn({ setStep }) {
  return (
    <div className="back-btn-wrapper" onClick={() => setStep(0)}>
      <button className="back-btn"></button>
    </div>
  );
}
