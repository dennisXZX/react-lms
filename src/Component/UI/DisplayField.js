import React from 'react';

const DisplayField = ({ label, children }) => {
  return (
    <div className="display-field">
      <div className="display-field-label">{label}</div>
      <div className="display-field-content">
        {children}
      </div>
    </div>
  );
}

export default DisplayField;
