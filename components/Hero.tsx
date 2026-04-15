export default function Hero({ isDayMode }: { isDayMode: boolean }) {
  const handleScrollDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById('statement-section');
    if (!nextSection) return;

    // Calculate position: -30 stops perfectly right before the content starts
    const targetPosition = nextSection.getBoundingClientRect().top + window.scrollY - 10;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1200; // Cinematic 1.2s smooth slide
    let start: number | null = null;

    // Premium cinematic ease-in-out curve
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 z-10">
      <div className="flex flex-col items-center gap-6 max-w-5xl relative mt-8 md:mt-12">
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter transition-all duration-[2500ms] ${isDayMode ? 'text-slate-900 text-hero-glow-day' : 'text-white text-hero-glow-night'}`}>
          MA VISION POUR WGTF 2026
        </h1>

        <p className={`text-lg md:text-xl font-medium tracking-wide mt-2 transition-all duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-200'}`}>
          Ceci n'est pas qu'un site web. <br className="md:hidden" />
          <span className={`font-bold transition-all duration-[2500ms] ${isDayMode ? 'animate-text-gradient bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600' : 'text-[#ffb7c5]'}`}>
            C'est ma création numérique pour le concours.
          </span>
        </p>

        <button
          onClick={handleScrollDown}
          className={`mt-4 px-8 py-4 font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 ${isDayMode ? 'bg-white text-slate-900 shadow-xl' : 'bg-white/10 text-white border border-white/20 hover:bg-white/30 shadow-2xl'}`}
        >
          Découvrir mon projet
        </button>
      </div>
    </section>
  );
}
