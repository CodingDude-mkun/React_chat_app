export function extractTime(dateTime: string) {
  const date = new Date(dateTime);

  const hours = padZero(date.getHours());
  const mins = padZero(date.getMinutes());
  return `${hours}:${mins}`;
}
function padZero(num: number) {
  return num.toString().padStart(2, "0");
}
