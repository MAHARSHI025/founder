import React from "react";

function Elevation({ children, className = "" }) {
  return (
    <div
      className={`
        flex
        justify-center items-center
        relative right-2
        text-md mt-2 px-6 py-2 rounded-lg
        bg-white border border-black
        transition-all duration-200
        shadow-[2px_2px_0px_black]
        select-none
        active:shadow-[0px_0px_0px_black]
        active:translate-x-[3px] active:translate-y-[3px]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Elevation;
