import { useState } from 'react';
import {
  FileSearch, Play, ChevronDown, ChevronUp, AlertTriangle,
  CheckCircle2, Info, XCircle, Zap, User, Clock, Car,
  Sword, Shirt, Timer, MapPin, Eye, TrendingDown
} from 'lucide-react';
import { witnessStatements, contradictions, type ContradictionLevel, type Claim } from '../data/mockData';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  time: Clock,
  count: User,
  vehicle: Car,
  weapon: Sword,
  attire: Shirt,
  duration: Timer,
  location: MapPin,
  identity: Eye,
};

const CATEGORY_LABELS: Record<string, string> = {
  time: 'Time',
  count: 'Count',
  vehicle: 'Vehicle',
  weapon: 'Weapon',
  attire: 'Attire',
  duration: 'Duration',
  location: 'Location',
  identity: 'Identity',
};

const LEVEL_CONFIG: Record<ContradictionLevel, { color: string; bg: string; border: string; label: string; icon: React.ElementType }> = {
  critical: { color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/40', label: 'CRITICAL', icon: XCircle },
  major: { color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/40', label: 'MAJOR', icon: AlertTriangle },
  minor: { color: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/40', label: 'MINOR', icon: Info },
  consistent: { color: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500/40', label: 'CONSISTENT', icon: CheckCircle2 },
};

function ClaimChip({ claim, accent }: { claim: Claim; accent: string }) {
  const Icon = CATEGORY_ICONS[claim.category] ?? Info;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${accent} font-mono`}>
      <Icon className="w-3 h-3" />
      {claim.text}
    </span>
  );
}

function ConfidenceMeter({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <span className="text-xs font-mono text-[#94a3b8]">{Math.round(value * 100)}%</span>
    </div>
  );
}

function SeverityGauge({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color = score >= 8 ? '#ef4444' : score >= 6 ? '#f97316' : score >= 4 ? '#eab308' : '#22c55e';
  const label = score >= 8 ? 'CRITICAL' : score >= 6 ? 'HIGH' : score >= 4 ? 'MEDIUM' : 'LOW';
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="48" fill="none" stroke="#1e3a5f" strokeWidth="12" />
          <circle
            cx="60" cy="60" r="48" fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 48}`}
            strokeDashoffset={`${2 * Math.PI * 48 * (1 - pct / 100)}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl" style={{ color }}>{score.toFixed(1)}</span>
          <span className="text-[10px] text-[#64748b]">/10</span>
        </div>
      </div>
      <span className="text-xs font-mono px-2 py-0.5 rounded border" style={{ color, borderColor: `${color}60`, background: `${color}18` }}>
        {label}
      </span>
    </div>
  );
}

export function NarrativeDetector() {
  const [analysisRun, setAnalysisRun] = useState(false);
  const [expandedContradiction, setExpandedContradiction] = useState<number | null>(0);
  const [highlightCategory, setHighlightCategory] = useState<string | null>(null);

  const severityScore = 8.4;
  const ws1 = witnessStatements[0];
  const ws2 = witnessStatements[1];

  const criticalCount = contradictions.filter(c => c.level === 'critical').length;
  const majorCount = contradictions.filter(c => c.level === 'major').length;
  const minorCount = contradictions.filter(c => c.level === 'minor').length;

  const highlightSentence = (sentence: string, claims: Claim[], idx: number, accentBg: string, accentText: string) => {
    const matchingClaim = claims.find(c => c.sentenceIndex === idx && (highlightCategory ? c.category === highlightCategory : true));
    if (matchingClaim) {
      return (
        <span key={idx} className={`${accentBg} ${accentText} px-1 rounded cursor-pointer`}>
          {sentence}{' '}
        </span>
      );
    }
    return <span key={idx} className="text-[#94a3b8]">{sentence} </span>;
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/15 rounded-xl border border-amber-500/30">
            <FileSearch className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-[#e2e8f0]">Narrative Inconsistency Detector</h1>
            <p className="text-[#64748b] text-sm">Case: FIR/BGN/2024/0412 — MG Jewellers Armed Robbery</p>
          </div>
        </div>
        <button
          onClick={() => { setAnalysisRun(true); setExpandedContradiction(0); }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg font-semibold transition-all shadow-lg shadow-amber-500/20"
        >
          <Play className="w-4 h-4" />
          {analysisRun ? 'Re-run Analysis' : 'Load Demo & Analyze'}
        </button>
      </div>

      {/* Two-pane statements */}
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { ws: ws1, accent: 'amber', borderC: 'border-amber-500/30', bgC: 'bg-amber-500/5', textC: 'text-amber-300', chipBorder: 'border-amber-500/40 text-amber-300 bg-amber-500/10' },
          { ws: ws2, accent: 'cyan', borderC: 'border-cyan-500/30', bgC: 'bg-cyan-500/5', textC: 'text-cyan-300', chipBorder: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10' },
        ].map(({ ws, borderC, bgC, textC, chipBorder }, wi) => (
          <div key={ws.id} className={`bg-[#0d1526] rounded-xl border ${borderC} p-5`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${wi === 0 ? 'bg-amber-500 text-black' : 'bg-cyan-500 text-black'}`}>
                    {wi === 0 ? 'A' : 'B'}
                  </div>
                  <span className={`font-semibold text-[#e2e8f0]`}>{ws.witnessName}</span>
                </div>
                <p className="text-[#64748b] text-xs mt-1">{ws.relation} · Age {ws.witnessAge} · Recorded {ws.recordedAt}</p>
                <p className="text-[#64748b] text-xs">Officer: {ws.officerName}</p>
              </div>
              <div className="text-right">
                <p className="text-[#64748b] text-xs">Reliability</p>
                <p className={`text-xl font-mono ${wi === 0 ? 'text-amber-400' : 'text-cyan-400'}`}>{Math.round(ws.reliabilityScore * 100)}%</p>
              </div>
            </div>

            {/* Reliability bar */}
            <div className="mb-3">
              <ConfidenceMeter value={ws.reliabilityScore} color={wi === 0 ? 'bg-amber-500' : 'bg-cyan-500'} />
            </div>

            {/* Statement text */}
            <div className={`rounded-lg p-3 ${bgC} border ${borderC} text-sm leading-relaxed mb-3`}>
              {ws.sentences.map((s, idx) => highlightSentence(s, ws.claims, idx, wi === 0 ? 'bg-amber-500/25' : 'bg-cyan-500/25', wi === 0 ? 'text-amber-200' : 'text-cyan-200'))}
            </div>

            {/* Claims */}
            {analysisRun && (
              <div>
                <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Extracted Claims</p>
                <div className="flex flex-wrap gap-1.5">
                  {ws.claims.map((claim) => (
                    <button
                      key={claim.id}
                      onClick={() => setHighlightCategory(highlightCategory === claim.category ? null : claim.category)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border font-mono transition-all ${chipBorder} ${highlightCategory === claim.category ? 'ring-1 ring-offset-1 ring-offset-transparent' : ''}`}
                    >
                      {(() => { const I = CATEGORY_ICONS[claim.category] ?? Info; return <I className="w-3 h-3" />; })()}
                      {CATEGORY_LABELS[claim.category]}: {claim.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!analysisRun && (
        <div className="text-center py-12 bg-[#0d1526] border border-dashed border-[#1e3a5f] rounded-xl">
          <FileSearch className="w-12 h-12 text-[#64748b] mx-auto mb-3" />
          <p className="text-[#94a3b8]">Click "Load Demo & Analyze" to run the inconsistency detector</p>
          <p className="text-[#64748b] text-sm mt-1">Pre-loaded with FIR/BGN/2024/0412 witness statements</p>
        </div>
      )}

      {analysisRun && (
        <>
          {/* Summary bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
              <p className="text-3xl font-mono text-red-400">{criticalCount}</p>
              <p className="text-[#64748b] text-xs">Critical</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 text-center">
              <p className="text-3xl font-mono text-orange-400">{majorCount}</p>
              <p className="text-[#64748b] text-xs">Major</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 text-center">
              <p className="text-3xl font-mono text-yellow-400">{minorCount}</p>
              <p className="text-[#64748b] text-xs">Minor</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-3">
              <SeverityGauge score={severityScore} />
            </div>
          </div>

          {/* Contradiction Matrix */}
          <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1e3a5f] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-[#e2e8f0]">Contradiction Matrix</h3>
              <span className="ml-auto text-xs text-[#64748b]">{contradictions.length} claim categories analyzed</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e3a5f]">
                    <th className="text-left px-4 py-3 text-[#64748b] text-xs uppercase tracking-wider w-36">Category</th>
                    <th className="text-left px-4 py-3 text-[#64748b] text-xs uppercase tracking-wider">
                      <span className="flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-amber-500 text-[9px] flex items-center justify-center text-black font-bold">A</span> Witness A</span>
                    </th>
                    <th className="text-left px-4 py-3 text-[#64748b] text-xs uppercase tracking-wider">
                      <span className="flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-cyan-500 text-[9px] flex items-center justify-center text-black font-bold">B</span> Witness B</span>
                    </th>
                    <th className="text-center px-4 py-3 text-[#64748b] text-xs uppercase tracking-wider w-28">Verdict</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {contradictions.map((c, idx) => {
                    const cfg = LEVEL_CONFIG[c.level];
                    const Icon = cfg.icon;
                    const isExpanded = expandedContradiction === idx;
                    return (
                      <>
                        <tr
                          key={c.category}
                          className={`border-b border-[#1e3a5f] cursor-pointer hover:bg-[#111d33] transition-colors ${cfg.bg}`}
                          onClick={() => setExpandedContradiction(isExpanded ? null : idx)}
                        >
                          <td className="px-4 py-3">
                            <span className="text-[#94a3b8] text-xs font-mono">{c.category}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-amber-300 text-xs font-mono">{c.claimA}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-cyan-300 text-xs font-mono">{c.claimB}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${cfg.color} ${cfg.border} ${cfg.bg}`}>
                              <Icon className="w-3 h-3" />
                              {cfg.label}
                            </span>
                          </td>
                          <td className="px-2 py-3 text-[#64748b]">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`${c.category}-expand`} className="bg-[#070c18]">
                            <td colSpan={5} className="px-6 py-4">
                              <div className="space-y-2">
                                <div>
                                  <span className="text-[#64748b] text-xs uppercase tracking-wider">AI Analysis: </span>
                                  <span className="text-[#94a3b8] text-sm">{c.explanation}</span>
                                </div>
                                <div className={`flex items-start gap-2 p-2 rounded-lg ${cfg.bg} border ${cfg.border}`}>
                                  <Zap className={`w-4 h-4 ${cfg.color} mt-0.5 flex-shrink-0`} />
                                  <div>
                                    <span className={`${cfg.color} text-xs font-semibold`}>Investigator Action: </span>
                                    <span className="text-[#94a3b8] text-sm">{c.investigatorNote}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Evidence Trail */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-5">
              <h3 className="text-[#e2e8f0] mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                Witness Reliability Analysis
              </h3>
              <div className="space-y-3">
                {witnessStatements.map((ws, wi) => (
                  <div key={ws.id} className="p-3 bg-[#070c18] rounded-lg border border-[#1e3a5f]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${wi === 0 ? 'bg-amber-500 text-black' : 'bg-cyan-500 text-black'}`}>
                          {wi === 0 ? 'A' : 'B'}
                        </span>
                        <span className="text-[#e2e8f0] text-sm">{ws.witnessName}</span>
                      </div>
                      <span className={`font-mono text-sm ${wi === 0 ? 'text-amber-400' : 'text-cyan-400'}`}>
                        {Math.round(ws.reliabilityScore * 100)}% reliable
                      </span>
                    </div>
                    <ConfidenceMeter value={ws.reliabilityScore} color={wi === 0 ? 'bg-amber-500' : 'bg-cyan-500'} />
                    <p className="text-[#64748b] text-xs mt-2">
                      {wi === 0
                        ? 'Primary victim. High emotional stress. Inside perspective. CCTV corroborates key claims.'
                        : 'Passerby. Nighttime conditions. Stress-induced recall errors. Time estimate unreliable.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-5">
              <h3 className="text-[#e2e8f0] mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Priority Action Items
              </h3>
              <div className="space-y-2">
                {[
                  { level: 'CRITICAL', text: 'Cross-check vehicle sightings with CCTV — red motorcycle + black SUV both logged within case window', wrapClass: 'bg-red-500/10 border-red-500/30', badgeClass: 'bg-red-500/20 text-red-400 border-red-500/40' },
                  { level: 'CRITICAL', text: 'Run Witness B\'s facial description (M, 28-30, clean-shaven, scar left cheek) through facial recognition DB', wrapClass: 'bg-red-500/10 border-red-500/30', badgeClass: 'bg-red-500/20 text-red-400 border-red-500/40' },
                  { level: 'HIGH', text: 'Reconcile time conflict — use ATM CCTV timestamp (21:22 alarm) as anchor event', wrapClass: 'bg-orange-500/10 border-orange-500/30', badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
                  { level: 'HIGH', text: 'Account for third suspect — possible vehicle-switch role (motorcycle → SUV getaway)', wrapClass: 'bg-orange-500/10 border-orange-500/30', badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
                  { level: 'MEDIUM', text: 'Verify knife wound patterns on shop counter to confirm weapon type used inside', wrapClass: 'bg-yellow-500/10 border-yellow-500/30', badgeClass: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border ${item.wrapClass}`}>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0 mt-0.5 ${item.badgeClass}`}>
                      {item.level}
                    </span>
                    <p className="text-[#94a3b8] text-xs">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
