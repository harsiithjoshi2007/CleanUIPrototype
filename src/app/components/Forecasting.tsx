import { useState } from 'react';
import { TrendingUp, AlertTriangle, MapPin, ChevronDown, ChevronUp, Zap, CheckCircle2 } from 'lucide-react';
import { forecastAlerts, type ForecastAlert, type AlertSeverity } from '../data/mockData';

const SEVERITY_CONFIG: Record<AlertSeverity, { color: string; bg: string; border: string; label: string; pulse: boolean }> = {
  critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/40', label: 'CRITICAL', pulse: true },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/40', label: 'HIGH', pulse: false },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', label: 'MEDIUM', pulse: false },
  low: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/40', label: 'LOW', pulse: false },
};

function ConfidenceRing({ value }: { value: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const color = value >= 0.8 ? '#ef4444' : value >= 0.65 ? '#f97316' : value >= 0.5 ? '#eab308' : '#22c55e';
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1e3a5f" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - value)}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-mono" style={{ color }}>{Math.round(value * 100)}%</span>
      </div>
    </div>
  );
}

function AlertCard({ alert, expanded, onToggle }: {
  alert: ForecastAlert;
  expanded: boolean;
  onToggle: () => void;
}) {
  const cfg = SEVERITY_CONFIG[alert.severity];
  return (
    <div className={`bg-[#0d1526] border rounded-xl overflow-hidden transition-all ${cfg.border}`}>
      {/* Header */}
      <button className="w-full text-left p-4 flex items-start gap-4" onClick={onToggle}>
        {/* Indicator */}
        <div className="flex-shrink-0 mt-1">
          <div
            className={`w-3 h-3 rounded-full ${cfg.pulse ? 'animate-pulse' : ''}`}
            style={{ backgroundColor: alert.severity === 'critical' ? '#ef4444' : alert.severity === 'high' ? '#f97316' : alert.severity === 'medium' ? '#eab308' : '#22c55e' }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${cfg.color} ${cfg.border} ${cfg.bg}`}>
              {cfg.label}
            </span>
            <span className="text-[#64748b] text-xs">{alert.district}</span>
            <span className="text-[#64748b] text-xs">·</span>
            <span className="text-[#64748b] text-xs">{alert.crimeType}</span>
          </div>
          <h3 className="text-[#e2e8f0] text-sm">{alert.title}</h3>
          <p className="text-[#64748b] text-xs mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {alert.predictedTimeWindow}
          </p>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <ConfidenceRing value={alert.confidence} />
          <div className={`flex items-center gap-1 text-[10px] ${alert.trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
            <TrendingUp className="w-3 h-3" />
            +{alert.trend}%
          </div>
        </div>

        <div className="flex-shrink-0 text-[#64748b]">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#1e3a5f] pt-3">
          <div className="grid md:grid-cols-2 gap-3">
            {/* Evidence */}
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Supporting Evidence
              </p>
              <div className="space-y-1.5">
                {alert.evidence.map((e, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">→</span>
                    {e}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Recommended Actions
              </p>
              <div className="space-y-1.5">
                {alert.recommendedActions.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[#94a3b8]">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[#64748b] bg-[#070c18] border border-[#1e3a5f] rounded-lg p-2">
            <span className="text-amber-400">AI Explainability: </span>
            Prediction based on 180-day rolling pattern analysis, current intelligence signals, and statistical similarity to prior incident clusters. Confidence: {Math.round(alert.confidence * 100)}%.
          </div>
        </div>
      )}
    </div>
  );
}

export function Forecasting() {
  const [expandedId, setExpandedId] = useState<string | null>('fa1');
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'all'>('all');

  const filtered = forecastAlerts.filter(a => filterSeverity === 'all' || a.severity === filterSeverity);

  const critCount = forecastAlerts.filter(a => a.severity === 'critical').length;
  const highCount = forecastAlerts.filter(a => a.severity === 'high').length;
  const medCount = forecastAlerts.filter(a => a.severity === 'medium').length;

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500/15 rounded-xl border border-red-500/30">
            <TrendingUp className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-[#e2e8f0]">Early Warning & Crime Forecasting</h1>
            <p className="text-[#64748b] text-sm">Predictive alerts · 180-day rolling pattern analysis · Simulated AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#64748b]">Filter:</span>
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={`px-2.5 py-1 rounded-full border transition-all capitalize ${
                filterSeverity === s
                  ? s === 'critical' ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : s === 'high' ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                  : s === 'medium' ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
                  : s === 'low' ? 'bg-green-500/20 border-green-500/40 text-green-400'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-[#0d1526] border-[#1e3a5f] text-[#94a3b8]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Critical Alerts', value: critCount, color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/5' },
          { label: 'High Priority', value: highCount, color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/5' },
          { label: 'Medium Priority', value: medCount, color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/5' },
          { label: 'Avg Confidence', value: `${Math.round(forecastAlerts.reduce((a, f) => a + f.confidence, 0) / forecastAlerts.length * 100)}%`, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/5' },
        ].map(k => (
          <div key={k.label} className={`rounded-xl border p-3 ${k.border} ${k.bg}`}>
            <p className="text-[#64748b] text-xs">{k.label}</p>
            <p className={`font-mono text-2xl mt-1 ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {filtered.map(alert => (
          <AlertCard
            key={alert.id}
            alert={alert}
            expanded={expandedId === alert.id}
            onToggle={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-xs text-[#94a3b8]">
        <span className="text-amber-400 font-semibold">⚠ SIMULATED AI — SYNTHETIC DATA: </span>
        All predictions are generated from synthetic historical patterns for demonstration purposes only. No real NLP models, live data feeds, or actual police records are connected. For hackathon evaluation only.
      </div>
    </div>
  );
}
