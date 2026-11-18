import React, { useState } from 'react';
import {
  AlertTriangle, ShieldX, MapPin, BellRing, CheckCircle,
  HelpCircle, Sparkles, Building
} from 'lucide-react';
import { CATEGORIES, AREAS } from '../data/mockData';
import CampusMap from './CampusMap';

export default function GuideTab({ onAlertSubmit }) {
  const [selectedHub, setSelectedHub] = useState("제1학생회관");

  return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left Column (6 Cols): 습득자용 인계 가이드 & 캠퍼스 약도 */}
              <div className="lg:col-span-6 space-y-4">

                {/* Warning Campaign Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-black text-slate-900">
                        물건을 주우셨나요? (습득자 인계 가이드)
                      </h2>
                      <p className="text-[11px] text-slate-500">에브리타임 업로드 전 꼭 읽어주세요</p>
                    </div>
                  </div>

                      {/* Warning Notice Box */}
                      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 leading-relaxed space-y-1.5">
                        <p className="font-black flex items-center gap-1.5 text-rose-700 text-xs sm:text-sm">
                          <ShieldX className="w-4 h-4 shrink-0" />
                          에브리타임에 학생증/카드 원본 사진을 올리지 마세요!
                        </p>
                          <p className="text-[11.5px] text-rose-800 leading-relaxed">
                            이름, 얼굴, 학번, 카드번호가 노출된 게시물은 <strong className="underline">개인정보보호법 위반</strong> 및 2차 도용 범죄에 악용될 수 있습니다.
                            가까운 <strong>제1·제2학생회관 무인보관함</strong>에 넣어주시면, 관리자가 안전하게 마스킹 블러 처리 후 전대 스토어 공식 시스템에 정식 등록합니다.
                          </p>
                      </div>

                          {/* Drop-off Hub Detail Cards */}
                          <div className="space-y-3">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs sm:text-sm text-[#006838] flex items-center gap-1.5">
                                  <Building className="w-4 h-4" />
                                  제1학생회관 1층 통합보관함
                                </span>
                                <span className="text-[10px] bg-emerald-100 text-[#006838] px-2 py-0.5 rounded-full font-bold">
                                  인문·사회·자연 권역
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                📍 <strong>위치:</strong> 제1학생회관 1층 학생자치기구실 앞 무인 수거함 및 통합관리실
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                • 24시간 무인 투입함 운영 (야간/주말에도 언제든 안전 투입 가능)
                              </p>
                            </div>

                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs sm:text-sm text-[#006838] flex items-center gap-1.5">
                                    <Building className="w-4 h-4" />
                                    제2학생회관 1층 통합보관함
                                  </span>
                                  <span className="text-[10px] bg-emerald-100 text-[#006838] px-2 py-0.5 rounded-full font-bold">
                                    공과·경영·농생 권역
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                  📍 <strong>위치:</strong> 제2학생회관 1층 편의점 옆 통합안내데스크 수거함
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  • 습득물 투입 즉시 접수증 번호 자동 발급
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Campus Map Visualization */}
                          <CampusMap selectedHub={selectedHub} onSelectHub={setSelectedHub} />

                        </div>

                          {/* Right Column (6 Cols): 비로그인 입고 알림 신청 */}
                          <div className="lg:col-span-6 space-y-4">

                            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div className="flex items-center space-x-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#006838] flex items-center justify-center font-bold">
                                    <BellRing className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h2 className="text-sm sm:text-base font-black text-slate-900">
                                      비로그인 키워드 입고 알림 신청
                                    </h2>
                                    <p className="text-[11px] text-slate-500">아직 분실물이 등록되지 않았나요?</p>
                                  </div>
                                </div>
                                <span className="text-[10.5px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold">
                                  무로그인 즉시 신청
                                </span>
                              </div>

                                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 text-xs text-emerald-950 leading-relaxed">
                                    <span className="font-bold text-[#006838] flex items-center gap-1 mb-1">
                                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                      스마트 입고 알림 프로세스
                                    </span>
                                    잃어버린 물건의 특징 키워드를 미리 남겨두시면, 제1·2학생회관에 일치하는 물건이 접수되는 순간
                                    입력하신 카카오톡 또는 문자로 실시간 입고 알림을 발송해 드립니다.
                                  </div>

                                    {/* Non-login Keyword Notification Form */}
          <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      onAlertSubmit();
                                      e.currentTarget.reset();
                                    }}
                                    className="space-y-4"
                                  >
                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">물품 카테고리 *</label>
                                  <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-[#006838] focus:outline-none">
                                    <option value="">카테고리를 선택하세요</option>
                                    {CATEGORIES.filter(c => c !== "전체").map(c => (
                                      <option key={c} value={c}>{c}</option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">물품 상세 특징 키워드 *</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="예: 노란색 실리콘 에어팟 케이스, 철가루 방지 스티커"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">분실 예상 구역</label>
                                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-[#006838] focus:outline-none">
                                    {AREAS.map(a => (
                                      <option key={a} value={a}>{a}</option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    알림 받을 연락처 또는 카카오톡 (선택)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="010-0000-0000 (알림 발송 후 14일 뒤 영구 파기)"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
                                  />
                                  <span className="text-[10px] text-slate-400 mt-1 block">
                                    * 개인정보보호법에 의거하여 알림 발송 목적 외에는 절대 사용되지 않습니다.
                                  </span>
                                </div>

                                <button
                                  type="submit"
                                  className="w-full py-3 bg-[#006838] hover:bg-[#00874a] text-white rounded-2xl text-xs sm:text-sm font-bold transition shadow-md active:scale-[0.99] flex items-center justify-center space-x-2"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  <span>무로그인 키워드 입고 알림 등록하기</span>
                                </button>
                              </form>
                            </div>

                          </div>

                        </div>
                        );
}
