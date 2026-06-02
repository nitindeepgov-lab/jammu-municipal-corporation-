'use strict';

const knowledge = require('./knowledge');

module.exports = () => ({
  async processQuery(queryText, history = []) {
    // 0) Greetings & conversational
    const greeting = knowledge.detectGreeting(queryText);
    if (greeting) {
      return { text: greeting, followUps: [] };
    }

    // 1) Navigation detection
    const navTarget = knowledge.detectNavigation(queryText);
    if (navTarget) {
      return {
        text: `Sure! I'll take you to **${navTarget.label}**. Tap the button below:`,
        nav: navTarget,
        followUps: [],
      };
    }

    // 2) Generic "take me" / "which pages"
    const q = queryText.toLowerCase();
    const isGenericNav = [
      "take me", "go to", "navigate", "open page",
      "show me page", "which pages", "all pages",
      "list pages", "what pages", "show pages",
    ].some((t) => q.includes(t));

    if (isGenericNav) {
      return {
        text: "Here are the popular pages \u2014 tap any to navigate:",
        pageGrid: knowledge.getPopularPages(),
        followUps: [],
      };
    }

    // If AI is configured, let the AI generate a smart GPT-like response using RAG context!
    const hasApiKey = !!process.env.OPENAI_API_KEY;
    if (hasApiKey) {
      const aiReply = await knowledge.aiAnswer(queryText, history);
      if (aiReply) {
        // Try to automatically attach a navigation button if the AI suggests a route
        const suggestedRoute = knowledge.detectNavigation(aiReply);
        
        // Formulate follow-up action options based on keyword matching
        let followUps = [];
        const entry = knowledge.findAnswer(queryText);
        if (entry) {
          followUps = knowledge.getFollowUps(entry);
        } else {
          // Default follow ups
          followUps = [
            { id: "pay-online-how", label: "💳 Pay Online" },
            { id: "contact-helpline", label: "📞 Contact JMC" },
          ];
        }

        return {
          text: aiReply,
          followUps,
          nav: suggestedRoute || undefined,
        };
      }
    }

    // --- LOCAL FALLBACK LOGIC (when OpenAI is not set) ---

    // 3) Knowledge base lookup
    const entry = knowledge.findAnswer(queryText);
    if (entry) {
      const followUps = knowledge.getFollowUps(entry);
      const relatedRoute = knowledge.findRelatedRoute(entry);
      return {
        text: entry.a,
        followUps,
        nav: relatedRoute || undefined,
      };
    }

    // 4) Live database-backed lookup for current website content
    const databaseReply = await knowledge.getDatabaseAnswer(queryText);
    if (databaseReply) {
      return databaseReply;
    }

    // 5) Final Fallback
    const FALLBACK = "I couldn't find a specific answer for that. Try rephrasing, or pick a suggestion below.\n\n• How to **pay fees online**\n• **File a complaint** or grievance\n• Find **JMC officer contacts**\n• View **notices & tenders**\n• Access **RTI information**";
    return {
      text: FALLBACK,
      followUps: knowledge.quickActions.map((a) => ({
        id: a.id,
        label: knowledge.getEntryById(a.id)?.q || a.label,
      })),
    };
  }
});
