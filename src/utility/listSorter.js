export default function sortList(list, sortRef, order) {
  if (order === "default") {
    return list;
  }

  if (order === "asc") {
    return list.sort((a, b) =>
      a[`${sortRef}`] > b[`${sortRef}`]
        ? 1
        : b[`${sortRef}`] > a[`${sortRef}`]
        ? -1
        : 0
    );
  }

  if (order === "desc") {
    return list
      .sort((a, b) =>
        a[`${sortRef}`] > b[`${sortRef}`]
          ? 1
          : b[`${sortRef}`] > a[`${sortRef}`]
          ? -1
          : 0
      )
      .reverse();
  }

  return list;
}
