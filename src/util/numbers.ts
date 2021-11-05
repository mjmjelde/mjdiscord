export function randomIntFromInterval(min: number, max: number): number { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function average(numbers: number[]) {
  return numbers.length < 1 ? 0 : (numbers.reduce((a, b) => a + b) / numbers.length);
}