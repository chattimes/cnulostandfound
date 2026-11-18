import React, { useRef, useEffect } from 'react';
import {
  CheckCircle2, X, ShieldAlert, Sparkles, Send, Building, Clock, MapPin
} from 'lucide-react';
import CampusMap from './CampusMap';
import ItemIllustration from './ItemIllustration';

export default function ChatTab({
  activeChatHub,
  setActiveChatHub,
  attachedItem,
  setAttachedItem,
  messages,
  chatInput,
  setChatInput,
  isTyping,
  onSendMessage
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeChatHub]);

  const quickQuestions = [
    "지금 방문해도 수령 가능한가요?",
    "본인 확인은 어떻게 하나요?",
    "보관 기간 연장 문의",
    "대리 수령도 가능한가요?"
  ];

  return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Left Column (PC): 1·2학생회관 선택 및 권역/운영 안내 카드 + 캠퍼스 약도 (4~5 Cols) */}
            <div className="md:col-span-4 lg:col-span-5 space-y-4">

              {/* Hub Selector Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#006838]" />
                    통합 상담 보관소 선택
                  </h2>
                  <span className="text-[10px] bg-emerald-100 text-[#006838] px-2 py-0.5 rounded-full font-bold">
                    🟢 실시간 운영중
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setActiveChatHub("제1학생회관")}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between ${activeChatHub === "제1학생회관"
                        ? 'bg-emerald-50/90 border-[#006838] shadow-xs ring-1 ring-[#006838]'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${activeChatHub === "제1학생회관" ? 'bg-[#006838]' : 'bg-slate-400'}`}></span>
                        <span className="text-xs font-black text-slate-800">제1학생회관 통합관리실</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-4">
                        인문·사회·자연·사범·예술대 · 중앙도서관(백도) 권역
                      </p>
                      <p className="text-[10.5px] text-[#006838] font-bold mt-1 pl-4">
                        📍 제1학생회관 1층 학생자치기구실 앞
                      </p>
                    </div>
                    {activeChatHub === "제1학생회관" && (
                      <span className="text-[10px] bg-[#006838] text-white px-2 py-0.5 rounded-full font-bold shrink-0">
                        선택됨
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveChatHub("제2학생회관")}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between ${activeChatHub === "제2학생회관"
                        ? 'bg-emerald-50/90 border-[#006838] shadow-xs ring-1 ring-[#006838]'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${activeChatHub === "제2학생회관" ? 'bg-[#006838]' : 'bg-slate-400'}`}></span>
                        <span className="text-xs font-black text-slate-800">제2학생회관 통합관리실</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-4">
                        공과·경영·농생·생활·AI융합대 · 후문 권역
                      </p>
                      <p className="text-[10.5px] text-[#006838] font-bold mt-1 pl-4">
                        📍 제2학생회관 1층 편의점 옆 통합데스크
                      </p>
                    </div>
                    {activeChatHub === "제2학생회관" && (
                      <span className="text-[10px] bg-[#006838] text-white px-2 py-0.5 rounded-full font-bold shrink-0">
                        선택됨
                      </span>
                    )}
                  </button>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 space-y-1 border-t border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>운영 시간:</strong> 평일 10:00 ~ 18:00 (점심 12:00~13:00)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>주말/야간: 무인 투입함 24시간 자율 접수 가능</span>
                  </div>
                </div>
              </div>

              {/* Campus Map Visualization */}
              <CampusMap selectedHub={activeChatHub} onSelectHub={setActiveChatHub} />

            </div>

                    {/* Right Column: 실시간 1:1 대화창 (7~8 Cols) */}
                    <div className="md:col-span-8 lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[650px] overflow-hidden">

                      {/* Chat Window Top Header */}
                      <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#006838] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                            {activeChatHub === "제1학생회관" ? "1학" : "2학"}
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <h3 className="font-bold text-sm text-slate-900">{activeChatHub} 통합보관실 관리자</h3>
                              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              {activeChatHub === "제1학생회관" ? "인문·사회·자연 권역 전담" : "공과·경영·농생 권역 전담"} · 평균 응답시간: 1초 이내
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] bg-emerald-100 text-[#006838] font-bold px-2.5 py-1 rounded-full">
                          1:1 비대면 안심 상담
                        </span>
                      </div>

                            {/* Attached Item Notice Bar (If navigated from Tab 1) */}
                            {attachedItem && attachedItem.storageHub === activeChatHub && (
                              <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center justify-between">
                                <div className="flex items-center space-x-3 min-w-0">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-emerald-300">
                                    <ItemIllustration item={attachedItem} />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-[10px] font-bold text-[#006838] block">문의 첨부된 분실물</span>
                                    <span className="text-xs font-bold text-slate-800 truncate block">{attachedItem.title}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setAttachedItem(null)}
                                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-emerald-100"
                                  title="첨부 해제"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
        )}

                            {/* Message Scroll Container */ }
                            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-slate-50/50">

                              {/* Security & Privacy Policy Banner */}
                              <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-3 text-xs text-amber-900 leading-relaxed shadow-2xs">
                                <div className="flex items-center space-x-1.5 font-bold text-amber-950 mb-1">
                                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                                  <span>전남대 분실물센터 안심 본인확인 정책</span>
                                </div>
                                채팅창에서는 개인정보보호를 위해 주민번호나 계좌번호를 요구하지 않습니다. 물품의 상세 고유 특징 대조 후 {activeChatHub}에서 모바일 학생증/신분증 확인으로 즉시 인도됩니다.
                              </div>

                                  {/* Messages */}
                                  {messages[activeChatHub]?.map((msg) => {
                                    if (msg.sender === "system") return null;
                                    const isUser = msg.sender === "user";

                                          return (
                                          <div
                                            key={msg.id}
                                            className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                                          >
                                            <div className="flex items-end space-x-2 max-w-[85%]">
                                              {!isUser && (
                                                <div className="w-8 h-8 rounded-full bg-[#006838] text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-xs mb-1">
                                                  관리실
                                                </div>
                                              )}

                                              <div
                                                className={`rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${isUser
                                                    ? 'bg-[#006838] text-white rounded-br-xs'
                                                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                                                  }`}
                                              >
                                                {/* If user attached item */}
                                                {msg.attachedItem && (
                                                  <div className="mb-2 p-2 bg-emerald-900/30 rounded-xl border border-white/20 flex items-center space-x-2.5">
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                                                      <ItemIllustration item={msg.attachedItem} />
                                                    </div>
                                                    <div className="text-[11px] leading-tight">
                                                      <div className="font-bold text-emerald-100">{msg.attachedItem.title}</div>
                                                      <div className="text-[10px] text-emerald-200 opacity-90">관리번호: {msg.attachedItem.id}</div>
                                                    </div>
                                                  </div>
                                                )}
                                                <p className="whitespace-pre-line">{msg.text}</p>
                                              </div>
                                            </div>

                                            <span className="text-[10px] text-slate-400 mt-1 px-1">
                                              {msg.time}
                                            </span>
                                          </div>
                                          );
          })}

                                            {/* Typing Indicator */}
                                            {isTyping && (
                                              <div className="flex items-center space-x-2 text-slate-400 text-xs pl-10">
                                                <div className="w-2 h-2 rounded-full bg-[#006838] animate-bounce"></div>
                                                <div className="w-2 h-2 rounded-full bg-[#006838] animate-bounce [animation-delay:0.2s]"></div>
                                                <div className="w-2 h-2 rounded-full bg-[#006838] animate-bounce [animation-delay:0.4s]"></div>
                                                <span className="text-xs font-semibold text-slate-500 ml-1">
                                                  {activeChatHub} 관리자가 답변을 작성 중입니다...
                                                </span>
                                              </div>
          )}

                                                <div ref={chatEndRef} />
                                              </div>

        {/* Quick Question Chips */}
                                            <div className="bg-white border-t border-slate-200 px-4 py-2.5">
                                              <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center space-x-1">
                                                <Sparkles className="w-3 h-3 text-amber-500" />
                                                <span>자주 묻는 질문 빠른 선택</span>
                                              </div>
                                              <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-0.5">
                                                {quickQuestions.map((q) => (
                                                  <button
                                                    key={q}
                                                    onClick={() => onSendMessage(q)}
                                                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-[#006838] text-slate-700 text-xs font-medium whitespace-nowrap border border-slate-200 transition"
                                                  >
                                                    {q}
                                                  </button>
                                                ))}
                                              </div>
                                            </div>

        {/* Message Input Form */}
                                      <div className="bg-white p-3 sm:p-4 border-t border-slate-100 flex items-center space-x-2">
                                        <input
                                          type="text"
                                          value={chatInput}
                                          onChange={(e) => setChatInput(e.target.value)}
                                          onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                                          placeholder="관리자에게 문의사항을 남겨주세요 (예: 습득물 번호, 특징 등)..."
                                          className="flex-1 bg-slate-100 border-none rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006838]"
                                        />
                                        <button
                                          onClick={() => onSendMessage()}
                                          disabled={!chatInput.trim()}
                                          className={`px-4 py-3 rounded-2xl flex items-center justify-center transition font-bold text-xs space-x-1.5 ${chatInput.trim()
                                              ? 'bg-[#006838] text-white hover:bg-[#00874a] active:scale-95 shadow-sm'
                                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            }`}
                                        >
                                          <Send className="w-4 h-4" />
                                          <span className="hidden sm:inline">전송</span>
                                        </button>
                                      </div>

                                      </div>

                                    </div>
  );
}
