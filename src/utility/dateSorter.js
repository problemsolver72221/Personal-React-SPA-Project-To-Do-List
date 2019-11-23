export default function dateSorter(val, order) {
  let date = val;

  if (order === "asc") {
    return date.sort();
  }
  if (order === "desc") {
    return date.sort().reverse();
  }

  return date;
}
