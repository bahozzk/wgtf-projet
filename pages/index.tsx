import Head from 'next/head';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MyStatement from '../components/MyStatement';
import EventInfo from '../components/EventInfo';
import LocationMap from '../components/LocationMap';
import Footer from '../components/Footer';
import FlowerHurricane from '../components/FlowerHurricane';
import ThemeSwitcher from '../components/ThemeSwitcher';
import DonationModal from '../components/DonationModal';
import DonationBanner from '../components/DonationBanner';

export default function Home() {
  const [isDayMode, setIsDayMode] = useState(false);
  const [isHurricaneActive, setIsHurricaneActive] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if the user returned from parsing a safe 3D Secure / Stripe redirect
    const query = new URLSearchParams(window.location.search);
    const status = query.get('redirect_status');

    if (status === 'succeeded') {
      setIsPaymentSuccess(true);
      setIsDonationModalOpen(true);
      window.history.replaceState(null, '', window.location.pathname);
    } else if (status === 'failed' || status === 'requires_payment_method') {
      // Catch async 3D-Secure or delayed failures
      alert("⚠️ Le paiement n'a pas pu aboutir ou a été refusé par votre banque. Veuillez réessayer.");
      setIsDonationModalOpen(true);
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const toggleTheme = () => {
    setIsHurricaneActive(true);
    setIsDayMode(prev => !prev);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-sky-400 selection:text-white relative z-0">
      <Head>
        <title>Concours WGTF 2026 | Nextape & Maison des Jeunes</title>
        <link rel="icon" href={isDayMode ? "/favicon.ico?v=3" : "/favicon1.ico?v=3"} />
      </Head>

      {/* Top Header Donation Button */}
      <button
        onClick={() => setIsDonationModalOpen(true)}
        className={`fixed top-8 left-[130px] z-[100] px-4 py-2.5 h-10 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md border flex items-center gap-1.5 ${
          isDayMode
            ? 'bg-rose-50/80 text-rose-700 border-rose-200 hover:bg-white hover:shadow-rose-500/20'
            : 'bg-[#0f1423]/60 text-pink-300 border-pink-500/30 hover:bg-black/40 hover:shadow-pink-500/20'
        }`}
      >
        <span>💖</span> <span>Soutenir</span>
      </button>

      <div className={`fixed inset-0 w-full h-full -z-[50] transition-colors duration-[3000ms] ${isDayMode ? 'bg-[#2986cc]' : 'bg-[#000412]'}`} />

      <div className="fixed inset-0 w-full h-full -z-[40] pointer-events-none overflow-hidden">
        <div style={{ transform: `translateY(${-scrollY * 0.25}px)` }} className="relative w-full h-[200vh] will-change-transform">
          <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat bg-auto animate-pan-stars transition-opacity duration-[3000ms] ${isDayMode ? 'opacity-0' : 'opacity-[0.8]'}`} />
        </div>
      </div>

      <div className="fixed inset-0 w-full h-full -z-[30] pointer-events-none">
        <div className={`absolute inset-0 transition-opacity duration-[3000ms] ${isDayMode ? 'opacity-100' : 'opacity-0'}`}>
          <svg viewBox="0 0 100 50" className="absolute top-[5%] w-[350px] text-white opacity-80 animate-drift-clouds drop-shadow-xl" style={{ animationDelay: '0s', animationDuration: '45s' }}>
            <path fill="currentColor" d="M 25,40 a 15,15 0 0,1 0,-30 h 10 a 25,25 0 0,1 40,0 h 10 a 15,15 0 0,1 0,30 z" />
          </svg>
          <svg viewBox="0 0 100 50" className="absolute top-[20%] w-[500px] text-white opacity-60 animate-drift-clouds drop-shadow-xl" style={{ animationDelay: '-15s', animationDuration: '60s' }}>
            <path fill="currentColor" d="M 20,40 a 15,15 0 0,1 0,-30 h 5 a 25,25 0 0,1 45,0 h 5 a 15,15 0 0,1 0,30 z" />
          </svg>
          <svg viewBox="0 0 100 50" className="absolute top-[40%] w-[250px] text-white opacity-90 animate-drift-clouds drop-shadow-xl" style={{ animationDelay: '-30s', animationDuration: '30s' }}>
            <path fill="currentColor" d="M 25,40 a 15,15 0 0,1 0,-30 h 10 a 25,25 0 0,1 40,0 h 10 a 15,15 0 0,1 0,30 z" />
          </svg>
        </div>

        <div className={`absolute transition-all duration-[3000ms] ease-in-out rounded-full flex overflow-hidden
          ${isDayMode 
            ? 'top-[-5%] right-[-5%] w-[450px] h-[450px] bg-[#fdfd96] shadow-[0_0_150px_rgba(253,253,150,0.6)] opacity-90' 
            : 'top-[8%] right-[5%] lg:right-[8%] w-24 h-24 bg-[#fdfdf7] shadow-[0_0_40px_#fff] opacity-100'
          }`}
        >
          <div className={`absolute top-2 left-4 w-4 h-4 rounded-full bg-black/10 transition-opacity duration-[2000ms] ${isDayMode ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`absolute top-10 left-10 w-6 h-6 rounded-full bg-black/5 transition-opacity duration-[2000ms] ${isDayMode ? 'opacity-0' : 'opacity-100'}`}></div>
        </div>
      </div>

      {/* LAYER 5: Ultra-Wide Horizon & Detailed Silhouette */}
      <div className="fixed bottom-0 w-full z-[10] pointer-events-none">
        <svg 
          className="w-full h-[25vh] object-cover" 
          preserveAspectRatio="xMidYMax slice" 
          viewBox="0 0 2560 350"
        >
          {/* Distant Hill Layer (Deepest) */}
          <path fill={isDayMode ? "#588f41" : "#0a0c16"} className="transition-colors duration-[3000ms]" d="M-100,200 Q600,100 1300,240 T2660,180 L2660,400 L-100,400 Z" />

          {/* Right Side: Distant Forest Cluster (Sunk deep into the earth) */}
          <g transform="translate(1950, 260) scale(0.6)" fill={isDayMode ? "#315923" : "#030408"} className="transition-colors duration-[3000ms]">
            {/* Dense Pine Forest */}
            <path d="M-200,80 L-170,-20 L-140,80 Z" />
            <path d="M-160,95 L-120,-30 L-80,95 Z" />
            <path d="M-100,110 L-60,-10 L-20,110 Z" />
            <path d="M-40,80 L-10,-40 L20,80 Z" />
            <path d="M10,130 L40,-10 L70,130 Z" />
            <path d="M60,100 L90,-20 L120,100 Z" />
            <path d="M100,120 L130,10 L160,120 Z" />
            <path d="M150,90 L180,-10 L210,90 Z" />
          </g>

          {/* Left Side: Distant Forest Cluster */}
          <g transform="translate(450, 260) scale(0.6)" fill={isDayMode ? "#315923" : "#030408"} className="transition-colors duration-[3000ms]">
            <path d="M0,60 L30,-50 L60,60 Z" />
            <path d="M40,80 L70,-40 L100,80 Z" />
            <path d="M80,70 L110,-20 L140,70 Z" />
          </g>

          {/* Midground Hill Layer (Swallows bases flawlessly with modified curve) */}
          <path fill={isDayMode ? "#467a30" : "#05070d"} className="transition-colors duration-[3000ms]" d="M-100,260 Q500,160 1100,280 Q1900,260 2660,230 L2660,400 L-100,400 Z" />

          {/* Center-Left: Cozy Cottage Village */}
          <g transform="translate(800, 255) scale(0.9)" fill={isDayMode ? "#204015" : "#020308"} className="transition-colors duration-[3000ms]">
            {/* Pine Trees behind Village */}
            <path d="M -40,60 L -15,-10 L 10,60 Z" />
            <path d="M 120,60 L 140,-20 L 160,60 Z" />
            <path d="M 150,70 L 170,0 L 190,70 Z" />
            
            {/* Main Cottage */}
            <path d="M 0,40 L 40,-10 L 80,40 L 70,40 L 70,90 L 10,90 L 10,40 Z" />
            <rect x="55" y="-10" width="10" height="30" />
            
            {/* Small Barn attached to right */}
            <path d="M 70,55 L 100,25 L 130,55 L 120,55 L 120,90 L 70,90 Z" />

            {/* Side House on Left */}
            <g transform="translate(-60, 20) scale(0.8)">
              <path d="M 0,40 L 30,0 L 60,40 L 55,40 L 55,80 L 5,80 L 5,40 Z" />
            </g>
            
            {/* Windows (Extremely subtle glow) */}
            <g fill={isDayMode ? "#ffffff" : "#ffba08"}>
              <rect x="30" y="55" width="12" height="18" opacity={isDayMode ? 0.1 : 0.4} />
              <rect x="15" y="50" width="10" height="10" opacity={isDayMode ? 0.1 : 0.4} />
              <rect x="90" y="65" width="15" height="12" opacity={isDayMode ? 0.1 : 0.4} />
              <rect x="-35" y="55" width="10" height="15" opacity={isDayMode ? 0.1 : 0.3} />
            </g>
          </g>

          {/* Center-Right: Majestic Windmill */}
          <g transform="translate(1450, 180) scale(0.9)" fill={isDayMode ? "#162e0c" : "#010103"} className="transition-colors duration-[3000ms]">
            <path d="M 10,220 C 40,0 60,0 90,220 Z" /> {/* Sleeker, curved tall body */}
            <path d="M 40,220 L 40,160 A 10,10 0 0,1 60,160 L 60,220 Z" fill={isDayMode ? "#6ba04a" : "#1a1a2e"} /> {/* Arched Door */}
            
            <g transform="translate(50, 40)">
              <g style={{ transformOrigin: '0px 0px', animation: 'spinWindmill 15s linear infinite' }}>
                <rect x="-3" y="-140" width="6" height="280" fill={isDayMode ? "#204015" : "#05070d"} />
                <rect x="-140" y="-3" width="280" height="6" fill={isDayMode ? "#204015" : "#05070d"} />
                
                {/* Authentic Dutch Sails (Thin, elegant, offset to the trailing edge) */}
                <g fill={isDayMode ? "#2c541e" : "#0a0c16"}>
                  <rect x="3" y="-130" width="18" height="85" />
                  <rect x="-21" y="45" width="18" height="85" />
                  <rect x="-130" y="-21" width="85" height="18" />
                  <rect x="45" y="3" width="85" height="18" />
                </g>
              </g>
            </g>
          </g>

          {/* Foreground Hill Layer (Highest organic curve, robust control points) */}
          <path fill={isDayMode ? "#315e21" : "#02030a"} className="transition-colors duration-[3000ms]" d="M-100,310 Q400,230 1300,340 Q2000,300 2660,290 L2660,400 L-100,400 Z" />
          
          {/* Procedural Flowered Field Scatter across ultra-width */}
          <g className={`transition-opacity duration-[3000ms] ${isDayMode ? 'opacity-100' : 'opacity-0'}`}>
            {[...Array(80)].map((_, i) => {
              const x = (i * 263) % 2560;
              const y = 315 + ((i * 43) % 30);
              const type = i % 3;
              const color = type === 0 ? "#ffb7c5" : type === 1 ? "#fdfd96" : "#ffffff";
              const r = type === 0 ? 4 : type === 1 ? 3 : 3.5;
              return <circle key={i} cx={x} cy={y} r={r} fill={color} />;
            })}
          </g>
        </svg>
      </div>

      <main className="relative z-[20] w-full flex flex-col antialiased">
        <ThemeSwitcher isDayMode={isDayMode} onToggle={toggleTheme} />
        <Hero isDayMode={isDayMode} />
        <MyStatement isDayMode={isDayMode} />
        <EventInfo isDayMode={isDayMode} />
        <LocationMap isDayMode={isDayMode} />
        <DonationBanner isDayMode={isDayMode} onOpenModal={() => setIsDonationModalOpen(true)} />
      </main>

      <Footer isDayMode={isDayMode} />

      <FlowerHurricane isActive={isHurricaneActive} isDayMode={isDayMode} onAnimationComplete={() => setIsHurricaneActive(false)} />
      
      <DonationModal 
        isOpen={isDonationModalOpen} 
        isDayMode={isDayMode} 
        forceSuccess={isPaymentSuccess} 
        onClose={() => {
          setIsDonationModalOpen(false);
          // Briefly delay clearing success state to let exit animation play
          setTimeout(() => setIsPaymentSuccess(false), 500);
        }} 
      />
    </div>
  );
}
