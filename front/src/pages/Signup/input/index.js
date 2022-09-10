import "./style.scss";

export default function Input({ placeholder }) {
  return (
    <div className="input-div">
      <div className="box"></div>
      <input placeholder={placeholder}></input>
    </div>
  );
}
