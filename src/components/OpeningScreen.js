import React from 'react';
import logoWhite from '../logo_white.png';
import { Link } from 'react-router-dom';

function OpeningScreen() {
  return (
    <div className="opening-screen-container">
      <div className="logo-container">
        <img src={logoWhite} alt="Uber Logo" />
      </div>
      <div className="title-container">
        <h1>Get a ride in minutes</h1>
        <p>Or become a driver and earn money on your schedule</p>
      </div>
      <div className="button-container">
        <Link to="/">
          <button className="ride-button">Ride</button>
        </Link>
        <Link to="/">
          <button className="drive-button">Drive</button>
        </Link>
      </div>
    </div>
  );
}

export default OpeningScreen;
