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
import {
  findAnswer,
  getEntryById,
  getFollowUps,
  quickActions,
  detectNavigation,
  getPopularPages,
  findRelatedRoute,
  detectGreeting,
  aiAnswer,
} from "../data/chatKnowledge";

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
          `<strong class="font-semibold ${isUser ? "text-white" : "text-[#002B5E]"}">$1</strong>`
        );
        return (
          <p
            key={i}
            className="text-[13px] leading-[1.65]"
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
    <div className="flex items-end gap-2 mb-5 animate-msgIn">
      <div className="w-8 h-8 rounded-2xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,43,94,0.12)] overflow-hidden">
        <img src="/logo.jpeg" alt="JMC" className="w-6 h-6 object-contain" />
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        <div className="flex gap-1.5 items-center">
          <span className="w-2 h-2 rounded-full bg-[#002B5E]/30 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-[#002B5E]/30 animate-bounce [animation-delay:160ms]" />
          <span className="w-2 h-2 rounded-full bg-[#002B5E]/30 animate-bounce [animation-delay:320ms]" />
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
      className="group flex items-center gap-3 w-full mt-3 px-4 py-3.5 bg-gradient-to-r from-[#FF6600] to-[#ff7a1a] text-white rounded-2xl shadow-[0_4px_14px_rgba(255,102,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,102,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
        <MapPin size={15} className="text-white" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-[13px] font-bold leading-tight">Visit {nav.label}</p>
        <p className="text-[10.5px] text-white/70 mt-0.5 font-medium">jmc.gov.in{nav.path}</p>
      </div>
      <ArrowRight size={16} className="flex-shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
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
          className="group flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-[#002B5E]/[0.06] border border-gray-200/80 hover:border-[#002B5E]/20 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5"
        >
          <div className="w-5 h-5 rounded-md bg-[#FF6600]/10 flex items-center justify-center flex-shrink-0">
            <MapPin size={10} className="text-[#FF6600]" />
          </div>
          <span className="text-[11px] font-semibold text-gray-600 group-hover:text-[#002B5E] truncate leading-snug">{p.label}</span>
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
    <div className={`flex items-end gap-2 mb-5 animate-msgIn ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden ${
        isUser
          ? "bg-gradient-to-br from-[#FF6600] to-[#ff8533] shadow-[0_2px_8px_rgba(255,102,0,0.4)]"
          : "bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,43,94,0.15)]"
      }`}>
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <img
            src="/logo.jpeg"
            alt="JMC"
            className="w-6 h-6 object-contain"
            onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
          />
        )}
        {!isUser && <Bot size={14} className="text-[#002B5E] hidden" />}
      </div>

      {/* Bubble + extras */}
      <div className={`flex flex-col gap-1.5 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`px-4 py-3 ${
          isUser
            ? "bg-gradient-to-br from-[#002B5E] to-[#0a3d7a] text-white rounded-[20px] rounded-br-[6px] shadow-[0_4px_16px_rgba(0,43,94,0.28)]"
            : "bg-white text-gray-700 rounded-[20px] rounded-bl-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-100"
        }`}>
          <MiniMarkdown text={msg.text} isUser={isUser} />
          {msg.nav && <NavButton nav={msg.nav} onNavigate={onNavigate} />}
          {msg.pageGrid && <PageGrid pages={msg.pageGrid} onNavigate={onNavigate} />}
        </div>

        {/* Follow-up pills */}
        {msg.followUps?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {msg.followUps.map((f) => (
              <button
                key={f.id}
                onClick={() => onFollowUp(f)}
                className="group flex items-center gap-1 text-[11px] font-semibold text-[#002B5E]/80 hover:text-[#002B5E] bg-white hover:bg-[#002B5E]/[0.05] border border-[#002B5E]/10 hover:border-[#002B5E]/25 px-3 py-1.5 rounded-full shadow-sm transition-all duration-200"
              >
                {f.label}
                <ArrowRight size={9} className="opacity-0 -ml-0.5 group-hover:opacity-100 group-hover:ml-0.5 transition-all duration-200" />
              </button>
            ))}
          </div>
        )}

        <span className={`text-[10px] text-gray-400 px-1 ${isUser ? "text-right" : ""}`}>
          {msg.time}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Date Divider
   ═══════════════════════════════════════════════════════════════ */
function DateDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Today</span>
      <div className="flex-1 h-px bg-gray-100" />
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
  const [voiceSupported] = useState(() => !!(window.SpeechRecognition || window.webkitSpeechRecognition));
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  /* Auto-scroll */
  const scrollToBottom = useCallback((smooth = true) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [msgs, typing, scrollToBottom]);

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

  const processQuery = useCallback((queryText, displayText) => {
    setMsgs((prev) => [...prev, { role: "user", text: displayText || queryText, time: fmtTime() }]);
    setTyping(true);

    const delay = 350 + Math.random() * 400;

    setTimeout(async () => {
      // 0) Greetings & conversational
      const greeting = detectGreeting(queryText);
      if (greeting) {
        addBotMsg({ role: "bot", text: greeting, time: fmtTime(), followUps: [] });
        if (!open) setUnread((n) => n + 1);
        return;
      }

      // 1) Navigation detection
      const navTarget = detectNavigation(queryText);
      if (navTarget) {
        addBotMsg({
          role: "bot",
          text: `Sure! I'll take you to **${navTarget.label}**. Tap the button below:`,
          time: fmtTime(),
          nav: navTarget,
          followUps: [],
        });
        if (!open) setUnread((n) => n + 1);
        return;
      }

      // 2) Generic "take me" / "which pages"
      const q = queryText.toLowerCase();
      const isGenericNav = ["take me", "go to", "navigate", "open page", "show me page", "which pages", "all pages", "list pages", "what pages", "show pages"].some((t) => q.includes(t));
      if (isGenericNav) {
        addBotMsg({
          role: "bot",
          text: "Here are the popular pages \u2014 tap any to navigate:",
          time: fmtTime(),
          pageGrid: getPopularPages(),
          followUps: [],
        });
        if (!open) setUnread((n) => n + 1);
        return;
      }

      // 3) Knowledge base lookup
      const entry = findAnswer(queryText);
      if (entry) {
        const followUps = getFollowUps(entry);
        const relatedRoute = findRelatedRoute(entry);
        addBotMsg({
          role: "bot",
          text: entry.a,
          time: fmtTime(),
          followUps,
          nav: relatedRoute || undefined,
        });
        if (!open) setUnread((n) => n + 1);
        return;
      }

      // 4) AI fallback (only if API key is set)
      const aiReply = await aiAnswer(queryText);
      if (aiReply) {
        addBotMsg({
          role: "bot",
          text: aiReply,
          time: fmtTime(),
          followUps: [],
        });
        if (!open) setUnread((n) => n + 1);
        return;
      }

      // 5) Fallback
      addBotMsg({
        role: "bot",
        text: FALLBACK,
        time: fmtTime(),
        followUps: quickActions.map((a) => ({ id: a.id, label: getEntryById(a.id)?.q || a.label })),
      });
      if (!open) setUnread((n) => n + 1);
    }, delay);
  }, [open, addBotMsg]);

  const handleSend = useCallback(() => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    processQuery(q, q);
  }, [input, processQuery]);

  const handleQuickAction = useCallback((action) => {
    const entry = getEntryById(action.id);
    if (entry) processQuery(entry.q, action.label);
  }, [processQuery]);

  const handleFollowUp = useCallback((f) => {
    const entry = getEntryById(f.id);
    if (entry) processQuery(entry.q, f.label);
  }, [processQuery]);

  const handleNavigate = useCallback((path) => {
    navigate(path);
    setOpen(false);
  }, [navigate]);

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

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }, [handleSend]);

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
      <div className={`fixed bottom-[88px] right-4 z-[9999] w-[390px] max-w-[calc(100vw-1.5rem)] transition-all duration-500 ease-[cubic-bezier(0.32,1.6,0.64,1)] origin-bottom-right ${
        open ? "scale-100 opacity-100 translate-y-0 pointer-events-auto" : "scale-[0.7] opacity-0 translate-y-8 pointer-events-none"
      }`}>

        {/* Card */}
        <div className="rounded-[24px] overflow-hidden flex flex-col shadow-[0_24px_80px_-8px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.06)] h-[580px] max-h-[calc(100dvh-7rem)] bg-[#f8f9fc]">

          {/* ── Header ── */}
          <div className="relative bg-gradient-to-br from-[#001e45] via-[#002B5E] to-[#003d82] px-5 py-4 flex-shrink-0">
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/[0.04] pointer-events-none" />
            <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-[#FF6600]/[0.07] pointer-events-none" />

            <div className="relative flex items-center gap-3">
              {/* JMC Logo avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.25)] overflow-hidden border-2 border-white/30">
                  <img
                    src="/logo.jpeg"
                    alt="JMC Logo"
                    className="w-10 h-10 object-contain"
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                  />
                  <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-[#FF6600] to-[#ff8533]">
                    <Bot size={22} className="text-white" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#002B5E]" />
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-[15px] tracking-tight">JMC Assistant</h3>
                  <div className="flex items-center gap-1 bg-emerald-400/20 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 text-[9.5px] font-bold uppercase tracking-wide">Live</span>
                  </div>
                </div>
                <p className="text-white/50 text-[11px] mt-0.5">Jammu Municipal Corporation</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  title="Reset chat"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 text-white/60 hover:text-white"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 text-white/60 hover:text-white"
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
            className="flex-1 overflow-y-auto px-4 pt-4 pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            <DateDivider />

            {msgs.map((msg, i) => (
              <Bubble key={i} msg={msg} onFollowUp={handleFollowUp} onNavigate={handleNavigate} />
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
            <div className="h-2" />
          </div>

          {/* Scroll-to-bottom pill */}
          {showScroll && (
            <button
              onClick={() => scrollToBottom()}
              className="absolute bottom-[84px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#002B5E] text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg hover:bg-[#003d7a] transition-colors duration-200 animate-msgIn z-10"
            >
              <ChevronDown size={13} /> New messages
            </button>
          )}

          {/* ── Input Bar ── */}
          <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 pt-3 pb-4">
            {/* Listening indicator */}
            {listening && (
              <div className="flex items-center gap-2 mb-2.5 px-1 animate-msgIn">
                <div className="flex gap-0.5 items-end h-4">
                  <span className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:0ms]" style={{height:'40%'}} />
                  <span className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:120ms]" style={{height:'80%'}} />
                  <span className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:240ms]" style={{height:'60%'}} />
                  <span className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:360ms]" style={{height:'100%'}} />
                  <span className="w-1 rounded-full bg-red-500 animate-[voiceBar_0.8s_ease-in-out_infinite] [animation-delay:480ms]" style={{height:'50%'}} />
                </div>
                <span className="text-[11.5px] font-semibold text-red-500">Listening… speak now</span>
                <span className="ml-auto text-[10px] text-gray-400">Tap mic to stop</span>
              </div>
            )}

            <div className={`flex items-center gap-2 bg-[#f4f5f8] rounded-2xl px-3.5 py-2 transition-all duration-250 ${
              listening ? "ring-2 ring-red-400/40 bg-red-50/60" : input ? "ring-2 ring-[#002B5E]/15 bg-white shadow-sm" : ""
            }`}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={listening ? "Listening…" : "Ask me anything about JMC…"}
                disabled={typing}
                className="flex-1 bg-transparent text-[13px] text-gray-800 placeholder-gray-400 outline-none py-1 disabled:opacity-60"
              />

              {/* Mic button */}
              {voiceSupported && !input.trim() && (
                <button
                  onClick={handleVoice}
                  disabled={typing}
                  title={listening ? "Stop listening" : "Speak your question"}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    listening
                      ? "bg-red-500 text-white shadow-[0_3px_10px_rgba(239,68,68,0.45)] scale-105"
                      : "bg-[#002B5E]/[0.07] text-[#002B5E]/60 hover:bg-[#002B5E]/[0.12] hover:text-[#002B5E] hover:scale-105 active:scale-95"
                  }`}
                >
                  {listening ? <MicOff size={15} /> : <Mic size={15} />}
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
            <p className="text-center text-[10px] text-gray-400 mt-2.5 font-medium tracking-wider">
              JMC KNOWLEDGE BASE • OFFICIAL SERVICE BOT
            </p>
          </div>
        </div>
      </div>

      {/* ── FAB ───────────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-4 z-[9999]">
        {/* Tooltip */}
        {!tooltipDismissed && !open && (
          <div className="absolute bottom-full right-0 mb-4 animate-msgIn">
            <div className="relative bg-gray-900 text-white text-[12px] font-semibold px-4 py-2.5 rounded-2xl shadow-xl whitespace-nowrap flex items-center gap-2">
              <Sparkles size={13} className="text-[#FF6600]" />
              Hi! Need help with JMC?
            </div>
            <div className="w-3 h-3 bg-gray-900 rotate-45 absolute -bottom-1.5 right-7" />
          </div>
        )}

        {/* Pulse rings — only when closed */}
        {!open && (
          <>
            <span className="absolute -inset-1 rounded-full bg-[#002B5E]/10 animate-ping [animation-duration:2s]" />
            <span className="absolute -inset-3 rounded-full bg-[#FF6600]/10 animate-pulse [animation-duration:2.5s]" />
          </>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close assistant" : "Open JMC Assistant"}
          className={`relative w-[62px] h-[62px] rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            open
              ? "bg-[#1a1a2e] hover:bg-[#16213e] rotate-90 scale-90 shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
              : "bg-white shadow-[0_6px_28px_rgba(0,43,94,0.35),0_0_0_3px_rgba(255,102,0,0.25)] hover:scale-110 active:scale-95 hover:shadow-[0_8px_32px_rgba(0,43,94,0.45)]"
          }`}
        >
          {open ? (
            <X size={22} className="text-white" />
          ) : (
            <img
              src="/logo.jpeg"
              alt="JMC"
              className="w-10 h-10 object-contain"
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
            />
          )}
          {!open && <MessageCircle size={26} className="text-[#FF6600] hidden" />}
        </button>

        {/* Unread dot */}
        {unread > 0 && !open && (
          <span className="absolute -top-1.5 -right-1 min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce">
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
