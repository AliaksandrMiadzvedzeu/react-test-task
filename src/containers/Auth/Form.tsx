import {
  IFormControl,
  IFormControls,
  IValidation,
} from "../../interfaces/IFormControl";

import is from "is_js";
import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";

export class Form<T, P extends IFormControls> extends Component<T, P> {
  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  validateControl(value: string, validation: IValidation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    controlName: string
  ) => {
    const formControls: { [key: string]: IFormControl } = {
      ...this.state.formControls,
    };

    const control: IFormControl = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      ...this.state,
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    const formControls: { [key: string]: IFormControl } =
      this.state.formControls;
    return Object.keys(formControls).map((controlName, index) => {
      const control: IFormControl = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            this.onChangeHandler(event, controlName)
          }
        />
      );
    });
  }
}
