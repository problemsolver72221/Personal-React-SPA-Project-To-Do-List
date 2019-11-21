// Using Date.now() plus a random to generate Unique ID

export default function randomIdGenerator() {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 5)
  ).toUpperCase();
}
