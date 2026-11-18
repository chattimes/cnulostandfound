import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function Header({ onInfoClick }) {
  return (
    <header className="bg-[#006838] text-white px-4 py-3 sticky top-0 z-30 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {/* 전남대학교 공식 심볼 마크 */}
          <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center shadow-sm border border-emerald-300/30 shrink-0">
            <img 
              src="/cnu_symbol.svg" 
              alt="전남대학교 공식 심볼 마크" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-bold text-base tracking-tight leading-tight">전남대 통합 분실물 센터</h1>
            </div>
            <div className="flex items-center space-x-1 text-[11px] text-emerald-200/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>전대 스토어 연동 공식 채널</span>
              <span className="bg-emerald-800/80 text-[10px] px-1.5 py-0.2 rounded-full text-white font-normal ml-1">
                무로그인 즉시 이용
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onInfoClick}
          className="p-2 rounded-full hover:bg-white/10 text-white/90 active:scale-95 transition"
          title="센터 안내"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
