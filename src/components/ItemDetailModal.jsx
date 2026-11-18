import React from 'react';
import {
  X, Lock, AlignLeft, CheckCheck, MessageSquare, Building, Clock, MapPin
} from 'lucide-react';
import ItemIllustration from './ItemIllustration';
import CampusMap from './CampusMap';

export default function ItemDetailModal({ item, onClose, onClaim }) {
  if (!item) return null;

  return (
      <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">

        {/* Container: Bottom Sheet on Mobile, Centered Modal on PC (max-w-2xl) */}
        <div
          className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 border border-slate-200"
        >
          {/* Modal Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg">
                      {item.id}
                    </span>
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
              item.status === "반환완료" ? 'bg-emerald-100 text-[#006838]' :
              item.daysRemaining <= 5 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-[#006838]'
            }`}>
              {item.status === "반환완료" ? "수령 완료됨" : `보관 만료 D-${item.daysRemaining}`}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
              {item.category}
            </span>
          </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                    <div className="overflow-y-auto p-5 sm:p-6 space-y-5">

                      {/* Top Vector Illustration */}
                      <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <ItemIllustration item={item} isDetail={true} />
                      </div>

                      {/* Title & Info */}
                      <div>
                          <span className="text-xs font-bold text-[#006838] bg-emerald-50 px-2.5 py-1 rounded-md">
                            {item.storageHub} 보관 중
                          </span>
                          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-2 leading-snug">
                            {item.title}
                          </h2>
                      </div>

                      {/* Specification Table */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="text-slate-400 font-medium">습득 위치</span>
                                <span className="text-slate-800 font-bold text-right">{item.place} ({item.buildingArea})</span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-slate-400 font-medium">접수 일시</span>
                                <span className="text-slate-800 font-bold">{item.foundDate} (14일간 보관 원칙)</span>
                              </div>
                            </div>

                              <div className="space-y-2 sm:border-l sm:border-slate-200 sm:pl-3">
                                <div className="flex justify-between items-start">
                                  <span className="text-slate-400 font-medium">현재 보관 장소</span>
                                  <span className="text-[#006838] font-black text-right">{item.storageLocation}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                  <span className="text-slate-400 font-medium">운영 시간</span>
                                  <span className="text-slate-800 font-bold">평일 10:00 ~ 18:00 (공휴일 제외)</span>
                                </div>
                              </div>
                            </div>

                            {/* Detailed Description */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                  <AlignLeft className="w-4 h-4 text-[#006838]" />
                                  물품 세부 특징 및 상태
                                </h3>
                                  <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>

                                {/* Mini Campus Map View in Detail Modal */}
                                <div>
                                  <h3 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-[#006838]" />
                                    현재 보관 위치 캠퍼스 안내
                                  </h3>
                                  <CampusMap selectedHub={item.storageHub} />
                                </div>

                                {/* Caution / How to Claim */}
                                    <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                                      <strong className="font-bold flex items-center gap-1.5 mb-1.5 text-amber-950 text-xs sm:text-sm">
                                        <CheckCheck className="w-4 h-4 text-amber-700" />
                                        수령 및 본인 확인 안내
                                      </strong>
                                      {item.caution}
                                    </div>

                                </div>

                                {/* Modal Footer CTA Button */}
                                  <div className="p-4 sm:p-5 border-t border-slate-100 bg-white sticky bottom-0">
                                    <button
                                      onClick={() => onClaim(item)}
                                      className="w-full py-3.5 bg-[#006838] hover:bg-[#00874a] active:scale-[0.99] text-white rounded-2xl font-bold text-sm transition shadow-md flex items-center justify-center space-x-2"
                                    >
                                      <MessageSquare className="w-4 h-4" />
                                      <span>이 물건 내 것 같아요 ({item.storageHub} 관리자 채팅하기)</span>
                                    </button>
                                      <p className="text-center text-[11px] text-slate-400 mt-2">
                                        버튼을 누르면 {item.storageHub} 1:1 대화방으로 물품 카드가 자동 첨부되어 이동합니다.
                                      </p>
                                  </div>

                                </div>
                            </div>
                            );
}
