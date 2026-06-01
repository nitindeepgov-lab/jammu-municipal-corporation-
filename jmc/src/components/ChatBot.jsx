import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MapPin,
  RotateCcw,
  Zap,
  Mic,
  MicOff,
} from "lucide-react";


/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */
const fmtTime = () =>
  new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const makeWelcome = () => ({
  role: "bot",
  text: "Namaste! 🙏 I'm **JMC Assistant** — your guide to all Jammu Municipal Corporation services.\n\nHow can I help you today?",
  time: fmtTime(),
});

const FALLBACK =
  "I couldn't find a specific answer for that. Try rephrasing, or pick a suggestion below.\n\n• How to **pay fees online**\n• **File a complaint** or grievance\n• Find **JMC officer contacts**\n• View **notices & tenders**\n• Access **RTI information**";

const quickActions = [
  { id: "pay-fees", label: "Pay fees online" },
  { id: "complaint", label: "File a complaint" },
  { id: "contacts", label: "Officer contacts" },
  { id: "notices", label: "Notices and tenders" },
  { id: "rti", label: "RTI information" },
];

/* ═══════════════════════════════════════════════════════════════
   Markdown-lite renderer
   ═══════════════════════════════════════════════════════════════ */
function MiniMarkdown({ text, isUser }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        const rendered = line.replace(
          /\*\*(.+?)\*\*/g,
          `<strong class="font-semibold text-gray-900">$1</strong>`,
        );
        return (
          <p
            key={i}
            className={`text-[14px] leading-relaxed ${isUser ? "text-gray-800" : "text-gray-800"}`}
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
    <div className="flex gap-4 mb-6 animate-msgIn">
      <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center flex-shrink-0">
        <Bot size={18} className="text-gray-800" />
      </div>
      <div className="flex gap-1.5 items-center px-2 py-3">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:160ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:320ms]" />
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
      className="group flex items-center gap-3 w-full mt-3 px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
    >
      <div className="flex-1 text-left">
        <p className="text-[13px] font-semibold">Visit {nav.label}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">jmc.gov.in{nav.path}</p>
      </div>
      <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-800 transition-colors" />
    </button>
  );
}

function PageGrid({ pages, onNavigate }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {pages.map((p) => (
        <button
          key={p.path}
          onClick={() => onNavigate(p.path)}
          className="group flex items-center px-3 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-left transition-colors"
        >
          <span className="text-[12px] font-medium text-gray-700 truncate">
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
    <div className={`flex gap-4 mb-6 animate-msgIn ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200 ${isUser ? "bg-gray-100" : "bg-white"}`}>
        {isUser ? (
          <User size={16} className="text-gray-600" />
        ) : (
          <Bot size={18} className="text-gray-800" />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-2 flex-1 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`px-4 py-3 ${isUser ? "bg-[#f4f4f4] rounded-3xl rounded-tr-sm" : ""}`}>
          <MiniMarkdown text={msg.text} isUser={isUser} />
          {msg.nav && <NavButton nav={msg.nav} onNavigate={onNavigate} />}
          {msg.pageGrid && <PageGrid pages={msg.pageGrid} onNavigate={onNavigate} />}
        </div>

        {/* Follow-up pills */}
        {msg.followUps?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {msg.followUps.map((f) => (
              <button
                key={f.id}
                onClick={() => onFollowUp(f)}
                className="text-[12px] text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full transition-colors"
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
   Date Divider
   ═══════════════════════════════════════════════════════════════ */
function DateDivider() {
  return (
    <div className="flex items-center gap-3 my-4 opacity-0 h-0 m-0 p-0 hidden">
      {/* Intentionally hidden for a cleaner GPT aesthetic */}
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
    () => !!(window.SpeechRecognition || window.webkitSpeechRecognition),
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
        const apiUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
        const res = await fetch(`${apiUrl}/api/chatbot/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: queryText })
        });
        
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        
        addBotMsg({
          role: "bot",
          text: data.text,
          time: fmtTime(),
          followUps: data.followUps || [],
          nav: data.nav,
          pageGrid: data.pageGrid
        });
        if (!open) setUnread((n) => n + 1);
      } catch (e) {
        addBotMsg({
          role: "bot",
          text: "I'm having trouble connecting right now. Please try again later.",
          time: fmtTime(),
        });
      }
    },
    [open, addBotMsg],
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
    [processQuery],
  );

  const handleFollowUp = useCallback(
    (f) => {
      processQuery(f.label, f.label);
    },
    [processQuery],
  );

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setOpen(false);
    },
    [navigate],
  );

  const handleReset = useCallback(() => {
    setMsgs([makeWelcome()]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  /* ── Voice input ─────────────────────────────────────────── */
  const handleVoice = useCallback(() => {
    if (!voiceSupported) return;

    // Stop if already listening
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => {
      setListening(false);
      // Auto-send if we got something
      setInput((current) => {
        if (current.trim()) {
          setTimeout(() => {
            processQuery(current.trim(), current.trim());
            setInput("");
          }, 200);
        }
        return current;
      });
    };

    recognition.onerror = () => setListening(false);
    recognition.start();
  }, [voiceSupported, listening, processQuery]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const showQuickActions = msgs.length === 1 && !typing;

  return (
    <>
      {/* ── Backdrop blur when open on mobile ─────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[9998] bg-black/10 backdrop-blur-[1px] sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Chat Window ───────────────────────────────────────── */}
      <div
        className={`fixed bottom-[88px] right-4 z-[9999] w-[390px] max-w-[calc(100vw-1.5rem)] transition-all duration-500 ease-[cubic-bezier(0.32,1.6,0.64,1)] origin-bottom-right ${
          open
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-[0.7] opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Card */}
        <div className="rounded-[16px] overflow-hidden flex flex-col shadow-2xl border border-gray-200 h-[600px] max-h-[calc(100dvh-7rem)] bg-white">
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-gray-800" />
              <h3 className="text-gray-800 font-semibold text-[14px]">
                JMC Assistant
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset chat"
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 pt-6 pb-2 bg-white"
            style={{ scrollbarWidth: "none" }}
          >
            <DateDivider />

            {msgs.map((msg, i) => (
              <Bubble
                key={i}
                msg={msg}
                onFollowUp={handleFollowUp}
                onNavigate={handleNavigate}
              />
            ))}

            {/* Quick action chips */}
            {showQuickActions && (
              <div className="ml-10 mb-4 animate-msgIn">
                <p className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <Zap size={10} className="text-[#FF6600]" /> Quick Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleQuickAction(a)}
                      className="text-[11.5px] font-semibold text-[#002B5E] bg-white hover:bg-[#002B5E] hover:text-white border border-[#002B5E]/15 hover:border-[#002B5E] px-3.5 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-250 hover:-translate-y-0.5"
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {typing && <TypingIndicator />}
            <div className="h-4" />
          </div>

          {/* Scroll-to-bottom pill */}
          {showScroll && (
            <button
              onClick={() => scrollToBottom()}
              className="absolute bottom-[84px] left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white border border-gray-200 text-gray-600 text-[12px] font-medium px-3 py-1.5 rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
            >
              <ChevronDown size={14} />
            </button>
          )}

          {/* ── Input Bar ── */}
          <div className="flex-shrink-0 bg-white px-4 pt-2 pb-4">
            {/* Listening indicator */}
            {listening && (
              <div className="flex items-center gap-2 mb-2 px-1 animate-msgIn">
                <div className="flex gap-0.5 items-end h-4">
                  <span
                    className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:0ms]"
                    style={{ height: "40%" }}
                  />
                  <span
                    className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:120ms]"
                    style={{ height: "80%" }}
                  />
                  <span
                    className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:240ms]"
                    style={{ height: "60%" }}
                  />
                  <span
                    className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:360ms]"
                    style={{ height: "100%" }}
                  />
                  <span
                    className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:480ms]"
                    style={{ height: "50%" }}
                  />
                </div>
                <span className="text-[11.5px] font-medium text-red-500">
                  Listening... speak now
                </span>
                <span className="ml-auto text-[10px] text-gray-400">
                  Tap mic to stop
                </span>
              </div>
            )}

            <div
              className={`flex items-center gap-2 bg-[#f4f4f4] rounded-3xl px-4 py-2 border border-transparent focus-within:border-gray-300 transition-all ${
                listening ? "bg-red-50 focus-within:border-red-300" : ""
              }`}
            >
               <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  listening ? "Listening..." : "Message JMC Assistant..."
                }
                disabled={typing}
                className="flex-1 bg-transparent text-[13px] text-gray-800 placeholder-gray-400 outline-none py-1 disabled:opacity-60"
              /> 

              {/* Mic button */}
              {voiceSupported && !input.trim() && (
                <button
                  onClick={handleVoice}
                  disabled={typing}
                  title={listening ? "Stop listening" : "Speak your question"}
                  className={`p-2 rounded-full transition-colors ${
                    listening
                      ? "text-red-500 bg-red-100"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {listening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              )}

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  input.trim() && !typing
                    ? "bg-gradient-to-br from-[#002B5E] to-[#004494] text-white shadow-[0_3px_10px_rgba(0,43,94,0.4)] hover:shadow-[0_4px_14px_rgba(0,43,94,0.5)] scale-100 hover:scale-105 active:scale-95"
                    : "bg-gray-200 text-gray-400 scale-90 cursor-not-allowed"
                }`}
              >
                <Send size={14} />
              </button> 
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2">
              AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>

      {/* ── FAB ───────────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-4 z-[9999]">
        {/* Tooltip */}
        {!tooltipDismissed && !open && (
          <div className="absolute bottom-full right-0 mb-4 animate-msgIn">
            <div className="relative bg-gray-900 text-white text-[12px] font-medium px-4 py-2.5 rounded-xl shadow-xl whitespace-nowrap flex items-center gap-2">
              Hi! Need help with JMC?
            </div>
            <div className="w-3 h-3 bg-gray-900 rotate-45 absolute -bottom-1.5 right-7" />
          </div>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close assistant" : "Open JMC Assistant"}
          className={`relative w-[54px] h-[54px] rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-gray-200/50 ${
            open
              ? "bg-gray-100 hover:bg-gray-200 rotate-90 scale-90"
              : "bg-black hover:bg-gray-800 hover:scale-105 active:scale-95"
          }`}
        >
          {open ? (
            <X size={24} className="text-gray-800" />
          ) : (
            <Bot size={24} className="text-white" />
          )}
        </button>

        {/* Unread dot */}
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md ring-2 ring-white">
            {unread}
          </span>
        )}
      </div>

      {/* ── Keyframes ─────────────────────────────────────────── */}
      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-msgIn { animation: msgIn 0.3s cubic-bezier(0.34,1.2,0.64,1) both; }
        @keyframes voiceBar {
          0%, 100% { transform: scaleY(0.4); }
          50%       { transform: scaleY(1); }
        }
      `}</style>
    </>
  );
}
