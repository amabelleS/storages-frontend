import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <React.Fragment>
      <div class="lds-heart">
        <div></div>
      </div>
    </React.Fragment>
  );
};

export default LoadingSpinner;
