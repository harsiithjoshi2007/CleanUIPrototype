import { useState, useCallback } from 'react';
import { Network, AlertTriangle, Target, BarChart3, Info, RefreshCw, Crosshair, ChevronDown, ChevronUp } from 'lucide-react';
import { networkNodes, networkEdges, type NetworkNode, type NodeRole } from '../data/mockData';

const ROLE_COLORS: Record<NodeRole, { fill: string; stroke: string; text: string; label: string }> = {
  leader: { fill: '#ef444420', stroke: '#ef4444', text: '#fca5a5', label: 'Gang Leader' },
  operations: { fill: '#f9731620', stroke: '#f97316', text: '#fdba74', label: 'Operations' },
  financier: { fill: '#eab30820', stroke: '#eab308', text: '#fde047', label: 'Financier' },
  operative: { fill: '#06b6d420', stroke: '#06b6d4', text: '#67e8f9', label: 'Operative' },
  location: { fill: '#8b5cf620', stroke: '#8b5cf6', text: '#c4b5fd', label: 'Location' },
  financial_entity: { fill: '#10b98120', stroke: '#10b981', text: '#6ee7b7', label: 'Financial Entity' },
};

const STATUS_PULSE: Record<string, string> = {
  active: '',
  surveillance: 'animate-pulse',
  arrested: '',
  unknown: '',
};

function getConnectedComponents(nodes: NetworkNode[], edges: typeof networkEdges, removedIds: Set<string>): Map<string, number> {
  const activeNodes = nodes.filter(n => !removedIds.has(n.id));
  const adjacency = new Map<string, string[]>();
  activeNodes.forEach(n => adjacency.set(n.id, []));
  edges.forEach(e => {
    if (!removedIds.has(e.from) && !removedIds.has(e.to)) {
      adjacency.get(e.from)?.push(e.to);
      adjacency.get(e.to)?.push(e.from);
    }
  });
  const visited = new Set<string>();
  const componentMap = new Map<string, number>();
  let componentIdx = 0;
  activeNodes.forEach(node => {
    if (!visited.has(node.id)) {
      const queue = [node.id];
      visited.add(node.id);
      while (queue.length > 0) {
        const curr = queue.shift()!;
        componentMap.set(curr, componentIdx);
        adjacency.get(curr)?.forEach(nb => {
          if (!visited.has(nb)) { visited.add(nb); queue.push(nb); }
        });
      }
      componentIdx++;
    }
  });
  return componentMap;
}

function getMetrics(removedIds: Set<string>) {
  const active = networkNodes.filter(n => !removedIds.has(n.id) && ['leader', 'operations', 'financier', 'operative'].includes(n.role));
  const compMap = getConnectedComponents(networkNodes, networkEdges, removedIds);
  const compCounts = new Map<number, number>();
  compMap.forEach((v) => compCounts.set(v, (compCounts.get(v) ?? 0) + 1));
  const numClusters = compCounts.size;
  const totalNodes = networkNodes.filter(n => !removedIds.has(n.id)).length;
  const activeEdges = networkEdges.filter(e => !removedIds.has(e.from) && !removedIds.has(e.to)).length;
  return { numClusters, totalNodes, activeEdges, operativeCount: active.length };
}

export function NetworkAnalyzer() {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [arrestedIds, setArrestedIds] = useState<Set<string>>(new Set());
  const [showLegend, setShowLegend] = useState(false);

  const componentMap = getConnectedComponents(networkNodes, networkEdges, arrestedIds);

  const largestComponent = (() => {
    const counts = new Map<number, number>();
    componentMap.forEach(v => counts.set(v, (counts.get(v) ?? 0) + 1));
    let maxComp = -1; let maxCount = 0;
    counts.forEach((cnt, comp) => { if (cnt > maxCount) { maxCount = cnt; maxComp = comp; } });
    return maxComp;
  })();

  const simulateArrest = useCallback((nodeId: string) => {
    setArrestedIds(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId); else next.add(nodeId);
      return next;
    });
  }, []);

  const resetArrest = () => { setArrestedIds(new Set()); setSelectedNode(null); };

  const baseMetrics = getMetrics(new Set());
  const currentMetrics = getMetrics(arrestedIds);

  const sortedByImpact = [...networkNodes]
    .filter(n => ['leader', 'operations', 'financier', 'operative'].includes(n.role))
    .sort((a, b) => b.arrestImpact - a.arrestImpact);

  return (
    <div className="p-6 space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/15 rounded-xl border border-cyan-500/30">
            <Network className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-[#e2e8f0]">Criminal Network Fragility Analyzer</h1>
            <p className="text-[#64748b] text-sm">Rajan Kumar Organized Crime Network · Click nodes to select · Click "Arrest" to simulate</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {arrestedIds.size > 0 && (
            <button onClick={resetArrest} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2744] border border-[#1e3a5f] rounded-lg text-[#94a3b8] hover:text-white text-sm">
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
          <button onClick={() => setShowLegend(!showLegend)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2744] border border-[#1e3a5f] rounded-lg text-[#94a3b8] hover:text-white text-sm">
            <Info className="w-3.5 h-3.5" /> Legend
          </button>
        </div>
      </div>

      {showLegend && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.entries(ROLE_COLORS).map(([role, cfg]) => (
            <div key={role} className="flex items-center gap-2 px-2 py-1.5 bg-[#0d1526] border border-[#1e3a5f] rounded-lg">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: cfg.stroke }} />
              <span className="text-xs text-[#94a3b8]">{cfg.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Metrics row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active Nodes', before: baseMetrics.totalNodes, after: currentMetrics.totalNodes, textClass: 'text-cyan-400', barClass: 'bg-cyan-500' },
          { label: 'Active Edges', before: baseMetrics.activeEdges, after: currentMetrics.activeEdges, textClass: 'text-amber-400', barClass: 'bg-amber-500' },
          { label: 'Network Clusters', before: baseMetrics.numClusters, after: currentMetrics.numClusters, textClass: arrestedIds.size > 0 && currentMetrics.numClusters > 1 ? 'text-red-400' : 'text-green-400', barClass: arrestedIds.size > 0 && currentMetrics.numClusters > 1 ? 'bg-red-500' : 'bg-green-500' },
          { label: 'Operatives', before: baseMetrics.operativeCount, after: currentMetrics.operativeCount, textClass: 'text-orange-400', barClass: 'bg-orange-500' },
        ].map((m) => (
          <div key={m.label} className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-3">
            <p className="text-[#64748b] text-xs uppercase tracking-wider mb-1">{m.label}</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-mono ${m.textClass}`}>{m.after}</span>
              {arrestedIds.size > 0 && m.after !== m.before && (
                <span className="text-xs text-red-400 font-mono">↓{m.before - m.after}</span>
              )}
            </div>
            {arrestedIds.size > 0 && (
              <div className="h-1 bg-[#1e3a5f] rounded-full mt-2 overflow-hidden">
                <div className={`h-full ${m.barClass} rounded-full transition-all`} style={{ width: `${(m.after / m.before) * 100}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        {/* Graph SVG */}
        <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1e3a5f] flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-[#94a3b8] text-xs font-mono">NETWORK TOPOLOGY · {networkNodes.length} NODES · {networkEdges.length} EDGES</span>
            {arrestedIds.size > 0 && (
              <span className="ml-auto text-xs text-red-400 font-mono">{arrestedIds.size} ARRESTED</span>
            )}
          </div>
          <div className="overflow-auto">
            <svg
              viewBox="0 0 800 480"
              className="w-full"
              style={{ minHeight: 340 }}
              onClick={(e) => {
                if ((e.target as SVGElement).tagName === 'svg') setSelectedNode(null);
              }}
            >
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#1e3a5f" />
                </marker>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Edges */}
              {networkEdges.map((edge) => {
                const from = networkNodes.find(n => n.id === edge.from);
                const to = networkNodes.find(n => n.id === edge.to);
                if (!from || !to) return null;
                const isActive = !arrestedIds.has(edge.from) && !arrestedIds.has(edge.to);
                const fromComp = componentMap.get(edge.from) ?? -1;
                const toComp = componentMap.get(edge.to) ?? -1;
                const isInMain = fromComp === largestComponent && toComp === largestComponent;
                return (
                  <line
                    key={edge.id}
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isActive ? (isInMain ? '#1e3a5f' : '#1e3a5f40') : '#1e3a5f20'}
                    strokeWidth={isActive ? edge.strength * 2 : 0.5}
                    strokeDasharray={isActive ? 'none' : '4 4'}
                    opacity={isActive ? 1 : 0.3}
                  />
                );
              })}

              {/* Nodes */}
              {networkNodes.map((node) => {
                const cfg = ROLE_COLORS[node.role];
                const isArrested = arrestedIds.has(node.id);
                const compIdx = componentMap.get(node.id) ?? -1;
                const isIsolated = !isArrested && compIdx !== largestComponent;
                const isSelected = selectedNode?.id === node.id;
                const opacity = isArrested ? 0.25 : isIsolated ? 0.4 : 1;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: 'pointer', opacity, transition: 'opacity 0.5s ease' }}
                    onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                  >
                    {/* Glow ring for selected */}
                    {isSelected && (
                      <circle cx={node.x} cy={node.y} r={node.radius + 8} fill="none" stroke="#f59e0b" strokeWidth="2" opacity={0.6} />
                    )}

                    {/* Pulse ring for surveillance */}
                    {node.status === 'surveillance' && !isArrested && (
                      <circle cx={node.x} cy={node.y} r={node.radius + 4} fill="none" stroke={cfg.stroke} strokeWidth="1" opacity={0.4}>
                        <animate attributeName="r" from={node.radius + 2} to={node.radius + 10} dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Main circle */}
                    <circle
                      cx={node.x} cy={node.y} r={node.radius}
                      fill={isArrested ? '#1e3a5f40' : cfg.fill}
                      stroke={isArrested ? '#64748b' : isSelected ? '#f59e0b' : cfg.stroke}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      filter={isSelected ? 'url(#glow)' : undefined}
                    />

                    {/* X for arrested */}
                    {isArrested && (
                      <>
                        <line x1={node.x - 6} y1={node.y - 6} x2={node.x + 6} y2={node.y + 6} stroke="#ef4444" strokeWidth="2" />
                        <line x1={node.x + 6} y1={node.y - 6} x2={node.x - 6} y2={node.y + 6} stroke="#ef4444" strokeWidth="2" />
                      </>
                    )}

                    {/* Betweenness indicator (filled arc) */}
                    {!isArrested && (
                      <circle
                        cx={node.x} cy={node.y}
                        r={node.radius * 0.55}
                        fill={cfg.stroke}
                        opacity={node.betweenness * 0.7}
                      />
                    )}

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + node.radius + 14}
                      textAnchor="middle"
                      fill={isArrested ? '#64748b' : cfg.text}
                      fontSize={9}
                      fontFamily="monospace"
                    >
                      {node.shortName}
                    </text>

                    {/* Impact badge for top targets */}
                    {node.betweenness > 0.5 && !isArrested && (
                      <text
                        x={node.x + node.radius - 2}
                        y={node.y - node.radius + 8}
                        textAnchor="middle"
                        fill="#f59e0b"
                        fontSize={7}
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {Math.round(node.betweenness * 100)}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="px-4 py-2 border-t border-[#1e3a5f] text-[#64748b] text-xs">
            Click a node to inspect · Numbers = betweenness score · Pulsing = under surveillance
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-3">
          {/* Selected node card */}
          {selectedNode ? (
            <div className={`bg-[#0d1526] border rounded-xl p-4 ${arrestedIds.has(selectedNode.id) ? 'border-red-500/40' : 'border-amber-500/40'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[#e2e8f0]">{selectedNode.name}</h3>
                  <p className="text-[#64748b] text-xs">{ROLE_COLORS[selectedNode.role].label}</p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  selectedNode.status === 'surveillance' ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' :
                  selectedNode.status === 'arrested' ? 'text-red-400 border-red-500/40 bg-red-500/10' :
                  selectedNode.status === 'active' ? 'text-green-400 border-green-500/40 bg-green-500/10' :
                  'text-[#64748b] border-[#1e3a5f]'
                }`}>
                  {selectedNode.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[#94a3b8] text-xs mb-3">{selectedNode.details}</p>
              {selectedNode.aliases && (
                <p className="text-[#64748b] text-xs mb-2">Aliases: {selectedNode.aliases.join(', ')}</p>
              )}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-[#070c18] rounded-lg p-2">
                  <p className="text-[#64748b] text-xs">Betweenness</p>
                  <p className="font-mono text-cyan-400">{(selectedNode.betweenness * 100).toFixed(0)}%</p>
                </div>
                <div className="bg-[#070c18] rounded-lg p-2">
                  <p className="text-[#64748b] text-xs">Arrest Impact</p>
                  <p className="font-mono text-amber-400">{selectedNode.arrestImpact}%</p>
                </div>
              </div>
              {selectedNode.fir && (
                <p className="text-xs text-[#64748b] mb-3">FIR: <span className="font-mono text-amber-400">{selectedNode.fir}</span></p>
              )}
              {['leader', 'operations', 'financier', 'operative'].includes(selectedNode.role) && (
                <button
                  onClick={() => simulateArrest(selectedNode.id)}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                    arrestedIds.has(selectedNode.id)
                      ? 'bg-[#1a2744] border border-[#1e3a5f] text-[#94a3b8] hover:text-white'
                      : 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30'
                  }`}
                >
                  {arrestedIds.has(selectedNode.id) ? '↩ Release (undo arrest)' : '⚡ Simulate Arrest'}
                </button>
              )}
            </div>
          ) : (
            <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4 text-center">
              <Crosshair className="w-8 h-8 text-[#64748b] mx-auto mb-2" />
              <p className="text-[#64748b] text-sm">Click a node to inspect</p>
            </div>
          )}

          {/* Fragility ranking */}
          <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-4">
            <h3 className="text-[#e2e8f0] text-sm mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-400" />
              Arrest Priority Ranking
            </h3>
            <div className="space-y-2">
              {sortedByImpact.map((node, rank) => {
                const isArrested = arrestedIds.has(node.id);
                return (
                  <div
                    key={node.id}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all border ${
                      isArrested ? 'border-red-500/30 bg-red-500/5' :
                      selectedNode?.id === node.id ? 'border-amber-500/40 bg-amber-500/5' :
                      'border-transparent hover:bg-[#111d33] hover:border-[#1e3a5f]'
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <span className={`text-xs font-mono w-4 flex-shrink-0 ${rank === 0 ? 'text-red-400' : rank === 1 ? 'text-orange-400' : rank === 2 ? 'text-amber-400' : 'text-[#64748b]'}`}>
                      #{rank + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs truncate ${isArrested ? 'text-[#64748b] line-through' : 'text-[#e2e8f0]'}`}>{node.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="flex-1 h-1 bg-[#1e3a5f] rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${node.arrestImpact}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-red-400 flex-shrink-0">{node.arrestImpact}%</span>
                      </div>
                    </div>
                    {isArrested && <span className="text-red-400 text-xs">✗</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact summary */}
          {arrestedIds.size > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Simulation Result
              </h3>
              <p className="text-[#94a3b8] text-xs">
                Arresting {arrestedIds.size} node(s) has split the network into{' '}
                <span className="text-red-400 font-mono">{currentMetrics.numClusters}</span> disconnected component(s).
                Network connectivity reduced by{' '}
                <span className="text-red-400 font-mono">
                  {Math.round((1 - currentMetrics.totalNodes / baseMetrics.totalNodes) * 100)}%
                </span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
