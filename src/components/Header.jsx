import React from 'react';
import {
  ShieldCheck, Info, Search, MessageCircleQuestion, BellRing,
  UserCheck, ShieldAlert, RotateCcw
} from 'lucide-react';

  export default function Header({
    activeTab,
    setActiveTab,
    mode,
    setMode,
    onResetData,
    onInfoClick
  }) {
    const isStudent = mode === "student";

    return (
                <header className="bg-[#006838] text-white sticky top-0 z-40 shadow-lg border-b border-emerald-800">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">

                      {/* Left: CNU Logo & Title */}
                      <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => { setActiveTab("search"); setMode("student"); }}>
                        <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shadow-md border border-emerald-300/40 shrink-0 overflow-hidden">
                          <img
                            src="/cnu_symbol.svg"
                            onError={(e) => {
                              // Fallback if root path is nested
                              e.currentTarget.src = './cnu_symbol.svg';
                            }}
                            alt="전남대학교 공식 심볼 마크"
                            className="w-full h-full object-contain"
                          />
                        </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <h1 className="font-black text-base sm:text-lg tracking-tight leading-tight">
                                전남대 통합 분실물 센터
                              </h1>
                              <span className="hidden sm:inline-block bg-emerald-800/90 text-[10px] text-emerald-200 px-2 py-0.5 rounded-full font-semibold border border-emerald-700">
                                전대 스토어 연동 공식 채널
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-[11px] text-emerald-200/90 font-medium">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                              <span className="truncate">제1·제2학생회관 거점 통합</span>
                              <span className="bg-emerald-900/80 text-[9.5px] px-1.5 py-0.2 rounded text-white font-normal ml-1">
                                무로그인 즉시 이용
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Center (Desktop only md:flex): Horizontal Navigation Bar */}
                        {isStudent && (
                          <nav className="hidden md:flex items-center space-x-1 bg-emerald-900/60 p-1.5 rounded-2xl border border-emerald-700/50">
                            <button
                              onClick={() => setActiveTab("search")}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${activeTab === "search"
                                  ? 'bg-white text-[#006838] shadow-sm'
                                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/50'
                                }`}
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>분실물 찾기</span>
                            </button>

                            <button
                              onClick={() => setActiveTab("chat")}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 relative ${activeTab === "chat"
                                  ? 'bg-white text-[#006838] shadow-sm'
                                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/50'
                                }`}
                            >
                              <MessageCircleQuestion className="w-3.5 h-3.5" />
                              <span>관리자 1:1 채팅</span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
                            </button>

                            <button
                              onClick={() => setActiveTab("guide")}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${activeTab === "guide"
                                  ? 'bg-white text-[#006838] shadow-sm'
                                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/50'
                                }`}
                            >
                              <BellRing className="w-3.5 h-3.5" />
                              <span>습득물 안내 & 입고알림</span>
                            </button>
                          </nav>
                        )}

                        {/* Right: B2B Mode Switcher & Reset Button */}
                        <div className="flex items-center space-x-2">

                          {/* Student Mode vs Admin Mode Switch Toggle */}
                          <div className="bg-emerald-950/70 p-1 rounded-2xl border border-emerald-600/60 flex items-center shadow-inner">
                            <button
                              onClick={() => setMode("student")}
                              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${isStudent
                                  ? 'bg-white text-[#006838] shadow-sm'
                                  : 'text-emerald-200 hover:text-white'
                                }`}
                              title="학생 화면으로 전환"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span className="text-[11px] sm:text-xs">학생 화면</span>
                            </button>

                            <button
                              onClick={() => setMode("admin")}
                              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${!isStudent
                                  ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                                  : 'text-emerald-200 hover:text-white'
                                }`}
                              title="B2B 관리자 콘솔로 전환"
                            >
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span className="text-[11px] sm:text-xs">관리자 모드</span>
                            </button>
                          </div>

                          {/* Reset Demo Data Button */}
                          <button
                            onClick={onResetData}
                            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition border border-emerald-700/60 shrink-0"
                            title="시연 데이터 초기화 (초기 목업 복원)"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>

                          {/* Info modal button */}
                          <button
                            onClick={onInfoClick}
                            className="hidden sm:flex p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition border border-emerald-700/60 shrink-0"
                            title="통합 보관소 안내"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    </div>
                </header>
                );
}
