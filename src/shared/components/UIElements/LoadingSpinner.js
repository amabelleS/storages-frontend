import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TextTransition, { presets } from 'react-text-transition';

import './LoadingSpinner.css';

const TEXTS = ['Colaboration', 'Inovation', 'Cooperation', 'Resource based economy'];

const LoadingSpinner = props => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000 // every 2 seconds
    );
    return () => clearTimeout(intervalId);
    }, []);

  return (
    <React.Fragment>
      {props.isIntro && 
      <div className="loader-text">
      <h1>Community Storages</h1>
      <h2>
         Were you can find different kind of storages, reserve items you want to
      borrow, or open and manage a new storage. If it's a tools storage,
      costumes or toys - anything you want.
      </h2>
      <h2>
        You can login as: Email:<span> bobo@gmail.com</span>, Password:<span> bbbbbb </span> -
        To check the Demo storage full managment functiomalities.
        Please do not delete:)
      </h2>
      <h2>For more info, please check the 
        <Link
          to={{
            pathname: '/about',
            // hash: '.dashboard',
          }}
        >
          About page
        </Link>
      </h2>
      
      <TextTransition
      text={TEXTS[index % TEXTS.length]}
      springConfig={presets.molasses}
      className="about-text"
      />
    </div>}

    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
     
      <div className="lds-dual-ring"></div>
    </div>
    </React.Fragment>
  );
};

export default LoadingSpinner;
