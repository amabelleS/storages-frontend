import React from 'react';

import './About.css';

const About = () => {
  const url = 'https://www.linkedin.com/in/amabelle-trachtenberg/';

  return (
    // <React.Fragment>

    <div className="img-container">
      <h3>Community storages is</h3>
      <h1>A New Playground</h1>
      <h2>
        Were you can reserve items you want to borrow, or open and manage a new
        storage. If it's a tools storage, costumes or toys - anything you want.
        It's my first mern-stack app that I built for the community, and it's
        free:)
      </h2>
      <h3>
        If you know about an open position for a web developer, please hook us
        up
        <span>
          <a href={url}>My LinkedIn</a>
        </span>
      </h3>
    </div>
    // </React.Fragment>
  );
};

export default About;
