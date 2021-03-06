import React from 'react';

import './About.css';

const About = () => {
  const url = 'https://www.linkedin.com/in/amabelle-trachtenberg/';

  return (
    // <React.Fragment>

    <div className="about-container">
      <h3 className="margin-top">Community storages is</h3>
      <h1>A New Playground</h1>
      <h2>
        Were you can find different kind of storages, reserve items you want to
        borrow, or open and manage a new storage. If it's a tools storage,
        costumes or toys - anything you want. It's my first mern-stack app that
        I built for the community, and it's free:) I built this app, becuase
        there are thing we don't have to bye, that we can share. Becouse it's
        time we'll start to re-think about our consumers habbits.
      </h2>
      <h2>
        You can manage your storage in different ways. Some base it all on
        trust, so there will be no deposit amount or rent cost. But there are
        storages that take into account that there will be some wear and tear.
        So this app supports rent cost, but you don't have to use it. Same for
        the deposit amount.
      </h2>
      <h2>
        You can monitor and manage your storage with the help of the
        <span>charts.</span>
        There are two kind of managment support chart here.
        <span>Storage Items Count: </span>
        Every time you want to add a new node - it will show the current amount
        of items in the storage, and the current amount of items out.
        <span>Income Charts: </span>two mode, the first presents income per day
        for the last 30 days, the second will show the income per month. You can
        print or save them to your local memory at any given time.
      </h2>

      <h3 className="my-linkedIn">
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
