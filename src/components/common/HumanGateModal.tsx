import React, { useState } from 'react';
import { Shield, UserCheck, AlertTriangle, X, Check, ArrowRight } from 'lucide-react';
import { SystemOutcome } from '../../types';

interface HumanGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  role?: string;
  userName?: string;
  aiRecommendation: SystemOutcome | string;
  recommendationReason: string;
  onApprove: (notes: string) => void;
  onModify: (newOutcome: 'ACT' | 'WATCH' | 'IGNORE' | 'ESCALATE', reason: string) => void;
  onReject: () => void;
}

export const HumanGateModal: React.FC<HumanGateModalProps> = ({
  isOpen,
  onClose,
  title = 'Human Decision Required',
  role = 'Brand Manager',
  userName = 'Aarav Mehta',
  aiRecommendation,
  recommendationReason,
  onApprove,
  onModify,
  onReject
}) => {
  const [notes, setNotes] = useState('');
  const [showModifyOptions, setShowModifyOptions] = useState(false);
  const [selectedModifyOutcome, setSelectedModifyOutcome] = useState<'ACT' | 'WATCH' | 'IGNORE' | 'ESCALATE'>('WATCH');
  const [modifyReason, setModifyReason] = useState('');

  if (!isOpen) return null;

  const handleApprove = () => {
    onApprove(notes);
    onClose();
  };

  const handleModifySubmit = () => {
    onModify(selectedModifyOutcome, modifyReason || 'Brand Manager manual override.');
    onClose();
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        id="human-decision-modal"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#DCE6F2] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#F5F9FF] px-6 py-4 border-b border-[#DCE6F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1769E0] text-white flex items-center justify-center shadow-xs">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A]">{title}</h3>
              <p className="text-xs text-[#5B6B7A]">Accountability Gate: Consequential Brand Decision</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#0B1F3A]">Decision Owner:</span>
              <span className="text-[#1769E0] font-medium">{userName}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">{role}</span>
          </div>

          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-900">AI Recommendation</span>
              <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-bold text-xs">
                {aiRecommendation}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {recommendationReason}
            </p>
          </div>

          {!showModifyOptions ? (
            <div>
              <label className="block text-xs font-medium text-[#5B6B7A] mb-1.5">
                Decision Notes & Directive (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Focus creative response on stoppage time composure and 72hr efficacy..."
                rows={2}
                className="w-full text-xs p-3 rounded-lg border border-[#DCE6F2] focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20 focus:border-[#1769E0]"
              />
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 space-y-3">
              <div className="text-xs font-semibold text-amber-900">Override Recommendation Outcome:</div>
              <div className="grid grid-cols-4 gap-2">
                {(['ACT', 'WATCH', 'IGNORE', 'ESCALATE'] as const).map(outcome => (
                  <button
                    key={outcome}
                    type="button"
                    onClick={() => setSelectedModifyOutcome(outcome)}
                    className={`py-1.5 text-xs font-semibold rounded-md border text-center transition-colors ${
                      selectedModifyOutcome === outcome
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {outcome}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={modifyReason}
                onChange={(e) => setModifyReason(e.target.value)}
                placeholder="Reason for modifying outcome..."
                className="w-full text-xs p-2 rounded border border-amber-300 bg-white"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-[#DCE6F2] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReject}
            className="px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Reject Action
          </button>

          <div className="flex items-center gap-2">
            {!showModifyOptions ? (
              <button
                type="button"
                onClick={() => setShowModifyOptions(true)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Modify...
              </button>
            ) : (
              <button
                type="button"
                onClick={handleModifySubmit}
                className="px-3.5 py-2 text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 rounded-lg transition-colors"
              >
                Apply Override
              </button>
            )}

            <button
              type="button"
              id="confirm-approve-opportunity"
              onClick={handleApprove}
              className="px-4 py-2 text-xs font-semibold bg-[#1769E0] text-white hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Approve Opportunity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
