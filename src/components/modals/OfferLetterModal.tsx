import React, { useRef, useState, useEffect } from 'react';
import { OfferLetter } from '../../types';
import { X, CheckCircle2, PenTool, Sparkles, FileText, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OfferLetterModalProps {
  offer: OfferLetter;
  onClose: () => void;
  onAccept: (signatureDataUrl: string) => void;
}

export const OfferLetterModal: React.FC<OfferLetterModalProps> = ({ offer, onClose, onAccept }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1e1b4b'; // dark indigo ink
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSignAndAccept = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sigUrl = canvas.toDataURL('image/png');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }

    onAccept(sigUrl);
  };

  const formatMoney = (val: number, cur: 'NGN' | 'USD') => {
    if (cur === 'USD') return `$${val.toLocaleString()}`;
    return `₦${val.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <img 
              src={offer.companyLogo} 
              alt={offer.companyName} 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-lg object-cover bg-white p-0.5"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                Official Employment Offer Letter
              </span>
              <h3 className="text-base font-bold leading-tight">{offer.jobTitle}</h3>
              <p className="text-xs text-slate-300">{offer.companyName} · {offer.location}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offer Document Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Welcome Letter */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <pre className="whitespace-pre-line font-sans text-xs leading-relaxed text-slate-800">
              {offer.letterContent}
            </pre>
          </div>

          {/* Key Terms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Annual Base Salary
              </span>
              <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">
                {formatMoney(offer.baseSalary, offer.currency)}
              </span>
              <span className="text-[11px] text-slate-500">Gross paid monthly</span>
            </div>

            {offer.signingBonus && (
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Signing Bonus
                </span>
                <span className="text-lg font-bold text-emerald-700 font-mono mt-0.5 block">
                  {formatMoney(offer.signingBonus, offer.currency)}
                </span>
                <span className="text-[11px] text-slate-500">Payable in first payroll cycle</span>
              </div>
            )}

            {offer.stockOptions && (
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Equity Options
                </span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">
                  {offer.stockOptions}
                </span>
              </div>
            )}

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Official Start Date
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                {offer.startDate}
              </span>
            </div>
          </div>

          {/* Perks & Benefits Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Compensation & Benefits Schedule
            </h4>
            <div className="space-y-1.5">
              {offer.benefitsSummary.map((b, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Digital E-Signature Pad */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">
                  Digital E-Signature Pad (Draw your signature below)
                </span>
              </div>
              <button
                type="button"
                onClick={clearSignature}
                className="text-[11px] text-rose-600 hover:text-rose-800 font-medium"
              >
                Clear signature
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 relative overflow-hidden h-32 flex items-center justify-center">
              {!hasSignature && (
                <span className="absolute text-slate-400 text-xs pointer-events-none select-none">
                  Sign with your mouse, trackpad, or finger here
                </span>
              )}
              <canvas
                ref={canvasRef}
                width={560}
                height={120}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair z-10"
              />
            </div>

            {/* Checkbox agreement */}
            <label className="flex items-start gap-2.5 mt-4 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                I, <strong>{offer.applicantName}</strong>, accept the terms of employment as set forth in this offer letter and confirm my start date of {offer.startDate}.
              </span>
            </label>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Offer valid until: {offer.expiryDate}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-md"
            >
              Review Later
            </button>
            <button
              onClick={handleSignAndAccept}
              disabled={!hasSignature || !agreedToTerms}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-md shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Sign & Accept Offer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
