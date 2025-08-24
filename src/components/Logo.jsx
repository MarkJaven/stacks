// src/components/Logo.jsx
import React from "react";

export default function Logo() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {/* Site logo image: put your file at public/images/logo.png */}
      <img
        src="/images/stacks-logo.png"
        alt="Stacks logo"
        className="site-logo"
        onError={(e) => {
          // fallback to simple SVG if image not found
          e.currentTarget.style.display = "none";
          const el = document.createElement("span");
          el.innerHTML = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="4" width="20" height="4" rx="1.5" fill="white" opacity="0.95"/>
            <rect x="2" y="10" width="20" height="4" rx="1.5" fill="white" opacity="0.75"/>
          </svg>`;
          e.currentTarget.parentNode.insertBefore(el, e.currentTarget);
        }}
        style={{ width: 34, height: 34, objectFit: "contain" }}
      />

      <span style={{ fontWeight: 600, letterSpacing: 0.2, color: "white" }}>Stacks</span>
    </div>
  );
}
