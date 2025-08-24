import React from "react";

export default function CTAButtons({ onGetStarted, onWatchDemo }) {
  return (
    <div className="hero-ctas">
      <button className="btn btn-primary" onClick={onGetStarted}>Get Started</button>
      <button className="btn btn-outline" onClick={onWatchDemo}>Watch Demo</button>
    </div>
  );
}
