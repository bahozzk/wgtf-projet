export default function EventInfo({ isDayMode }: { isDayMode: boolean }) {
  return (
    <section className="py-12 px-4 relative overflow-hidden z-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-6 relative z-10 w-full">
        
        <div className={`w-full md:w-1/2 space-y-6 p-8 md:p-10 rounded-[2rem] transition-all duration-[2500ms] ${isDayMode ? 'bg-white/10 border border-white/20 shadow-xl backdrop-blur-md' : 'bg-[#0f1423]/30 border border-white/10 shadow-xl backdrop-blur-md'}`}>
          <div className="space-y-2">
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>
              Le <span className={`transition-all duration-[2500ms] ${isDayMode ? 'animate-text-gradient bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600' : 'text-[#ffb7c5]'}`}>Festival</span>
            </h2>
            <div className={`w-16 h-2 rounded-full transition-colors duration-[2500ms] ${isDayMode ? 'bg-fuchsia-600' : 'bg-[#9DC183]'}`}></div>
          </div>
          
          <h3 className={`text-2xl font-bold leading-tight transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-100'}`}>
            Who Got The Flower ?! (WGTF) <br/>
            <span className={`transition-all duration-[2500ms] ${isDayMode ? 'animate-text-gradient bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600' : 'text-[#fdfd96]'}`}>11ème Édition</span>
          </h3>

          <p className={`text-base md:text-lg leading-relaxed font-medium transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-200'}`}>
            Le WGTF, organisé par <strong>Nextape</strong>, est un festival international de hip-hop incontournable qui rassemble les meilleurs danseurs mondiaux à Pontcharra.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className={`flex-1 p-8 rounded-[2rem] flex flex-col justify-center gap-2 transition-all duration-[2500ms] ${isDayMode ? 'bg-white/10 border border-white/20 shadow-xl backdrop-blur-md' : 'bg-[#0f1423]/30 border border-white/10 shadow-xl backdrop-blur-md'}`}>
            <div className="flex items-center gap-4">
              <span className="text-4xl">📅</span>
              <div>
                <h4 className={`font-bold uppercase tracking-widest text-xs transition-all duration-[2500ms] ${isDayMode ? 'text-rose-600' : 'text-[#9DC183]'}`}>Dates</h4>
                <p className={`text-xl md:text-2xl font-bold transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>15 - 17 Mai 2026</p>
              </div>
            </div>
          </div>

          <div className={`flex-1 p-8 rounded-[2rem] flex flex-col justify-center gap-2 transition-all duration-[2500ms] ${isDayMode ? 'bg-white/10 border border-white/20 shadow-xl backdrop-blur-md' : 'bg-[#0f1423]/30 border border-white/10 shadow-xl backdrop-blur-md'}`}>
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔥</span>
              <div>
                <h4 className={`font-bold uppercase tracking-widest text-xs transition-all duration-[2500ms] ${isDayMode ? 'text-rose-600' : 'text-[#ffb7c5]'}`}>Programme</h4>
                <p className={`text-xl font-bold transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>Battles 100% Hip-Hop</p>
                <p className={`text-sm font-medium mt-1 transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-300'}`}>Cyphers internationaux, shows chorégraphiques et soirées DJ en direct.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
