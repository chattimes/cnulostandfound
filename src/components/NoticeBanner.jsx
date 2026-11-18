import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function NoticeBanner({ isOpen, onToggle }) {
  return (
    <div className="bg-emerald-950/40 border border-emerald-400/30 rounded-xl p-2.5 text-xs text-emerald-100 transition-all mx-4 mt-2.5">
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-1.5 font-semibold text-white">
          <span className="text-amber-300 text-sm">📌</span>
          <span>보관 기간 및 폐기 주의사항 안내</span>
          <span className="text-[10px] bg-red-500/80 text-white px-1.5 py-0.5 rounded font-bold">14일 원칙</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-300" /> : <ChevronDown className="w-4 h-4 text-emerald-300" />}
      </div>

      {isOpen && (
        <div className="mt-2 pt-2 border-t border-emerald-400/20 text-[11.5px] leading-relaxed text-emerald-100/90">
          모든 습득물은 제1·제2학생회관 통합 보관소에 접수일로부터 <strong className="text-amber-200 underline font-bold">14일간 보관</strong>됩니다. 기간 경과 시 규정에 따라 학생지원과 인계 또는 일괄 폐기되니 기한 내 수령해 주시기 바랍니다.
        </div>
      )}
    </div>
  );
}
