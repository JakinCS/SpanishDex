const colors = ['#A12A1C', '#813637', '#614454', '#40506F', '#205E8C', '#0069A7', '#038396', 
  '#069B84', '#09B473', '#4FB84C', '#95BD26', '#DABF00', '#D8A700', '#D48B00', '#CF7000', 
  '#CC5400', '#C73900', '#C11C00'];


// returns a random color from the colors array
const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}


// Returns either black or white depending on the color given.
const contrastedColor = (color) => {
  const needsWhite = ['#A12A1C', '#813637', '#614454', '#40506F', '#205E8C', '#0069A7', '#C73900', '#C11C00'];
  const needsBlack = ['#038396', '#069B84', '#09B473', '#4FB84C', '#95BD26', '#DABF00', '#D8A700', '#D48B00', '#CF7000', '#CC5400'];

  if (needsWhite.includes(color)) {
    return '#FFFFFF';
  }

  return '#000000';
}

export { randomColor, contrastedColor }