import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Send,
  User,
  ChevronDown,
  ArrowRight,
  RotateCcw,
  Mic,
  MicOff,
  Sparkles,
  CreditCard,
  FileText,
  Building2,
  PhoneCall,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   Constants & Helpers
   ═══════════════════════════════════════════════════════════════ */
const LOGO_SRC = "/logo.jpeg";

const fmtTime = () =>
  new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

/* ═══════════════════════════════════════════════════════════════
   Logo Avatar — used in header, typing indicator, and bubbles
   ═══════════════════════════════════════════════════════════════ */
function LogoAvatar({ size = 32, className = "", shouldSpin = false }) {
  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 bg-white flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={LOGO_SRC}
        alt="JMC"
        className={`w-full h-full object-cover ${shouldSpin ? "animate-slow-spin" : ""}`}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentNode.innerHTML = `<svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="#003366" stroke-width="2" class="${shouldSpin ? "animate-slow-spin" : ""}"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`;
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Markdown-lite renderer — handles **bold**, bullet lists, links
   ═══════════════════════════════════════════════════════════════ */
function MiniMarkdown({ text, isUser }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1.5" />;
        
        let rendered = line
          .replace(
            /\*\*(.+?)\*\*/g,
            isUser
              ? '<strong class="font-bold text-white">$1</strong>'
              : '<strong class="font-extrabold text-[#003366]">$1</strong>'
          )
          .replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            isUser
              ? '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-white underline underline-offset-2 font-semibold hover:text-white/80 transition-colors">$1</a>'
              : '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#003366] font-extrabold underline underline-offset-2 hover:text-[#002244] transition-colors">$1</a>'
          );

        const isBullet = line.trimStart().startsWith("•") || line.trimStart().startsWith("-");

        return (
          <p
            key={i}
            className={`text-xs leading-relaxed ${
              isUser ? "text-white/95" : "text-slate-600 font-medium"
            } ${isBullet ? "pl-2.5 relative before:content-['•'] before:absolute before:left-0 before:text-[#003366]/60 font-medium" : ""}`}
            dangerouslySetInnerHTML={{ __html: isBullet ? rendered.replace(/^[•-]\s*/, "") : rendered }}
          />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Typing Indicator
   ═══════════════════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 mb-5 animate-chatIn">
      <LogoAvatar size={28} className="mt-0.5 ring-1 ring-slate-100 shadow-sm" />
      <div className="flex gap-1 items-center bg-slate-50 border border-slate-100 rounded-xl rounded-tl-[3px] px-3 py-2 shadow-sm">
        <span className="w-1.2 h-1.2 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
        <span className="w-1.2 h-1.2 rounded-full bg-slate-300 animate-bounce [animation-delay:150ms]" />
        <span className="w-1.2 h-1.2 rounded-full bg-slate-200 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Welcome Dashboard
   ═══════════════════════════════════════════════════════════════ */
function WelcomeDashboard({ onSelectAction }) {
  const primaryActions = [
    {
      id: "property-tax",
      label: "Property Tax",
      desc: "Self-assessment & payments",
      icon: CreditCard,
      query: "pay property tax"
    },
    {
      id: "complaint",
      label: "File Grievance",
      desc: "Register & track civic complaints",
      icon: FileText,
      query: "file a complaint"
    },
    {
      id: "egov",
      label: "E-Governance Hub",
      desc: "Certificates, trade NOCs, etc.",
      icon: Building2,
      query: "e-governance services"
    },
    {
      id: "helpline",
      label: "Official Helplines",
      desc: "Direct contact numbers",
      icon: PhoneCall,
      query: "officer contacts"
    }
  ];

  const secondaryActions = [
    { label: "💧 Water Tanker", query: "water tanker booking" },
    { label: "📋 View Tenders", query: "view tenders" },
    { label: "📄 RTI Info", query: "rti info" },
    { label: "🧹 Sanitation safai", query: "sanitation safai" },
    { label: "🏗️ Building plan", query: "building plan permission" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-1 text-center animate-chatIn select-none">
      
      <div className="relative mb-4 w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center text-[#003366] shadow-sm">
        <LogoAvatar size={28} />
      </div>

      <h2 className="text-base font-extrabold tracking-tight text-slate-800">
        Welcome to JMC Guide
      </h2>
      <p className="text-slate-400 text-[11px] max-w-[280px] mt-1.5 leading-relaxed font-semibold">
        How can I help you find municipal services today?
      </p>

      {/* Grid actions */}
      <div className="grid grid-cols-2 gap-2.5 w-full mt-6">
        {primaryActions.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectAction(item.query, item.label)}
              className="text-left p-3.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50/50 hover:border-slate-200 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#003366]">
                <IconComponent size={15} strokeWidth={2.2} />
              </div>
              <h4 className="text-[12.5px] font-extrabold text-slate-700 mt-3.5 leading-tight">
                {item.label}
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal font-semibold">
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Secondary Quick Action pills */}
      <div className="w-full mt-6 text-left">
        <p className="text-[9.5px] font-bold text-slate-400 tracking-wider uppercase mb-2 px-1">
          Popular Queries
        </p>
        <div className="flex flex-wrap gap-1.5">
          {secondaryActions.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => onSelectAction(pill.query, pill.label.replace(/^[^a-zA-Z\s]+/, "").trim())}
              className="text-[11px] font-bold text-[#003366] bg-slate-50 hover:bg-[#eaf1fb] border border-slate-100 hover:border-[#003366]/15 px-3 py-1.5 rounded-lg transition-all shadow-sm"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Nav Button & Page Grid
   ═══════════════════════════════════════════════════════════════ */
function NavButton({ nav, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(nav.path)}
      className="group flex items-center gap-3 w-full mt-3 px-3.5 py-2.5 bg-white border border-slate-150 rounded-xl hover:border-[#003366]/30 hover:bg-slate-50 transition-all duration-200"
    >
      <div className="w-6 h-6 rounded-lg bg-[#003366]/5 flex items-center justify-center flex-shrink-0">
        <ArrowRight size={11} className="text-[#003366]" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-[11.5px] font-extrabold text-slate-700 truncate">Visit {nav.label}</p>
      </div>
      <ArrowRight
        size={12}
        className="text-slate-300 group-hover:text-[#003366] group-hover:translate-x-0.5 transition-all duration-200"
      />
    </button>
  );
}

function PageGrid({ pages, onNavigate }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 mt-3">
      {pages.map((p) => (
        <button
          key={p.path}
          onClick={() => onNavigate(p.path)}
          className="group flex items-center gap-2 px-3 py-2 bg-white border border-slate-150 hover:border-[#003366]/20 rounded-lg text-left transition-all duration-200"
        >
          <span className="text-[11px] font-bold text-slate-600 group-hover:text-[#003366] truncate">
            {p.label}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Message Bubble
   ═══════════════════════════════════════════════════════════════ */
function Bubble({ msg, onFollowUp, onNavigate }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex items-start gap-2.5 mb-5 animate-chatIn ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="w-[30px] h-[30px] rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <User size={12} className="text-slate-500" />
        </div>
      ) : (
        <LogoAvatar size={30} className="mt-0.5 ring-1 ring-slate-100 shadow-sm" />
      )}

      {/* Content */}
      <div
        className={`flex flex-col gap-0.5 max-w-[82%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Label */}
        <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase px-0.5 select-none">
          {isUser ? "You" : "JMC Assistant"}
        </span>

        <div
          className={`px-3.5 py-2.5 ${
            isUser
              ? "bg-[#003366] text-white rounded-2xl rounded-tr-[4px] shadow-sm"
              : "bg-slate-50/70 text-slate-700 rounded-2xl rounded-tl-[4px] border border-slate-105/80 shadow-sm"
          }`}
        >
          <MiniMarkdown text={msg.text} isUser={isUser} />
          {msg.nav && <NavButton nav={msg.nav} onNavigate={onNavigate} />}
          {msg.pageGrid && (
            <PageGrid pages={msg.pageGrid} onNavigate={onNavigate} />
          )}
        </div>

        {/* Follow-up pills */}
        {msg.followUps?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {msg.followUps.map((f) => (
              <button
                key={f.id}
                onClick={() => onFollowUp(f)}
                className="text-[10.5px] font-semibold text-[#003366] bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm active:scale-95"
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main ChatBot Component
   ═══════════════════════════════════════════════════════════════ */
export default function ChatBot() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [unread, setUnread] = useState(0);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported] = useState(
    () => !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const [voiceLang, setVoiceLang] = useState(() => {
    return localStorage.getItem("jmc_chat_voice_lang") || "en-IN";
  });

  useEffect(() => {
    localStorage.setItem("jmc_chat_voice_lang", voiceLang);
  }, [voiceLang]);

  const msgsRef = useRef([]);
  useEffect(() => {
    msgsRef.current = msgs;
  }, [msgs]);

  const scrollToBottom = useCallback((smooth = true) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [msgs, typing, scrollToBottom]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScroll(scrollHeight - scrollTop - clientHeight > 100);
  }, []);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTooltipDismissed(true);
      setTimeout(() => inputRef.current?.focus(), 380);
    }
  }, [open]);

  const addBotMsg = useCallback((msg) => {
    setTyping(false);
    setMsgs((prev) => [...prev, msg]);
  }, []);

  const processQuery = useCallback(
    async (queryText, displayText) => {
      setMsgs((prev) => [
        ...prev,
        { role: "user", text: displayText || queryText, time: fmtTime() },
      ]);
      setTyping(true);

      const recentMsgs = msgsRef.current.slice(-10);
      const historyData = recentMsgs.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      try {
        const apiUrl =
          import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
        const res = await fetch(`${apiUrl}/api/chatbot/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: queryText, history: historyData }),
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        addBotMsg({
          role: "bot",
          text: data.text,
          time: fmtTime(),
          followUps: data.followUps || [],
          nav: data.nav,
          pageGrid: data.pageGrid,
        });
        if (!open) setUnread((n) => n + 1);
      } catch {
        addBotMsg({
          role: "bot",
          text: "I'm having trouble connecting right now. Please try again in a moment, or call our helpline at **1800-180-7207**.",
          time: fmtTime(),
        });
      }
    },
    [open, addBotMsg]
  );

  const handleSend = useCallback(() => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    processQuery(q, q);
  }, [input, processQuery]);

  const handleWelcomeDashboardAction = useCallback(
    (query, displayText) => {
      processQuery(query, displayText);
    },
    [processQuery]
  );

  const handleFollowUp = useCallback(
    (f) => {
      processQuery(f.label, f.label);
    },
    [processQuery]
  );

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setOpen(false);
    },
    [navigate]
  );

  const handleReset = useCallback(() => {
    setMsgs([]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const [voiceTranscript, setVoiceTranscript] = useState("");
  const transcriptRef = useRef("");

  const handleVoice = useCallback(() => {
    if (!voiceSupported) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    setVoiceTranscript("");
    transcriptRef.current = "";
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = voiceLang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      transcriptRef.current = transcript;
      setVoiceTranscript(transcript);
      setInput(transcript);
    };

    recognition.onend = () => {
      setListening(false);
      const text = transcriptRef.current.trim();
      if (text) {
        processQuery(text, text);
        setInput("");
      }
      transcriptRef.current = "";
      setVoiceTranscript("");
    };

    recognition.onerror = () => {
      setListening(false);
      setVoiceTranscript("");
      transcriptRef.current = "";
    };
    recognition.start();
  }, [voiceSupported, listening, voiceLang, processQuery]);

  const handleVoiceCancel = useCallback(() => {
    transcriptRef.current = "";
    recognitionRef.current?.abort();
    setListening(false);
    setVoiceTranscript("");
    setInput("");
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <>
      {/* ── Backdrop blur when open on mobile ─────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[2px] sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Chat Window ───────────────────────────────────────── */}
      <div
        className={`fixed bottom-[88px] right-4 z-[9999] w-[400px] max-w-[calc(100vw-1.5rem)] transition-all duration-500 ease-[cubic-bezier(0.32,1.6,0.64,1)] origin-bottom-right ${
          open
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-[0.7] opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl overflow-hidden flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.08)] h-[650px] max-h-[calc(100dvh-7rem)] bg-white border border-slate-100 transition-all duration-300">
          {/* ── Header ── */}
          <div className="relative bg-white px-5 py-4 flex-shrink-0 border-b border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <LogoAvatar size={34} className="ring-1 ring-slate-100 shadow-sm" />
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-800 font-extrabold text-[13.5px] tracking-tight">
                  JMC Assistant
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Language Toggle */}
                <div className="flex items-center bg-slate-50 p-0.5 rounded-full border border-slate-200/50 mr-1 select-none">
                  <button
                    onClick={() => setVoiceLang("en-IN")}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider transition-all duration-200 ${
                      voiceLang === "en-IN"
                        ? "bg-[#003366] text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setVoiceLang("hi-IN")}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider transition-all duration-200 ${
                      voiceLang === "hi-IN"
                        ? "bg-[#003366] text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    हि
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  title="New conversation"
                  className="w-7 h-7 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors border border-transparent hover:border-slate-100"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors border border-transparent hover:border-slate-100"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 pt-5 pb-2 bg-white"
            style={{ scrollbarWidth: "none" }}
          >
            {msgs.length === 0 && !typing ? (
              <WelcomeDashboard onSelectAction={handleWelcomeDashboardAction} />
            ) : (
              msgs.map((msg, i) => (
                <Bubble
                  key={i}
                  msg={msg}
                  onFollowUp={handleFollowUp}
                  onNavigate={handleNavigate}
                />
              ))
            )}

            {typing && <TypingIndicator />}
            <div className="h-3" />
          </div>

          {/* Scroll-to-bottom pill raised cleanly above input bar */}
          {showScroll && (
            <button
              onClick={() => scrollToBottom()}
              className="absolute bottom-[92px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-[11px] font-bold px-4 py-2 rounded-full shadow-xl hover:bg-slate-50 active:scale-95 transition-all z-10"
            >
              <ChevronDown size={14} className="animate-bounce" /> New messages
            </button>
          )}

          {/* ── Voice Overlay ── */}
          {listening && (
            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 animate-chatIn rounded-2xl p-6">
              {/* Active Speaking Language indicator */}
              <div className="flex items-center gap-2 bg-[#f0f4fa] px-4 py-2 rounded-full border border-[#003366]/10 shadow-[0_2px_10px_rgba(0,43,94,0.04)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-[11.5px] font-extrabold text-[#003366] tracking-wide">
                  Listening in {voiceLang === "hi-IN" ? "Hindi (हिंदी)" : "English (India)"}
                </span>
              </div>

              {/* Animated voice wave rings */}
              <div className="relative w-32 h-32 flex items-center justify-center mt-2">
                <span className="absolute inset-0 rounded-full bg-red-500/10 animate-ping [animation-duration:2.5s]" />
                <span className="absolute inset-4 rounded-full bg-red-500/15 animate-ping [animation-duration:2s] [animation-delay:0.3s]" />
                <button
                  onClick={handleVoiceCancel}
                  className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-red-500 to-rose-600 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <MicOff size={30} />
                </button>
              </div>

              {/* Waveform bars */}
              <div className="flex gap-1.5 items-end h-8 mt-2">
                {[35, 65, 45, 85, 55, 95, 40, 75, 50, 90, 30, 60, 45, 80].map((h, i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-red-400 to-rose-500 animate-[voiceBar_0.6s_ease-in-out_infinite]"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Live transcript container */}
              <div className="text-center px-4 max-w-full min-h-[40px] flex items-center justify-center">
                {voiceTranscript ? (
                  <p className="text-[14.5px] text-gray-800 font-bold leading-relaxed italic">
                    "{voiceTranscript}"
                  </p>
                ) : (
                  <p className="text-[13px] text-gray-400 font-medium">
                    Speak now, I'm listening...
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={handleVoiceCancel}
                  className="text-[12px] text-gray-500 hover:text-gray-800 font-bold px-3.5 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    recognitionRef.current?.stop();
                  }}
                  className="text-[12px] text-white bg-[#003366] hover:bg-[#002244] font-bold px-4 py-2 rounded-xl shadow-sm active:scale-95 transition-all duration-200"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* ── Input Bar ── */}
          <div className="flex-shrink-0 bg-white border-t border-slate-100 px-4 pt-3 pb-4">
            <div
              className="flex items-center gap-2 rounded-2xl px-3 py-1.5 border border-slate-200 bg-slate-50/50 focus-within:bg-white focus-within:border-[#003366] focus-within:ring-4 focus-within:ring-[#003366]/5 transition-all duration-200"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask JMC Assistant..."
                disabled={typing}
                className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-400 outline-none py-1.5 disabled:opacity-50 font-medium"
              />

              {/* Mic button — always visible when no text */}
              {voiceSupported && !input.trim() && (
                <button
                  onClick={handleVoice}
                  disabled={typing}
                  title="Speak your question"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#003366] hover:bg-slate-100 transition-all duration-200"
                >
                  <Mic size={16} />
                </button>
              )}

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  input.trim() && !typing
                    ? "bg-[#003366] text-white shadow-sm hover:bg-[#002244] active:scale-95"
                    : "bg-slate-100 text-slate-350 cursor-not-allowed border border-slate-150"
                }`}
              >
                <Send size={12} />
              </button>
            </div>
            <p className="text-center text-[9px] text-slate-400 mt-2.5 tracking-wider font-semibold">
              Official Jammu Municipal Corporation Assistant
            </p>
          </div>
        </div>
      </div>

      {/* ── FAB ───────────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-4 z-[9999]">
        {/* Tooltip */}
        {!tooltipDismissed && !open && (
          <div className="absolute bottom-full right-0 mb-3 animate-chatIn">
            <div className="relative bg-white text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-md border border-slate-100 whitespace-nowrap flex items-center gap-2 select-none">
              Ask JMC Assistant
            </div>
            <div className="w-2.5 h-2.5 bg-white rotate-45 absolute -bottom-1 right-7 border-r border-b border-slate-100" />
          </div>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close assistant" : "Open JMC Assistant"}
          className={`relative w-[58px] h-[58px] rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            open
              ? "bg-gray-100 hover:bg-gray-200 text-gray-500 border border-gray-200 scale-90 shadow-lg"
              : "bg-white border border-gray-100/60 shadow-[0_8px_32px_rgba(0,43,94,0.18),0_0_0_2px_rgba(0,43,94,0.03)] hover:shadow-[0_12px_40px_rgba(0,43,94,0.28)] hover:scale-105 active:scale-95 text-[#003366]"
          }`}
        >
          {open ? (
            <X size={22} className="text-gray-650" />
          ) : (
            <LogoAvatar size={42} className="ring-1 ring-[#003366]/5 shadow-sm" shouldSpin={true} />
          )}
        </button>

        {/* Unread dot */}
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md ring-2 ring-white">
            {unread}
          </span>
        )}
      </div>

      {/* ── Keyframes ─────────────────────────────────────────── */}
      <style>{`
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-chatIn { animation: chatIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes voiceBar {
          0%, 100% { transform: scaleY(0.3); }
          50%      { transform: scaleY(1); }
        }
        @keyframes voicePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50%      { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          20%      { transform: rotate(-8deg); }
          40%      { transform: rotate(6deg); }
          60%      { transform: rotate(-4deg); }
          80%      { transform: rotate(2deg); }
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
          display: inline-block;
          transform-origin: bottom center;
        }
      `}</style>
    </>
  );
}
