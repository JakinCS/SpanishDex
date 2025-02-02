export const generate3RandomNumbers = () => {
  let rand1 = Math.floor(Math.random() * 10);
  let rand2 = Math.floor(Math.random() * 10);
  let rand3 = Math.floor(Math.random() * 10);
  
  return `${rand1}${rand2}${rand3}`;
}