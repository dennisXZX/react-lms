import React from 'react';

function DisplayField({ label, children }) {
  return (
    <div className="jr-display-field">
      <div className="jr-display-field__label">{label}</div>
      <div className="jr-display-field__content">
        {children}
      </div>
    </div>
  );
}

export default DisplayField;
