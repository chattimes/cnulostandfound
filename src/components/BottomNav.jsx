import React from 'react';
import { Search, MessageCircleQuestion, BellRing } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 px-3 py-2 flex justify-around items-center shadow-lg">
        {/* Tab 1: 분실물 찾기 */}
        <button
          onClick={() => setActiveTab("search")}
          className={`flex-1 flex flex-col items-center py-1 transition-all ${activeTab === "search" ? 'text-[#006838] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
        >
            <div className={`p-1.5 rounded-xl transition ${activeTab === "search" ? 'bg-[#e8f5ee]' : ''}`}>
              <Search className={`w-5 h-5 ${activeTab === "search" ? "text-[#006838]" : "text-slate-400"}`} />
            </div>
            <span className="text-[11px] mt-0.5">분실물 찾기</span>
        </button>

        {/* Tab 2: 관리자 1:1 채팅 */}
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 flex flex-col items-center py-1 transition-all relative ${activeTab === "chat" ? 'text-[#006838] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
        >
            <div className={`p-1.5 rounded-xl relative transition ${activeTab === "chat" ? 'bg-[#e8f5ee]' : ''}`}>
              <MessageCircleQuestion className={`w-5 h-5 ${activeTab === "chat" ? "text-[#006838]" : "text-slate-400"}`} />
              {/* Live indicator dot */}
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </div>
            <span className="text-[11px] mt-0.5">관리자 1:1 채팅</span>
        </button>

        {/* Tab 3: 습득물 안내 & 입고알림 */}
        <button
          onClick={() => setActiveTab("guide")}
          className={`flex-1 flex flex-col items-center py-1 transition-all ${activeTab === "guide" ? 'text-[#006838] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
        >
            <div className={`p-1.5 rounded-xl transition ${activeTab === "guide" ? 'bg-[#e8f5ee]' : ''}`}>
              <BellRing className={`w-5 h-5 ${activeTab === "guide" ? "text-[#006838]" : "text-slate-400"}`} />
            </div>
            <span className="text-[11px] mt-0.5">습득물 안내/알림</span>
        </button>
      </nav>
      );
}
