import React from 'react';
import { 
  X, Lock, AlignLeft, CheckCheck, MessageSquare 
} from 'lucide-react';

export default function ItemDetailModal({ item, onClose, onClaim }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {item.id}
            </span>
            <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
              item.daysRemaining <= 5 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-[#006838]'
            }`}>
              보관 만료 D-{item.daysRemaining}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Big Image with Blur Warning */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video">
            <img
              src={item.image}
              alt={item.title}
              className={`w-full h-full object-cover ${item.isBlurred ? 'blur-lg scale-105' : ''}`}
            />
            {item.isBlurred && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                <Lock className="w-6 h-6 text-amber-400 mb-1.5" />
                <span className="text-xs font-bold text-white mb-0.5">🔒 개인정보 보호 가림 처리됨</span>
                <p className="text-[11px] text-slate-200 max-w-[260px] leading-relaxed">
                  학생증 사진, 이름, 카드번호 등 개인식별정보 보호를 위해 마스킹되었습니다.
                </p>
              </div>
            )}
          </div>

          {/* Title & Info */}
          <div>
            <span className="text-xs font-semibold text-[#006838]">{item.category}</span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
              {item.title}
            </h2>
          </div>

          {/* Specification Table */}
          <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2.5 border border-slate-200/80 text-xs">
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-medium shrink-0">습득 위치</span>
              <span className="text-slate-800 font-bold text-right">{item.place}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-medium shrink-0">접수 일시</span>
              <span className="text-slate-800 font-bold">{item.foundDate} (14일간 보관)</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-medium shrink-0">현재 보관 거점</span>
              <span className="text-[#006838] font-black text-right">{item.storageLocation}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-medium shrink-0">보관소 운영시간</span>
              <span className="text-slate-800 font-bold">평일 10:00 ~ 18:00 (공휴일 제외)</span>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <AlignLeft className="w-3.5 h-3.5 text-[#006838]" />
              물품 세부 특징
            </h3>
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Caution / How to Claim */}
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/80 text-[11.5px] text-amber-900 leading-relaxed">
            <strong className="font-bold flex items-center gap-1 mb-1 text-amber-950">
              <CheckCheck className="w-3.5 h-3.5 text-amber-700" />
              수령 및 본인 확인 안내
            </strong>
            {item.caution}
          </div>
        </div>

        {/* Modal Footer CTA Button */}
        <div className="p-3.5 border-t border-slate-100 bg-white sticky bottom-0">
          <button
            onClick={() => onClaim(item)}
            className="w-full py-3 bg-[#006838] hover:bg-[#00874a] active:scale-[0.99] text-white rounded-2xl font-bold text-sm transition shadow-md flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>이 물건 내 것 같아요 (보관소 관리자 채팅하기)</span>
          </button>
          <p className="text-center text-[10.5px] text-slate-400 mt-2">
            클릭 시 해당 보관소({item.storageHub}) 1:1 대화방으로 물품 정보가 자동 첨부됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
