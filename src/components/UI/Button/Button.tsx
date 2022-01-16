import React, { FunctionComponent, ReactChild, ReactChildren } from "react";
import classes from "./Button.module.css";

interface IButtonProps {
  type: string;
  disabled: boolean;
  children: ReactChild | ReactChildren;
  onClick: () => void;
}

const Button: FunctionComponent<IButtonProps> = (props) => {
  const cls = [classes.Button, classes[props.type]];

  return (
    <button
      onClick={props.onClick}
      className={cls.join(" ")}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
