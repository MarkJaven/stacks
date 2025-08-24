// src/pages/LandingPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import stacksLogo from "../images/stacks-logo.png";
import "../styles/LandingPage.css";

const pageVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.66, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

export default function LandingPage() {
  const handleGetStarted = () => {
    window.alert("Get Started clicked");
  };
  const handleWatchDemo = () => {
    window.alert("Watch Demo clicked");
  };

  return (
    <motion.section
      className="hero"
      initial="hidden"
      animate="show"
      variants={pageVariants}
    >
      {/* animated gradient overlay */}
      <div className="animated-gradient" aria-hidden="true" />

      {/* Background depth layers */}
      <div className="soft-spot" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Header */}
      <header className="hero-header" role="banner" style={{ zIndex: 6 }}>
        <div className="logo">
          <img src={stacksLogo} alt="Stacks Logo" className="site-logo" />
          <span className="brand">Stacks</span>
        </div>

        <nav className="top-icons" aria-label="social">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="icon-link"
            title="Instagram"
          >
            <FaInstagram className="social-icon" />
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="icon-link"
            title="Telegram"
          >
            <FaTelegramPlane className="social-icon" />
          </a>
        </nav>
      </header>

      {/* Main content */}
      <main className="hero-content" role="main" style={{ zIndex: 6 }}>
        <motion.h1
          className="hero-title"
          variants={fadeUp}
          style={{ margin: 0 }}
          aria-label="Organize your work smarter with Stacks"
        >
          Organize your work
          <br />
          <motion.span
            className="line-2"
            style={{ display: "inline-block" }}
            variants={fadeUp}
          >
            smarter with <strong>Stacks</strong>
          </motion.span>
        </motion.h1>

        <motion.p className="hero-sub" variants={fadeIn}>
          Plans, notes, and tasks in one connected space. Clear structure.
          <br />
          Seamless flow. Fewer distractions.
        </motion.p>

        <motion.div
          className="hero-ctas"
          variants={fadeUp}
          style={{ alignItems: "center" }}
        >
          <motion.button
            className="btn btn-primary"
            onClick={handleGetStarted}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label="Get Started"
          >
            Get Started
          </motion.button>

          <motion.button
            className="btn btn-outline"
            onClick={handleWatchDemo}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label="Watch Demo"
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </main>
    </motion.section>
  );
}
