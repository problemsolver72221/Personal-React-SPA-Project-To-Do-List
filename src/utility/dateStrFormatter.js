export default function dateStrFormatter(val) {
  const stringExtract = new Date(Date.parse(val));

  const extractedString = stringExtract.toString().split(" ");
  const formattedString = `${extractedString[2]} ${extractedString[1]}`;

  return formattedString;
}
