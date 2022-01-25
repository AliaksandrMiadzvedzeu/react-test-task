import React, { FunctionComponent } from "react";
import classes from "./Input.module.css";

function isInvalid({ valid, touched, shouldValidate }: Partial<InputProps>) {
  return !valid && shouldValidate && touched;
}

export interface InputProps {
  type: string;
  value: string;
  label: string;
  shouldValidate: boolean;
  valid?: boolean;
  touched?: boolean;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<InputProps> = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (props.shouldValidate && isInvalid(props)) {
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
        autoComplete="on"
      />

      {props.shouldValidate && isInvalid(props) ? (
        <span>{props.errorMessage || "Please enter a valid value"}</span>
      ) : null}
    </div>
  );
};

export default Input;
