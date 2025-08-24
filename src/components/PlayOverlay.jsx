import React from "react";

export default function PlayOverlay() {
  return (
    <div className="play-overlay" aria-hidden="true">
      <div className="play-circle">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 5v14l11-7z" fill="rgba(255,255,255,0.95)"/>
        </svg>
      </div>
    </div>
  );
}
