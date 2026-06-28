import React, { useState, useEffect } from 'react';

export function Countdown({ initialDays = 4, initialHours = 12, initialMins = 38 }) {
  const [time, setTime] = useState({ d: initialDays, h: initialHours, m: initialMins });

  useEffect(() => {
    const id = setInterval(() => {
      setTime(t => {
        let { d, h, m } = t;
        m -= 1;
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; d -= 1; }
        if (d < 0) return t;
        return { d, h, m };
      });
    }, 60000);
    return () => clearInterval(id);
  }, []);

  const Bolt = () => (
    <svg className="bolt" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
      <path d="M7 0L1 8h4l-2 6L11 5H7z" />
    </svg>
  );

  return (
    <div className="countdown">
      <Bolt />
      <span>week 24 closes in</span>
      <span className="time-chip">{time.d}D {time.h}H {time.m}M</span>
      <span>drop it now</span>
      <Bolt />
    </div>
  );
}

export function Hero({ dropNumber = '048' }) {
  return (
    <div className="hero">
      <svg className="hero-stickers left" width="64" height="64" viewBox="0 0 24 28"
           fill="var(--sun)" style={{ transform: 'rotate(-18deg)' }} aria-hidden="true">
        <path d="M14 0L2 16h8l-4 12L20 10h-8z" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <svg className="hero-stickers right" width="58" height="58" viewBox="0 0 24 28"
           fill="var(--coral)" style={{ transform: 'rotate(22deg)' }} aria-hidden="true">
        <path d="M12 2c2 4 5 7 5 12a5 5 0 01-10 0c0-2 1-3 2-4-1 4 2 4 3 2 0-3-2-5 0-10z"
              stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>

      <p className="hero-eyebrow">★ DROP #{dropNumber} — MAKE IT COUNT ★</p>
      <h1 className="hero-title">
        <span className="word-1">make a drop,</span><br />
        <span className="word-2">win the week.</span>
      </h1>
      <svg className="squiggle" viewBox="0 0 220 14" aria-hidden="true">
        <path d="M2 7 Q 16 1, 30 7 T 58 7 T 88 7 T 118 7 T 148 7 T 178 7 T 208 7 T 218 7"
              stroke="var(--coral)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </svg>
      <p className="hero-sub">
        stack 3+ products, name it, pick a vibe. buyers can grab any item solo —
        you earn commission on every sale, forever.
      </p>
    </div>
  );
}
