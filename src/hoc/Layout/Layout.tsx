import React, { Component, ReactChild, ReactChildren } from "react";
import classes from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";

interface ILayoutDispatchProps {
  isAuthenticated: boolean;
}

interface ILayoutOwnProps {
  children: ReactChild | ReactChildren;
}

function mapStateToProps(state: ApplicationState) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

class Layout extends Component<ILayoutDispatchProps & ILayoutOwnProps> {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <ul className="nav justify-content-end bg-warning">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Active
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Disabled</a>
          </li>
        </ul>

        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Layout);
