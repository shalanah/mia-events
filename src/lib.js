export const formatHoursAndMinutes = ({ h, m, spaceBetween = true }) => {
  let min = (m + "").split("").length === 1 ? `0${m}` : m;
  let hours = h;
  let pm = false;
  if (hours > 11) {
    hours = hours - 12;
    pm = true;
  }
  if (hours === 0) hours = 12;
  hours = (hours + "").split("") === 1 ? `0${hours}` : hours;
  return `${hours}:${min}${spaceBetween ? " " : ""}${pm ? "PM" : "AM"}`;
};
