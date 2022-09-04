import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <React.Fragment>
      <div className="lds-heart">
        <div></div>
      </div>
    </React.Fragment>
  );
};

export default LoadingSpinner;
