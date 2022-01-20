import React from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { auth } from "../../store/auth/actions";
import { IFormControls } from "./IFormControl";
import { Form } from "./Form";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction } from "../../store/auth/actionTypes";
import { AuthState } from "../../store/auth/reducers";
import { ApplicationState } from "../../store";
import { AnyAction } from "redux";

interface DispatchProps {
  auth: (email: string, password: string) => Promise<void>;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<ApplicationState, {}, AnyAction>
): DispatchProps {
  return {
    auth: (email: string, password: string) => dispatch(auth(email, password)),
  };
}

class LoginForm extends Form<DispatchProps, IFormControls> {
  state = {
    isFormValid: false,
    serverErrorMessage: "",
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
    this.props
      .auth(
        this.state.formControls.email.value,
        this.state.formControls.password.value
      )
      .catch((error) => {
        if (error?.message) {
          this.setState({
            ...this.state,
            serverErrorMessage: error.message,
          });
        } else {
          console.error("An unexpected error happened:", error);
        }
      });

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
            {this.state.serverErrorMessage.trim().length > 0 ? (
              <div className={classes.Error}>
                {this.state.serverErrorMessage}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);
