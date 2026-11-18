import React, { useState } from 'react';
import { 
  Building2, TrendingUp, AlertTriangle, ShieldCheck, 
  PlusCircle, PackageCheck, Trash2, Send, CheckCircle2, RotateCcw,
  Sparkles, MessageSquare, ArrowUpRight, Clock, MapPin
} from 'lucide-react';
import { CATEGORIES, AREAS, HUBS } from '../data/mockData';
import ItemIllustration from './ItemIllustration';

export default function AdminDashboard({
  items,
  onAddItem,
  onUpdateStatus,
  messages,
  onAdminSendMessage,
  activeAdminChatHub,
  setActiveAdminChatHub,
  showToast
}) {
  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("지갑/카드");
  const [newPlace, setNewPlace] = useState("");
  const [newArea, setNewArea] = useState("인문대학");
  const [newHub, setNewHub] = useState("제1학생회관");
  const [newDesc, setNewDesc] = useState("");
  const [newIsBlurred, setNewIsBlurred] = useState(true);

  // Admin reply input
  const [adminInput, setAdminInput] = useState("");

  // Filter for inventory
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | '보관중' | '반환완료' | '폐기됨'

  // Calculations for KPI Cards
  const activeItems = items.filter(it => it.status !== "반환완료" && it.status !== "폐기됨");
  const hub1Count = activeItems.filter(it => it.storageHub === "제1학생회관").length;
  const hub2Count = activeItems.filter(it => it.storageHub === "제2학생회관").length;

  const urgentCount = activeItems.filter(it => it.daysRemaining <= 5).length;
  const privacyMaskedCount = items.filter(it => it.isBlurred).length;
  const returnedCount = items.filter(it => it.status === "반환완료").length;

  const handleRegisterItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPlace.trim()) return;

    const newItem = {
      id: `CNU-${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}${String(new Date().getDate()).padStart(2,'0')}-${Math.floor(10 + Math.random()*90)}`,
      title: newTitle.trim(),
      category: newCategory,
      place: newPlace.trim(),
      buildingArea: newArea,
      storageHub: newHub,
      storageLocation: `${newHub} 1층 통합보관소`,
      foundDate: new Date().toISOString().slice(0, 10),
      daysRemaining: 14,
      isBlurred: newIsBlurred,
      status: "보관중",
      description: newDesc.trim() || `${newTitle}이(가) ${newPlace}에서 습득되어 정식 입고되었습니다.`,
      caution: newIsBlurred 
        ? "개인정보 보호를 위해 마스킹 처리되었습니다. 본인 인증 후 안전하게 인계됩니다."
        : "고유 특징 대조 후 본인 확인을 거쳐 인계됩니다."
    };

    onAddItem(newItem);
    showToast(`✅ [${newItem.title}] 물품이 시스템에 정식 입고되었습니다!`);
    
    // Reset form
    setNewTitle("");
    setNewPlace("");
    setNewDesc("");
  };

  const handleSendAdminReply = (e) => {
    e.preventDefault();
    if (!adminInput.trim()) return;
    onAdminSendMessage(activeAdminChatHub, adminInput.trim());
    setAdminInput("");
    showToast(`📨 ${activeAdminChatHub} 관리자 답변이 학생에게 실시간 전송되었습니다.`);
  };

  const filteredItems = items.filter(it => {
    if (statusFilter === "all") return true;
    if (statusFilter === "보관중") return it.status === "보관중" || !it.status;
    return it.status === statusFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Admin Mode Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                B2B Admin Console
              </span>
              <span className="text-xs text-emerald-300 font-semibold">
                ● 실시간 관제 및 학생 응대 중
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black mt-2 tracking-tight">
              전남대 통합 분실물 관리 센터 관리자 모드
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              제1학생회관(인문·사회·자연 권역) 및 제2학생회관(공과·경영·농생 권역) 통합 재고 관리, 
              신규 습득물 원클릭 접수 및 학생 1:1 문의 실시간 응대 콘솔입니다.
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-emerald-200">
              전대 스토어 연동 API 상태: <strong className="text-white">정상 연동됨</strong>
            </span>
          </div>
        </div>

        {/* 4 B2B Key Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
          {/* Card 1: 통합 보관 중 */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 hover:border-emerald-500/50 transition">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                통합 보관 중
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                실시간
              </span>
            </div>
            <div className="text-2xl font-black text-white">{activeItems.length}<span className="text-sm font-normal text-slate-400 ml-1">건</span></div>
            <div className="text-[11px] text-emerald-300 mt-1 font-medium">
              1학 {hub1Count}건 · 2학 {hub2Count}건
            </div>
          </div>

          {/* Card 2: 목표 분실물 반환율 KPI */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 hover:border-emerald-500/50 transition">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                목표 분실물 반환율
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                도입 목표 KPI
              </span>
            </div>
            <div className="text-2xl font-black text-amber-300">82%</div>
            <div className="text-[11px] text-slate-300 mt-1 font-medium flex items-center">
              <span>기존 분산 대비 +43%p 향상</span>
            </div>
          </div>

          {/* Card 3: 14일 표준 보관 만료 임박 */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 hover:border-rose-500/50 transition">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                보관 만료 임박
              </span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-bold">
                D-5 이하
              </span>
            </div>
            <div className="text-2xl font-black text-rose-400">{urgentCount}<span className="text-sm font-normal text-slate-400 ml-1">건</span></div>
            <div className="text-[11px] text-rose-300 mt-1 font-medium">
              14일 후 규정 절차 폐기/인계
            </div>
          </div>

          {/* Card 4: 개인정보 자동 블러 보호 */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 hover:border-sky-500/50 transition">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                개인정보 보호 처리
              </span>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-bold">
                100% 암호조치
              </span>
            </div>
            <div className="text-2xl font-black text-sky-300">{privacyMaskedCount}<span className="text-sm font-normal text-slate-400 ml-1">건</span></div>
            <div className="text-[11px] text-slate-300 mt-1 font-medium">
              학생증/신용카드 도용 0건 달성
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 신규 습득물 간편 등록 폼 (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#006838] flex items-center justify-center font-bold">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900">신규 습득물 간편 등록</h2>
                <p className="text-[11px] text-slate-400">등록 즉시 학생 화면 최상단에 실시간 노출됩니다</p>
              </div>
            </div>

            <form onSubmit={handleRegisterItem} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">물품명 *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 갈색 가죽 장지갑, 소니 헤드폰 등"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">카테고리</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#006838] focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c !== "전체").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">보관 거점 *</label>
                  <select
                    value={newHub}
                    onChange={(e) => setNewHub(e.target.value)}
                    className="w-full bg-emerald-50 border border-emerald-300 text-[#006838] font-bold rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
                  >
                    <option value="제1학생회관">제1학생회관 (1학)</option>
                    <option value="제2학생회관">제2학생회관 (2학)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">습득 구역</label>
                  <select
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#006838] focus:outline-none"
                  >
                    {AREAS.filter(a => a !== "전체 구역").map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">상세 습득 장소 *</label>
                  <input
                    type="text"
                    required
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    placeholder="예: 백도 3층 2열람실 책상"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">세부 특징 및 식별 정보</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="스크래치 위치, 내부 소지품 특징 등..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
                />
              </div>

              {/* Privacy Masking Checkbox */}
              <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-3 flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  id="privacyBlur"
                  checked={newIsBlurred}
                  onChange={(e) => setNewIsBlurred(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#006838] rounded focus:ring-[#006838]"
                />
                <label htmlFor="privacyBlur" className="text-xs text-amber-950 font-medium cursor-pointer">
                  <strong className="font-bold flex items-center gap-1 text-amber-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    🔒 개인정보 포함 물품 자동 블러 처리
                  </strong>
                  카드번호, 학생증 사진, 개인 서명 등을 자동으로 가림 처리하여 학생 공개 화면에 게재합니다.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#006838] hover:bg-[#00874a] text-white rounded-2xl text-xs font-bold transition shadow-md flex items-center justify-center space-x-2 active:scale-[0.99]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>습득물 신규 등록 및 학생 화면 즉시 반영</span>
              </button>
            </form>
          </div>

          {/* Student Chat Real-time Reply Box in Admin View */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">학생 1:1 문의 실시간 응대 콘솔</h3>
                  <p className="text-[10px] text-slate-400">답장 시 학생 화면 채팅창에 즉시 전송됩니다</p>
                </div>
              </div>

              {/* Hub toggle */}
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveAdminChatHub("제1학생회관")}
                  className={`text-[10px] px-2 py-0.5 rounded font-bold transition ${
                    activeAdminChatHub === "제1학생회관" ? 'bg-[#006838] text-white' : 'text-slate-600'
                  }`}
                >
                  1학
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAdminChatHub("제2학생회관")}
                  className={`text-[10px] px-2 py-0.5 rounded font-bold transition ${
                    activeAdminChatHub === "제2학생회관" ? 'bg-[#006838] text-white' : 'text-slate-600'
                  }`}
                >
                  2학
                </button>
              </div>
            </div>

            {/* Recent Messages View */}
            <div className="h-44 overflow-y-auto bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-200 text-xs">
              {messages[activeAdminChatHub]?.filter(m => m.sender !== 'system').map(m => (
                <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-start' : 'items-end'}`}>
                  <div className={`px-2.5 py-1.5 rounded-xl max-w-[85%] text-[11.5px] leading-relaxed ${
                    m.sender === 'user' ? 'bg-white border border-slate-200 text-slate-800' : 'bg-[#006838] text-white'
                  }`}>
                    <span className="text-[9.5px] opacity-75 block mb-0.5 font-bold">
                      {m.sender === 'user' ? '학생 문의' : `${activeAdminChatHub} 관리자`}
                    </span>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Quick Reply Form for Admin */}
            <form onSubmit={handleSendAdminReply} className="mt-2.5 flex items-center space-x-1.5">
              <input
                type="text"
                value={adminInput}
                onChange={(e) => setAdminInput(e.target.value)}
                placeholder={`${activeAdminChatHub} 관리자로서 답장 작성...`}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#006838] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!adminInput.trim()}
                className="px-3.5 py-2 bg-[#006838] text-white rounded-xl text-xs font-bold hover:bg-[#00874a] disabled:opacity-50 transition flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>답장</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: 통합 재고 & 폐기 관리 리스트 (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-[#006838]" />
                  통합 재고·폐기 수명주기 관리
                </h2>
                <p className="text-[11px] text-slate-400">14일 보관 규정에 따른 수령 완료(반환) 및 폐기 승인 처리</p>
              </div>

              {/* Status Filters */}
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { key: 'all', label: '전체' },
                  { key: '보관중', label: '보관중' },
                  { key: '반환완료', label: '반환완료' },
                  { key: '폐기됨', label: '폐기됨' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setStatusFilter(tab.key)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                      statusFilter === tab.key ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Item Cards */}
            <div className="space-y-3 mt-4 max-h-[640px] overflow-y-auto pr-1">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  선택한 상태 조건의 습득물이 없습니다.
                </div>
              ) : (
                filteredItems.map(item => {
                  const isReturned = item.status === "반환완료";
                  const isDisposed = item.status === "폐기됨";

                  return (
                    <div 
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        isReturned ? 'bg-slate-50/70 border-slate-200 opacity-75' :
                        isDisposed ? 'bg-rose-50/40 border-rose-200 opacity-60' :
                        'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {/* Mini Vector Thumbnail */}
                        <div className="w-14 h-14 rounded-xl shrink-0 overflow-hidden bg-slate-100 border border-slate-200">
                          <ItemIllustration item={item} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5 mb-0.5">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                              {item.id}
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.2 rounded-full ${
                              isReturned ? 'bg-emerald-100 text-[#006838]' :
                              isDisposed ? 'bg-rose-100 text-rose-600' :
                              item.daysRemaining <= 5 ? 'bg-rose-100 text-rose-600 font-bold' :
                              'bg-emerald-50 text-[#006838]'
                            }`}>
                              {isReturned ? '✅ 수령 완료(반환)' : isDisposed ? '🗑️ 폐기 처리됨' : `D-${item.daysRemaining}`}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {item.category}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 truncate max-w-[280px]">
                            {item.title}
                          </h4>

                          <div className="flex items-center space-x-2 text-[10.5px] text-slate-500 mt-1">
                            <span className="flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {item.place}
                            </span>
                            <span>•</span>
                            <span className="text-[#006838] font-bold">{item.storageHub}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Status Change Buttons */}
                      <div className="flex items-center space-x-1.5 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {!isReturned && (
                          <button
                            onClick={() => {
                              onUpdateStatus(item.id, "반환완료");
                              showToast(`🎉 [${item.title}] 수령 완료(본인 인도) 처리되었습니다.`);
                            }}
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#006838] border border-emerald-300 rounded-xl text-[11px] font-bold transition flex items-center space-x-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>수령 완료</span>
                          </button>
                        )}

                        {!isDisposed && (
                          <button
                            onClick={() => {
                              onUpdateStatus(item.id, "폐기됨");
                              showToast(`🗑️ [${item.title}] 14일 경과 규정에 따라 폐기 승인되었습니다.`);
                            }}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-[11px] font-bold transition flex items-center space-x-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>폐기 처리</span>
                          </button>
                        )}

                        {(isReturned || isDisposed) && (
                          <button
                            onClick={() => {
                              onUpdateStatus(item.id, "보관중");
                              showToast(`↩️ [${item.title}] 보관 중 상태로 복원되었습니다.`);
                            }}
                            className="px-2 py-1 text-slate-400 hover:text-slate-600 text-[10px] underline"
                          >
                            보관중 복원
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
