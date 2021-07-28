import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';

import './LoadingSpinner.css';

const TEXTS = ['Colaboration', 'Inovation', 'Cooperation', 'Resource based economy'];

const LoadingSpinner = props => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
      window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000 // every 2 seconds
    );
    return () => clearTimeout(intervalId);
    }, []);

  return (
    <React.Fragment>
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
      
      <TextTransition
      text={TEXTS[index % TEXTS.length]}
      springConfig={presets.molasses}
      className="about-text"
    />
    
      {/* <h2>
      Were you can find different kind of storages, reserve items you want to
      borrow, or open and manage a new storage. If it's a tools storage,
      costumes or toys - anything you want. It's my first mern-stack app that
      I built for the community, and it's free:) I built this app, becuase
      there are thing we don't have to bye, that we can share. Becouse it's
      time we'll start to re-think about our consumers habbits.
      </h2> */}
      </div>
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
     
      <div className="lds-dual-ring"></div>
    </div>
    </React.Fragment>
  );
};

export default LoadingSpinner;
