import React from "react";

const ErrorMessage = ({ message = "Failed to load data" }) => {
  return (
    <div className="bg-red-50 text-red-800 border-2 border-red-200 rounded-sm p-4 text-center font-body shadow-sm">
      <p className="font-bold">{message}</p>
    </div>
  );
};

export default ErrorMessage;
