import React from "react";

const ClassItem = ({ title, teacher, color = "yellow", border = true }) => {
  const bgColor = {
    yellow: "bg-yellow-100",
    red: "bg-red-100",
    blue: "bg-blue-100",
  }[color];

  const borderColor = {
    yellow: "border-yellow-400",
    red: "border-red-400",
    blue: "border-blue-400",
  }[color];

  return (
    <div
      className={`absolute inset-1 p-1 text-xs text-center rounded shadow-sm ${bgColor} ${
        border ? `border ${borderColor}` : ""
      }`}
    >
      {title}
      <br />
      <span className="text-[11px] text-gray-600">{teacher}</span>
    </div>
  );
};

export default ClassItem;
