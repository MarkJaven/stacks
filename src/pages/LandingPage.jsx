// src/pages/LandingPage.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import stacksLogo from "../images/stacks-logo.png";
import "../styles/LandingPage.css";

const pageVariants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.66, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } };

export default function LandingPage() {
  const turbRef = useRef(null);
  const rafRef = useRef(null);

  // SUBTLE JS-driven animation for baseFrequency (very small amplitude)
  useEffect(() => {
    let start = performance.now();
    function loop(now) {
      const t = (now - start) / 1000; // seconds

      // Very gentle motion: small amplitude and slow speed so noise isn't noticeable
      const bfX = 0.025 + Math.sin(t * 0.35) * 0.004; // ~0.021 - 0.029
      const bfY = 0.035 + Math.cos(t * 0.28) * 0.004; // ~0.031 - 0.039

      if (turbRef.current) {
        turbRef.current.setAttribute("baseFrequency", `${bfX.toFixed(4)} ${bfY.toFixed(4)}`);
        // subtle seed shifts for tiny variation
        turbRef.current.setAttribute("seed", Math.floor(1 + Math.sin(t * 0.4) * 1.5));
        turbRef.current.setAttribute("numOctaves", "1");
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleGetStarted = () => window.alert("Get Started clicked");
  const handleWatchDemo = () => window.alert("Watch Demo clicked");

  return (
    <motion.section className="hero" initial="hidden" animate="show" variants={pageVariants}>
      {/* animated gradient overlay */}
      <div className="animated-gradient" aria-hidden="true" />

      {/* moving blurred color blobs (keeps motion obvious) */}
      <div className="moving-blob blob-left" aria-hidden="true" />
      <div className="moving-blob blob-right" aria-hidden="true" />

      {/* SVG noise overlay (very subtle) */}
      <svg
        className="noise-svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="noiseFilter">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.025 0.035"
            numOctaves="1"
            stitchTiles="stitch"
            result="turb"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            {/* very low alpha mapping so noise is barely there */}
            <feFuncA type="table" tableValues="0 0.04" />
          </feComponentTransfer>
        </filter>
        <rect x="0" y="0" width="100%" height="100%" filter="url(#noiseFilter)"></rect>
      </svg>

      {/* depth layers */}
      <div className="soft-spot" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Header */}
      <header className="hero-header" role="banner" style={{ zIndex: 9 }}>
        <div className="logo">
          <img src={stacksLogo} alt="Stacks Logo" className="site-logo" />
          <span className="brand">Stacks</span>
        </div>

        <nav className="top-icons" aria-label="social">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="icon-link" title="Instagram">
            <FaInstagram className="social-icon" />
          </a>

          <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram" className="icon-link" title="Telegram">
            <FaTelegramPlane className="social-icon" />
          </a>
        </nav>
      </header>

      {/* Main content */}
      <main className="hero-content" role="main" style={{ zIndex: 9 }}>
        <motion.h1 className="hero-title" variants={fadeUp} style={{ margin: 0 }}>
          Organize your work
          <br />
          <motion.span className="line-2" style={{ display: "inline-block" }} variants={fadeUp}>
            smarter with <strong>Stacks</strong>
          </motion.span>
        </motion.h1>

        <motion.p className="hero-sub" variants={fadeIn}>
          Plans, notes, and tasks in one connected space. Clear structure.
          <br />
          Seamless flow. Fewer distractions.
        </motion.p>

        <motion.div className="hero-ctas" variants={fadeUp} style={{ alignItems: "center" }}>
          <motion.button className="btn btn-primary" onClick={handleGetStarted} whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }} aria-label="Get Started">
            Get Started
          </motion.button>

          <motion.button className="btn btn-outline" onClick={handleWatchDemo} whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }} aria-label="Watch Demo">
            Watch Demo
          </motion.button>
        </motion.div>
      </main>
    </motion.section>
  );
}
