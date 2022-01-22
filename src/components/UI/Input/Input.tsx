import React, { FunctionComponent } from "react";
import classes from "./Input.module.css";

function isInvalid({ valid, touched, shouldValidate }: Partial<OwnProps>) {
  return !valid && shouldValidate && touched;
}

interface OwnProps {
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

const Input: FunctionComponent<OwnProps> = (props) => {
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
        <span>{props.errorMessage || "Please enter a valid value"}</span>
      ) : null}
    </div>
  );
};

export default Input;
