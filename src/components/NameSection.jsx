import React from 'react';

export function NameSection({ name, pitch, onNameChange, onPitchChange }) {
  return (
    <section className="card">
      <div className="card-header">
        <div className="card-num">1</div>
        <h2 className="card-title">name your drop</h2>
      </div>
      <p className="card-hint">
        be specific. <strong>"minimalist desk under $80"</strong> hits way harder than <strong>"cool stuff"</strong>.
      </p>

      <div className="field">
        <div className="field-label">
          drop name <span className="field-counter">{name.length}/40</span>
        </div>
        <input
          type="text"
          maxLength={40}
          placeholder="minimalist desk under $80"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className="field">
        <div className="field-label">
          one-line pitch <span className="field-counter">{pitch.length}/120</span>
        </div>
        <textarea
          maxLength={120}
          placeholder="say in one breath why this drop slaps."
          value={pitch}
          onChange={(e) => onPitchChange(e.target.value)}
        />
      </div>
    </section>
  );
}
