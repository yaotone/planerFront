import "./input.css";

export default function Input({ children, type, minLength, setName, value }) {
  return (
    <label>
      <input
        className="input"
        placeholder=""
        type={`${type}`}
        minLength={`${minLength}`}
        name={`${setName}`}
        value={value}
        key={children}
      ></input>
      <span> {children} </span>
    </label>
  );
}

