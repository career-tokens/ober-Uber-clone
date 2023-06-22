import React from 'react';
import ridehailingapp from '../Screenshot 2023-05-16 at 07-38-41 ride hailing app - Google Search.png';
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
            onClick={() => {
              window.location.href = '/home';
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              window.location.href = '/home';
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
          <img src={ridehailingapp} alt="Random Image" />
        </div>

        {/* More ways to use Uber */}
        <div className="section">
          <h2>More ways to use Ober</h2>
          <div className="scroll-container">
            <div className="scroll-item taxi">
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
              <div className="title">Ober XL</div>
              <div className="description">
                Premium rides in high-end cars for up to 4-6 people
              </div>
            </div>
          </div>
        </div>

        {/* Ways to plan with Uber */}
        <div className="section">
          <h2>Ways to plan with Ober</h2>
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
              <div className="title">Ober Eats</div>
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
