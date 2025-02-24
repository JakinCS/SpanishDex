

// This function generates random numbers (0 - 9) and returns them in string format
export const generateRandomNumbers = (quantity) => {
  let str = '';
 
  for (let i = 0; i < quantity; i++) {
    str += `${Math.floor(Math.random() * 10)}`
  }
  
  return str;
}


// This function takes as paramters the form state value and state setter function 
// and it is in charge of updating state based on the results of the password validation
// checks it makes. For validation, it runs the isPasswordValid() function
// and it also checks whether the password matches the other password.
// This is a very specific function and requires an exact format for the form state
// state format:
// {
//   password: {value: '', valid: null, errorType: null, message: null},
//   password2: {value: '', valid: null, errorType: null, message: null}
// }
export const handlePasswordValidCheck = (formState, formStateSetter, fieldNumber) => {
  let mainPasswordField;
  let otherPasswordField
  if (fieldNumber === 1) {
    mainPasswordField = "password";
    otherPasswordField = "password2";
  } else if (fieldNumber === 2) {
    mainPasswordField = "password2";
    otherPasswordField = "password";
  }

  // Check whether the format of the password is valid.
  const passwordValid = isPasswordValid(formState[mainPasswordField].value);

  if (!passwordValid.valid) {
    // If it isn't valid, display an error. No other logic needs to run.
    formStateSetter(prevState => ({...prevState, [mainPasswordField]: {...prevState[mainPasswordField], valid: passwordValid.valid, errorType: 'reg', message: passwordValid.message}}))
    return;
  }

  // check to see if the two fields are matching in value
  const matchesOtherField = (formState[mainPasswordField].value === formState[otherPasswordField].value);

  /* If the fields match, don't display a 'matching error' and set the state to valid for this field. 
    Also, even if the fields DON'T match, a 'matching error' isn't necessary if:
      1. The other field is displaying a different error 
      2. The other field has not be touched yet */
  if (matchesOtherField || (!formState[otherPasswordField].valid && formState[otherPasswordField].errorType === 'reg') || formState[otherPasswordField].valid === null) {
    // Remove errors for the this field
    formStateSetter(prevState => ({...prevState, [mainPasswordField]: {...prevState[mainPasswordField], valid: true, errorType: ''}}))

    // If the other field currently displays a "matching error", remove it because the fields now match.
    if (!formState[otherPasswordField].valid && formState[otherPasswordField].errorType === 'matching') {
      formStateSetter(prevState => ({...prevState, [otherPasswordField]: {...prevState[otherPasswordField], valid: true, errorType: ''}}))
    }
  } else { // Otherwise, this field needs a 'matching error'. So display one.

    formStateSetter(prevState => ({...prevState, [mainPasswordField]: {...prevState[mainPasswordField], valid: false, errorType: 'matching', message: 'Passwords must match'}}))

    // If the other field is current showing to be valid, it needs a matching error too.
    if (formState[otherPasswordField].valid) {
      formStateSetter(prevState => ({...prevState, [otherPasswordField]: {...prevState[otherPasswordField], valid: false, errorType: 'matching', message: 'Passwords must match'}}))
    }
  }
}


// This function returns a random color and the apropriate 
// color pairing (black or white) for use of text with the color.
export const randomColorPair = () => {
  const colors = ['#A12A1C', '#813637', '#614454', '#40506F', '#205E8C', '#0069A7', '#038396', 
    '#069B84', '#09B473', '#4FB84C', '#95BD26', '#DABF00', '#D8A700', '#D48B00', '#CF7000', 
    '#CC5400', '#C73900', '#C11C00'];
  const needsWhite = ['#A12A1C', '#813637', '#614454', '#40506F', '#205E8C', '#0069A7', '#C73900', '#C11C00'];

  // Pick a random color.
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  if (needsWhite.includes(randomColor)) {
    return [randomColor, '#FFFFFF'];
  }

  return [randomColor, '#000000'];
}


// Checks whether the email inputted has a valid format.
export const isEmailValid = (email) => {
  const regexExpression = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$/

  if (email === '' || regexExpression.test(email)) {
    return {valid: true, message: "Email is valid"}
  } else {
    return {valid: false, message: "Invalid email address"}
  }
}


// Function to check whether a password string is valid
/* 
  Min Length: 6
  Max Length: 1024
  Characters: any
*/
export const isPasswordValid = (password) => {
  let isValid = true;
  let message = 'Password is valid';

  if (password.length === 0) {
    isValid = false;
    message = 'Password is required'
  } else if (password.length < 6) {
    isValid = false;
    message = 'Password must be at least 6 characters'
  } else if (password.length > 1024) {
    isValid = false;
    message = 'Password length cannot exceed 1024 characters'
  }

  return {valid: isValid, message}
}


// Checks whether the format of the inputted username is valid.
/* 
  Length: 2 - 25 characters,
  Allowed Characters: numbers, letters, underscores
  Other: no spaces before, in-between, or afterwards  
*/
export const isUsernameValid = (username) => {

  let isValid = true;
  let message = '';

  if (username.trim().length === 0) {
    isValid = false;
    message = 'Username is required';
  } else if (username.length < 2) {
    isValid = false;
    message = 'The username must be at least 2 characters'
  } else if (username.length > 25) {
    isValid = false;
    message = 'The username cannot be longer than 25 characters'
  } else if (/ +/.test(username)) {
    isValid = false;
    message = 'Please do not use spaces in your username'
  } else if (/\W+/.test(username)) {
    isValid = false;
    message = 'Please only use letters, numbers and underscores'
  } else if (!/^\w+$/.test(username)) {
    isValid = false;
    message = 'Username is invalid'
  }

  return {valid: isValid, message}
}
