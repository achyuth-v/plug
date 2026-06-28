import React from 'react';

// Floating background decorations: bolts, fire, stars, squiggles, arrows
// All inline SVG so they stay crisp and themeable

export function BackgroundDeco() {
  return (
    <>
      <svg className="bg-deco s1 anim-pulse" width="38" height="44" viewBox="0 0 24 28"
           style={{ '--r': '8deg' }} fill="var(--sun)" aria-hidden="true">
        <path d="M14 0L2 16h8l-4 12L20 10h-8z" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <svg className="bg-deco s2 anim-spin" width="50" height="50" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="5" fill="var(--orange)" stroke="var(--ink)" strokeWidth="1.5" />
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="2"    x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="22"  />
          <line x1="2"  y1="12"   x2="4.5" y2="12" />
          <line x1="19.5" y1="12" x2="22"  y2="12" />
          <line x1="4.9"  y1="4.9"  x2="6.7" y2="6.7"  />
          <line x1="17.3" y1="17.3" x2="19.1" y2="19.1" />
          <line x1="4.9"  y1="19.1" x2="6.7" y2="17.3" />
          <line x1="17.3" y1="6.7"  x2="19.1" y2="4.9" />
        </g>
      </svg>
      <svg className="bg-deco s3 anim-pulse" width="44" height="44" viewBox="0 0 24 24"
           fill="var(--blue)" style={{ '--r': '-10deg' }} aria-hidden="true">
        <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
      </svg>
      <svg className="bg-deco s4 anim-shake" width="40" height="48" viewBox="0 0 24 28"
           fill="var(--coral)" aria-hidden="true">
        <path d="M12 2c2 4 5 7 5 12a5 5 0 01-10 0c0-2 1-3 2-4-1 4 2 4 3 2 0-3-2-5 0-10z"
              stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <svg className="bg-deco s5 anim-float" width="60" height="20" viewBox="0 0 60 20"
           style={{ '--r': '5deg' }} aria-hidden="true">
        <path d="M2 10 Q 10 0, 18 10 T 34 10 T 50 10 T 58 10"
              stroke="var(--mint)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
      <svg className="bg-deco s6 anim-spin" width="42" height="42" viewBox="0 0 24 24"
           fill="var(--lime)" aria-hidden="true">
        <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" stroke="var(--ink)" strokeWidth="1.5" />
      </svg>
      <svg className="bg-deco s7 anim-pulse" width="36" height="42" viewBox="0 0 24 28"
           fill="var(--orange)" style={{ '--r': '-12deg' }} aria-hidden="true">
        <path d="M14 0L2 16h8l-4 12L20 10h-8z" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <svg className="bg-deco s8 anim-float" width="56" height="40" viewBox="0 0 56 40"
           style={{ '--r': '15deg' }} aria-hidden="true">
        <path d="M4 30 Q 20 5, 44 18 M 38 12 L 46 18 L 40 26"
              stroke="var(--purple)" strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round" fill="none" />
      </svg>
    </>
  );
}
