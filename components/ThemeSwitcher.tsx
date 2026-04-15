import React from 'react';

export default function ThemeSwitcher({ isDayMode, onToggle }: { isDayMode: boolean, onToggle: () => void }) {
  return (
    <button 
      onClick={onToggle}
      className={`fixed top-8 left-8 z-[100] w-[84px] h-10 rounded-full p-1 transition-colors duration-700 ease-in-out shadow-2xl overflow-hidden
      ${isDayMode ? 'bg-gradient-to-r from-sky-400 to-blue-300' : 'bg-gradient-to-r from-[#2B1B54] to-[#4B2F89]'}`}
      aria-label="Toggle Theme"
      title="Changer le thème"
    >
      {/* Background Decorations (Clouds/Stars) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Day Clouds */}
        <div className={`absolute bottom-[-3px] right-2 transition-all duration-700 ${isDayMode ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
           <svg width="40" height="20" viewBox="0 0 50 25" fill="white" className="opacity-80">
              <path d="M10,25 Q5,25 5,20 Q5,15 10,15 Q12,10 20,10 Q28,10 30,17 Q35,17 35,22 Q35,25 30,25 Z" />
              <path d="M25,25 Q20,25 20,18 Q20,12 28,12 Q33,12 35,16 Q40,16 42,20 Q44,25 38,25 Z" />
           </svg>
        </div>
        
        {/* Night Stars & Dark Clouds */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isDayMode ? 'opacity-0' : 'opacity-100'}`}>
           <div className="absolute top-2 left-8 w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_2px_white]"></div>
           <div className="absolute top-5 left-10 w-[1.5px] h-[1.5px] bg-white/80 rounded-full shadow-[0_0_2px_white]"></div>
           <div className="absolute top-2 left-14 w-[1px] h-[1px] bg-white/60 rounded-full shadow-[0_0_2px_white]"></div>
           <div className="absolute top-7 left-14 w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_2px_white]"></div>
           <div className="absolute top-4 left-18 w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_2px_white]"></div>

           {/* Subtle Purple Night Clouds */}
           <div className="absolute bottom-[-2px] right-0">
             <svg width="35" height="16" viewBox="0 0 45 20" fill="#6A4C9C" className="opacity-60">
                <path d="M10,20 Q5,20 5,15 Q5,10 10,10 Q12,5 20,5 Q28,5 30,12 Q35,12 35,17 Q35,20 30,20 Z" />
             </svg>
           </div>
        </div>
      </div>

      {/* The Knob (Sun/Moon) */}
      <div 
        className={`relative w-8 h-8 rounded-full transition-transform duration-700 cubic-bezier([0.68,-0.55,0.26,1.55]) shadow-[inset_-3px_-3px_4px_rgba(0,0,0,0.2),0_2px_5px_rgba(0,0,0,0.3)]
        ${isDayMode 
          ? 'bg-[#FFD700]' // Sun 
          : 'bg-[#E8E8E8]' // Moon
        }`}
        style={{ transform: isDayMode ? 'translateX(44px)' : 'translateX(0)' }}
      >
        {/* Moon Craters (only visible at night) */}
        <div className={`absolute inset-0 transition-opacity duration-300 delay-200 ${isDayMode ? 'opacity-0' : 'opacity-100'}`}>
           <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
           <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-black/15 shadow-inner"></div>
           <div className="absolute top-3 left-1 w-1 h-1 rounded-full bg-black/15 shadow-inner"></div>
        </div>
      </div>
    </button>
  );
}
