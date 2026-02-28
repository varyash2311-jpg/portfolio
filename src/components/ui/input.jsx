import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`flex-1 rounded-lg border px-3 py-2 ${className}`}
      {...props}
    />
  );
}

