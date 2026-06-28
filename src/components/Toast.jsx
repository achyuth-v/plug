import React from 'react';

export function Toast({ text, visible }) {
  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      <svg className="bolt-icon" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
        <path d="M7 0L1 8h4l-2 6L11 5H7z" />
      </svg>
      <span>{text}</span>
    </div>
  );
}
