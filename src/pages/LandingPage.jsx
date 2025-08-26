// src/pages/LandingPage.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import stacksLogo from "../images/stacks-logo.png";
import "../styles/LandingPage.css";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import ForgotForm from "../components/ForgotForm";
import ResetForm from "../components/ResetForm";
import Modal from "../components/Modal";

const pageVariants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.66, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } };

export default function LandingPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const turbRef = useRef(null);
  const rafRef = useRef(null);

  // Subtle noise animation
  useEffect(() => {
    let start = performance.now();
    function loop(now) {
      const t = (now - start) / 1000;
      const bfX = 0.025 + Math.sin(t * 0.35) * 0.004;
      const bfY = 0.035 + Math.cos(t * 0.28) * 0.004;

      if (turbRef.current) {
        turbRef.current.setAttribute("baseFrequency", `${bfX.toFixed(4)} ${bfY.toFixed(4)}`);
        turbRef.current.setAttribute("seed", Math.floor(1 + Math.sin(t * 0.4) * 1.5));
        turbRef.current.setAttribute("numOctaves", "1");
      }

      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <motion.section className="hero" initial="hidden" animate="show" variants={pageVariants}>
        <div className="animated-gradient" aria-hidden="true" />
        <div className="moving-blob blob-left" aria-hidden="true" />
        <div className="moving-blob blob-right" aria-hidden="true" />

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
              <feFuncA type="table" tableValues="0 0.04" />
            </feComponentTransfer>
          </filter>
          <rect x="0" y="0" width="100%" height="100%" filter="url(#noiseFilter)"></rect>
        </svg>

        <div className="soft-spot" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />

        {/* Header */}
        <header className="hero-header" role="banner" style={{ zIndex: 9 }}>
          <div className="logo">
            <img src={stacksLogo} alt="Stacks Logo" className="site-logo" />
            <span className="brand">Stacks</span>
          </div>
          <nav className="top-icons" aria-label="social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="icon-link">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram" className="icon-link">
              <FaTelegramPlane className="social-icon" />
            </a>
          </nav>
        </header>

        {/* Hero Content */}
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
            <motion.button
               className="btn btn-primary"
                onClick={() => { 
                  console.log("Get Started clicked"); 
                  setIsSignUpOpen(true);
                }}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                >
              Get Started
            </motion.button>
            <motion.button
              className="btn btn-outline"
              onClick={() => window.alert("Watch Demo clicked")}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </main>
      </motion.section>

       {/* Sign Up Modal */}
      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUpForm
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToLogin={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm
          onClose={() => setIsLoginOpen(false)}
          onSwitchToSignup={() => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
          onForgotPassword={() => {
            setIsLoginOpen(false);
            setIsForgotOpen(true);
          }}
        />
      </Modal>

      {/* Forgot Modal */}
      <Modal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)}>
        <ForgotForm
          onClose={() => setIsForgotOpen(false)}
          onBackToLogin={() => {
            setIsForgotOpen(false);
            setIsLoginOpen(true);
          }}
          onSubmit={() => {
            setIsForgotOpen(false);
            setIsResetOpen(true);
          }}
        />
      </Modal>

      <Modal isOpen={isResetOpen} onClose={() => setIsResetOpen(false)}>
        <ResetForm
          onClose={() => setIsResetOpen(false)}
          onBackToLogin={() => {
            setIsResetOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </Modal>


    </>
  );
}
