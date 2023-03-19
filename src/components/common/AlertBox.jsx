import React from "react";

const AlertBox = ({color,message}) => {
  return (
      <div
        className={`absolute bottom-5 right-5 p-4 mb-4 text-sm rounded-lg ${color}`}
        role="alert">
        <span className="font-medium">{message}</span>
      </div>
  );
};

export default AlertBox;
