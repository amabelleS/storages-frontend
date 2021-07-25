import React from 'react';

import './About.css';

const About = () => {
  const url = 'https://www.linkedin.com/in/amabelle-trachtenberg/';
  const myEmail = 'amabelletr@gmail.com';

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
        In order to reserve items, or open and manage a new storage, users have
        to authenticate with their email, name, facebook-name (optional), et
        cetera. Those personal details are for storage managers in order to
        confirm reservation, if needed.
      </h2>
      <h2>
        As a manager of a storage (the user who created a new storage has
        manager athorization, for this one storage) you can update your storage
        and reseve and unreserve items fot other users (if you do reservations
        fot others - their details will not be saved here, do it seperatly or
        instract them to do it by themselves:). You can specify in your storage
        description the opening days and hours - and update whenever you like,
        as suits you best. When the storage is open, people will come to borrow
        items - that is when you update the borrowed item in OUT status, with
        the blue button:). You can search an item by his name, description, or
        internal sirial number if you added one when created. After you checked
        an item in, you or the user who reserved it need to unreserve it - in
        that moment the user details attached to the item will disapear, and
        other users can reserve it.
      </h2>
      <h2>
        You can manage your storage in different ways. Some base it all on
        trust, so there will be no deposit amount or rent cost. But there are
        storages that take into account that there will be some wear and tear.
        So this app supports rent cost, but as a manager you don't have to use
        it. Same for the deposit amount (used by some storages for credit-card
        deposit, not supported with this app).
      </h2>
      <h2>
        You can monitor and manage your storage with the help of the
        <span>Charts.</span>
        There are two kind of managment support chart here.
        <span>Storage Items Count: </span>
        Every time you want to add a new node - it will show the current amount
        of items in the storage, and the current amount of items out.
        <span>Income Charts: </span>There are two modes, the first presents
        income per day for the last 30 days, the second will show the income per
        month. You can print or save them to your local memory at any given
        time.
      </h2>
      <h2>
        You can login as: Email:<span> bobo@gmail.com</span>, Password: bbbbbb -
        To check the Demo storage <span>full managment functiomalities</span>.
        Please do not delete:)
      </h2>
      <h2>
        If you want to open a storage and you have more questions, you can mail
        me for support to: {/* <address> */}
        <a href={'mailto:' + myEmail}> Storages Support Email</a>
        {/* </address> */}
      </h2>

      <h3 className="my-linkedIn">
        If you know about an open position for a Full-Stack developer, please hook us
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
