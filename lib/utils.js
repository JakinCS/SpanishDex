
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


// This function generates three random numbers (0 - 9) and returns them in string format
export const generate3RandomNumbers = () => {
  let rand1 = Math.floor(Math.random() * 10);
  let rand2 = Math.floor(Math.random() * 10);
  let rand3 = Math.floor(Math.random() * 10);
  
  return `${rand1}${rand2}${rand3}`;
}

// This function generates random numbers (0 - 9) and returns them in string format
export const generateRandomNumbers = (quantity) => {
  let str = '';
 
  for (let i = 0; i < quantity; i++) {
    str += `${Math.floor(Math.random() * 10)}`
  }
  
  return str;
}