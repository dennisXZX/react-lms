import React from 'react';

const DetailsCard = ({ children }) => {
  return (
    <div className="details-card">
      {children}
    </div>
  );
}

DetailsCard.Header = ({ children }) => {
  return (
    <div className="details-card-header">
      {children}
    </div>
  );
};

DetailsCard.ButtonGroup = ({ children }) => {
  return (
    // flex is a shorthand for flex-grow, flex-shrink and flex-basis
    <div style={{ flex: "1 1 0" }}>
      <div className="details-card-button-group">
        {children}
      </div>
    </div>
  );
};

export default DetailsCard;
