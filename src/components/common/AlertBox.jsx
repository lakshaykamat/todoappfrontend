import React from "react";

const AlertBox = ({color,message}) => {
  return (
      <div
        className={`animate-bounce z-10 animate-slow absolute bottom-3 right-3 p-4 mb-4 text-sm rounded-lg ${color}`}
        role="alert">
        <span className="font-medium">{message}</span>
      </div>
  );
};

export default AlertBox;
