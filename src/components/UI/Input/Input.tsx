import React, { FunctionComponent } from "react";
import classes from "./Input.module.css";

function isInvalid({ valid, touched, shouldValidate }: Partial<IInputProps>) {
  return !valid && shouldValidate && touched;
}

interface IInputProps {
  key: string;
  type: string;
  value: string;
  valid: boolean;
  touched: boolean;
  label: string;
  shouldValidate: boolean;
  errorMessage: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<IInputProps> = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {isInvalid(props) ? (
        <span>{props.errorMessage || "Введите верное значение"}</span>
      ) : null}
    </div>
  );
};

export default Input;
