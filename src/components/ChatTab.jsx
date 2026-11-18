import React, { useRef, useEffect } from 'react';
import { 
  CheckCircle2, X, ShieldAlert, Sparkles, Send 
} from 'lucide-react';

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
    <div className="flex flex-col h-[calc(100vh-175px)] bg-slate-100/70">
      {/* Chat Hub Switcher (1학 vs 2학) */}
      <div className="bg-white px-3 py-2 border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveChatHub("제1학생회관")}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border ${
              activeChatHub === "제1학생회관"
                ? 'bg-[#006838] text-white border-[#006838] shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>제1학생회관 통합관리실</span>
          </button>

          <button
            onClick={() => setActiveChatHub("제2학생회관")}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border ${
              activeChatHub === "제2학생회관"
                ? 'bg-[#006838] text-white border-[#006838] shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>제2학생회관 통합관리실</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 px-1">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>{activeChatHub === "제1학생회관" ? "인문·사회·자연·예술·백도 권역" : "공과·경영·농생·생활·AI 권역"}</span>
          </span>
          <span className="text-emerald-600 font-semibold">🟢 상담 운영중 (10~18시)</span>
        </div>
      </div>

      {/* Attached Item Bar */}
      {attachedItem && attachedItem.storageHub === activeChatHub && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-3.5 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0">
            <img 
              src={attachedItem.image} 
              alt={attachedItem.title} 
              className="w-8 h-8 rounded-lg object-cover shrink-0 border border-emerald-300" 
            />
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-[#006838]">문의 첨부된 분실물</div>
              <div className="text-xs font-bold text-slate-800 truncate">{attachedItem.title}</div>
            </div>
          </div>
          <button 
            onClick={() => setAttachedItem(null)}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Security / Privacy System Notice */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-2.5 text-[11px] text-amber-900 leading-relaxed shadow-2xs">
          <div className="flex items-center space-x-1.5 font-bold text-amber-950 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>전남대 분실물센터 안심 본인확인 정책</span>
          </div>
          채팅창에서는 개인정보보호를 위해 주민번호나 계좌번호를 요구하지 않습니다. 물품의 상세 고유 특징 대조 후 제1·2학생회관에서 학생증 확인으로 즉시 인도됩니다.
        </div>

        {/* Message Bubbles */}
        {messages[activeChatHub]?.map((msg) => {
          if (msg.sender === "system") return null;
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end space-x-1.5 max-w-[85%]">
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#006838] text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs mb-1">
                    관리실
                  </div>
                )}

                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-[#006838] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {/* If user attached item */}
                  {msg.attachedItem && (
                    <div className="mb-2 p-2 bg-emerald-900/30 rounded-xl border border-white/20 flex items-center space-x-2">
                      <img src={msg.attachedItem.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <div className="text-[11px] leading-tight">
                        <div className="font-bold text-emerald-100">{msg.attachedItem.title}</div>
                        <div className="text-[10px] text-emerald-200 opacity-90">관리번호: {msg.attachedItem.id}</div>
                      </div>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>

              <span className="text-[9.5px] text-slate-400 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs pl-9">
            <div className="w-2 h-2 rounded-full bg-[#006838] animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-[#006838] animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 rounded-full bg-[#006838] animate-bounce [animation-delay:0.4s]"></div>
            <span className="text-[11px] font-medium text-slate-500 ml-1">관리자가 답변을 작성 중입니다...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="bg-white border-t border-slate-200 px-3 py-2">
        <div className="text-[10.5px] font-semibold text-slate-400 mb-1 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>자주 묻는 질문 빠른 선택</span>
        </div>
        <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => onSendMessage(q)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-[#006838] text-slate-700 text-[11px] font-medium whitespace-nowrap border border-slate-200 transition"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white p-2.5 border-t border-slate-100 flex items-center space-x-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="관리자에게 문의사항을 남겨주세요..."
          className="flex-1 bg-slate-100 border-none rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#006838]"
        />
        <button
          onClick={() => onSendMessage()}
          disabled={!chatInput.trim()}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
            chatInput.trim()
              ? 'bg-[#006838] text-white hover:bg-[#00874a] active:scale-95 shadow-sm'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
