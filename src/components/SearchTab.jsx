import React from 'react';
import {
  Search, XCircle, Building2, LayoutGrid, MapPin,
  RotateCcw, SearchX, BellPlus, Clock, Building, ChevronRight,
  CreditCard, Headphones, Umbrella, BatteryCharging, Sparkles, Box, CheckCircle2
} from 'lucide-react';
import { HUBS, CATEGORIES, AREAS } from '../data/mockData';
import ItemIllustration from './ItemIllustration';

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
          <div className="space-y-4">
            {/* Search & Filter Header Bar */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">

              {/* Top: Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="물품명, 분실 위치 검색 (예: 지갑, 에어팟, 우산, 춘식이, 백도)"
                  className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006838] focus:border-transparent transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

        {/* Filter Controls: Hub Pills + Area Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Storage Hub Pill Selection */}
          <div className="flex-1">
            <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#006838]" />
                통합 보관 거점 선택
              </span>
              <span className="text-[10.5px] text-slate-400">제1·2학생회관 2곳으로 통합 운영</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-2xl">
              {HUBS.map((hub) => {
                const isSelected = selectedHub === hub;
                return (
                  <button
                    key={hub}
                    onClick={() => setSelectedHub(hub)}
                    className={`py-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center justify-center ${
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

          {/* College Campus Area Dropdown */}
          <div className="md:w-64">
            <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#006838]" />
              습득 단과대 구역 필터
            </div>
            <div className="bg-slate-100 px-3 py-2.5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                {AREAS.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

                {/* Category Horizontal Scroll Chips */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                    <LayoutGrid className="w-3.5 h-3.5 text-[#006838]" />
                    물품 카테고리
                  </div>
                  <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 border ${isSelected
                              ? 'bg-[#006838] text-white border-[#006838] shadow-sm'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                            }`}
                        >
                          {getCategoryIcon(cat)}
                          <span>{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* List Header & Count */}
                  <div className="flex items-center justify-between px-1">
                    <div className="text-xs sm:text-sm font-black text-slate-800 flex items-center space-x-2">
                      <span>보관 중인 습득물</span>
                        <span className="bg-emerald-100 text-[#006838] px-2.5 py-0.5 rounded-full text-xs font-black">
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
                        className="text-xs text-slate-400 hover:text-[#006838] flex items-center space-x-1 underline font-medium"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>필터 초기화</span>
                      </button>
                    )}
                  </div>

                  {/* Responsive Grid: Mobile 1~2 Cols, PC 3~4 Cols (md:grid-cols-3 lg:grid-cols-4 gap-5) */}
                  {filteredItems.length === 0 ? (
                        <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-slate-200 my-4 shadow-xs">
                          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                            <SearchX className="w-7 h-7" />
                          </div>
                            <h3 className="text-sm font-bold text-slate-700">조건에 맞는 습득물이 없습니다</h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                              검색어나 필터를 변경해 보시거나, [습득물 안내 & 입고알림] 탭에서 비로그인 입고 알림을 신청해 두시면 등록 즉시 알려드립니다.
                            </p>
                            <button
                              onClick={onGoToGuide}
                              className="mt-4 px-4 py-2.5 bg-[#006838] text-white rounded-xl text-xs font-bold hover:bg-[#00874a] transition shadow-sm inline-flex items-center space-x-1.5"
                            >
                              <BellPlus className="w-4 h-4" />
                              <span>비로그인 입고 알림 신청하기</span>
                            </button>
                        </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                            {filteredItems.map((item) => {
                              const isUrgent = item.daysRemaining <= 5 && item.status !== "반환완료" && item.status !== "폐기됨";
                              const isReturned = item.status === "반환완료";
                              const isDisposed = item.status === "폐기됨";

                              return (
                                <div
                                  key={item.id}
                                  onClick={() => onSelectItem(item)}
                                  className={`bg-white rounded-3xl p-4 border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] cursor-pointer flex flex-col justify-between group overflow-hidden ${isReturned ? 'opacity-80 border-slate-200 bg-slate-50/50' :
                                      isDisposed ? 'opacity-60 border-rose-200' :
                                        'border-slate-200/90 shadow-sm hover:border-emerald-300'
                                    }`}
                                >
                                  <div>
                                    {/* Top Vector Illustration (No External Unsplash URLs!) */}
                                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative mb-3 border border-slate-100">
                                      <ItemIllustration item={item} />

                                              {/* Floating Status Badges over Illustration */}
                                              <div className="absolute top-2 left-2 flex items-center space-x-1 z-20">
                                                <span className="text-[10px] font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
                                                  {item.category}
                                                </span>
                                              </div>

                                                <div className="absolute top-2 right-2 z-20">
                                                  {isReturned ? (
                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs flex items-center gap-1">
                                                      <CheckCircle2 className="w-3 h-3" />
                                                      반환 완료
                                                    </span>
                                                  ) : isDisposed ? (
                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-xs">
                                                      폐기됨
                                                    </span>
                                                  ) : (
                                                    <span className={`text-[10.5px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center space-x-1 ${isUrgent
                                                        ? 'bg-rose-500 text-white animate-pulse'
                                                        : 'bg-white/95 text-[#006838]'
                                                      }`}>
                                                      <Clock className="w-3 h-3" />
                                                      <span>{isUrgent ? `⚠️ D-${item.daysRemaining}` : `D-${item.daysRemaining}`}</span>
                                                    </span>
                                                  )}
                                                </div>
                                              </div>

                                                {/* Card Content Info */}
                                                <h3 className="font-bold text-sm sm:text-base text-slate-800 line-clamp-1 leading-snug group-hover:text-[#006838] transition">
                                                  {item.title}
                                                </h3>

                                                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1.5">
                                                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                  <span className="truncate">{item.place}</span>
                                                  <span className="text-slate-300">·</span>
                                                  <span className="shrink-0">{item.foundDate.slice(5)}</span>
                                                </div>

                                                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                                                  {item.description}
                                                </p>
                                              </div>

                                              {/* Storage Hub Footer Badge */}
                                              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#006838] flex items-center space-x-1 truncate">
                                                  <Building className="w-3.5 h-3.5 shrink-0" />
                                                  <span>{item.storageHub} 1층</span>
                                                </span>
                                                <span className="text-xs text-slate-400 group-hover:text-[#006838] font-bold flex items-center">
                                                  상세보기 <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                                                </span>
                                              </div>

                                          </div>
                                          );
          })}
                                        </div>
      )}
                                      </div>
                                      );
}
