import React from 'react';
import { 
  Search, XCircle, Building2, LayoutGrid, MapPin, 
  RotateCcw, SearchX, BellPlus, Lock, Clock, Building, ChevronRight,
  CreditCard, Headphones, Umbrella, BatteryCharging, Sparkles, Box
} from 'lucide-react';
import { HUBS, CATEGORIES, AREAS } from '../data/mockData';

export default function SearchTab({
  searchQuery,
  setSearchQuery,
  selectedHub,
  setSelectedHub,
  selectedCategory,
  setSelectedCategory,
  selectedArea,
  setSelectedArea,
  filteredItems,
  onSelectItem,
  onGoToGuide
}) {
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "지갑/카드": return <CreditCard className="w-3.5 h-3.5" />;
      case "이어폰/전자기기": return <Headphones className="w-3.5 h-3.5" />;
      case "우산": return <Umbrella className="w-3.5 h-3.5" />;
      case "보조배터리/충전기": return <BatteryCharging className="w-3.5 h-3.5" />;
      case "키링/액세서리": return <Sparkles className="w-3.5 h-3.5" />;
      default: return <Box className="w-3.5 h-3.5" />;
    }
  };

  const hasFilterActive = selectedHub !== "전체" || selectedCategory !== "전체" || selectedArea !== "전체 구역" || searchQuery !== "";

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="물품명, 분실 위치 검색 (예: 지갑, 에어팟, 우산)"
          className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006838] focus:border-transparent shadow-sm"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hub Pill Filter */}
      <div>
        <div className="text-[11.5px] font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-[#006838]" />
            통합 보관 거점 선택
          </span>
          <span className="text-[11px] text-slate-400">거점 2곳으로 통합 운영</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-200/70 p-1 rounded-xl">
          {HUBS.map((hub) => {
            const isSelected = selectedHub === hub;
            return (
              <button
                key={hub}
                onClick={() => setSelectedHub(hub)}
                className={`py-2 text-xs font-semibold rounded-lg transition-all flex flex-col items-center justify-center ${
                  isSelected 
                    ? 'bg-[#006838] text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-white/60'
                }`}
              >
                <span>{hub}</span>
                <span className={`text-[9.5px] font-normal ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {hub === "제1학생회관" ? "인문·사회·자연" : hub === "제2학생회관" ? "공과·경영·농생" : "전체 물품"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div>
        <div className="text-[11.5px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
          <LayoutGrid className="w-3.5 h-3.5 text-[#006838]" />
          물품 카테고리
        </div>
        <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1 border ${
                  isSelected
                    ? 'bg-[#006838] text-white border-[#006838] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* College Area Dropdown */}
      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200">
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#006838]" />
          <span>습득 구역:</span>
        </div>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
        >
          {AREAS.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* List Header & Count */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
          <span>보관 중인 습득물</span>
          <span className="bg-[#e8f5ee] text-[#006838] px-2 py-0.5 rounded-full text-[11px] font-black">
            {filteredItems.length}건
          </span>
        </div>
        {hasFilterActive && (
          <button
            onClick={() => {
              setSelectedHub("전체");
              setSelectedCategory("전체");
              setSelectedArea("전체 구역");
              setSearchQuery("");
            }}
            className="text-[11px] text-slate-400 hover:text-[#006838] flex items-center space-x-1 underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>필터 초기화</span>
          </button>
        )}
      </div>

      {/* Item List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-200 my-4">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-700">조건에 맞는 습득물이 없습니다</p>
          <p className="text-xs text-slate-400 mt-1">
            검색어나 필터를 변경해 보시거나, [습득물 안내 & 입고알림] 탭에서 입고 알림을 신청해 보세요.
          </p>
          <button
            onClick={onGoToGuide}
            className="mt-4 px-4 py-2 bg-[#006838] text-white rounded-xl text-xs font-semibold hover:bg-[#00874a] transition shadow-sm inline-flex items-center space-x-1.5"
          >
            <BellPlus className="w-3.5 h-3.5" />
            <span>입고 알림 신청하러 가기</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredItems.map((item) => {
            const isUrgent = item.daysRemaining <= 5;
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer flex gap-3 relative overflow-hidden group"
              >
                {/* Image Box with Blur & Privacy Badge */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative border border-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition duration-300 ${item.isBlurred ? 'blur-md scale-110' : 'group-hover:scale-105'}`}
                    loading="lazy"
                  />
                  {item.isBlurred && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-1 text-center">
                      <Lock className="w-4 h-4 text-amber-300 mb-0.5" />
                      <span className="text-[9px] font-bold text-white leading-tight">
                        개인정보<br />가림 처리
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10.5px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      <span className={`text-[10.5px] font-black px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                        isUrgent
                          ? 'bg-rose-100 text-rose-600 animate-pulse'
                          : 'bg-emerald-50 text-[#006838]'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{isUrgent ? `⚠️ 폐기 임박 D-${item.daysRemaining}` : `보관 D-${item.daysRemaining}`}</span>
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-800 truncate leading-snug">
                      {item.title}
                    </h3>

                    <div className="flex items-center space-x-1 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{item.place}</span>
                      <span className="text-slate-300">·</span>
                      <span className="shrink-0">{item.foundDate.slice(5)}</span>
                    </div>
                  </div>

                  {/* Storage Location Badge */}
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#006838] flex items-center space-x-1 truncate">
                      <Building className="w-3 h-3" />
                      <span>{item.storageHub} 1층 통합보관소</span>
                    </span>
                    <span className="text-[11px] text-slate-400 group-hover:text-[#006838] font-medium flex items-center">
                      상세 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
