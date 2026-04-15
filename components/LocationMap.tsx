export default function LocationMap({ isDayMode }: { isDayMode: boolean }) {
  return (
    <section className="py-8 px-4 relative overflow-hidden z-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-6 relative z-10 w-full">
        
        {/* Left: Map */}
        <div className={`w-full md:w-1/2 flex flex-col p-6 md:p-8 rounded-[2rem] transition-all duration-[2500ms] ${isDayMode ? 'bg-white/10 border border-white/20 shadow-xl backdrop-blur-md' : 'bg-[#0f1423]/30 border border-white/10 shadow-xl backdrop-blur-md'}`}>
          <div className="mb-6">
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>
              <span className={`transition-all duration-[2500ms] ${isDayMode ? 'animate-text-gradient bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600' : 'text-[#fdfd96]'}`}>Lieu</span>
            </h2>
            <div>
              <p className={`text-xl font-bold transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>Espace culturel Le Coléo</p>
              <p className={`text-base font-medium transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-200'}`}>86 rue de Pont Haubané<br/>38530 Pontcharra, France</p>
            </div>
          </div>
          
          <div className="w-full rounded-[1.5rem] overflow-hidden relative flex-1 min-h-[220px] shadow-inner border transition-colors duration-[2500ms] border-white/10">
            <iframe 
              src="https://maps.google.com/maps?q=Espace%20Culturel%20Le%20Col%C3%A9o,%2086%20rue%20de%20Pont%20Hauban%C3%A9,%2038530%20Pontcharra,%20France&t=h&z=17&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className={`absolute inset-0 transition-all duration-[2500ms] hover:grayscale-0 hover:opacity-100 ${isDayMode ? 'grayscale-0 opacity-100' : 'grayscale-[40%] opacity-90'}`}
            ></iframe>
          </div>
        </div>

        {/* Right: Rules/Contest Details */}
        <div className={`w-full md:w-1/2 flex flex-col justify-center space-y-6 p-8 md:p-10 rounded-[2rem] transition-all duration-[2500ms] ${isDayMode ? 'bg-white/10 border border-white/20 shadow-xl backdrop-blur-md' : 'bg-[#0f1423]/30 border border-white/10 shadow-xl backdrop-blur-md'}`}>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>
            Détails de <span className={`transition-all duration-[2500ms] ${isDayMode ? 'animate-text-gradient bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600' : 'text-[#fdfd96]'}`}>Candidature</span>
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <h4 className={`font-bold uppercase tracking-widest text-sm transition-colors duration-[2500ms] ${isDayMode ? 'text-rose-600' : 'text-[#ffb7c5]'}`}>Thème</h4>
                <p className={`text-lg font-medium transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-200'}`}>"La fleur ou le printemps"</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏆</span>
              <div>
                <h4 className={`font-bold uppercase tracking-widest text-sm transition-colors duration-[2500ms] ${isDayMode ? 'text-rose-600' : 'text-[#ffb7c5]'}`}>Objectif</h4>
                <p className={`text-lg font-medium transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-200'}`}>Gagner des places pour les affrontements WGTF.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">💌</span>
              <div>
                <h4 className={`font-bold uppercase tracking-widest text-sm transition-colors duration-[2500ms] ${isDayMode ? 'text-rose-600' : 'text-[#ffb7c5]'}`}>Soumission</h4>
                <p className={`text-lg font-medium transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-200'}`}>Avant le 27 avril 2026 à <br className="hidden md:block"/><a href="mailto:leo.pontcharra@leolagrange.org" className="underline hover:text-rose-500">leo.pontcharra@leolagrange.org</a></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
