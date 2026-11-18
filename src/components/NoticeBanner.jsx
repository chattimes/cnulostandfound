import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function NoticeBanner({ isOpen, onToggle }) {
  return (
      <div className="bg-emerald-950/90 border border-emerald-400/30 rounded-2xl p-3 sm:p-3.5 text-xs text-emerald-100 transition-all shadow-sm">
        <div
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={onToggle}
        >
            <div className="flex items-center space-x-2 font-bold text-white text-xs sm:text-sm">
              <span className="text-amber-300">📌</span>
              <span>전남대 분실물 보관 기간 및 폐기 주의사항 안내</span>
              <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-black">
                14일 원칙
              </span>
            </div>
            <button className="text-emerald-300 hover:text-white p-1">
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isOpen && (
              <div className="mt-2.5 pt-2.5 border-t border-emerald-500/20 text-xs sm:text-[13px] leading-relaxed text-emerald-100/90">
                모든 습득물은 제1·제2학생회관 통합 보관소에 접수일로부터 <strong className="text-amber-300 underline font-black">14일간 보관</strong>됩니다.
                기간 경과 시 학칙 및 분실물 처리 규정에 따라 학생지원과 인계 또는 일괄 폐기되니 기한 내 수령해 주시기 바랍니다.
              </div>
      )}
            </div>
          );
}
