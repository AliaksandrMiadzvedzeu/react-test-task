import React, { FunctionComponent } from "react";
import classes from "./Backdrop.module.css";

interface IBackdropProps {
  onClick: () => void;
}

const Backdrop: FunctionComponent<IBackdropProps> = (props) => (
  <div className={classes.Backdrop} onClick={props.onClick} />
);

export default Backdrop;
