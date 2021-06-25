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

export function getDayTimestamp(): number {
  var now = new Date();
  var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return startOfDay.getTime() / 1000;
}

export function get24HoursAgoTimestamp(): number {
  return Math.round((new Date().getTime() / 1000) - (24 * 60 * 60));
}

export function formatAMPM(date: Date): string {
  var hours = date.getHours();
  var minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();;
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

export function sleep(ms): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}