import { IFormControl, IFormControls, IValidation } from "./IFormControl";
import is from "is_js";
import React, { Component } from "react";
import Input, { InputProps } from "../../components/UI/Input/Input";

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

    if (control.validation) {
      control.touched = true;
      control.valid = this.validateControl(control.value, control.validation);
    }

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      const valid = formControls[name].valid;
      if (valid != null) {
        isFormValid = valid && isFormValid;
      }
    });

    this.setState({
      ...this.state,
      serverErrorMessage: "",
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    const formControls: { [key: string]: IFormControl } =
      this.state.formControls;
    return Object.keys(formControls).map((controlName, index) => {
      const control: IFormControl = formControls[controlName];

      const attributes: InputProps = {
        type: control.type,
        value: control.value,
        label: control.label,
        shouldValidate: !!control.validation,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          this.onChangeHandler(event, controlName),
      };

      if (control.validation) {
        attributes.valid = control.valid;
        attributes.touched = control.touched;
        attributes.errorMessage = control.errorMessage;
      }

      return <Input key={controlName + index} {...attributes} />;
    });
  }
}
