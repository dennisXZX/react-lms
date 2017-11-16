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
    <div style={{ flex: 1 }}>
      <div className="details-card-button-group">
        {children}
      </div>
    </div>
  );
};

export default DetailsCard;
