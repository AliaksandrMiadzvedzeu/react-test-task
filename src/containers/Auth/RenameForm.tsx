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
  rename: (name: string, surname: string) => Promise<void>;
}

class RenameForm extends Form<IProps, IFormControls> {
  state = {
    isFormValid: false,
    formControls: {
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

  loginHandler = () =>
    this.props.rename(
      this.state.formControls.name.value,
      this.state.formControls.surname.value
    );

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Изменить данные пользователя</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Изменить
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    rename: (name: string, surname: string) =>
      dispatch(auth(name, surname, true)),
  };
}

type DispatchProps = typeof mapDispatchToProps;

export default connect<{}, DispatchProps>(null, mapDispatchToProps)(RenameForm);
