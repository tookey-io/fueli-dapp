export function toUnix(date: Date) {
  return Math.floor(date.getTime() / 1000);
}