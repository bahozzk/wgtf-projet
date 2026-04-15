export default function MyStatement({ isDayMode }: { isDayMode: boolean }) {
  return (
    <section id="statement-section" className="pt-24 pb-12 px-4 relative">
      <div className={`max-w-5xl mx-auto relative z-10 flex flex-col items-center p-8 md:p-12 rounded-[2rem] transition-all duration-[2500ms] ${isDayMode ? 'bg-white/10 border border-white/20 shadow-xl backdrop-blur-md' : 'bg-[#0f1423]/30 border border-white/10 shadow-xl backdrop-blur-md'}`}>
        
        <div className="mb-4 flex items-center justify-center">
          <p className={`font-bold tracking-widest uppercase text-base flex items-center gap-3 transition-all duration-[2500ms] ${isDayMode ? 'text-rose-600' : 'text-[#9DC183]'}`}>
            <span className="text-xl">{isDayMode ? '☁️' : '🌙'}</span> Note de l'artiste
          </p>
        </div>

        <div className={`text-center max-w-3xl mx-auto text-lg leading-relaxed font-medium transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-800' : 'text-slate-100'}`}>
          <p className="mb-6">
            Vous avez demandé une création sur le thème de <span className={`font-bold transition-all duration-[2500ms] ${isDayMode ? 'animate-text-gradient bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600' : 'text-[#ffb7c5]'}`}>la fleur ou du printemps</span>.
          </p>
          
          <p className="mb-6">
            Au lieu d'une simple image, j'ai conçu et codé <span className={`font-bold uppercase transition-all duration-[2500ms] ${isDayMode ? 'animate-text-gradient bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600 border-b-2 border-rose-500/30' : 'text-white border-b-2 border-white/20'}`}>cette expérience numérique</span>.
          </p>

          <blockquote className={`my-8 text-2xl md:text-3xl leading-snug font-bold transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>
            "Le Hip-Hop est la fondation, et le code est la façon dont je fais fleurir mes idées."
          </blockquote>
          
          <p>
            Voici ma candidature pour gagner les places via le concours de la Maison des Jeunes, tout en mettant en valeur l'incroyable événement de Nextape.
          </p>
        </div>

      </div>
    </section>
  );
}
