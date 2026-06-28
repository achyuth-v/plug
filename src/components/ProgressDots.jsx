import React from 'react';

const STEPS = [
  { n: 1, label: 'name' },
  { n: 2, label: 'vibe' },
  { n: 3, label: 'category' },
  { n: 4, label: 'products' },
];

export function ProgressDots({ progress }) {
  // progress is { 1: bool, 2: bool, 3: bool, 4: bool }
  let activeFound = false;
  return (
    <div className="progress">
      {STEPS.map(({ n, label }) => {
        const done = !!progress[n];
        const active = !done && !activeFound;
        if (active) activeFound = true;
        return (
          <div key={n} className={`pstep ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
            <span className="pstep-icon">{n}</span>
            <span className="pstep-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
