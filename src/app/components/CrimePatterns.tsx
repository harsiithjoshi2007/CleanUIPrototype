import { useState, useMemo } from 'react';
import {
  MapPin, TrendingUp, BarChart3, PieChart as PieIcon, Filter
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { districtCrimeData, monthlyTrendData } from '../data/mockData';

const CRIME_TYPES = ['All', 'Robbery', 'Burglary', 'Cybercrime', 'Assault'];
const TIME_RANGES = ['3m', '6m', '1y'];

const COLORS = {
  robbery: '#ef4444',
  burglary: '#f97316',
  cybercrime: '#06b6d4',
  assault: '#f59e0b',
};

const INTENSITY_COLOR = (v: number) => {
  if (v >= 8) return '#ef4444';
  if (v >= 6) return '#f97316';
  if (v >= 4) return '#f59e0b';
  return '#22c55e';
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-lg p-3 shadow-xl text-xs">
      <p className="text-[#94a3b8] mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-mono">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export function CrimePatterns() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [crimeType, setCrimeType] = useState('All');
  const [timeRange, setTimeRange] = useState('6m');

  const selected = districtCrimeData.find(d => d.district === selectedDistrict);

  const sortedByIntensity = useMemo(() => districtCrimeData.slice().sort((a, b) => b.intensity - a.intensity), []);
  const sortedByTotal = useMemo(() => districtCrimeData.slice().sort((a, b) => b.total - a.total).slice(0, 6), []);

  const trendSlice = timeRange === '3m' ? monthlyTrendData.slice(-3) :
    timeRange === '6m' ? monthlyTrendData : monthlyTrendData;

  const pieData = selected ? [
    { name: 'Robbery', value: selected.robbery, color: COLORS.robbery },
    { name: 'Burglary', value: selected.burglary, color: COLORS.burglary },
    { name: 'Cybercrime', value: selected.cybercrime, color: COLORS.cybercrime },
    { name: 'Assault', value: selected.assault, color: COLORS.assault },
  ] : [
    { name: 'Robbery', value: districtCrimeData.reduce((a, d) => a + d.robbery, 0), color: COLORS.robbery },
    { name: 'Burglary', value: districtCrimeData.reduce((a, d) => a + d.burglary, 0), color: COLORS.burglary },
    { name: 'Cybercrime', value: districtCrimeData.reduce((a, d) => a + d.cybercrime, 0), color: COLORS.cybercrime },
    { name: 'Assault', value: districtCrimeData.reduce((a, d) => a + d.assault, 0), color: COLORS.assault },
  ];

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/15 rounded-xl border border-amber-500/30">
            <MapPin className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-[#e2e8f0]">Crime Pattern Analysis</h1>
            <p className="text-[#64748b] text-sm">Karnataka State · Synthetic data · 6-month analysis window</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {TIME_RANGES.map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${timeRange === r ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-[#0d1526] border-[#1e3a5f] text-[#94a3b8]'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Filter className="w-4 h-4 text-[#64748b] mt-2" />
        {CRIME_TYPES.map(t => (
          <button
            key={t}
            onClick={() => setCrimeType(t)}
            className={`px-3 py-1 rounded-full text-xs border transition-all ${crimeType === t ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-[#0d1526] border-[#1e3a5f] text-[#94a3b8] hover:text-white'}`}
          >
            {t}
          </button>
        ))}
        {selectedDistrict && (
          <button onClick={() => setSelectedDistrict(null)} className="px-3 py-1 rounded-full text-xs border bg-cyan-500/20 border-cyan-500/40 text-cyan-400">
            {selectedDistrict} ✕
          </button>
        )}
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Incidents', value: districtCrimeData.reduce((a, d) => a + d.total, 0).toLocaleString(), color: 'text-amber-400' },
          { label: 'Robberies', value: districtCrimeData.reduce((a, d) => a + d.robbery, 0), color: 'text-red-400' },
          { label: 'Cybercrime', value: districtCrimeData.reduce((a, d) => a + d.cybercrime, 0), color: 'text-cyan-400' },
          { label: 'Highest Risk', value: 'Bengaluru Urban', color: 'text-orange-400' },
        ].map(k => (
          <div key={k.label} className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-3">
            <p className="text-[#64748b] text-xs">{k.label}</p>
            <p className={`font-mono text-xl mt-1 ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* District heatmap grid */}
        <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4">
          <h3 className="text-[#e2e8f0] text-sm mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            District Crime Intensity
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {sortedByIntensity.map(d => (
              <button
                key={d.district}
                onClick={() => setSelectedDistrict(d.district === selectedDistrict ? null : d.district)}
                className={`text-left p-3 rounded-xl border transition-all ${selectedDistrict === d.district ? 'ring-2 ring-amber-500/60' : 'hover:bg-[#111d33]'}`}
                style={{ borderColor: `${INTENSITY_COLOR(d.intensity)}40`, background: `${INTENSITY_COLOR(d.intensity)}10` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#e2e8f0] text-xs">{d.district}</span>
                  <span className="text-xs font-mono" style={{ color: INTENSITY_COLOR(d.intensity) }}>{d.intensity}</span>
                </div>
                <div className="h-1 bg-[#1e3a5f] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.intensity / 10) * 100}%`, background: INTENSITY_COLOR(d.intensity) }} />
                </div>
                <div className="text-[#64748b] text-[10px] mt-1">{d.total} incidents</div>
              </button>
            ))}
          </div>
        </div>

        {/* Bar chart by district */}
        <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4">
          <h3 className="text-[#e2e8f0] text-sm mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            Crimes by District
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={sortedByTotal} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="district" tick={{ fill: '#64748b', fontSize: 9 }} angle={-20} textAnchor="end" height={40} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="robbery" name="Robbery" stackId="a" fill={COLORS.robbery} />
              <Bar dataKey="burglary" name="Burglary" stackId="a" fill={COLORS.burglary} />
              <Bar dataKey="cybercrime" name="Cybercrime" stackId="a" fill={COLORS.cybercrime} />
              <Bar dataKey="assault" name="Assault" stackId="a" fill={COLORS.assault} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Trend line */}
        <div className="lg:col-span-2 bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4">
          <h3 className="text-[#e2e8f0] text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Monthly Trends — {selectedDistrict ?? 'All Karnataka'}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendSlice} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: '#94a3b8' }} />
              <Line type="monotone" dataKey="robbery" stroke={COLORS.robbery} strokeWidth={2} dot={false} name="Robbery" />
              <Line type="monotone" dataKey="burglary" stroke={COLORS.burglary} strokeWidth={2} dot={false} name="Burglary" />
              <Line type="monotone" dataKey="cybercrime" stroke={COLORS.cybercrime} strokeWidth={2} dot={false} name="Cybercrime" />
              <Line type="monotone" dataKey="assault" stroke={COLORS.assault} strokeWidth={2} dot={false} name="Assault" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4">
          <h3 className="text-[#e2e8f0] text-sm mb-3 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-green-400" />
            Crime Type Mix
          </h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" paddingAngle={2}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0d1526', border: '1px solid #1e3a5f', borderRadius: 8, fontSize: 11, color: '#e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-[#94a3b8]">{d.name}</span>
                </div>
                <span className="font-mono" style={{ color: d.color }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Weekend Peak', desc: 'Robbery incidents spike 38% on Friday–Saturday nights vs weekdays. Prime hours: 20:00–23:00.', icon: '📅', cardClass: 'border-amber-500/30 bg-amber-500/5', titleClass: 'text-amber-400' },
          { title: 'Festive Season', desc: 'Theft and burglary increase by 22% during Diwali and New Year periods. Correlates with reduced patrol.', icon: '🎆', cardClass: 'border-orange-500/30 bg-orange-500/5', titleClass: 'text-orange-400' },
          { title: 'Urban-Rural Divide', desc: 'Cybercrime concentrated 78% in urban districts. Physical robbery more evenly distributed.', icon: '🏙️', cardClass: 'border-cyan-500/30 bg-cyan-500/5', titleClass: 'text-cyan-400' },
        ].map(card => (
          <div key={card.title} className={`bg-[#0d1526] border rounded-xl p-4 ${card.cardClass}`}>
            <div className="text-2xl mb-2">{card.icon}</div>
            <h3 className={`text-sm mb-1 ${card.titleClass}`}>{card.title}</h3>
            <p className="text-[#94a3b8] text-xs leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
