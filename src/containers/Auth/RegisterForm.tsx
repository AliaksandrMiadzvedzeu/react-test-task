import React from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { auth } from "../../store/auth/actions";
import { IFormControls } from "./IFormControl";
import { Form } from "./Form";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../../store";
import { AuthAction } from "../../store/auth/actionTypes";

interface DispatchProps {
  auth: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => Promise<void>;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<ApplicationState, unknown, AuthAction>
): DispatchProps {
  return {
    auth: (email: string, password: string, name: string, surname: string) =>
      dispatch(auth(email, password, name, surname)),
  };
}

class RegisterForm extends Form<DispatchProps, IFormControls> {
  state = {
    isFormValid: false,
    serverErrorMessage: "",
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Please enter a valid email address",
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
        label: "Password",
        errorMessage: "Please enter a correct password",
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
        label: "Name",
        errorMessage: "Please enter your name",
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
        label: "Surname",
      },
    },
  };

  registerHandler = () =>
    this.props
      .auth(
        this.state.formControls.email.value,
        this.state.formControls.password.value,
        this.state.formControls.name.value,
        this.state.formControls.surname.value
      )
      .catch(({ response }) => {
        let serverErrorMessage = "";
        switch (response?.data?.error?.message) {
          case "EMAIL_EXISTS":
            serverErrorMessage = "Email already exists. Try with another one.";
            break;
          default:
            serverErrorMessage = "Something went wrong. Try again.";
        }
        this.setState({
          ...this.state,
          serverErrorMessage,
        });
        console.error("An unexpected error happened:", response?.data);
      });

  render() {
    return (
      <div className="d-flex justify-content-center flex-grow-1 pt-5">
        <div className="w-100 px-1" style={{ maxWidth: "600px" }}>
          <h2 className="text-center mb-5">Create account</h2>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            <Button
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Next
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

export default connect(null, mapDispatchToProps)(RegisterForm);
