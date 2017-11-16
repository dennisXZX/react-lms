import React from 'react';

function DetailsCard({ children }) {
  return (
    <div className="jr-details-card">
      {children}
    </div>
  );
}

DetailsCard.Header = function DetailsCardHeader({ children }) {
  return (
    <div className="jr-details-card__header">
      {children}
    </div>
  );
};

DetailsCard.ButtonGroup = function DetailsCardButtonGroup({ children }) {
  return (
    <div style={{ flex: 1 }}>
      <div className="jr-details-card__button-group">
        {children}
      </div>
    </div>
  );
};

export default DetailsCard;
