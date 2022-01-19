export interface IFormControls {
  isFormValid: boolean;
  serverErrorMessage: string;
  formControls: {
    [key: string]: IFormControl;
  };
}

export interface IFormControl {
  value: string;
  type: string;
  label: string;
  errorMessage: string;
  valid: boolean;
  touched: boolean;
  validation: IValidation;
  //styles: {
  //[key: string]: string;
  // };
}

export interface IValidation {
  required?: boolean;
  email?: boolean;
  minLength?: number;
}
