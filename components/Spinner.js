import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Spinner = () => {
  return (
    <div className="h-100vh flex items-center justify-center">
      <HashLoader />
    </div>
  );
};

export default Spinner;
