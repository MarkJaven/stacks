// src/components/Header.jsx
import React from "react";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="hero-header" role="banner">
      <div className="logo">
        <Logo />
      </div>

      <nav className="top-icons" aria-label="social">
        {/* Instagram link/icon */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="icon-link"
          title="Instagram"
        >
          {/* simple Instagram glyph (inline SVG) */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none"/>
            <circle cx="12" cy="12" r="3" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none"/>
            <circle cx="17.5" cy="6.5" r="0.7" fill="rgba(255,255,255,0.85)"/>
          </svg>
        </a>

        {/* placeholder for another icon (telegram, etc). Remove if not needed */}
        <button className="circle-icon" aria-label="other" style={{ marginLeft: 10 }} />
      </nav>
    </header>
  );
}
