import React, { FunctionComponent, ReactChild, ReactChildren } from "react";
import classes from "./Button.module.css";

interface IButtonProps {
  disabled: boolean;
  children: ReactChild | ReactChildren;
  onClick: () => void;
}

const Button: FunctionComponent<IButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={classes.Button}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
