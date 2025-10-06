import React from 'react';

const LoadingSpinner = ({ size = "medium", message = "Loading..." }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12", 
    large: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-black text-white">
      <div className={`${sizeClasses[size]} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
      <p className="mt-4 text-lg font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
