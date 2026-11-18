import React from 'react';
import { 
  AlertTriangle, ShieldX, MapPin, BellRing, CheckCircle 
} from 'lucide-react';
import { CATEGORIES, AREAS } from '../data/mockData';

export default function GuideTab({ onAlertSubmit }) {
  return (
    <div className="p-3.5 space-y-4">
      {/* SECTION A: 습득자용 인계 가이드 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 mb-2.5">
          <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">물건을 주우셨나요? (습득자 안내)</h2>
            <p className="text-[11px] text-slate-500">에브리타임 업로드 전 꼭 읽어주세요</p>
          </div>
        </div>

        {/* Warning Notice Box */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 leading-relaxed mb-3">
          <p className="font-bold flex items-center gap-1 text-rose-700 mb-1">
            <ShieldX className="w-3.5 h-3.5" />
            에브리타임에 학생증/카드 사진을 올리지 마세요!
          </p>
          이름, 얼굴, 학번, 카드번호가 노출된 게시물은 <span className="underline font-semibold">개인정보보호법 위반</span> 및 2차 도용 피해 위험이 있습니다. 가까운 <strong>제1·2학생회관 보관함</strong>에 맡겨주시면 안전하게 마스킹 후 공지됩니다.
        </div>

        {/* Drop-off Hub Cards */}
        <div className="space-y-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#006838] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                제1학생회관 1층 통합보관함
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                인문·사회·자연 권역
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600 mt-1.5 leading-snug">
              📍 <strong>위치:</strong> 제1학생회관 1층 학생자치기구실 앞 무인 습득물 수거함 및 관리실
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              * 주말 및 야간에도 무인 투입함(24시간)에 보관 가능
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#006838] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                제2학생회관 1층 통합보관함
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                공과·경영·농생 권역
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600 mt-1.5 leading-snug">
              📍 <strong>위치:</strong> 제2학생회관 1층 편의점 옆 통합안내데스크 수거함
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              * 습득 후 투입 시 접수증 바코드가 자동 발급됩니다
            </p>
          </div>
        </div>
      </div>

      {/* SECTION B: 비로그인 입고 알림 신청 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#e8f5ee] text-[#006838] flex items-center justify-center font-bold">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">비로그인 입고 알림 신청</h2>
              <p className="text-[11px] text-slate-500">아직 분실물이 등록되지 않았나요?</p>
            </div>
          </div>
          <span className="text-[10.5px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
            회원가입 불필요
          </span>
        </div>

        <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
          잃어버린 물건의 키워드를 등록해두시면, 제1·2학생회관에 일치하는 습득물이 접수되는 즉시 카카오 알림톡 또는 문자로 알려드립니다.
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAlertSubmit();
            e.target.reset();
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">물품 카테고리 *</label>
            <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#006838] focus:outline-none">
              <option value="">카테고리를 선택하세요</option>
              {CATEGORIES.filter(c => c !== "전체").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">물품 상세 특징 키워드 *</label>
            <input
              type="text"
              required
              placeholder="예: 노란색 실리콘 에어팟 케이스, 춘식이 키링"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">분실 예상 구역</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#006838] focus:outline-none">
              {AREAS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              알림 받을 연락처 / 카카오톡 (선택)
            </label>
            <input
              type="text"
              placeholder="010-0000-0000 (알림 발송 후 즉시 파기)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              * 알림 발송 목적 외에는 사용되지 않으며, 14일 후 자동 영구 파기됩니다.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#006838] hover:bg-[#00874a] text-white rounded-xl text-xs font-bold transition shadow-sm active:scale-[0.99] flex items-center justify-center space-x-1.5"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>무로그인 키워드 입고 알림 신청</span>
          </button>
        </form>
      </div>
    </div>
  );
}
