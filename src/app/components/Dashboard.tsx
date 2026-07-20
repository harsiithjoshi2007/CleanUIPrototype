import { useNavigate } from 'react-router';
import {
  FileSearch, Network, Clock, AlertTriangle, Activity,
  Users, Shield, ArrowRight, MapPin, ChevronRight,
  TrendingUp, DollarSign, MessageSquare
} from 'lucide-react';
import { firCases, forecastAlerts } from '../data/mockData';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const trendData = [
  { t: 'Oct', v: 98 },  { t: 'Nov', v: 112 }, { t: 'Dec', v: 131 },
  { t: 'Jan', v: 119 }, { t: 'Feb', v: 108 },  { t: 'Mar', v: 127 },
];

const KPI_TILES = [
  {
    label: 'Active Cases',
    value: '127',
    change: '+14',
    period: 'this week',
    icon: Activity,
    accentColor: '#f59e0b',
    trend: 'up',
  },
  {
    label: 'Contradictions Flagged',
    value: '43',
    change: 'Across 18 FIRs',
    period: '',
    icon: AlertTriangle,
    accentColor: '#ef4444',
    trend: 'up',
  },
  {
    label: 'Network Targets',
    value: '8',
    change: '3 under',
    period: 'surveillance',
    icon: Users,
    accentColor: '#06b6d4',
    trend: 'neutral',
  },
  {
    label: 'Emerging Hotspots',
    value: '5',
    change: '2 critical',
    period: 'priority',
    icon: MapPin,
    accentColor: '#f97316',
    trend: 'up',
  },
];

const HERO_FEATURES = [
  {
    path: '/narrative',
    icon: FileSearch,
    badge: '01',
    title: 'Narrative Inconsistency Detector',
    description: 'AI cross-analysis of witness statements. Extracts claims, surfaces contradictions, and scores reliability across FIR documents.',
    stats: [
      { label: 'Contradictions', value: '5' },
      { label: 'Reliability', value: '72%' },
      { label: 'Severity', value: '8.4/10' },
    ],
    accentColor: '#f59e0b',
    gradientStart: 'rgba(245,158,11,0.08)',
  },
  {
    path: '/network',
    icon: Network,
    badge: '02',
    title: 'Criminal Network Fragility Analyzer',
    description: 'Interactive force-directed graph with betweenness centrality scoring. Simulate arrests to model cascade collapse across criminal cells.',
    stats: [
      { label: 'Network Nodes', value: '12' },
      { label: 'Key Target', value: 'Rajan K.' },
      { label: 'Disruption', value: '78%' },
    ],
    accentColor: '#06b6d4',
    gradientStart: 'rgba(6,182,212,0.08)',
  },
  {
    path: '/timeline',
    icon: Clock,
    badge: '03',
    title: 'Forensic Timeline Reconciler',
    description: 'Multi-source timeline merging CCTV, phone pings, and witness recall. Auto-resolves conflicts with weighted confidence scoring.',
    stats: [
      { label: 'Events', value: '13' },
      { label: 'Conflicts', value: '4' },
      { label: 'Sources', value: '4 types' },
    ],
    accentColor: '#f97316',
    gradientStart: 'rgba(249,115,22,0.08)',
  },
];

const QUICK_NAV = [
  { path: '/ai',        icon: MessageSquare, label: 'AI Chat',     color: '#06b6d4' },
  { path: '/patterns',  icon: MapPin,        label: 'Crime Map',   color: '#f59e0b' },
  { path: '/offenders', icon: Users,         label: 'Offenders',   color: '#f97316' },
  { path: '/financial', icon: DollarSign,    label: 'Financial',   color: '#22c55e' },
  { path: '/forecasting',icon: TrendingUp,   label: 'Forecasting', color: '#a78bfa' },
  { path: '/governance', icon: Shield,       label: 'Governance',  color: '#ef4444' },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">

      {/* ── Top hero row ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div style={{ color: '#2d4a6a', fontSize: '11px', letterSpacing: '0.12em', fontFamily: 'monospace', marginBottom: 8 }}>
            KARNATAKA STATE POLICE · HACKATHON PROTOTYPE
          </div>
          <h1 style={{ color: '#e2e8f0', fontSize: '26px', fontWeight: 600, lineHeight: 1.2, margin: 0 }}>
            Crime Intelligence Platform
          </h1>
          <p style={{ color: '#2d4a6a', fontSize: '13px', marginTop: 6 }}>
            Synthetic data · AI-simulated analysis · Real-time pattern detection
          </p>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-xl"
          style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span style={{ color: '#1a5c32', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>

      {/* ── KPI Tiles ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {KPI_TILES.map((tile) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.label}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: '#070d1c',
                border: `1px solid ${tile.accentColor}22`,
                boxShadow: `0 4px 24px ${tile.accentColor}10`,
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                style={{ background: tile.accentColor }}
              />
              <div className="flex items-start justify-between mb-3">
                <p style={{ color: '#3d5273', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {tile.label}
                </p>
                <Icon style={{ width: 15, height: 15, color: tile.accentColor, opacity: 0.6 }} />
              </div>
              <p style={{ color: tile.accentColor, fontSize: '36px', fontFamily: 'monospace', fontWeight: 700, lineHeight: 1 }}>
                {tile.value}
              </p>
              <p style={{ color: '#2d4a6a', fontSize: '11px', marginTop: 8 }}>
                <span style={{ color: tile.accentColor, opacity: 0.8 }}>{tile.change}</span>
                {tile.period && ` ${tile.period}`}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Hero Feature Cards ────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div style={{ width: 3, height: 16, background: '#f59e0b', borderRadius: 2 }} />
          <span style={{ color: '#3d5273', fontSize: '11px', letterSpacing: '0.1em', fontFamily: 'monospace', textTransform: 'uppercase' }}>
            Core Demonstration Features
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {HERO_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <button
                key={feat.path}
                onClick={() => navigate(feat.path)}
                className="text-left rounded-2xl p-6 transition-all duration-200 group"
                style={{
                  background: `linear-gradient(160deg, ${feat.gradientStart}, #070d1c)`,
                  border: `1px solid ${feat.accentColor}22`,
                  boxShadow: `0 2px 20px ${feat.accentColor}08`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${feat.accentColor}20`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 20px ${feat.accentColor}08`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Badge + icon row */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${feat.accentColor}15`, border: `1px solid ${feat.accentColor}25` }}
                  >
                    <Icon style={{ width: 20, height: 20, color: feat.accentColor }} />
                  </div>
                  <span
                    className="font-mono"
                    style={{ color: feat.accentColor, opacity: 0.4, fontSize: '28px', fontWeight: 700, lineHeight: 1 }}
                  >
                    {feat.badge}
                  </span>
                </div>

                {/* Title + description */}
                <h3 style={{ color: '#c8d6e8', fontSize: '15px', fontWeight: 600, lineHeight: 1.35, marginBottom: 8 }}>
                  {feat.title}
                </h3>
                <p style={{ color: '#3d5273', fontSize: '12px', lineHeight: 1.65, marginBottom: 20 }}>
                  {feat.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {feat.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3"
                      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #0f1e35' }}
                    >
                      <div style={{ color: feat.accentColor, fontSize: '13px', fontFamily: 'monospace', fontWeight: 600, lineHeight: 1 }}>
                        {s.value}
                      </div>
                      <div style={{ color: '#253750', fontSize: '10px', marginTop: 4, lineHeight: 1.3 }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-2 transition-all group-hover:gap-3"
                  style={{ color: feat.accentColor, fontSize: '12px', fontWeight: 500 }}
                >
                  <span>Launch Demo</span>
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom row ────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Trend chart */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#070d1c', border: '1px solid #0f1e35' }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p style={{ color: '#c8d6e8', fontSize: '13px', fontWeight: 500 }}>Robbery Trend</p>
              <p style={{ color: '#1e3050', fontSize: '11px', marginTop: 2 }}>6-month rolling average</p>
            </div>
            <span style={{ color: '#f59e0b', fontSize: '22px', fontFamily: 'monospace', fontWeight: 700 }}>127</span>
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" tick={{ fill: '#1e3050', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0a1628', border: '1px solid #142035', borderRadius: 10, fontSize: 12, color: '#e2e8f0' }}
                cursor={{ stroke: '#142035' }}
              />
              <Area type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={2} fill="url(#trendGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent FIRs */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#070d1c', border: '1px solid #0f1e35' }}
        >
          <div className="flex items-center justify-between mb-5">
            <p style={{ color: '#c8d6e8', fontSize: '13px', fontWeight: 500 }}>Recent FIRs</p>
            <button
              onClick={() => navigate('/patterns')}
              className="flex items-center gap-1 transition-all hover:gap-1.5"
              style={{ color: '#2d4a6a', fontSize: '11px' }}
            >
              All cases <ChevronRight style={{ width: 12, height: 12 }} />
            </button>
          </div>
          <div className="space-y-1">
            {firCases.slice(0, 4).map((fir) => (
              <div
                key={fir.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(0,0,0,0.2)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: fir.status === 'charge sheet filed' ? '#22c55e' : '#f59e0b' }}
                />
                <div className="min-w-0 flex-1">
                  <p style={{ color: '#f59e0b', fontSize: '11px', fontFamily: 'monospace' }}>{fir.id}</p>
                  <p style={{ color: '#3d5273', fontSize: '11px' }} className="truncate">{fir.title}</p>
                </div>
                <span style={{ color: '#1e3050', fontSize: '10px', flexShrink: 0 }}>{fir.district}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#070d1c', border: '1px solid #0f1e35' }}
        >
          <div className="flex items-center justify-between mb-5">
            <p style={{ color: '#c8d6e8', fontSize: '13px', fontWeight: 500 }}>Active Alerts</p>
            <button
              onClick={() => navigate('/forecasting')}
              className="flex items-center gap-1 transition-all hover:gap-1.5"
              style={{ color: '#2d4a6a', fontSize: '11px' }}
            >
              View all <ChevronRight style={{ width: 12, height: 12 }} />
            </button>
          </div>
          <div className="space-y-1">
            {forecastAlerts.slice(0, 4).map((alert) => {
              const sevColor = alert.severity === 'critical' ? '#ef4444' : alert.severity === 'high' ? '#f97316' : '#f59e0b';
              return (
                <div
                  key={alert.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: `${sevColor}08`, border: `1px solid ${sevColor}15` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: sevColor, boxShadow: alert.severity === 'critical' ? `0 0 8px ${sevColor}` : 'none' }}
                  />
                  <div className="min-w-0 flex-1">
                    <p style={{ color: '#c8d6e8', fontSize: '11px' }} className="truncate">{alert.title}</p>
                    <p style={{ color: '#253750', fontSize: '10px' }}>{alert.district} · {Math.round(alert.confidence * 100)}%</p>
                  </div>
                  <span
                    className="font-mono flex-shrink-0"
                    style={{ color: sevColor, fontSize: '9px', padding: '2px 6px', background: `${sevColor}12`, borderRadius: 4, border: `1px solid ${sevColor}25` }}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Quick nav ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: 3, height: 16, background: '#1e3050', borderRadius: 2 }} />
          <span style={{ color: '#1e3050', fontSize: '10px', letterSpacing: '0.1em', fontFamily: 'monospace', textTransform: 'uppercase' }}>
            Quick Access
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl transition-all"
                style={{ background: '#070d1c', border: '1px solid #0f1e35' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${item.color}30`;
                  (e.currentTarget as HTMLElement).style.background = `${item.color}08`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#0f1e35';
                  (e.currentTarget as HTMLElement).style.background = '#070d1c';
                }}
              >
                <Icon style={{ width: 18, height: 18, color: item.color, opacity: 0.7 }} />
                <span style={{ color: '#3d5273', fontSize: '11px' }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
