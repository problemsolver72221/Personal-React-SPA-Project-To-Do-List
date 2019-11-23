export default function dateGetter(val) {
  let pickedDate;
  if (val) {
    pickedDate = new Date(val);
  } else {
    pickedDate = new Date();
  }

  let timezoneOffset = pickedDate.getTimezoneOffset() * 60000;
  let correctDate = new Date(pickedDate.getTime() - timezoneOffset);
  let date = JSON.stringify(correctDate);
  date = date.slice(1, 11);

  return date;
}
