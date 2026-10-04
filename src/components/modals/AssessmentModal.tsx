import React, { useState } from 'react';
import { Assessment } from '../../types';
import { X, CheckCircle2, AlertCircle, Clock, Award, ChevronRight } from 'lucide-react';

interface AssessmentModalProps {
  assessment: Assessment;
  onClose: () => void;
  onSubmit: (score: number, passed: boolean) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({ assessment, onClose, onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ score: number; passed: boolean } | null>(null);

  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleFinish = () => {
    let correctCount = 0;
    assessment.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePercentage = Math.round((correctCount / assessment.questions.length) * 100);
    const passed = scorePercentage >= assessment.passingScore;

    setScoreResult({ score: scorePercentage, passed });
    setSubmitted(true);
    onSubmit(scorePercentage, passed);
  };

  const isAllAnswered = assessment.questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                SkillBridge Assessment Center
              </span>
            </div>
            <h3 className="text-base font-bold leading-tight mt-0.5">{assessment.jobTitle}</h3>
            <p className="text-xs text-slate-300">Administered by {assessment.companyName}</p>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted && scoreResult ? (
          <div className="p-8 text-center space-y-4">
            {scoreResult.passed ? (
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            ) : (
              <AlertCircle className="w-14 h-14 text-amber-600 mx-auto" />
            )}
            
            <div>
              <h4 className="text-xl font-bold text-slate-900">
                {scoreResult.passed ? 'Assessment Passed!' : 'Assessment Recorded'}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                You scored <strong className="text-indigo-600 font-mono text-sm">{scoreResult.score}%</strong> (Passing benchmark: {assessment.passingScore}%)
              </p>
            </div>

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
              {scoreResult.passed
                ? 'Your verified score has been sent to the hiring team. You have automatically advanced to the interview scheduling stage!'
                : 'Your answers have been shared with the technical recruiters for holistic review alongside your portfolio.'}
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Return to Applications
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Info bar */}
            <div className="flex items-center justify-between text-xs text-slate-500 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Time Limit: {assessment.durationMinutes} Minutes
              </span>
              <span>Passing: {assessment.passingScore}% minimum</span>
            </div>

            {/* Questions */}
            <div className="space-y-5">
              {assessment.questions.map((q, idx) => (
                <div key={q.id} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    <span className="text-indigo-600 font-mono mr-1.5">0{idx + 1}.</span>
                    {q.prompt}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`p-3 rounded-lg text-xs cursor-pointer border transition-colors flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-medium'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white font-bold' : 'border-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {Object.keys(selectedAnswers).length} of {assessment.questions.length} answered
              </span>

              <button
                onClick={handleFinish}
                disabled={!isAllAnswered}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors shadow-sm"
              >
                Submit Answers
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
