import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = ({ size = "3x", color = "#EFB036" }) => {
  return (
    <div className="flex justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} spin size={size} style={{ color }} />
    </div>
  );
};

export default Spinner;
