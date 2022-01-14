import React, { Component, Dispatch } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";
import {
  IFormControl,
  IFormControls,
  IValidation,
} from "../../interfaces/IFormControl";
import { Form } from "./Form";

interface IProps {
  login: (login: string, password: string, isLogin: boolean) => Promise<void>;
}

class LoginForm extends Form<IProps, IFormControls> {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () =>
    this.props.login(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    login: (email: string, password: string) =>
      dispatch(auth(email, password, true)),
  };
}

type DispatchProps = typeof mapDispatchToProps;

export default connect<{}, DispatchProps>(null, mapDispatchToProps)(LoginForm);
