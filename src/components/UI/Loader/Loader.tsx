import React from "react";
import classes from "./Loader.module.css";

const Loader: React.FC = (props) => (
  <div className={classes.center}>
    <div className={classes.Loader} />
  </div>
);

export default Loader;
