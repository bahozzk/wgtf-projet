export default function Footer({ isDayMode }: { isDayMode: boolean }) {
  return (
    <footer className="pt-8 pb-10 px-4 text-center relative z-10 w-full flex flex-col items-center">
      <div className={`max-w-5xl mx-auto flex flex-col items-center gap-6 relative z-10 w-full p-8 md:p-12 rounded-[2rem] transition-all duration-[2500ms] ${isDayMode ? 'bg-white/10 border border-white/20 shadow-xl backdrop-blur-md' : 'bg-[#0f1423]/30 border border-white/10 shadow-xl backdrop-blur-md'}`}>
        
        <p className={`text-lg font-medium transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-200'}`}>
          Propulsé par la <br className="hidden md:block"/>
          <span className={`text-xl md:text-2xl font-bold uppercase tracking-wider transition-all duration-[2500ms] ${isDayMode ? 'animate-text-gradient bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600' : 'text-[#ffb7c5]'}`}>Maison des Jeunes Pontcharra</span>
        </p>

        <div className="flex flex-col items-center gap-1">
          <p className={`text-lg font-bold transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>88 rue du 19 mars 1962</p>
          <p className={`text-lg font-bold transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>38530 Pontcharra</p>
        </div>
        
        <div className={`flex flex-col md:flex-row items-center justify-center gap-6 mt-6 pt-6 w-full border-t border-dashed transition-all duration-[2500ms] ${isDayMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <a href="mailto:leo.pontcharra@leolagrange.org" className={`text-base font-bold tracking-widest transition-all duration-[2500ms] hover:scale-105 ${isDayMode ? 'text-rose-600' : 'text-[#9DC183] hover:text-white'}`}>leo.pontcharra@leolagrange.org</a>
          <span className={`hidden md:inline opacity-50 font-bold transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>///</span>
          <span className={`text-base font-bold tracking-widest transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-200'}`}>07.63.51.09.77</span>
        </div>
        
      </div>
    </footer>
  );
}
