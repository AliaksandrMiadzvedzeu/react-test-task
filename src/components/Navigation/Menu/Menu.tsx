import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Menu.module.css";

interface ILink {
  to: string;
  label: string;
}

interface MenuProps {
  isAuthenticated: boolean;
  userName: string;
}

class Menu extends Component<MenuProps> {
  renderLinks(links: Array<ILink>) {
    return links.map((link, index) => {
      return (
        <li key={index} className="nav-item">
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              "nav-link" + (isActive ? " " + classes.active : "")
            }
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const links = [];

    if (this.props.isAuthenticated) {
      links.push({ to: "/list", label: "Список" });
      links.push({ to: "/logout", label: "Выйти" });
    } else {
      links.push({ to: "/login", label: "Авторизация" });
      links.push({ to: "/register", label: "Регистрация" });
    }

    return (
      <div className="d-flex justify-content-between bg-warning">
        <div className="d-flex align-items-center px-3">
          {this.props.isAuthenticated && this.props.userName.length > 0
            ? `Welcome ${this.props.userName}`
            : null}
        </div>
        <ul className={"nav nav-pills justify-content-end " + classes.navPills}>
          {this.renderLinks(links)}
        </ul>
      </div>
    );
  }
}

export default Menu;
