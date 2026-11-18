import React from 'react';
import { MapPin, Navigation, Compass, Building } from 'lucide-react';

export default function CampusMap({ selectedHub, onSelectHub, className = "" }) {
  const isHub1 = selectedHub === "제1학생회관";
  const isHub2 = selectedHub === "제2학생회관";

  return (
    <div className={`bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#006838] flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">전남대학교 캠퍼스 거점 보관소 약도</h3>
            <p className="text-[10px] text-slate-400">용봉캠퍼스 제1·제2학생회관 통합 거점 안내</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] font-semibold text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-[#006838]"></span>
          <span>1학</span>
          <span className="inline-block w-2 h-2 rounded-full bg-teal-600 ml-1"></span>
          <span>2학</span>
        </div>
      </div>

      {/* Interactive SVG Campus Map */}
      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-50 to-emerald-50/30 border border-slate-200 aspect-[16/9]">
        <svg viewBox="0 0 400 220" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Campus Boundaries & Green Belts */}
          <path d="M 40,20 C 120,10 280,15 360,35 C 380,80 370,160 340,195 C 280,210 120,205 50,185 C 25,140 20,70 40,20 Z" 
                fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" strokeDasharray="4 2" />
          
          {/* Main Road Arteries */}
          <path d="M 60,200 L 140,130 L 220,110 L 320,60" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
          <path d="M 60,200 L 140,130 L 220,110 L 320,60" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          
          {/* Secondary Campus Paths */}
          <path d="M 140,130 L 120,60 L 190,40" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="3 3" fill="none" />
          <path d="M 220,110 L 260,160 L 330,140" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="3 3" fill="none" />
          <path d="M 220,110 L 280,100" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="3 3" fill="none" />

          {/* Campus Landmarks */}
          {/* 정문 (Main Gate) */}
          <g transform="translate(45, 190)">
            <rect x="0" y="0" width="30" height="12" rx="3" fill="#64748b" />
            <text x="15" y="9" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">정문 ⬇</text>
          </g>

          {/* 후문 (Back Gate) */}
          <g transform="translate(325, 45)">
            <rect x="0" y="0" width="30" height="12" rx="3" fill="#64748b" />
            <text x="15" y="9" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">⬆ 후문</text>
          </g>

          {/* 대운동장 (Stadium) */}
          <ellipse cx="90" cy="115" rx="22" ry="14" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
          <text x="90" y="117" fill="#166534" fontSize="7" fontWeight="bold" textAnchor="middle">대운동장</text>

          {/* 도서관 백도/홍도 */}
          <rect x="185" cy="55" width="34" height="20" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <text x="202" y="68" fill="#475569" fontSize="6.5" fontWeight="bold" textAnchor="middle">중앙도서관(백도)</text>

          {/* 공과대학 군 */}
          <rect x="270" y="80" width="36" height="24" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <text x="288" y="94" fill="#475569" fontSize="7" fontWeight="bold" textAnchor="middle">공과대학</text>

          {/* 인문/사회/자연대 구역 표시 */}
          <text x="110" y="45" fill="#64748b" fontSize="6.5" fontWeight="medium">인문·사회·자연대</text>

          {/* 경영대/농생대 구역 표시 */}
          <text x="260" y="175" fill="#64748b" fontSize="6.5" fontWeight="medium">경영대·농생대</text>

          {/* PIN 1: 제1학생회관 (정문 권역) */}
          <g 
            onClick={() => onSelectHub && onSelectHub("제1학생회관")}
            className="cursor-pointer transition-transform hover:scale-110 group"
            transform="translate(140, 130)"
          >
            {/* Animated Pulsing Ring */}
            <circle cx="0" cy="0" r={isHub1 ? "18" : "12"} fill="#006838" opacity={isHub1 ? "0.25" : "0.1"} className="animate-ping" />
            <circle cx="0" cy="0" r={isHub1 ? "14" : "10"} fill="#006838" opacity="0.3" />
            
            {/* Pin Body */}
            <path d="M 0,-18 C -7,-18 -10,-12 0,0 C 10,-12 7,-18 0,-18 Z" 
                  fill={isHub1 ? "#006838" : "#15803d"} 
                  stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="0" cy="-12" r="3.5" fill="#ffffff" />
            
            {/* Pin Tag Label */}
            <g transform="translate(-38, 6)">
              <rect width="76" height="17" rx="4" fill="#006838" stroke="#ffffff" strokeWidth="1" />
              <text x="38" y="12" fill="#ffffff" fontSize="7.5" fontWeight="black" textAnchor="middle">
                📍 제1학생회관 1층
              </text>
            </g>
          </g>

          {/* PIN 2: 제2학생회관 (후문·공대 권역) */}
          <g 
            onClick={() => onSelectHub && onSelectHub("제2학생회관")}
            className="cursor-pointer transition-transform hover:scale-110 group"
            transform="translate(260, 120)"
          >
            {/* Animated Pulsing Ring */}
            <circle cx="0" cy="0" r={isHub2 ? "18" : "12"} fill="#0d9488" opacity={isHub2 ? "0.25" : "0.1"} className="animate-ping" />
            <circle cx="0" cy="0" r={isHub2 ? "14" : "10"} fill="#0d9488" opacity="0.3" />

            {/* Pin Body */}
            <path d="M 0,-18 C -7,-18 -10,-12 0,0 C 10,-12 7,-18 0,-18 Z" 
                  fill={isHub2 ? "#0d9488" : "#0f766e"} 
                  stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="0" cy="-12" r="3.5" fill="#ffffff" />

            {/* Pin Tag Label */}
            <g transform="translate(-38, 6)">
              <rect width="76" height="17" rx="4" fill="#0d9488" stroke="#ffffff" strokeWidth="1" />
              <text x="38" y="12" fill="#ffffff" fontSize="7.5" fontWeight="black" textAnchor="middle">
                📍 제2학생회관 1층
              </text>
            </g>
          </g>
        </svg>

        {/* Floating Quick Filter Badges over Map */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between pointer-events-none">
          <span className="text-[9px] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs text-slate-600 font-semibold border border-slate-200">
            💡 핀을 클릭하면 해당 보관소 정보를 바로 볼 수 있습니다
          </span>
          <span className="text-[9px] bg-emerald-900/80 text-emerald-100 px-2 py-0.5 rounded font-bold">
            평일 10:00~18:00
          </span>
        </div>
      </div>

      {/* Hub Description Cards below map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
        <div 
          onClick={() => onSelectHub && onSelectHub("제1학생회관")}
          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
            isHub1 
              ? 'bg-emerald-50/80 border-[#006838] shadow-xs' 
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#006838] flex items-center gap-1">
              <Building className="w-3 h-3" />
              제1학생회관 1층 통합보관소
            </span>
            {isHub1 && <span className="text-[9px] bg-[#006838] text-white px-1.5 py-0.2 rounded font-bold">선택됨</span>}
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            • <strong>관할 권역:</strong> 인문대, 사회대, 사범대, 자연대, 예술대, 중앙도서관(백도)
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            위치: 학생자치기구실 옆 무인수거함 및 통합관리실
          </p>
        </div>

        <div 
          onClick={() => onSelectHub && onSelectHub("제2학생회관")}
          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
            isHub2 
              ? 'bg-teal-50/80 border-teal-600 shadow-xs' 
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-teal-700 flex items-center gap-1">
              <Building className="w-3 h-3" />
              제2학생회관 1층 통합보관소
            </span>
            {isHub2 && <span className="text-[9px] bg-teal-700 text-white px-1.5 py-0.2 rounded font-bold">선택됨</span>}
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            • <strong>관할 권역:</strong> 공과대, 경영대, 농생대, 생활대, AI융합대, 후문 상권
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            위치: 1층 편의점 옆 통합안내데스크 및 수거함
          </p>
        </div>
      </div>
    </div>
  );
}
