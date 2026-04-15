import React, { useState, FormEvent } from 'react';
import { useStripe, useElements, PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';

export default function CheckoutForm({ amount, isDayMode }: { amount: number; isDayMode: boolean }) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; 
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
        receipt_email: email, // Strips handles the automatic invoice receipt dispatch
      },
    });

    if (error) {
      // If payment fails instantly (Declined, Insufficient Funds)
      setErrorMessage(error.message || 'Le paiement a été refusé. Veuillez vérifier vos informations.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
      <PaymentElement 
        id="payment-element" 
        options={{ layout: 'accordion' }} 
        onReady={() => setIsReady(true)} 
      />
      
      {errorMessage && (
        <div className={`mt-2 p-3 rounded-lg text-sm text-center font-medium ${isDayMode ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-rose-900/40 text-rose-300 border border-rose-500/30'}`}>
          ⚠️ {errorMessage}
        </div>
      )}

      {isReady && (
        <button
          disabled={isProcessing || !stripe || !elements}
          className={`w-full mt-4 py-4 font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-2 ${
            isDayMode 
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/25 disabled:opacity-50 disabled:hover:scale-100' 
              : 'bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white shadow-pink-500/25 disabled:opacity-50 disabled:hover:scale-100'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Traitement sécurisé...
            </>
          ) : (
            `Payer sécurisé (${amount}€)`
          )}
        </button>
      )}
    </form>
  );
}
