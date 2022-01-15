import React from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { rename } from "../../store/actions/auth";
import { IFormControls } from "../../interfaces/IFormControl";
import { Form } from "./Form";
import { ThunkDispatch } from "redux-thunk";
import { AuthActions, AuthState } from "../../store/reducers/auth";

interface RenameFormDispatchProps {
  rename: (name: string, surname: string) => Promise<void>;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<AuthState, {}, AuthActions>
) {
  return {
    rename: (name: string, surname: string) => dispatch(rename(name, surname)),
  };
}

class RenameForm extends Form<RenameFormDispatchProps, IFormControls> {
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

export default connect(null, mapDispatchToProps)(RenameForm);
