import React, { Component } from "react";
import classes from "../NoteList/NoteList.module.css";

class NodeList extends Component {
  render() {
    return (
      <div className={classes.NodeList}>
        <div>
          <h1>List of Elements</h1>
        </div>
      </div>
    );
  }
}

export default NodeList;
