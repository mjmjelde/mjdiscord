export function delay(ms: number): Promise<undefined> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const timeStringRegex = /^([0-9]+)([mhds])$/

export function stringToMilliseconds(timeString: string): number {
  const endingChar = timeString.charAt(timeString.length - 1);
  if (timeStringRegex.test(timeString)) {
    const parts = timeStringRegex.exec(timeString);
    
    switch (parts[2]) {
      case "s":
        return parseInt(parts[1]) * 1000;
      case "m":
        return parseInt(parts[1]) * 60 * 1000;
      case "h":
        return parseInt(parts[1]) * 60 * 60 * 1000;
      case "d":
        return parseInt(parts[1]) * 24 * 60 * 60 * 1000;
      default:
        break;
    }
  } else if (isNaN(parseInt(timeString))) {
    return -1;
  }
  return parseInt(timeString);
}