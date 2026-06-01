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

const makeWelcome = () => ({
  role: "bot",
  text: "Namaste! 🙏 Welcome to **JMC Assistant** — your official digital guide for all Jammu Municipal Corporation services.\n\nI can help you with **payments**, **complaints**, **certificates**, **RTI**, **tenders**, and much more. You can also speak to me using the 🎙️ mic button!\n\nWhat would you like to do today?",
  time: fmtTime(),
});

const quickActions = [
  { id: "pay-fees", label: "💳 Pay Online" },
  { id: "complaint", label: "📝 File Complaint" },
  { id: "contacts", label: "📞 Officer Contacts" },
  { id: "notices", label: "📋 Notices & Tenders" },
  { id: "rti", label: "📄 RTI Info" },
  { id: "egov", label: "🏛️ E-Governance" },
  { id: "property-tax", label: "🏠 Property Tax" },
  { id: "water-tanker", label: "💧 Water Tanker" },
];

/* ═══════════════════════════════════════════════════════════════
   Logo Avatar — used in header, typing indicator, and bubbles
   ═══════════════════════════════════════════════════════════════ */
function LogoAvatar({ size = 32, className = "" }) {
  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 bg-white flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={LOGO_SRC}
        alt="JMC"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentNode.innerHTML = `<svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="#002B5E" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`;
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
            '<strong class="font-semibold text-gray-900">$1</strong>'
          )
          .replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" class="text-[#002B5E] underline underline-offset-2 hover:text-[#004494] transition-colors">$1</a>'
          );

        const isBullet = line.trimStart().startsWith("•") || line.trimStart().startsWith("-");

        return (
          <p
            key={i}
            className={`text-[13.5px] leading-[1.7] ${
              isUser ? "text-white/95" : "text-gray-700"
            } ${isBullet ? "pl-1" : ""}`}
            dangerouslySetInnerHTML={{ __html: rendered }}
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
    <div className="flex items-start gap-3 mb-5 animate-chatIn">
      <LogoAvatar size={30} className="mt-0.5 ring-1 ring-gray-100 shadow-sm" />
      <div className="flex gap-1 items-center pt-3 pb-2">
        <span className="w-[5px] h-[5px] rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
        <span className="w-[5px] h-[5px] rounded-full bg-gray-300 animate-bounce [animation-delay:150ms]" />
        <span className="w-[5px] h-[5px] rounded-full bg-gray-200 animate-bounce [animation-delay:300ms]" />
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
      className="group flex items-center gap-3 w-full mt-3 px-4 py-3 bg-[#f8f9fb] border border-gray-200/80 rounded-xl hover:border-[#002B5E]/30 hover:bg-[#f0f4fa] transition-all duration-200"
    >
      <div className="w-7 h-7 rounded-lg bg-[#002B5E]/10 flex items-center justify-center flex-shrink-0">
        <ArrowRight size={13} className="text-[#002B5E]" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-[12.5px] font-semibold text-gray-800">Visit {nav.label}</p>
        <p className="text-[10.5px] text-gray-400 mt-0.5">jmc.gov.in{nav.path}</p>
      </div>
      <ArrowRight
        size={14}
        className="text-gray-300 group-hover:text-[#002B5E] group-hover:translate-x-0.5 transition-all duration-200"
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
          className="group flex items-center gap-2 px-3 py-2 bg-[#f8f9fb] border border-gray-200/60 hover:border-[#002B5E]/20 rounded-lg text-left transition-all duration-200"
        >
          <span className="text-[11.5px] font-medium text-gray-600 group-hover:text-[#002B5E] truncate">
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
      className={`flex items-start gap-3 mb-5 animate-chatIn ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="w-[30px] h-[30px] rounded-full bg-[#002B5E] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <User size={14} className="text-white" />
        </div>
      ) : (
        <LogoAvatar size={30} className="mt-0.5 ring-1 ring-gray-100 shadow-sm" />
      )}

      {/* Content */}
      <div
        className={`flex flex-col gap-1.5 max-w-[82%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Label */}
        <span className="text-[10px] font-semibold text-gray-400 tracking-wide uppercase px-0.5">
          {isUser ? "You" : "JMC Assistant"}
        </span>

        <div
          className={`px-4 py-3 ${
            isUser
              ? "bg-[#002B5E] text-white rounded-2xl rounded-tr-md shadow-[0_2px_8px_rgba(0,43,94,0.2)]"
              : "bg-[#f8f9fb] text-gray-700 rounded-2xl rounded-tl-md border border-gray-100"
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
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {msg.followUps.map((f) => (
              <button
                key={f.id}
                onClick={() => onFollowUp(f)}
                className="text-[11px] font-medium text-[#002B5E] bg-white hover:bg-[#f0f4fa] border border-[#002B5E]/12 hover:border-[#002B5E]/30 px-3 py-1.5 rounded-full transition-all duration-200"
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
  const [msgs, setMsgs] = useState(() => [makeWelcome()]);
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

  /* Auto-scroll */
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

  /* ── Core query processor ────────────────────────────────── */
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

      try {
        const apiUrl =
          import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
        const res = await fetch(`${apiUrl}/api/chatbot/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: queryText }),
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

  const handleQuickAction = useCallback(
    (action) => {
      processQuery(action.label, action.label);
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
    setMsgs([makeWelcome()]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  /* ── Voice input ─────────────────────────────────────────── */
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const handleVoice = useCallback(() => {
    if (!voiceSupported) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    setVoiceTranscript("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "hi-IN";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
      setVoiceTranscript(transcript);
    };

    recognition.onend = () => {
      setListening(false);
      setInput((current) => {
        if (current.trim()) {
          setTimeout(() => {
            processQuery(current.trim(), current.trim());
            setInput("");
            setVoiceTranscript("");
          }, 400);
        }
        return current;
      });
    };

    recognition.onerror = () => {
      setListening(false);
      setVoiceTranscript("");
    };
    recognition.start();
  }, [voiceSupported, listening, processQuery]);

  const handleVoiceCancel = useCallback(() => {
    recognitionRef.current?.stop();
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

  const showQuickActions = msgs.length === 1 && !typing;

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
        <div className="rounded-2xl overflow-hidden flex flex-col shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.06)] h-[620px] max-h-[calc(100dvh-7rem)] bg-white">
          {/* ── Header ── */}
          <div className="relative bg-gradient-to-r from-[#001e3d] to-[#002B5E] px-4 py-3.5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <LogoAvatar size={36} className="ring-2 ring-white/20 shadow-md" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-[14px] tracking-[-0.01em]">
                  JMC Assistant
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/50 text-[10.5px] font-medium">
                    Online — Jammu Municipal Corporation
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="New conversation"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
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
            {msgs.map((msg, i) => (
              <Bubble
                key={i}
                msg={msg}
                onFollowUp={handleFollowUp}
                onNavigate={handleNavigate}
              />
            ))}

            {/* Quick action chips after welcome */}
            {showQuickActions && (
              <div className="ml-[42px] mb-4 animate-chatIn">
                <div className="flex flex-wrap gap-1.5">
                  {quickActions.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleQuickAction(a)}
                      className="text-[11.5px] font-medium text-gray-600 bg-white hover:bg-[#f0f4fa] hover:text-[#002B5E] border border-gray-200 hover:border-[#002B5E]/25 px-3 py-[7px] rounded-full transition-all duration-200"
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {typing && <TypingIndicator />}
            <div className="h-3" />
          </div>

          {/* Scroll-to-bottom pill */}
          {showScroll && (
            <button
              onClick={() => scrollToBottom()}
              className="absolute bottom-[76px] left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-500 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg hover:bg-white transition-all z-10"
            >
              <ChevronDown size={13} /> New messages
            </button>
          )}

          {/* ── Voice Overlay ── */}
          {listening && (
            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-5 animate-chatIn rounded-2xl">
              {/* Animated rings */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-red-500/10 animate-ping [animation-duration:2s]" />
                <span className="absolute inset-3 rounded-full bg-red-500/15 animate-ping [animation-duration:1.5s] [animation-delay:0.3s]" />
                <button
                  onClick={handleVoiceCancel}
                  className="relative w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(239,68,68,0.4)] hover:bg-red-600 active:scale-95 transition-all"
                >
                  <MicOff size={26} />
                </button>
              </div>

              {/* Waveform bars */}
              <div className="flex gap-1 items-end h-8">
                {[30, 60, 45, 80, 55, 90, 40, 70, 50, 85, 35, 65].map((h, i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-red-400 animate-[voiceBar_0.6s_ease-in-out_infinite]"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 60}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Transcript preview */}
              <div className="text-center px-6 max-w-full">
                {voiceTranscript ? (
                  <p className="text-[14px] text-gray-800 font-medium truncate">
                    "{voiceTranscript}"
                  </p>
                ) : (
                  <p className="text-[13px] text-gray-400">
                    Listening… speak now
                  </p>
                )}
              </div>

              <button
                onClick={handleVoiceCancel}
                className="text-[12px] text-gray-400 hover:text-gray-600 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* ── Input Bar ── */}
          <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 pt-3 pb-4">
            <div
              className="flex items-center gap-2 rounded-2xl px-4 py-2 transition-all duration-200 bg-[#f4f5f7] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#002B5E]/15 focus-within:shadow-sm"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message JMC Assistant…"
                disabled={typing}
                className="flex-1 bg-transparent text-[13.5px] text-gray-800 placeholder-gray-400 outline-none py-1.5 disabled:opacity-50"
              />

              {/* Mic button — always visible when no text */}
              {voiceSupported && !input.trim() && (
                <button
                  onClick={handleVoice}
                  disabled={typing}
                  title="Speak your question"
                  className="p-2 rounded-full text-gray-400 hover:text-[#002B5E] hover:bg-[#002B5E]/8 transition-all duration-200"
                >
                  <Mic size={18} />
                </button>
              )}

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  input.trim() && !typing
                    ? "bg-[#002B5E] text-white shadow-sm hover:bg-[#003d82] active:scale-95"
                    : "bg-gray-200/70 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send size={13} />
              </button>
            </div>
            <p className="text-center text-[9.5px] text-gray-400 mt-2.5 tracking-wide">
              Powered by Jammu Municipal Corporation
            </p>
          </div>
        </div>
      </div>

      {/* ── FAB ───────────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-4 z-[9999]">
        {/* Tooltip */}
        {!tooltipDismissed && !open && (
          <div className="absolute bottom-full right-0 mb-3 animate-chatIn">
            <div className="relative bg-[#002B5E] text-white text-[12px] font-medium px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap flex items-center gap-2">
              <Sparkles size={12} className="text-amber-300" />
              Need help? Ask JMC Assistant
            </div>
            <div className="w-2.5 h-2.5 bg-[#002B5E] rotate-45 absolute -bottom-1 right-7" />
          </div>
        )}

        {/* Subtle pulse — only when closed */}
        {!open && (
          <span className="absolute -inset-1.5 rounded-full bg-[#002B5E]/15 animate-ping [animation-duration:3s] pointer-events-none" />
        )}

        {/* FAB Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close assistant" : "Open JMC Assistant"}
          className={`relative w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            open
              ? "bg-gray-200 hover:bg-gray-300 scale-90 shadow-lg"
              : "bg-white shadow-[0_4px_20px_rgba(0,43,94,0.3),0_0_0_2px_rgba(0,43,94,0.08)] hover:shadow-[0_6px_28px_rgba(0,43,94,0.4)] hover:scale-105 active:scale-95"
          }`}
        >
          {open ? (
            <X size={22} className="text-gray-600" />
          ) : (
            <LogoAvatar size={40} />
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
      `}</style>
    </>
  );
}
