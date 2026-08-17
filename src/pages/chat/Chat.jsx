import { useState, useRef, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Paperclip,
  Send,
  MoreVertical,
  UserPlus,
} from "lucide-react";
import "../../styles/pages/Chat.css";

const CONVERSATIONS_DATA = [
  {
    id: "conv-1",
    name: "Ahmad Tahalu",
    phone: "0821-1896-6767",
    initials: "AT",
    avatarBg: "#DBEAFE",
    avatarColor: "#2563EB",
    lastMessage: "Okee kak, saya tunggu besok yah! uhuy",
    time: "10:30",
    unread: 1,
    isReplied: false,
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Kak, mau tanya pesanan saya sudah sampai mana ya?",
        time: "10:30",
      },
      {
        id: "m2",
        sender: "customer",
        text: "Aku udah loundry dari kemarin",
        time: "10:30",
      },
      {
        id: "m3",
        sender: "admin",
        text: "Halo Kak Ahmad 👋 Untuk pesanan kakak, saat ini masih dalam proses pencucian ya, Kak.",
        time: "10:30",
      },
      {
        id: "m4",
        sender: "customer",
        text: "Oke kak, kalau bisa besok sore ya. Soalnya mau dipakai malam.",
        time: "10:30",
      },
      {
        id: "m5",
        sender: "admin",
        text: "Siap Kak, kami usahakan selesai sesuai estimasi ya 🙏",
        time: "10:30",
      },
      {
        id: "m6",
        sender: "customer",
        text: "Okee kak, saya tunggu besok yah! uhuy",
        time: "10:30",
      },
    ],
  },
  {
    id: "conv-2",
    name: "Ahmad Tahalu",
    phone: "0812-3456-7890",
    initials: "AT",
    avatarBg: "#FEF3C7",
    avatarColor: "#D97706",
    lastMessage: "Okee kak, saya tunggu besok yah! uhuy",
    time: "10:30",
    unread: 0,
    isReplied: true,
    messages: [
      {
        id: "m2-1",
        sender: "customer",
        text: "Okee kak, saya tunggu besok yah! uhuy",
        time: "10:30",
      },
    ],
  },
  {
    id: "conv-3",
    name: "Ahmad Tahalu",
    phone: "0857-1122-3344",
    initials: "AT",
    avatarBg: "#D1FAE5",
    avatarColor: "#059669",
    lastMessage: "Okee kak, saya tunggu besok yah! uhuy",
    time: "10:30",
    unread: 0,
    isReplied: true,
    messages: [
      {
        id: "m3-1",
        sender: "customer",
        text: "Okee kak, saya tunggu besok yah! uhuy",
        time: "10:30",
      },
    ],
  },
  {
    id: "conv-4",
    name: "Ahmad Tahalu",
    phone: "0896-9988-7766",
    initials: "AT",
    avatarBg: "#FEE2E2",
    avatarColor: "#DC2626",
    lastMessage: "Okee kak, saya tunggu besok yah! uhuy",
    time: "10:30",
    unread: 0,
    isReplied: true,
    messages: [
      {
        id: "m4-1",
        sender: "customer",
        text: "Okee kak, saya tunggu besok yah! uhuy",
        time: "10:30",
      },
    ],
  },
  {
    id: "conv-5",
    name: "Ahmad Tahalu",
    phone: "0877-4433-2211",
    initials: "AT",
    avatarBg: "#EDE9FE",
    avatarColor: "#7C3AED",
    lastMessage: "Okee kak, saya tunggu besok yah! uhuy",
    time: "10:30",
    unread: 0,
    isReplied: true,
    messages: [
      {
        id: "m5-1",
        sender: "customer",
        text: "Okee kak, saya tunggu besok yah! uhuy",
        time: "10:30",
      },
    ],
  },
];

function Chat() {
  const [conversations, setConversations] = useState(CONVERSATIONS_DATA);
  const [activeConvId, setActiveConvId] = useState("conv-1");
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");

  const messagesEndRef = useRef(null);

  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  // Auto scroll to bottom of messages stream
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesTab =
      activeTab === "Semua" ? true : activeTab === "Belum Dibalas" ? !c.isReplied : true;
    return matchesSearch && matchesTab;
  });

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "admin",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessage: newMessage.text,
              time: newMessage.time,
              isReplied: true,
              unread: 0,
              messages: [...c.messages, newMessage],
            }
          : c
      )
    );

    setInputText("");
  };

  // Start new chat with customer
  const handleStartNewChat = () => {
    const name = prompt("Masukkan Nama Pelanggan:");
    if (!name) return;
    const phone = prompt("Masukkan Nomor HP Pelanggan:") || "0812-3456-7890";

    const newConv = {
      id: `conv-${Date.now()}`,
      name,
      phone,
      initials: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      avatarBg: "#DBEAFE",
      avatarColor: "#2563EB",
      lastMessage: "Percakapan baru dimulai",
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      unread: 0,
      isReplied: true,
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: "admin",
          text: `Halo Kak ${name} 👋 Ada yang bisa kami bantu?`,
          time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    setConversations([newConv, ...conversations]);
    setActiveConvId(newConv.id);
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-page__header">
        <div className="chat-page__title-group">
          <h1 className="chat-page__title">Chat dengan Pengguna</h1>
          <p className="chat-page__subtitle">
            Kelola komunikasi dengan pelanggan
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartNewChat}
          className="chat-new-btn"
          title="Mulai Chat Pelanggan Baru"
        >
          <Plus className="w-5 h-5" />
          <span>Chat Pelanggan</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="chat-layout">
        {/* Left Column: Conversations Sidebar */}
        <div className="chat-sidebar-card">
          {/* Search & Filter Header */}
          <div className="chat-search-row">
            <div className="chat-search-box">
              <Search className="w-4 h-4 text-[#747784]" />
              <input
                type="text"
                placeholder="Cari Nama Pelanggan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="chat-search-box__input"
              />
            </div>

            <button
              type="button"
              className="chat-filter-icon-btn"
              title="Filter Percakapan"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="chat-tabs">
            <button
              type="button"
              className={`chat-tab-btn ${activeTab === "Semua" ? "chat-tab-btn--active" : ""}`}
              onClick={() => setActiveTab("Semua")}
            >
              Semua
            </button>
            <button
              type="button"
              className={`chat-tab-btn ${activeTab === "Belum Dibalas" ? "chat-tab-btn--active" : ""}`}
              onClick={() => setActiveTab("Belum Dibalas")}
            >
              Belum Dibalas
            </button>
          </div>

          {/* Conversations List */}
          <div className="chat-inbox-list">
            {filteredConversations.length === 0 ? (
              <p
                style={{
                  fontSize: "13px",
                  color: "#8E8E8E",
                  textAlign: "center",
                  padding: "24px 0",
                }}
              >
                Tidak ada percakapan ditemukan.
              </p>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setConversations((prev) =>
                      prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c))
                    );
                  }}
                  className={`chat-inbox-item ${activeConvId === conv.id ? "chat-inbox-item--active" : ""}`}
                >
                  {/* Avatar Initials */}
                  <div
                    className="chat-avatar-circle"
                    style={{
                      backgroundColor: conv.avatarBg,
                      color: conv.avatarColor,
                    }}
                  >
                    {conv.initials}
                  </div>

                  {/* Name & Last Message */}
                  <div className="chat-inbox-info">
                    <p className="chat-inbox-name">{conv.name}</p>
                    <p className="chat-inbox-last-msg">{conv.lastMessage}</p>
                  </div>

                  {/* Meta: Time & Unread Badge */}
                  <div className="chat-inbox-meta">
                    <span className="chat-inbox-time">{conv.time}</span>
                    {conv.unread > 0 && (
                      <span className="chat-unread-badge">{conv.unread}</span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className="chat-window-card">
          {/* Chat Window Header */}
          <div className="chat-window-header">
            <div className="chat-window-user">
              <div
                className="chat-window-avatar"
                style={{
                  backgroundColor: activeConversation.avatarBg,
                  color: activeConversation.avatarColor,
                }}
              >
                {activeConversation.initials}
              </div>
              <div>
                <h2 className="chat-window-name">{activeConversation.name}</h2>
                <p className="chat-window-phone">{activeConversation.phone}</p>
              </div>
            </div>

            <button
              type="button"
              className="chat-window-options-btn"
              title="Opsi Percakapan"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div className="chat-messages-stream">
            {/* Date separator */}
            <div className="chat-date-separator">
              <span className="chat-date-badge">Hari Ini</span>
            </div>

            {/* Messages */}
            {activeConversation.messages.map((msg) => {
              const isIncoming = msg.sender === "customer";
              return (
                <div
                  key={msg.id}
                  className={`chat-msg-row ${isIncoming ? "chat-msg-row--incoming" : "chat-msg-row--outgoing"}`}
                >
                  {/* Left Avatar for Incoming */}
                  {isIncoming && (
                    <div
                      className="chat-msg-avatar chat-msg-avatar--incoming"
                      style={{
                        backgroundColor: activeConversation.avatarBg,
                        color: activeConversation.avatarColor,
                      }}
                    >
                      {activeConversation.initials}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`chat-msg-bubble ${isIncoming ? "chat-msg-bubble--incoming" : "chat-msg-bubble--outgoing"}`}
                  >
                    <p className="chat-msg-text">{msg.text}</p>
                    <span className="chat-msg-time">{msg.time}</span>
                  </div>

                  {/* Right Avatar for Outgoing Admin */}
                  {!isIncoming && (
                    <div className="chat-msg-avatar chat-msg-avatar--outgoing">
                      <img
                        src="https://api.dicebear.com/7.x/bottts/svg?seed=LaundryAdmin"
                        alt="Admin Avatar"
                        className="chat-msg-avatar__img"
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="chat-input-bar">
            <button
              type="button"
              className="chat-attach-btn"
              title="Lampirkan File / Gambar"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <div className="chat-text-form">
              <input
                type="text"
                placeholder="Ketik Pesan..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chat-input-field"
              />
            </div>

            <button
              type="submit"
              className="chat-send-btn"
              title="Kirim Pesan"
              disabled={!inputText.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
