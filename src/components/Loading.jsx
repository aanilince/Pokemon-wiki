import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-vintage-accent"></div>
      <p className="text-vintage-600 font-bold font-body text-lg animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
