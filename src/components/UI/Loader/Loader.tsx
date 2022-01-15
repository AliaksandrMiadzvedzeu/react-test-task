import React, { FunctionComponent } from "react";
import classes from "./Loader.module.css";

const Loader: FunctionComponent = (props) => (
  <div className={classes.center}>
    <div className={classes.Loader}>
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
