import React from "react";

const SortIcons = ({ sortStatus }) => {
  return (
    <span>
      <img src={`/icons/${sortStatus}.svg`} alt={`${sortStatus}`} />
    </span>
  );
};

export default SortIcons;
