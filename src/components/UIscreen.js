import React from 'react';
import waving from '../waving_man_changed.jpg';
import taxi from '../fotor-ai-2023050910018.jpg';
import bike from "../biker_uber (1).jpg";
import suv from "../suv_uber (1).jpg"
import calendar from "../calendar_uber (1).jpg"
import intercity from "../car_mountain (1).jpg"
import ubereats from "../uber_eats (1).jpg"

const UIscreen = () => {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="search-container">
          <img
            src='data:image/png;base64,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'
            alt="Search Icon"
            className="search-icon"
          />
          <input
            type="text"
            placeholder="Enter pick up point"
            className="search-input"
          />
          <button
            className="search-btn"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Large image container */}
        <div className="image-container">
          <img src={waving} alt="Random Image" />
        </div>

        {/* More ways to use Uber */}
        <div className="section">
          <h2>More ways to use Uber</h2>
          <div className="scroll-container">
            <div className="scroll-item">
              <img src={taxi} alt="Image 1" />
              <div className="title">On-demand taxis</div>
              <div className="description">
                Request a local taxi on demand
              </div>
            </div>
            <div className="scroll-item">
              <img src={bike} alt="Image 2" />
              <div className="title">Fast and Slick Bikes</div>
              <div className="description">
                Affordable and fast bike rides to reach office on time!
              </div>
            </div>
            <div className="scroll-item">
              <img src={suv} alt="Image 3" />
              <div className="title">Uber XL</div>
              <div className="description">
                Premium rides in high-end cars for up to 4-6 people
              </div>
            </div>
          </div>
        </div>

        {/* Ways to plan with Uber */}
        <div className="section">
          <h2>Ways to plan with Uber</h2>
          <div className="scroll-container">
            <div className="scroll-item">
              <img src={calendar} alt="Image 4" />
              <div className="title">Schedule a ride</div>
              <div className="description">
                Plan ahead by scheduling a ride in advance
              </div>
            </div>
            <div className="scroll-item">
              <img src={intercity} alt="Image 5" />
              <div className="title">Intercity Traveller</div>
              <div className="description">
                Travel intercity comfortably 
              </div>
            </div>
            <div className="scroll-item">
              <img src={ubereats} alt="Image 6" />
              <div className="title">Uber Eats</div>
              <div className="description">
                Get food delivered from your favorite restaurants
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIscreen;
