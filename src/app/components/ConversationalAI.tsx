import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, Send, Mic, MicOff, Download, Globe,
  Bot, User, Loader2, RefreshCw, Database, Sparkles
} from 'lucide-react';
import { cannedResponses } from '../data/mockData';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
  language: 'en' | 'kn';
};

const SUGGESTED_QUERIES = [
  'Show all robberies in Bengaluru Urban last month',
  'Who are the repeat offenders in this network?',
  'Summarize FIR #FIR/BGN/2024/0412',
  'Show hotspot areas for next week',
];

const FALLBACK_RESPONSES: Record<string, string> = {
  en: `I understand your query. Based on the current intelligence database, I can assist with FIR lookups, offender profiling, crime pattern analysis, and network intelligence. Could you please rephrase your question or choose from the suggested queries below? For this demo, I have pre-loaded responses for the suggested queries.`,
  kn: `ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ. ಪ್ರಸ್ತುತ ಡೇಟಾಬೇಸ್ ಆಧಾರದ ಮೇಲೆ FIR ಹುಡುಕಾಟ, ಅಪರಾಧಿ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಅಪರಾಧ ಮಾದರಿ ವಿಶ್ಲೇಷಣೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ದಯವಿಟ್ಟು ಸೂಚಿಸಲಾದ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.`,
};

const GREETING: Record<string, { content: string; sources: string[] }> = {
  en: {
    content: `**ನಮಸ್ಕಾರ! KSP Crime Intelligence Assistant here.**\n\nI can help you query FIRs, analyze offender networks, review crime patterns, and access investigation intelligence.\n\n*Simulated AI — responses are pre-loaded for demonstration purposes. Synthetic data only.*`,
    sources: ['KSP Intelligence Platform v2.4', 'Demo Mode Active'],
  },
  kn: {
    content: `**ನಮಸ್ಕಾರ! KSP ಕ್ರೈಮ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್.**\n\nFIR ವಿಶ್ಲೇಷಣೆ, ಅಪರಾಧಿ ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು ಅಪರಾಧ ಮಾದರಿ ಹುಡುಕಾಟಕ್ಕೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.\n\n*ಸಿಮ್ಯುಲೇಟೆಡ್ AI — ಪ್ರದರ್ಶನ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮಾತ್ರ.*`,
    sources: ['KSP Intelligence Platform v2.4', 'ಡೆಮೋ ಮೋಡ್'],
  },
};

function formatContent(text: string) {
  return text.split('\n').map((line, i) => {
    let formatted = line
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-amber-300">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="text-[#94a3b8] italic">$1</em>')
      .replace(/•/g, '<span class="text-cyan-400">•</span>');
    return (
      <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />
    );
  });
}

export function ConversationalAI() {
  const [messages, setMessages] = useState<Message[]>(() => [{
    id: 'init',
    role: 'assistant',
    content: GREETING.en.content,
    sources: GREETING.en.sources,
    timestamp: new Date().toLocaleTimeString(),
    language: 'en',
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en' | 'kn'>('en');
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const findResponse = (query: string) => {
    const lower = query.toLowerCase();
    const match = cannedResponses.find(r =>
      lower.includes(r.query.toLowerCase().slice(0, 20)) ||
      r.query.toLowerCase().slice(0, 20).split(' ').some(word => word.length > 4 && lower.includes(word))
    );
    return match;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
      language,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const matched = findResponse(text);
    const responseText = matched
      ? (language === 'kn' ? matched.kannadaResponse : matched.response)
      : FALLBACK_RESPONSES[language];
    const sources = matched ? matched.sources : ['KSP Intelligence DB'];

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      sources,
      timestamp: new Date().toLocaleTimeString(),
      language,
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser. Please type your query.');
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleDownload = () => {
    const content = messages.map(m =>
      `[${m.timestamp}] ${m.role.toUpperCase()}: ${m.content.replace(/\*\*/g, '').replace(/\*/g, '')}`
    ).join('\n\n');
    const blob = new Blob([`KSP Crime Intelligence — Conversation Export\nExported: ${new Date().toLocaleString()}\n\n${content}`], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ksp-intel-conversation.txt';
    a.click();
  };

  const switchLanguage = () => {
    const newLang = language === 'en' ? 'kn' : 'en';
    setLanguage(newLang);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: GREETING[newLang].content,
      sources: GREETING[newLang].sources,
      timestamp: new Date().toLocaleTimeString(),
      language: newLang,
    }]);
  };

  const clearChat = () => {
    setMessages([{
      id: 'init2',
      role: 'assistant',
      content: GREETING[language].content,
      sources: GREETING[language].sources,
      timestamp: new Date().toLocaleTimeString(),
      language,
    }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] p-6 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1a2744] rounded-xl border border-[#1e3a5f]">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-[#e2e8f0]">Conversational Crime Intelligence</h1>
            <p className="text-[#64748b] text-sm">Ask natural language queries about FIRs, cases, patterns, and intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={switchLanguage} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2744] border border-[#1e3a5f] rounded-lg text-[#94a3b8] hover:text-white text-sm transition-all">
            <Globe className="w-3.5 h-3.5" />
            {language === 'en' ? 'Switch to ಕನ್ನಡ' : 'Switch to English'}
          </button>
          <button onClick={handleDownload} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2744] border border-[#1e3a5f] rounded-lg text-[#94a3b8] hover:text-white text-sm transition-all">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button onClick={clearChat} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2744] border border-[#1e3a5f] rounded-lg text-[#94a3b8] hover:text-white text-sm transition-all">
            <RefreshCw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Messages */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                  msg.role === 'assistant'
                    ? 'bg-cyan-500/20 border-cyan-500/40'
                    : 'bg-amber-500/20 border-amber-500/40'
                }`}>
                  {msg.role === 'assistant'
                    ? <Bot className="w-4 h-4 text-cyan-400" />
                    : <User className="w-4 h-4 text-amber-400" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[75%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`rounded-xl px-4 py-3 text-sm space-y-1 ${
                    msg.role === 'user'
                      ? 'bg-amber-500/15 border border-amber-500/30 text-[#e2e8f0]'
                      : 'bg-[#111d33] border border-[#1e3a5f] text-[#e2e8f0]'
                  }`}>
                    {formatContent(msg.content)}
                  </div>
                  {msg.sources && msg.sources.length > 0 && msg.role === 'assistant' && (
                    <div className="flex flex-wrap gap-1">
                      {msg.sources.map((src, i) => (
                        <span key={i} className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-[#070c18] border border-[#1e3a5f] rounded text-[#64748b] font-mono">
                          <Database className="w-2.5 h-2.5" />
                          {src}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="text-[10px] text-[#64748b]">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="bg-[#111d33] border border-[#1e3a5f] rounded-xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span className="text-[#64748b] text-sm">Querying intelligence database...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="mt-3 flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-[#0d1526] border border-[#1e3a5f] rounded-xl px-4 py-2.5 focus-within:border-cyan-500/40">
              <Sparkles className="w-4 h-4 text-[#64748b] flex-shrink-0" />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                placeholder={language === 'en' ? 'Ask about FIRs, suspects, patterns, hotspots...' : 'ಎಫ್‌ಐಆರ್, ಅಪರಾಧಿಗಳು, ಮಾದರಿಗಳ ಬಗ್ಗೆ ಕೇಳಿ...'}
                className="flex-1 bg-transparent outline-none text-[#e2e8f0] placeholder-[#64748b] text-sm"
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleVoice}
              className={`p-2.5 rounded-xl border transition-all ${isListening ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-[#0d1526] border-[#1e3a5f] text-[#64748b] hover:text-white'}`}
              title="Voice input"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={() => sendMessage(input)}
              disabled={isTyping || !input.trim()}
              className="px-4 py-2.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 rounded-xl hover:bg-cyan-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested queries sidebar */}
        <div className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-3">
          <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4">
            <p className="text-[#64748b] text-xs uppercase tracking-wider mb-3">Suggested Queries</p>
            <div className="space-y-2">
              {SUGGESTED_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={isTyping}
                  className="w-full text-left text-xs p-2.5 rounded-lg bg-[#070c18] border border-[#1e3a5f] text-[#94a3b8] hover:text-[#e2e8f0] hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all disabled:opacity-50"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4">
            <p className="text-[#64748b] text-xs uppercase tracking-wider mb-3">Capabilities</p>
            <div className="space-y-1.5">
              {[
                'FIR lookup & summary',
                'Offender network query',
                'Crime pattern analysis',
                'Hotspot forecasting',
                'Case status check',
                'Multi-language (EN/KN)',
                'Voice input',
                'Conversation export',
              ].map((cap) => (
                <div key={cap} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  {cap}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
            <p className="text-amber-400 text-xs font-semibold mb-1">Demo Mode</p>
            <p className="text-[#64748b] text-xs">Responses are pre-seeded for the 4 suggested queries. Other queries receive a generic response. No real NLP is connected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
