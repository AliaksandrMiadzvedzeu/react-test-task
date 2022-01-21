import React, { Component, ReactChild, ReactChildren } from "react";
import classes from "./Layout.module.css";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import Menu from "../../components/Navigation/Menu/Menu";

interface StateProps {
  isAuthenticated: boolean;
  name?: string;
  surname?: string;
}

interface OwnProps {
  children: ReactChild | ReactChildren;
}

function mapStateToProps(state: ApplicationState): StateProps {
  return {
    isAuthenticated: !!state.auth.token,
    name: state.auth.name,
    surname: state.auth.surname,
  };
}

class Layout extends Component<StateProps & OwnProps> {
  render() {
    let userName = this.props.name ? this.props.name : "";
    if (userName.length > 0 && this.props.surname) userName += " ";
    if (this.props.surname) userName += this.props.surname;

    return (
      <div className={classes.Layout}>
        <Menu
          isAuthenticated={this.props.isAuthenticated}
          userName={userName}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Layout);
