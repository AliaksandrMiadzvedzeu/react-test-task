//*****************************************************************************************************
//**Change email because it is impossible to save email format as key in Realtime Database of Firebase.
//*****************************************************************************************************
export const encodeEmail = (email: string) => email.replace(".", "^");
