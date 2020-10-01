import React from "react";
import style from "./basicInput.module.css";

export function BasicInput({
  forLabel,
  id,
  labelText,
  value,
  name,
  handleChange,
  placeholder,
  labelWidth,
  inputWidth,
  type,
  marginBottom,
}) {
  return (
    <div style={{ marginBottom: marginBottom }}>
      <label
        for={forLabel}
        className={style.label}
        style={{ width: labelWidth }}
      >
        {labelText}
      </label>
      <input
        id={id}
        className={style.basicInput}
        value={value}
        name={name}
        placeholder={placeholder}
        style={{ width: inputWidth }}
        type={type}
        // onChange={({ target: { value } }) => handleChange(value)}
      />
    </div>
  );
}
