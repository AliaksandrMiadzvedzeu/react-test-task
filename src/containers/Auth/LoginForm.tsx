import React from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { auth } from "../../store/auth/actions";
import { IFormControls } from "./IFormControl";
import { Form } from "./Form";
import { ThunkDispatch } from "redux-thunk";
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
      <div className="d-flex justify-content-center flex-grow-1 pt-5">
        <div className="w-100 px-1" style={{ maxWidth: "600px" }}>
          <h2 className="text-center mb-5">Sign in</h2>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              onClick={this.loginHandler}
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

export default connect(null, mapDispatchToProps)(LoginForm);
