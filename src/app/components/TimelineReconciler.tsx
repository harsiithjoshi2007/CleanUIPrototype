import { useState } from 'react';
import {
  Clock, Camera, Phone, User, Monitor, AlertTriangle,
  CheckCircle2, Info, XCircle, Eye, EyeOff, ChevronRight, Zap
} from 'lucide-react';
import { timelineEvents, type TimelineSource, type TimelineEvent } from '../data/mockData';

const SOURCE_CONFIG: Record<TimelineSource, {
  label: string; icon: React.ElementType; color: string; trackColor: string;
  bg: string; border: string; confidence: number;
}> = {
  cctv: { label: 'CCTV', icon: Camera, color: 'text-cyan-400', trackColor: '#06b6d4', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', confidence: 0.93 },
  phone: { label: 'Phone Ping', icon: Phone, color: 'text-green-400', trackColor: '#22c55e', bg: 'bg-green-500/10', border: 'border-green-500/30', confidence: 0.78 },
  witness: { label: 'Witness', icon: User, color: 'text-amber-400', trackColor: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', confidence: 0.62 },
  digital: { label: 'Digital Log', icon: Monitor, color: 'text-purple-400', trackColor: '#a855f7', bg: 'bg-purple-500/10', border: 'border-purple-500/30', confidence: 0.98 },
};

const CONFLICT_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ElementType; label: string }> = {
  none: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', icon: CheckCircle2, label: 'Confirmed' },
  minor: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: Info, label: 'Minor Conflict' },
  major: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: AlertTriangle, label: 'Major Conflict' },
  critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: XCircle, label: 'Critical Conflict' },
};

const TOTAL_MINUTES = 55; // 21:00 to 21:55
const CHART_WIDTH = 700;
const LANE_HEIGHT = 56;
const LANE_PAD = 8;

function timeToX(minutes: number) {
  return (minutes / TOTAL_MINUTES) * CHART_WIDTH;
}

export function TimelineReconciler() {
  const [enabledSources, setEnabledSources] = useState<Set<TimelineSource>>(
    new Set(['cctv', 'phone', 'witness', 'digital'])
  );
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [showReconciled, setShowReconciled] = useState(true);

  const toggleSource = (src: TimelineSource) => {
    setEnabledSources(prev => {
      const next = new Set(prev);
      if (next.has(src)) { if (next.size > 1) next.delete(src); }
      else next.add(src);
      return next;
    });
  };

  const visibleEvents = timelineEvents.filter(e => enabledSources.has(e.source));
  const conflictCount = visibleEvents.filter(e => e.conflictLevel !== 'none').length;
  const reconciledEvents = timelineEvents.filter(e => e.reconciledTime !== undefined).sort((a, b) => (a.reconciledTime ?? 0) - (b.reconciledTime ?? 0));

  const sources: TimelineSource[] = ['cctv', 'phone', 'witness', 'digital'];
  const enabledSourcesList = sources.filter(s => enabledSources.has(s));

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/15 rounded-xl border border-orange-500/30">
            <Clock className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-[#e2e8f0]">Forensic Timeline Reconciler</h1>
            <p className="text-[#64748b] text-sm">Case: FIR/BGN/2024/0412 · March 15, 2024 · 21:00–21:55</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setShowReconciled(!showReconciled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${showReconciled ? 'bg-orange-500/15 border-orange-500/40 text-orange-400' : 'bg-[#0d1526] border-[#1e3a5f] text-[#94a3b8]'}`}
          >
            <Zap className="w-3.5 h-3.5" />
            Reconciled View
          </button>
        </div>
      </div>

      {/* Source toggles + stats */}
      <div className="flex flex-wrap items-center gap-3">
        {sources.map((src) => {
          const cfg = SOURCE_CONFIG[src];
          const Icon = cfg.icon;
          const enabled = enabledSources.has(src);
          return (
            <button
              key={src}
              onClick={() => toggleSource(src)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm ${
                enabled ? `${cfg.bg} ${cfg.border} ${cfg.color}` : 'bg-[#0d1526] border-[#1e3a5f] text-[#64748b]'
              }`}
            >
              {enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <Icon className="w-3.5 h-3.5" />
              {cfg.label}
              <span className="text-xs opacity-60">({Math.round(cfg.confidence * 100)}% conf.)</span>
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-3">
          <div className="text-xs text-[#64748b]">{visibleEvents.length} events</div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono ${conflictCount > 0 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
            {conflictCount > 0 ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
            {conflictCount} conflicts
          </div>
        </div>
      </div>

      {/* Timeline canvas */}
      <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1e3a5f] flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#64748b]" />
          <span className="text-[#94a3b8] text-xs font-mono">MULTI-SOURCE TIMELINE · 21:00 → 21:55</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[800px] p-4">
            {/* Time axis */}
            <div className="flex gap-0 mb-1 ml-24">
              <svg width={CHART_WIDTH} height={24} className="flex-shrink-0">
                {Array.from({ length: 12 }).map((_, i) => {
                  const min = i * 5;
                  const x = timeToX(min);
                  return (
                    <g key={i}>
                      <line x1={x} y1={0} x2={x} y2={24} stroke="#1e3a5f" strokeWidth={0.5} />
                      <text x={x + 2} y={16} fill="#64748b" fontSize={9} fontFamily="monospace">
                        21:{String(min).padStart(2, '0')}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Tracks */}
            {enabledSourcesList.map((src) => {
              const cfg = SOURCE_CONFIG[src];
              const Icon = cfg.icon;
              const srcEvents = visibleEvents.filter(e => e.source === src);

              return (
                <div key={src} className="flex items-center mb-2 gap-2">
                  {/* Track label */}
                  <div className={`w-22 flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg ${cfg.bg} border ${cfg.border} min-w-[88px]`}>
                    <Icon className={`w-3 h-3 flex-shrink-0 ${cfg.color}`} />
                    <span className={`text-[10px] font-mono ${cfg.color}`}>{cfg.label}</span>
                  </div>

                  {/* Track SVG */}
                  <svg width={CHART_WIDTH} height={LANE_HEIGHT} className="flex-shrink-0">
                    {/* Background */}
                    <rect width={CHART_WIDTH} height={LANE_HEIGHT} fill="#070c18" rx={4} />
                    {/* Grid lines */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line key={i} x1={timeToX(i * 5)} y1={0} x2={timeToX(i * 5)} y2={LANE_HEIGHT} stroke="#1e3a5f" strokeWidth={0.5} opacity={0.5} />
                    ))}
                    {/* Center line */}
                    <line x1={0} y1={LANE_HEIGHT / 2} x2={CHART_WIDTH} y2={LANE_HEIGHT / 2} stroke="#1e3a5f" strokeWidth={0.5} />

                    {/* Events */}
                    {srcEvents.map((evt) => {
                      const cx = timeToX(evt.time);
                      const conflictCfg = CONFLICT_CONFIG[evt.conflictLevel];
                      const isSelected = selectedEvent?.id === evt.id;
                      const dotColor = evt.conflictLevel === 'none' ? cfg.trackColor :
                        evt.conflictLevel === 'minor' ? '#eab308' :
                        evt.conflictLevel === 'major' ? '#f97316' : '#ef4444';

                      return (
                        <g key={evt.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedEvent(isSelected ? null : evt)}>
                          {/* Event dot */}
                          <circle cx={cx} cy={LANE_HEIGHT / 2} r={isSelected ? 9 : 7} fill={dotColor} opacity={0.25} />
                          <circle
                            cx={cx} cy={LANE_HEIGHT / 2} r={isSelected ? 6 : 5}
                            fill={dotColor}
                            stroke={isSelected ? '#f59e0b' : dotColor}
                            strokeWidth={isSelected ? 2 : 1}
                          />

                          {/* Conflict indicator */}
                          {evt.conflictLevel !== 'none' && (
                            <polygon points={`${cx},${LANE_HEIGHT / 2 - 14} ${cx - 5},${LANE_HEIGHT / 2 - 6} ${cx + 5},${LANE_HEIGHT / 2 - 6}`} fill="#ef4444" opacity={0.8} />
                          )}

                          {/* Timestamp */}
                          <text x={cx} y={LANE_HEIGHT - 6} textAnchor="middle" fill="#64748b" fontSize={8} fontFamily="monospace">
                            {evt.timestamp}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              );
            })}

            {/* Reconciled timeline */}
            {showReconciled && (
              <div className="flex items-center mt-3 pt-3 border-t border-[#1e3a5f] gap-2">
                <div className="w-22 flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 min-w-[88px]">
                  <Zap className="w-3 h-3 flex-shrink-0 text-orange-400" />
                  <span className="text-[10px] font-mono text-orange-400">RECONCILED</span>
                </div>
                <svg width={CHART_WIDTH} height={LANE_HEIGHT} className="flex-shrink-0">
                  <rect width={CHART_WIDTH} height={LANE_HEIGHT} fill="#0d1526" rx={4} />
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line key={i} x1={timeToX(i * 5)} y1={0} x2={timeToX(i * 5)} y2={LANE_HEIGHT} stroke="#1e3a5f" strokeWidth={0.5} opacity={0.5} />
                  ))}
                  {reconciledEvents.map((evt, i) => {
                    if (!evt.reconciledTime === undefined) return null;
                    const cx = timeToX(evt.reconciledTime!);
                    const prev = reconciledEvents[i - 1];
                    return (
                      <g key={evt.id}>
                        {prev && prev.reconciledTime !== undefined && (
                          <line x1={timeToX(prev.reconciledTime!)} y1={LANE_HEIGHT / 2} x2={cx} y2={LANE_HEIGHT / 2} stroke="#f97316" strokeWidth={1} opacity={0.5} />
                        )}
                        <circle cx={cx} cy={LANE_HEIGHT / 2} r={6} fill="#f97316" />
                        <text x={cx} y={LANE_HEIGHT - 5} textAnchor="middle" fill="#64748b" fontSize={8} fontFamily="monospace">
                          {`21:${String(evt.reconciledTime!).padStart(2, '0')}`}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event detail + Conflict summary */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Selected event detail */}
        <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-5">
          {selectedEvent ? (
            <>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {(() => { const Icon = SOURCE_CONFIG[selectedEvent.source].icon; return <Icon className={`w-4 h-4 ${SOURCE_CONFIG[selectedEvent.source].color}`} />; })()}
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${SOURCE_CONFIG[selectedEvent.source].bg} ${SOURCE_CONFIG[selectedEvent.source].border} ${SOURCE_CONFIG[selectedEvent.source].color}`}>
                    {SOURCE_CONFIG[selectedEvent.source].label}
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border ${CONFLICT_CONFIG[selectedEvent.conflictLevel].bg} ${CONFLICT_CONFIG[selectedEvent.conflictLevel].border} ${CONFLICT_CONFIG[selectedEvent.conflictLevel].color}`}>
                  {CONFLICT_CONFIG[selectedEvent.conflictLevel].label}
                </div>
              </div>
              <p className="text-[#e2e8f0] mb-2">{selectedEvent.event}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-[#070c18] rounded-lg p-2">
                  <p className="text-[#64748b] text-xs">Timestamp</p>
                  <p className="font-mono text-[#e2e8f0]">{selectedEvent.timestamp}</p>
                </div>
                <div className="bg-[#070c18] rounded-lg p-2">
                  <p className="text-[#64748b] text-xs">Location</p>
                  <p className="text-[#e2e8f0] text-sm">{selectedEvent.location}</p>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-[#64748b] text-xs mb-1">Source Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#1e3a5f] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${selectedEvent.confidence * 100}%`, background: SOURCE_CONFIG[selectedEvent.source].trackColor }} />
                  </div>
                  <span className="font-mono text-sm" style={{ color: SOURCE_CONFIG[selectedEvent.source].trackColor }}>{Math.round(selectedEvent.confidence * 100)}%</span>
                </div>
              </div>
              {selectedEvent.conflictNote && (
                <div className={`p-2.5 rounded-lg border text-xs ${CONFLICT_CONFIG[selectedEvent.conflictLevel].bg} ${CONFLICT_CONFIG[selectedEvent.conflictLevel].border}`}>
                  <span className={`${CONFLICT_CONFIG[selectedEvent.conflictLevel].color} font-semibold`}>Conflict: </span>
                  <span className="text-[#94a3b8]">{selectedEvent.conflictNote}</span>
                </div>
              )}
              {selectedEvent.reconciledNote && (
                <div className="mt-2 p-2.5 rounded-lg border bg-orange-500/10 border-orange-500/30 text-xs">
                  <span className="text-orange-400 font-semibold">Reconciled: </span>
                  <span className="text-[#94a3b8]">{selectedEvent.reconciledNote}</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-10 h-10 text-[#64748b] mx-auto mb-2" />
              <p className="text-[#64748b] text-sm">Click any event on the timeline to inspect</p>
            </div>
          )}
        </div>

        {/* Conflict summary */}
        <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-5">
          <h3 className="text-[#e2e8f0] text-sm mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Conflict Resolution Summary
          </h3>
          <div className="space-y-2">
            {timelineEvents.filter(e => e.conflictLevel !== 'none').map((evt) => {
              const conflictCfg = CONFLICT_CONFIG[evt.conflictLevel];
              const srcCfg = SOURCE_CONFIG[evt.source];
              const ConflictIcon = conflictCfg.icon;
              return (
                <div
                  key={evt.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${conflictCfg.bg} ${conflictCfg.border} ${selectedEvent?.id === evt.id ? 'ring-1 ring-amber-500/40' : ''}`}
                  onClick={() => setSelectedEvent(selectedEvent?.id === evt.id ? null : evt)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ConflictIcon className={`w-3.5 h-3.5 ${conflictCfg.color}`} />
                    <span className={`text-xs font-mono ${conflictCfg.color}`}>{conflictCfg.label}</span>
                    <span className="text-[#64748b] text-xs font-mono">{evt.timestamp}</span>
                    <span className={`ml-auto text-xs ${srcCfg.color}`}>{srcCfg.label}</span>
                  </div>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{evt.conflictNote}</p>
                  {evt.reconciledNote && (
                    <p className="text-orange-400 text-xs mt-1">✓ {evt.reconciledNote}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Confidence by source */}
          <div className="mt-4 pt-4 border-t border-[#1e3a5f]">
            <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Source Weighting</p>
            <div className="space-y-2">
              {sources.map((src) => {
                const cfg = SOURCE_CONFIG[src];
                return (
                  <div key={src} className="flex items-center gap-2">
                    {(() => { const Icon = cfg.icon; return <Icon className={`w-3 h-3 ${cfg.color}`} />; })()}
                    <span className="text-xs text-[#94a3b8] w-20">{cfg.label}</span>
                    <ConfidenceBar value={cfg.confidence} color={cfg.trackColor} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-1 flex-1">
      <div className="flex-1 h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value * 100}%`, background: color }} />
      </div>
      <span className="text-[10px] font-mono text-[#64748b] w-7 text-right">{Math.round(value * 100)}%</span>
    </div>
  );
}
