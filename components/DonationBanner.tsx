interface Props {
  isDayMode: boolean;
  onOpenModal: () => void;
}

export default function DonationBanner({ isDayMode, onOpenModal }: Props) {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 z-10 mb-12">
      <div className={`p-8 md:p-10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-[2500ms] ${
        isDayMode 
          ? 'bg-white/40 border border-white/50 shadow-lg backdrop-blur-md' 
          : 'bg-[#0f1423]/40 border border-white/10 shadow-lg backdrop-blur-xl'
      }`}>
        <div className="flex-1 text-center md:text-left">
          <h3 className={`text-2xl font-bold tracking-tight mb-2 transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-900' : 'text-white'}`}>
            Ce projet a été codé avec passion. 💻✨
          </h3>
          <p className={`text-sm md:text-base font-medium transition-colors duration-[2500ms] ${isDayMode ? 'text-slate-700' : 'text-slate-300'}`}>
            Soutenez le développeur derrière cette expérience créative.
          </p>
        </div>
        
        <button 
          onClick={onOpenModal}
          className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex-shrink-0 ${
            isDayMode 
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-rose-500/25' 
              : 'bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white hover:shadow-pink-500/25'
          }`}
        >
          Faire un don
        </button>
      </div>
    </section>
  );
}
