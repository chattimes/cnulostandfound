import React from 'react';
import { Lock } from 'lucide-react';

export default function ItemIllustration({ item, className = "", isDetail = false }) {
  const { id, category, title, isBlurred } = item;

  // Render specific rich SVG illustrations based on ID or category
  const renderGraphic = () => {
    // 1. 검정색 가죽 카드지갑
    if (id === "CNU-2024-1117-01" || title.includes("카드지갑") || title.includes("지갑")) {
      return (
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="walletLeather" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="cnuCard" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#006838" />
              <stop offset="100%" stopColor="#004d2a" />
            </linearGradient>
            <linearGradient id="kakaoCard" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          
          {/* Background Card 1 (CNU Student ID) */}
          <g transform="translate(42, 25) rotate(-6)">
            <rect width="116" height="74" rx="7" fill="url(#cnuCard)" stroke="#34d399" strokeWidth="1" />
            <rect x="8" y="10" width="22" height="26" rx="3" fill="#ffffff" opacity="0.85" />
            <circle cx="19" cy="20" r="6" fill="#006838" opacity="0.6" />
            <path d="M11 32 C11 27, 27 27, 27 32 Z" fill="#006838" opacity="0.6" />
            <rect x="36" y="12" width="65" height="6" rx="2" fill="#ffffff" opacity="0.9" />
            <rect x="36" y="22" width="45" height="4" rx="2" fill="#ffffff" opacity="0.6" />
            <rect x="36" y="30" width="30" height="4" rx="2" fill="#34d399" opacity="0.8" />
            <rect x="85" y="52" width="22" height="14" rx="2" fill="#f59e0b" opacity="0.8" />
          </g>

          {/* Background Card 2 (Yellow Check Card) */}
          <g transform="translate(50, 36) rotate(4)">
            <rect width="110" height="68" rx="7" fill="url(#kakaoCard)" stroke="#fcd34d" strokeWidth="1" />
            <rect x="12" y="18" width="18" height="14" rx="2" fill="#78350f" opacity="0.4" />
            <circle cx="90" cy="50" r="10" fill="#ffffff" opacity="0.4" />
          </g>

          {/* Wallet Body */}
          <rect x="25" y="60" width="150" height="85" rx="10" fill="url(#walletLeather)" stroke="#334155" strokeWidth="2" />
          <path d="M25 80 Q100 95 175 80" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <path d="M25 105 Q100 120 175 105" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          
          {/* Prada Style Metallic Plate */}
          <polygon points="100,105 125,120 75,120" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <polygon points="100,108 120,119 80,119" fill="#0f172a" />
          <circle cx="100" cy="115" r="2" fill="#f8fafc" />
        </svg>
      );
    }

    // 2. 에어팟 프로 2세대 (오른쪽 유닛)
    if (id === "CNU-2024-1117-02" || title.includes("에어팟") || category === "이어폰/전자기기") {
      return (
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="airpodStem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <radialGradient id="airpodHead" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
          </defs>

          {/* Sound Wave Accent Circles */}
          <circle cx="100" cy="80" r="65" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="100" cy="80" r="50" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />

          {/* AirPod Unit (Right) */}
          <g transform="translate(75, 30) rotate(18)">
            {/* Stem */}
            <rect x="35" y="45" width="16" height="58" rx="8" fill="url(#airpodStem)" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* Force Sensor Indentation */}
            <rect x="47" y="65" width="3" height="18" rx="1.5" fill="#94a3b8" />
            {/* Bottom Mic Grille / Charging Contact */}
            <ellipse cx="43" cy="101" rx="7" ry="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            <ellipse cx="43" cy="101" rx="3" ry="1.5" fill="#475569" />

            {/* In-ear Head Bulb */}
            <circle cx="36" cy="35" r="24" fill="url(#airpodHead)" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* Top Acoustic Mesh */}
            <ellipse cx="36" cy="18" rx="7" ry="3.5" fill="#334155" />
            {/* Silicone Tip */}
            <ellipse cx="16" cy="35" rx="11" ry="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <ellipse cx="14" cy="35" rx="5" ry="8" fill="#e2e8f0" />
            
            {/* 'R' Identification Label */}
            <text x="39" y="58" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">R</text>
          </g>
        </svg>
      );
    }

    // 3. 투명 장우산 (손잡이 노란 스티커)
    if (id === "CNU-2024-1117-03" || title.includes("우산") || category === "우산") {
      return (
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="umbrellaCanopy" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="metalShaft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>

          {/* Raindrop Accents */}
          <path d="M45 25 Q43 32 45 35 Q47 32 45 25 Z" fill="#38bdf8" opacity="0.6" />
          <path d="M155 35 Q153 42 155 45 Q157 42 155 35 Z" fill="#38bdf8" opacity="0.6" />
          <path d="M165 75 Q163 82 165 85 Q167 82 165 75 Z" fill="#38bdf8" opacity="0.5" />

          {/* Umbrella Top Ferrule */}
          <rect x="98" y="16" width="4" height="12" rx="2" fill="#475569" />

          {/* Canopy (Transparent Vinyl Dome) */}
          <path d="M30 75 Q100 20 170 75 Q135 70 100 72 Q65 70 30 75 Z" fill="url(#umbrellaCanopy)" stroke="#94a3b8" strokeWidth="1.5" />
          
          {/* Ribs (살대) */}
          <path d="M100 25 Q82 50 65 70" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 1" />
          <path d="M100 25 Q118 50 135 70" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 1" />
          <path d="M100 25 L100 72" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Shaft (우산 대) */}
          <rect x="98.5" y="72" width="3" height="52" fill="url(#metalShaft)" />

          {/* J-Hook Handle */}
          <path d="M100 124 C100 136 82 138 82 126 C82 120 88 120 88 123" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M100 124 C100 136 82 138 82 126 C82 120 88 120 88 123" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Yellow Smile Sticker on Handle! */}
          <g transform="translate(77, 126)">
            <circle cx="6" cy="6" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="4" cy="4.5" r="1" fill="#713f12" />
            <circle cx="8" cy="4.5" r="1" fill="#713f12" />
            <path d="M3.5 7.5 Q6 10.5 8.5 7.5" stroke="#713f12" strokeWidth="1" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );
    }

    // 4. 샤오미 흰색 10,000mAh 보조배터리
    if (id === "CNU-2024-1117-04" || title.includes("보조배터리") || category === "보조배터리/충전기") {
      return (
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="powerbankMatte" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Power Bank Enclosure */}
          <rect x="55" y="24" width="90" height="114" rx="14" fill="url(#powerbankMatte)" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Top Edge Panel */}
          <rect x="63" y="27" width="74" height="10" rx="3" fill="#e2e8f0" />
          
          {/* USB-A Port */}
          <rect x="68" y="29" width="16" height="6" rx="1.5" fill="#0f172a" />
          <rect x="70" y="31" width="12" height="2" fill="#ffffff" />

          {/* USB-C Port */}
          <rect x="91" y="29.5" width="12" height="5" rx="2.5" fill="#0f172a" />
          
          {/* 4 LED Capacity Dots */}
          <circle cx="113" cy="32" r="1.5" fill="#22c55e" />
          <circle cx="118" cy="32" r="1.5" fill="#22c55e" />
          <circle cx="123" cy="32" r="1.5" fill="#22c55e" />
          <circle cx="128" cy="32" r="1.5" fill="#94a3b8" />

          {/* Embossed '10000' text */}
          <text x="100" y="85" fill="#cbd5e1" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="1">10000</text>
          <text x="100" y="96" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">mAh</text>

          {/* Mi logo subtle square */}
          <rect x="92" y="112" width="16" height="14" rx="2" fill="#cbd5e1" opacity="0.6" />
          <path d="M96 117 L96 122 M96 117 L100 117 L100 122 M104 117 L104 122" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

          {/* Wrapped Short C-to-C Cable */}
          <path d="M48 65 C40 85 40 105 48 120 C55 132 145 132 152 120 C160 105 160 85 152 65" stroke="url(#cableGrad)" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85" />
          <rect x="42" y="58" width="10" height="12" rx="2" fill="#0f172a" />
          <rect x="45" y="54" width="4" height="5" rx="1" fill="#94a3b8" />
        </svg>
      );
    }

    // 5. 카카오프렌즈 춘식이 아크릴 키링
    if (id === "CNU-2024-1117-05" || title.includes("춘식이") || title.includes("키링") || category === "키링/액세서리") {
      return (
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="chunsikFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <linearGradient id="sweetPotato" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
            <linearGradient id="acrylicEdge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* D-Carabiner Ring & Chain */}
          <g transform="translate(100, 12)">
            <ellipse cx="0" cy="8" rx="8" ry="10" stroke="#94a3b8" strokeWidth="3" fill="none" />
            <circle cx="0" cy="20" r="3" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            <circle cx="0" cy="26" r="3" stroke="#cbd5e1" strokeWidth="2" fill="none" />
          </g>

          {/* Acrylic Transparent Border Offset */}
          <g transform="translate(56, 36)">
            {/* Outer Transparent Acrylic Cutout */}
            <rect x="0" y="0" width="88" height="96" rx="26" fill="url(#acrylicEdge)" stroke="#7dd3fc" strokeWidth="1.5" />
            
            {/* Chunsik Ear Left */}
            <circle cx="24" cy="20" r="10" fill="#ca8a04" />
            {/* Chunsik Ear Right */}
            <circle cx="64" cy="20" r="10" fill="#ca8a04" />

            {/* Chunsik Head/Body */}
            <ellipse cx="44" cy="46" rx="32" ry="28" fill="url(#chunsikFace)" />
            <ellipse cx="44" cy="74" rx="26" ry="18" fill="url(#chunsikFace)" />

            {/* Chunsik Whiskers / Cheeks */}
            <ellipse cx="28" cy="48" rx="6" ry="4" fill="#f43f5e" opacity="0.4" />
            <ellipse cx="60" cy="48" rx="6" ry="4" fill="#f43f5e" opacity="0.4" />

            {/* Eyes */}
            <circle cx="34" cy="42" r="3" fill="#1e293b" />
            <circle cx="54" cy="42" r="3" fill="#1e293b" />

            {/* Cat Nose & Muzzle */}
            <ellipse cx="44" cy="46" rx="2" ry="1.5" fill="#b45309" />
            <path d="M41 48 Q44 51 44 48 Q44 51 47 48" stroke="#1e293b" strokeWidth="1.5" fill="none" />

            {/* Held Sweet Potato! */}
            <g transform="translate(32, 60) rotate(-15)">
              <ellipse cx="12" cy="10" rx="14" ry="9" fill="url(#sweetPotato)" stroke="#500724" strokeWidth="1" />
              {/* Steaming cut edge */}
              <ellipse cx="23" cy="10" rx="4" ry="7" fill="#fef08a" />
            </g>

            {/* Chunsik Little Paws */}
            <circle cx="28" cy="68" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="60" cy="68" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          </g>
        </svg>
      );
    }

    // 6. 체크카드 (신한 S20 학생증 겸용)
    if (id === "CNU-2024-1117-06" || title.includes("신한") || title.includes("체크카드")) {
      return (
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shinhanCard" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
            <linearGradient id="goldChip" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          {/* Card Plate */}
          <rect x="25" y="32" width="150" height="96" rx="10" fill="url(#shinhanCard)" stroke="#38bdf8" strokeWidth="1.5" />
          
          {/* Card Wave Art */}
          <path d="M25 75 Q75 110 175 60 L175 128 L25 128 Z" fill="#0c4a6e" opacity="0.6" />
          <path d="M25 90 Q85 125 175 80 L175 128 L25 128 Z" fill="#0369a1" opacity="0.4" />

          {/* S20 Badge */}
          <rect x="36" y="44" width="28" height="14" rx="3" fill="#ffffff" opacity="0.9" />
          <text x="50" y="54" fill="#0284c7" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">S20</text>

          {/* CNU University Crest Accent */}
          <circle cx="154" cy="50" r="10" fill="#006838" stroke="#ffffff" strokeWidth="1" />
          <text x="154" y="53" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">CNU</text>

          {/* Gold IC Chip */}
          <rect x="38" y="68" width="22" height="18" rx="3" fill="url(#goldChip)" stroke="#a16207" strokeWidth="1" />
          <path d="M38 77 L60 77 M49 68 L49 86" stroke="#713f12" strokeWidth="1" />
          <rect x="44" y="73" width="10" height="8" rx="1.5" stroke="#713f12" strokeWidth="0.8" fill="none" />

          {/* Masked Card Number */}
          <text x="38" y="103" fill="#ffffff" fontSize="9" fontWeight="bold" letterSpacing="2" fontFamily="monospace">
            4518 •••• •••• 9821
          </text>
          
          {/* Holder Name / CNU Student Label */}
          <text x="38" y="117" fill="#93c5fd" fontSize="7" fontWeight="bold" letterSpacing="0.5">
            CHONNAM NAT'L UNIV
          </text>
        </svg>
      );
    }

    // Default Fallback Category Illustration
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
        <rect x="45" y="40" width="110" height="85" rx="12" fill="url(#boxGrad)" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M45 70 L100 88 L155 70" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="100" cy="80" r="14" fill="#006838" />
        <path d="M95 80 L99 84 L106 76" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="100" y="110" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">{category}</text>
      </svg>
    );
  };

  // Background Theme based on category
  const getCardBg = () => {
    switch (category) {
      case "지갑/카드": return "from-slate-900 via-slate-800 to-emerald-950/40";
      case "이어폰/전자기기": return "from-slate-100 via-sky-50 to-indigo-50";
      case "우산": return "from-sky-100 via-cyan-50 to-blue-100";
      case "보조배터리/충전기": return "from-slate-100 via-emerald-50/40 to-slate-200";
      case "키링/액세서리": return "from-amber-100/60 via-yellow-50 to-orange-100/40";
      default: return "from-slate-100 via-slate-50 to-emerald-50";
    }
  };

  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br ${getCardBg()} flex items-center justify-center p-2 select-none ${className}`}>
      {/* SVG Graphic */}
      <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${isBlurred ? 'blur-md scale-105' : 'group-hover:scale-105'}`}>
        {renderGraphic()}
      </div>

      {/* Privacy Masking Overlay */}
      {isBlurred && (
        <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center z-10 transition-all">
          <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-1 text-amber-300 shadow-inner">
            <Lock className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-black text-white tracking-tight">🔒 개인정보 보호 가림</span>
          <span className="text-[9.5px] text-emerald-200/90 font-medium mt-0.5 leading-tight">
            {isDetail ? "카드번호·학생증 사진 마스킹 완료 (본인 인증 후 해제)" : "관리자 확인 후 열람 가능"}
          </span>
        </div>
      )}
    </div>
  );
}
