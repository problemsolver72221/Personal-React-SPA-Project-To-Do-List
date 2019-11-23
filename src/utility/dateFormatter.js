export default function dateFormatter(val) {
  const extracted = val.toString().split(" ");

  const formatted = `${extracted[2]} ${extracted[1]}`;

  return formatted;
}
