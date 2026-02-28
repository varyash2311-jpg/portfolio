import React from 'react';

export function Button({ children, className = '', disabled, onClick, ...props }) {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

