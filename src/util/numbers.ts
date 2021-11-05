export function randomIntFromInterval(min: number, max: number): number { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function average(numbers: number[]) {
  return numbers.length < 1 ? 0 : (numbers.reduce((a, b) => a + b) / numbers.length);
}

export function percentChange(a, b) {
  let percent;
  if(b !== 0) {
      if(a !== 0) {
          percent = (b - a) / a * 100;
      } else {
          percent = b * 100;
      }
  } else {
      percent = - a * 100;            
  }       
  return Math.floor(percent);
}