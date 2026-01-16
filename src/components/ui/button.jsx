import React from 'react';

export const Button = React.forwardRef(
  ({ className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={`
        inline-flex items-center justify-center rounded-md font-medium
        transition-colors focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 
        disabled:cursor-not-allowed ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
