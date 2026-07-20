import { useState } from 'react';
import {
  User, AlertTriangle, Shield, MapPin, FileText,
  ChevronRight, X, Activity, Filter
} from 'lucide-react';
import { offenders, type Offender } from '../data/mockData';

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  'at-large': { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  active: { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  surveillance: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  arrested: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  parole: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  unknown: { color: 'text-[#64748b]', bg: 'bg-[#1a2744]', border: 'border-[#1e3a5f]' },
};

const RISK_COLOR = (score: number) => {
  if (score >= 80) return { bar: 'bg-red-500', text: 'text-red-400', label: 'CRITICAL' };
  if (score >= 60) return { bar: 'bg-orange-500', text: 'text-orange-400', label: 'HIGH' };
  if (score >= 40) return { bar: 'bg-amber-500', text: 'text-amber-400', label: 'MEDIUM' };
  return { bar: 'bg-green-500', text: 'text-green-400', label: 'LOW' };
};

function RiskBar({ score }: { score: number }) {
  const rc = RISK_COLOR(score);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[#64748b] text-xs">Risk Score</span>
        <span className={`font-mono text-sm ${rc.text}`}>{score}/100</span>
      </div>
      <div className="h-2 bg-[#1e3a5f] rounded-full overflow-hidden">
        <div className={`h-full ${rc.bar} rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
      <div className="text-right">
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${rc.text} border-current`}>{rc.label}</span>
      </div>
    </div>
  );
}

function Avatar({ name, riskScore }: { name: string; riskScore: number }) {
  const initials = name.split(' ').map(p => p[0]).join('').slice(0, 2);
  const rc = RISK_COLOR(riskScore);
  return (
    <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-sm ${rc.text} bg-[#070c18]`} style={{ borderColor: `currentColor` }}>
      {initials}
    </div>
  );
}

export function OffenderProfiles() {
  const [selectedOffender, setSelectedOffender] = useState<Offender | null>(offenders[0]);
  const [filterRisk, setFilterRisk] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = offenders.filter(o => {
    const rc = RISK_COLOR(o.riskScore);
    const riskMatch = filterRisk === 'all' || rc.label.toLowerCase() === filterRisk;
    const statusMatch = filterStatus === 'all' || o.status === filterStatus;
    return riskMatch && statusMatch;
  });

  return (
    <div className="p-6 space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/15 rounded-xl border border-orange-500/30">
            <User className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-[#e2e8f0]">Offender Profiling</h1>
            <p className="text-[#64748b] text-sm">Risk-scored profiles with behavioral analysis and MO patterns</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="w-4 h-4 text-[#64748b]" />
        <span className="text-[#64748b] text-xs">Risk:</span>
        {['all', 'critical', 'high', 'medium'].map(r => (
          <button
            key={r}
            onClick={() => setFilterRisk(r as any)}
            className={`px-2.5 py-1 rounded-full text-xs border transition-all capitalize ${filterRisk === r ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-[#0d1526] border-[#1e3a5f] text-[#94a3b8]'}`}
          >
            {r}
          </button>
        ))}
        <span className="text-[#64748b] text-xs ml-2">Status:</span>
        {['all', 'active', 'surveillance', 'arrested', 'parole'].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-2.5 py-1 rounded-full text-xs border transition-all capitalize ${filterStatus === s ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'bg-[#0d1526] border-[#1e3a5f] text-[#94a3b8]'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-4">
        {/* Card grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 auto-rows-min">
          {filtered.map((o) => {
            const rc = RISK_COLOR(o.riskScore);
            const sc = STATUS_CONFIG[o.status];
            const isSelected = selectedOffender?.id === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setSelectedOffender(isSelected ? null : o)}
                className={`text-left bg-[#0d1526] rounded-xl border p-4 transition-all ${isSelected ? 'border-amber-500/60 ring-1 ring-amber-500/30' : 'border-[#1e3a5f] hover:border-[#2a4a7f]'}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar name={o.name} riskScore={o.riskScore} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#e2e8f0] text-sm font-semibold truncate">{o.name}</p>
                    <p className="text-[#64748b] text-xs">{o.gender === 'M' ? 'Male' : 'Female'}, Age {o.age}</p>
                    <span className={`inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded border ${sc.color} ${sc.border} ${sc.bg}`}>
                      {o.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <RiskBar score={o.riskScore} />
                </div>

                <div className="grid grid-cols-2 gap-1 text-[10px] text-[#94a3b8]">
                  <div>Convictions: <span className="text-[#e2e8f0] font-mono">{o.convictions}</span></div>
                  <div>Active FIRs: <span className="text-amber-400 font-mono">{o.activeCases}</span></div>
                  <div className="col-span-2">District: <span className="text-[#e2e8f0]">{o.district}</span></div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {o.crimeTypes.slice(0, 2).map(t => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#070c18] border border-[#1e3a5f] rounded text-[#64748b]">{t}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        {selectedOffender ? (
          <div className="bg-[#0d1526] border border-amber-500/30 rounded-xl p-5 space-y-4 self-start sticky top-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar name={selectedOffender.name} riskScore={selectedOffender.riskScore} />
                <div>
                  <h3 className="text-[#e2e8f0]">{selectedOffender.name}</h3>
                  <p className="text-[#64748b] text-xs">{selectedOffender.gender === 'M' ? 'Male' : 'Female'} · Age {selectedOffender.age} · {selectedOffender.district}</p>
                  <span className={`inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded border ${STATUS_CONFIG[selectedOffender.status].color} ${STATUS_CONFIG[selectedOffender.status].border} ${STATUS_CONFIG[selectedOffender.status].bg}`}>
                    {selectedOffender.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedOffender(null)} className="text-[#64748b] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <RiskBar score={selectedOffender.riskScore} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Prior Convictions', value: selectedOffender.convictions, color: 'text-red-400' },
                { label: 'Active Cases', value: selectedOffender.activeCases, color: 'text-amber-400' },
              ].map(s => (
                <div key={s.label} className="bg-[#070c18] rounded-lg p-2 text-center border border-[#1e3a5f]">
                  <p className={`text-xl font-mono ${s.color}`}>{s.value}</p>
                  <p className="text-[#64748b] text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Last Known Location</p>
              <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {selectedOffender.lastKnownLocation}
              </div>
            </div>

            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Modus Operandi</p>
              <div className="space-y-1">
                {selectedOffender.modus.map(m => (
                  <div key={m} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                    <ChevronRight className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Behavioral Flags</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedOffender.behavioralFlags.map(f => (
                  <span key={f} className="text-[10px] px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-red-300">{f}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Linked FIRs</p>
              <div className="space-y-1">
                {selectedOffender.linkedFIRs.map(fir => (
                  <div key={fir} className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-[#64748b]" />
                    <span className="text-xs font-mono text-amber-400">{fir}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Crime Types</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedOffender.crimeTypes.map(c => (
                  <span key={c} className="text-[10px] px-2 py-0.5 bg-[#070c18] border border-[#1e3a5f] rounded text-[#94a3b8]">{c}</span>
                ))}
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 text-xs font-semibold">AI Recommendation</span>
              </div>
              <p className="text-[#94a3b8] text-xs">
                {selectedOffender.riskScore >= 80
                  ? 'Immediate surveillance escalation recommended. High network centrality — arrest likely to disrupt organized operations.'
                  : selectedOffender.riskScore >= 60
                  ? 'Regular check-ins required. Potential re-offense window within 30 days based on behavioral pattern.'
                  : 'Standard monitoring. Flag for joint operations if new intelligence emerges.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-6 text-center self-start">
            <User className="w-10 h-10 text-[#64748b] mx-auto mb-2" />
            <p className="text-[#64748b] text-sm">Select a profile to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
