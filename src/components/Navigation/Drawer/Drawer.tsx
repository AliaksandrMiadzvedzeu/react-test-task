import React, { Component } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

interface ILink {
  to: string;
  label: string;
}

interface IDrawerProps {
  onClose: () => void;
  isOpen: boolean;
  isAuthenticated: boolean;
}

class Drawer extends Component<IDrawerProps> {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links: Array<ILink>) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            end={true}
            onClick={this.clickHandler}
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    const links = [{ to: "/", label: "Список" }];

    if (this.props.isAuthenticated) {
      //links.push({ to: "/quiz-creator", label: "Создать тест" });
      links.push({ to: "/logout", label: "Выйти" });
    } else {
      links.push({ to: "/login", label: "Авторизация" });
      links.push({ to: "/register", label: "Регистрация" });
    }

    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
