import React from "react";
import classes from "./Loader.module.css";

const Loader: React.FC = () => (
  <div className={classes.center}>
    <div className={classes.Loader} />
  </div>
);

export default Loader;
