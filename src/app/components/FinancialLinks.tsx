import { useState } from 'react';
import { DollarSign, AlertTriangle, Eye, EyeOff, Info } from 'lucide-react';
import { financialNodes, financialEdges, type FinancialNode } from '../data/mockData';

const NODE_TYPE_CONFIG: Record<string, { color: string; fill: string; shape: string }> = {
  person: { color: '#f59e0b', fill: '#f59e0b18', shape: 'circle' },
  account: { color: '#06b6d4', fill: '#06b6d418', shape: 'rect' },
  business: { color: '#a855f7', fill: '#a855f718', shape: 'diamond' },
  crime: { color: '#ef4444', fill: '#ef444418', shape: 'triangle' },
};

const W = 780;
const H = 420;

function NodeShape({ node, selected, onClick }: { node: FinancialNode; selected: boolean; onClick: () => void }) {
  const cfg = NODE_TYPE_CONFIG[node.type];
  const stroke = selected ? '#f59e0b' : node.suspicious ? '#ef4444' : cfg.color;
  const fill = node.suspicious ? '#ef444415' : cfg.fill;
  const r = 22;

  return (
    <g style={{ cursor: 'pointer' }} onClick={onClick}>
      {selected && <circle cx={node.x * (W / 770)} cy={node.y * (H / 400)} r={r + 8} fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity={0.5} />}
      {node.suspicious && (
        <circle cx={node.x * (W / 770)} cy={node.y * (H / 400)} r={r + 4} fill="none" stroke="#ef4444" strokeWidth="1" opacity={0.4}>
          <animate attributeName="r" from={r + 2} to={r + 10} dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}
      <circle
        cx={node.x * (W / 770)} cy={node.y * (H / 400)} r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={selected ? 2.5 : 1.5}
      />
      <text x={node.x * (W / 770)} y={node.y * (H / 400) + 4} textAnchor="middle" fill={cfg.color} fontSize={9} fontFamily="monospace" fontWeight="bold">
        {node.type === 'crime' ? '₹' : node.type === 'person' ? '👤' : node.type === 'account' ? '🏦' : '🏢'}
      </text>
      <text x={node.x * (W / 770)} y={node.y * (H / 400) + r + 12} textAnchor="middle" fill={selected ? '#f59e0b' : '#94a3b8'} fontSize={8} fontFamily="monospace">
        {node.name.length > 16 ? node.name.slice(0, 16) + '…' : node.name}
      </text>
      {node.suspicious && (
        <text x={node.x * (W / 770) + r - 4} y={node.y * (H / 400) - r + 8} textAnchor="middle" fill="#ef4444" fontSize={10}>⚠</text>
      )}
    </g>
  );
}

function formatAmount(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export function FinancialLinks() {
  const [selectedNode, setSelectedNode] = useState<FinancialNode | null>(null);
  const [showSuspiciousOnly, setShowSuspiciousOnly] = useState(false);

  const visibleEdges = showSuspiciousOnly ? financialEdges.filter(e => e.suspicious) : financialEdges;
  const suspiciousCount = financialEdges.filter(e => e.suspicious).length;
  const totalFlagged = financialEdges.filter(e => e.suspicious).reduce((a, e) => a + e.amount, 0);
  const nodeEdges = selectedNode ? financialEdges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id) : [];

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-500/15 rounded-xl border border-green-500/30">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-[#e2e8f0]">Financial Link Analysis</h1>
            <p className="text-[#64748b] text-sm">Money trail — FIR/BGN/2024/0415 · Synthetic transaction data</p>
          </div>
        </div>
        <button
          onClick={() => setShowSuspiciousOnly(!showSuspiciousOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-all ${showSuspiciousOnly ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-[#0d1526] border-[#1e3a5f] text-[#94a3b8]'}`}
        >
          {showSuspiciousOnly ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {showSuspiciousOnly ? 'All Transactions' : 'Suspicious Only'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Entities', value: financialNodes.length, color: 'text-cyan-400' },
          { label: 'Suspicious Transactions', value: suspiciousCount, color: 'text-red-400' },
          { label: 'Flagged Amount', value: formatAmount(totalFlagged), color: 'text-red-400' },
          { label: 'Laundering Risk', value: 'CRITICAL', color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-3">
            <p className="text-[#64748b] text-xs">{s.label}</p>
            <p className={`font-mono text-xl mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Graph + detail */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        {/* SVG Graph */}
        <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1e3a5f] flex items-center gap-2">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-[#94a3b8] text-xs font-mono">MONEY TRAIL VISUALIZATION · ⚠ = SUSPICIOUS</span>
          </div>
          <div className="overflow-auto">
            <svg viewBox={`0 0 ${W} ${H + 40}`} className="w-full min-h-[300px]">
              <defs>
                <marker id="arrowSusp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
                </marker>
                <marker id="arrowNorm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#1e3a5f" />
                </marker>
              </defs>

              {/* Edges */}
              {visibleEdges.map((edge) => {
                const from = financialNodes.find(n => n.id === edge.from);
                const to = financialNodes.find(n => n.id === edge.to);
                if (!from || !to) return null;
                const x1 = from.x * (W / 770);
                const y1 = from.y * (H / 400);
                const x2 = to.x * (W / 770);
                const y2 = to.y * (H / 400);
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                const dx = x2 - x1; const dy = y2 - y1;
                const len = Math.sqrt(dx * dx + dy * dy);
                const nx = dx / len; const ny = dy / len;
                const ex2 = x2 - nx * 24; const ey2 = y2 - ny * 24;

                return (
                  <g key={edge.id}>
                    <line
                      x1={x1} y1={y1} x2={ex2} y2={ey2}
                      stroke={edge.suspicious ? '#ef4444' : '#1e3a5f'}
                      strokeWidth={edge.suspicious ? 2 : 1}
                      strokeDasharray={edge.suspicious ? 'none' : '4 4'}
                      opacity={edge.suspicious ? 0.8 : 0.5}
                      markerEnd={edge.suspicious ? 'url(#arrowSusp)' : 'url(#arrowNorm)'}
                    />
                    <text x={midX} y={midY - 6} textAnchor="middle" fill={edge.suspicious ? '#ef4444' : '#64748b'} fontSize={8} fontFamily="monospace">
                      {formatAmount(edge.amount)}
                    </text>
                    {edge.suspicious && (
                      <text x={midX} y={midY + 6} textAnchor="middle" fill="#ef4444" fontSize={7} fontFamily="monospace">⚠ FLAGGED</text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {financialNodes.map((node) => (
                <NodeShape
                  key={node.id}
                  node={node}
                  selected={selectedNode?.id === node.id}
                  onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                />
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="px-4 py-2 border-t border-[#1e3a5f] flex flex-wrap gap-3">
            {Object.entries(NODE_TYPE_CONFIG).map(([type, cfg]) => (
              <div key={type} className="flex items-center gap-1.5 text-[10px] text-[#64748b]">
                <div className="w-3 h-3 rounded-full" style={{ background: cfg.color }} />
                {type}
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-[10px] text-red-400">
              <span>⚠</span> Suspicious transaction
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-3">
          {selectedNode && (
            <div className={`bg-[#0d1526] rounded-xl border p-4 ${selectedNode.suspicious ? 'border-red-500/40' : 'border-[#1e3a5f]'}`}>
              <h3 className="text-[#e2e8f0] text-sm mb-1">{selectedNode.name}</h3>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                NODE_TYPE_CONFIG[selectedNode.type].color
              }`} style={{ borderColor: NODE_TYPE_CONFIG[selectedNode.type].color + '60', background: NODE_TYPE_CONFIG[selectedNode.type].fill }}>
                {selectedNode.type.toUpperCase()}
              </span>
              {selectedNode.suspicious && (
                <div className="mt-2 flex items-center gap-1.5 text-red-400 text-xs">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Suspicious entity flagged for investigation
                </div>
              )}
              <div className="mt-3 space-y-2">
                <p className="text-[#64748b] text-xs uppercase tracking-wider">Transactions</p>
                {nodeEdges.map(e => {
                  const other = financialNodes.find(n => n.id === (e.from === selectedNode.id ? e.to : e.from));
                  const direction = e.from === selectedNode.id ? '→' : '←';
                  return (
                    <div key={e.id} className={`p-2 rounded-lg text-xs border ${e.suspicious ? 'bg-red-500/10 border-red-500/30' : 'bg-[#070c18] border-[#1e3a5f]'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[#94a3b8]">{direction} {other?.name}</span>
                        <span className={`font-mono ${e.suspicious ? 'text-red-400' : 'text-green-400'}`}>{formatAmount(e.amount)}</span>
                      </div>
                      <div className="text-[#64748b] mt-0.5">{e.method} · {e.date}</div>
                      {e.flagReason && <div className="text-red-400 mt-0.5">⚠ {e.flagReason}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Flagged transactions list */}
          <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4">
            <h3 className="text-[#e2e8f0] text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Flagged Transactions
            </h3>
            <div className="space-y-2">
              {financialEdges.filter(e => e.suspicious).map(edge => {
                const from = financialNodes.find(n => n.id === edge.from);
                const to = financialNodes.find(n => n.id === edge.to);
                return (
                  <div key={edge.id} className="p-2.5 bg-red-500/5 border border-red-500/20 rounded-lg text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#94a3b8]">{from?.name} → {to?.name}</span>
                      <span className="text-red-400 font-mono">{formatAmount(edge.amount)}</span>
                    </div>
                    <p className="text-[#64748b]">{edge.flagReason}</p>
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
