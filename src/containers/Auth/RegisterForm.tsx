import React, { Dispatch } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { register } from "../../store/actions/auth";
import { IFormControls } from "../../interfaces/IFormControl";
import { Form } from "./Form";
import { ThunkDispatch } from "redux-thunk";
import { AuthActions, AuthState } from "../../store/reducers/auth";

// interface IProps {
//   register: (
//     login: string,
//     password: string,
//     name: string,
//     surname: string
//   ) => Promise<void>;
//}

interface RegisterFormDispatchProps {
  register: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => Promise<void>;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<AuthState, {}, AuthActions>
) {
  return {
    register: (
      email: string,
      password: string,
      name: string,
      surname: string
    ) => dispatch(register(email, password, name, surname)),
  };
}

class RegisterForm extends Form<RegisterFormDispatchProps, IFormControls> {
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
      name: {
        value: "",
        type: "input",
        label: "Имя",
        errorMessage: "Введите имя",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2,
        },
      },
      surname: {
        value: "",
        type: "input",
        label: "Фамилия",
        errorMessage: "Введите фамилию",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2,
        },
      },
    },
  };

  registerHandler = () =>
    this.props.register(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      this.state.formControls.name.value,
      this.state.formControls.surname.value
    );

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Регистрация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(RegisterForm);
