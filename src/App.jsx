import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import NoticeBanner from './components/NoticeBanner';
import SearchTab from './components/SearchTab';
import ChatTab from './components/ChatTab';
import GuideTab from './components/GuideTab';
import ItemDetailModal from './components/ItemDetailModal';
import BottomNav from './components/BottomNav';
import AdminDashboard from './components/AdminDashboard';
import { INITIAL_LOST_ITEMS } from './data/mockData';
import { BellRing, RotateCcw } from 'lucide-react';

const DEFAULT_MESSAGES = {
  "제1학생회관": [
    {
      id: 1,
      sender: "system",
      text: "🛡️ 개인정보 보호 안내: 본 채팅방에서는 주민등록번호, 계좌번호 등 민감 정보를 일절 요구하지 않습니다.",
      time: "오전 10:00"
    },
    {
      id: 2,
      sender: "admin",
      text: "안녕하세요! 제1학생회관 통합분실물보관실입니다 (인문·사회·자연대 권역 담당). 찾으시는 물품이 있으시거나 수령 관련 문의사항이 있으시면 편하게 남겨주세요 😊",
      time: "오전 10:01"
    }
  ],
  "제2학생회관": [
    {
      id: 1,
      sender: "system",
      text: "🛡️ 개인정보 보호 안내: 본 채팅방에서는 주민등록번호, 계좌번호 등 민감 정보를 일절 요구하지 않습니다.",
      time: "오전 10:00"
    },
    {
      id: 2,
      sender: "admin",
      text: "반갑습니다! 제2학생회관 통합분실물보관실입니다 (공과·경영·농생대 권역 담당). 습득물 확인 및 방문 수령 절차를 실시간으로 안내해 드립니다.",
      time: "오전 10:01"
    }
  ]
};

export default function App() {
  // Mode: 'student' (Default) | 'admin' (B2B Showcase)
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("cnu_view_mode") || "student";
  });

  // Tab: 'search' | 'chat' | 'guide'
  const [activeTab, setActiveTab] = useState("search");
  const [noticeOpen, setNoticeOpen] = useState(true);

  // Lost Items Data from localStorage or Initial
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cnu_lost_items");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LOST_ITEMS;
  });

  // Messages Data from localStorage or Default
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("cnu_chat_messages");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_MESSAGES;
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHub, setSelectedHub] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedArea, setSelectedArea] = useState("전체 구역");

  // Selected item for modal
  const [selectedItem, setSelectedItem] = useState(null);

  // Global toast
  const [toastMessage, setToastMessage] = useState(null);

  // Chat states
  const [activeChatHub, setActiveChatHub] = useState("제1학생회관");
  const [attachedItem, setAttachedItem] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("cnu_lost_items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("cnu_chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("cnu_view_mode", mode);
  }, [mode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Reset Demo Data
  const handleResetData = () => {
    if (window.confirm("시연 데이터를 초기 6개 데이터와 기본 메시지로 리셋하시겠습니까?")) {
      localStorage.removeItem("cnu_lost_items");
      localStorage.removeItem("cnu_chat_messages");
      setItems(INITIAL_LOST_ITEMS);
      setMessages(DEFAULT_MESSAGES);
      setAttachedItem(null);
      setSelectedItem(null);
      showToast("🔄 시연 데이터가 초기 상태로 성공적으로 복원되었습니다.");
    }
  };

  // Filtered items
  const filteredItems = useMemo(() => {
      return items.filter((item) => {
        const matchHub = selectedHub === "전체" || item.storageHub === selectedHub;
        const matchCategory = selectedCategory === "전체" || item.category === selectedCategory;
        const matchArea = selectedArea === "전체 구역" || item.buildingArea === selectedArea;
        const matchQuery = searchQuery.trim() === "" ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchHub && matchCategory && matchArea && matchQuery;
      });
  }, [items, selectedHub, selectedCategory, selectedArea, searchQuery]);

  // Handle claim item from modal
  const handleClaimItem = (item) => {
    const targetHub = item.storageHub;
    setActiveChatHub(targetHub);
    setAttachedItem(item);
    setSelectedItem(null);
    setActiveTab("chat");

    const now = new Date();
    const timeStr = `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;

    const claimMsg = {
      id: Date.now(),
      sender: "user",
      text: `안녕하세요, 등록된 습득물 [${item.title} / 관리번호: ${item.id}] 보고 연락드렸습니다! 제 물건인 것 같은데 어떻게 확인하면 될까요?`,
      time: timeStr,
      attachedItem: item
    };

    setMessages((prev) => ({
      ...prev,
      [targetHub]: [...prev[targetHub], claimMsg]
    }));

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyTime = `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;

      let specificHint = "";
      if (item.category === "지갑/카드") {
        specificHint = "학생증에 기재된 학번 뒷자리나 카드 내 영문 이니셜, 또는 지갑 안쪽 수납물 특징을 말씀해 주시면 전산 대조해 드립니다.";
      } else if (item.category === "이어폰/전자기기") {
        specificHint = "기기 블루투스 연결 이력 캡처화면이나 '나의 찾기(Find My)' 앱 알림 사본이 있으시면 바로 확인 가능합니다.";
      } else {
        specificHint = "물품의 세부적인 특징(흠집 위치, 부착된 스티커, 브랜드 각인 등)을 간략히 말씀해 주세요.";
      }

      const botReply = {
        id: Date.now() + 1,
        sender: "admin",
        text: `안녕하세요 학생님! ${targetHub} 1층 통합보관소 관리자입니다.\n\n해당 물품([${item.title}])은 현재 안전하게 금고에 보관 중입니다. 🔒\n\n📌 본인 확인을 위해:\n${specificHint}\n\n확인되면 평일 10:00~18:00 사이에 ${targetHub} 1층 통합보관실로 학생증을 지참하여 방문해 주시면 즉시 수령증 작성 후 전달해 드립니다!`,
        time: replyTime
      };

      setMessages((prev) => ({
        ...prev,
        [targetHub]: [...prev[targetHub], botReply]
      }));
  }, 1100);
};

// Handle student send message
const handleSendMessage = (customText = null) => {
  const textToSend = customText || chatInput.trim();
  if (!textToSend) return;

  const now = new Date();
  const timeStr = `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;

  const userMsg = {
    id: Date.now(),
    sender: "user",
    text: textToSend,
    time: timeStr
  };

  setMessages((prev) => ({
    ...prev,
    [activeChatHub]: [...prev[activeChatHub], userMsg]
  }));

  if (!customText) setChatInput("");

  setIsTyping(true);
  setTimeout(() => {
    setIsTyping(false);
    const replyTime = `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;

    let replyText = "";
    if (textToSend.includes("지금 방문") || textToSend.includes("수령 가능한가요")) {
      replyText = `네, 학생님! ${activeChatHub} 보관소는 평일 10:00 ~ 18:00 (점심시간 12:00~13:00 제외) 동안 정상 운영 중입니다. 방문 시 학생증(모바일 학생증 가능) 또는 신분증을 꼭 지참해 주세요!`;
    } else if (textToSend.includes("본인 확인") || textToSend.includes("어떻게 하나요")) {
      replyText = `개인정보보호를 위해 채팅상에서는 주민번호를 요구하지 않습니다. 물품 외관의 미세 흠집, 잠금화면 사진, 결제 영수증 또는 학생증 이름 대조를 통해 현장에서 안전하게 1분 내로 확인해 드립니다.`;
    } else if (textToSend.includes("연장") || textToSend.includes("기간")) {
      replyText = `기본 보관 기한은 접수일로부터 14일입니다. 시험 기간이나 불가피한 사정으로 방문이 늦어지실 경우, 관리번호와 성함을 남겨주시면 최대 7일간 보관 연장 접수를 도와드립니다.`;
    } else if (textToSend.includes("대리 수령")) {
      replyText = `대리 수령의 경우 본인의 위임 동의 메시지 캡처와 대리인의 학생증이 필요합니다. 방문 전 대리인 성함을 채팅으로 미리 남겨주시면 확인 후 인도해 드립니다.`;
    } else {
      replyText = `문의해 주셔서 감사합니다! ${activeChatHub} 관리자가 학생님의 메시지를 확인했습니다. 확인 후 신속하게 처리해 드릴 예정이며, 급한 문의는 1층 관리실(내선 062-530-XXXX)로 즉시 방문해 주셔도 됩니다.`;
    }

    const botReply = {
      id: Date.now() + 1,
      sender: "admin",
      text: replyText,
      time: replyTime
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatHub]: [...prev[activeChatHub], botReply]
    }));
}, 1000);
  };

// Handle Admin Add Item
const handleAddItem = (newItem) => {
  setItems((prev) => [newItem, ...prev]);
};

// Handle Admin Update Item Status
const handleUpdateStatus = (id, newStatus) => {
  setItems((prev) => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
};

// Handle Admin Send Message to Student
const handleAdminSendMessage = (hub, text) => {
  const now = new Date();
  const timeStr = `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;
  const adminMsg = {
    id: Date.now(),
    sender: "admin",
    text,
    time: timeStr
  };
  setMessages((prev) => ({
    ...prev,
    [hub]: [...prev[hub], adminMsg]
  }));
};

return (
        <div className="min-h-screen bg-slate-900 text-slate-900 antialiased font-sans flex flex-col">

          {/* Header (Fully Responsive with Desktop Tabs and Mode Switch) */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mode={mode}
            setMode={setMode}
            onResetData={handleResetData}
            onInfoClick={() => showToast("ℹ️ 제1·2학생회관 통합보관소는 평일 10:00~18:00에 운영됩니다.")}
          />

          {/* Global Toast Notification */}
          {toastMessage && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-slate-900/95 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center space-x-2.5 backdrop-blur-md animate-in fade-in slide-in-from-top-4">
              <BellRing className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="leading-snug">{toastMessage}</span>
            </div>
          )}

          {/* Main Content Area: Responsive Width (Mobile: Full, Desktop: max-w-6xl) */}
          <div className="flex-1 w-full max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">

            {/* Notice Banner (Student Mode only) */}
            {mode === "student" && (
              <NoticeBanner isOpen={noticeOpen} onToggle={() => setNoticeOpen(!noticeOpen)} />
            )}

            {/* ADMIN MODE VIEW */}
            {mode === "admin" ? (
              <AdminDashboard
                items={items}
                onAddItem={handleAddItem}
                onUpdateStatus={handleUpdateStatus}
                messages={messages}
                onAdminSendMessage={handleAdminSendMessage}
                activeAdminChatHub={activeChatHub}
                setActiveAdminChatHub={setActiveChatHub}
                showToast={showToast}
              />
            ) : (
              /* STUDENT MODE VIEW */
              <main className="pb-20 md:pb-8">
                {activeTab === "search" && (
                  <SearchTab
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedHub={selectedHub}
                    setSelectedHub={setSelectedHub}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedArea={selectedArea}
                    setSelectedArea={setSelectedArea}
                    filteredItems={filteredItems}
                    onSelectItem={(item) => setSelectedItem(item)}
                    onGoToGuide={() => setActiveTab("guide")}
                  />
                )}

            {activeTab === "chat" && (
                  <ChatTab
                    activeChatHub={activeChatHub}
                    setActiveChatHub={setActiveChatHub}
                    attachedItem={attachedItem}
                    setAttachedItem={setAttachedItem}
                    messages={messages}
                    chatInput={chatInput}
                    setChatInput={setChatInput}
                    isTyping={isTyping}
                    onSendMessage={handleSendMessage}
                  />
                )}

                {activeTab === "guide" && (
                  <GuideTab
                    onAlertSubmit={() => showToast("🔔 입고 알림이 성공적으로 등록되었습니다! 유사 물품 접수 시 즉시 안내됩니다.")}
                  />
                )}
              </main>
            )}

          </div>

          {/* Floating Demo Reset Button for Easy Access */}
          <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-30">
            <button
              onClick={handleResetData}
              className="bg-slate-800/90 hover:bg-slate-900 text-slate-300 hover:text-white px-3 py-2 rounded-2xl shadow-lg border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 backdrop-blur-sm transition active:scale-95"
              title="시연 데이터 초기화"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">시연 데이터 초기화</span>
            </button>
          </div>

        {/* Item Detail Modal (Bottom-sheet on mobile, Centered Modal on PC) */}
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onClaim={handleClaimItem}
        />

        {/* Bottom Navigation: Mobile only (md:hidden) */}
        {mode === "student" && (
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

    </div>
    );
}
