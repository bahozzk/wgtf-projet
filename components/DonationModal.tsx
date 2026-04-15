import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Initialize Stripe outside component to avoid recreation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isDayMode: boolean;
  forceSuccess?: boolean;
}

export default function DonationModal({ isOpen, onClose, isDayMode, forceSuccess = false }: Props) {
  const [amount, setAmount] = useState<number>(10);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customVal, setCustomVal] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isFetchingIntent, setIsFetchingIntent] = useState(false);

  // Trigger animation after mount
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // If opened in forceSuccess mode (after Stripe redirect), don't fetch intent
      if (!forceSuccess) {
        fetchPaymentIntent(amount);
      }
    } else {
      setTimeout(() => setMounted(false), 300); // match transition duration
      setClientSecret(null);
      setIsCustomAmount(false);
    }
  }, [isOpen, forceSuccess, amount]); // Re-fetch intent if amount changes

  const fetchPaymentIntent = async (value: number) => {
    setIsFetchingIntent(true);
    setClientSecret(null); // Clear previous intent
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();
      if (res.ok) {
        setClientSecret(data.clientSecret);
      } else {
        console.error('Failed to init intent', data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingIntent(false);
    }
  };

  if (!isOpen && !mounted) return null;

  const appearance = {
    theme: isDayMode ? 'stripe' : 'night',
    variables: {
      colorPrimary: isDayMode ? '#e11d48' : '#db2777',
      colorBackground: isDayMode ? '#ffffff' : '#11131c', // Match modal background exactly
      colorText: isDayMode ? '#0f172a' : '#f8fafc',
      borderRadius: '12px',
    },
  } as const;

  return (
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center pointer-events-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-md mx-4 p-8 rounded-3xl shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto overflow-x-hidden ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} ${isDayMode ? 'bg-white border border-white/40' : 'bg-[#11131c] border border-white/10'}`}>
        
        {/* Close Button */}
        <button onClick={onClose} className={`absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-10 ${isDayMode ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/10 text-slate-500'}`}>
          ✕
        </button>

        {forceSuccess ? (
          <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDayMode ? 'text-slate-900' : 'text-white'}`}>Paiement Réussi !</h2>
            <p className={`mb-6 text-sm font-medium leading-relaxed ${isDayMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Merci énormément pour votre soutien à mon travail.<br/>
              <span className="opacity-80">Une copie de votre facture a été envoyée à votre adresse e-mail.</span>
            </p>
            <button 
              onClick={onClose}
              className={`px-8 py-3 rounded-full font-bold ${isDayMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">💻</div>
              <h2 className={`text-xl font-bold tracking-tight mb-1 ${isDayMode ? 'text-slate-900' : 'text-white'}`}>
                Soutenir le développeur
              </h2>
              <p className={`text-xs ${isDayMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Via paiement sécurisé Stripe.
              </p>
            </div>

            {/* Selected Amount UI (Triggers re-fetch only on submit) */}
            <div className="mb-6 h-10 w-full relative">
              <div className={`absolute inset-0 transition-opacity duration-300 ${isCustomAmount ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const val = parseInt(customVal, 10);
                    if (val && val >= 1) {
                      setAmount(val);
                      setIsCustomAmount(false);
                    }
                  }}
                  className="flex gap-2 h-full"
                >
                  <div className="relative flex-1 h-full">
                    <input 
                      type="number" 
                      min="1"
                      placeholder="Montant libre"
                      value={customVal}
                      onChange={(e) => setCustomVal(e.target.value)}
                      className={`w-full h-full pl-4 pr-8 rounded-lg border focus:outline-none focus:ring-1 transition-all ${
                        isDayMode 
                          ? 'border-slate-300 focus:border-sky-500 focus:ring-sky-500 text-slate-800 bg-white' 
                          : 'border-white/20 focus:border-sky-400 focus:ring-sky-400 text-white bg-black/40 placeholder-slate-500'
                      }`}
                    />
                    <span className={`absolute right-3 top-[10px] font-bold ${isDayMode ? 'text-slate-400' : 'text-slate-500'}`}>€</span>
                  </div>
                  <button 
                    type="submit"
                    className={`px-4 h-full font-bold rounded-lg transition-all ${isDayMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
                  >
                    OK
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsCustomAmount(false)}
                    className={`px-4 h-full font-bold rounded-lg border transition-all ${isDayMode ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200' : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/20'}`}
                  >
                    X
                  </button>
                </form>
              </div>

              <div className={`absolute inset-0 flex justify-center gap-2 transition-opacity duration-300 ${!isCustomAmount ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
                {[5, 10, 20].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      if (amount !== val) setAmount(val);
                    }}
                    className={`flex-1 h-full font-bold rounded-lg border transition-all duration-200 ${
                      amount === val 
                        ? (isDayMode ? 'border-sky-500 bg-sky-50 text-sky-600' : 'border-sky-500 bg-sky-500/20 text-sky-300')
                        : (isDayMode ? 'border-slate-200 text-slate-600 hover:border-slate-300' : 'border-white/10 text-slate-400 hover:border-white/20')
                    }`}
                  >
                    {val}€
                  </button>
                ))}
                <button
                  onClick={() => setIsCustomAmount(true)}
                  className={`flex-1 h-full font-bold rounded-lg border transition-all duration-200 ${
                      ![5, 10, 20].includes(amount)
                        ? (isDayMode ? 'border-sky-500 bg-sky-50 text-sky-600' : 'border-sky-500 bg-sky-500/20 text-sky-300')
                        : (isDayMode ? 'border-slate-200 text-slate-600 hover:border-slate-300' : 'border-white/10 text-slate-400 hover:border-white/20')
                  }`}
                >
                  {![5, 10, 20].includes(amount) ? `${amount}€` : 'Autre'}
                </button>
              </div>
            </div>

            {/* Real Stripe Elements Container */}
            <div className="min-h-[250px] relative">
              {isFetchingIntent && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
                   <svg className="animate-spin h-8 w-8 text-sky-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                </div>
              )}
              
              {clientSecret && (
                <div className={`transition-opacity duration-300 ${isFetchingIntent ? 'opacity-30' : 'opacity-100'}`}>
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                    <CheckoutForm amount={amount} isDayMode={isDayMode} />
                  </Elements>
                </div>
              )}
            </div>

            <div className={`text-center mt-6 text-[11px] uppercase tracking-wider font-bold opacity-40 flex items-center justify-center gap-1.5 ${isDayMode ? 'text-slate-600' : 'text-slate-400'}`}>
               🔒 Paiement 100% sécurisé et chiffré par Stripe
            </div>
          </>
        )}
      </div>
    </div>
  );
}
