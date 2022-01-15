import React, { ChangeEventHandler, FunctionComponent } from "react";
import classes from "./Select.module.css";

interface ISelectProps {
  label: string;
  value: string;
  onChange: () => void;
  options: Array<{
    value: string;
    text: string;
  }>;
}

const Select: FunctionComponent<ISelectProps> = (props) => {
  const htmlFor = `${props.label}-${Math.random()}`;

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select id={htmlFor} value={props.value} onChange={props.onChange}>
        {props.options.map((option, index) => {
          return (
            <option value={option.value} key={option.value + index}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
