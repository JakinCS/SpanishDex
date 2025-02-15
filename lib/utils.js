

// This function generates random numbers (0 - 9) and returns them in string format
export const generateRandomNumbers = (quantity) => {
  let str = '';
 
  for (let i = 0; i < quantity; i++) {
    str += `${Math.floor(Math.random() * 10)}`
  }
  
  return str;
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
