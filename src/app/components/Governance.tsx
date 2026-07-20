import { useState } from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2, AlertTriangle, User, Filter } from 'lucide-react';
import { auditLog } from '../data/mockData';

type Role = 'Investigator' | 'Analyst' | 'Supervisor' | 'Policymaker';

const PERMISSIONS: Record<string, Partial<Record<Role, boolean | 'redacted'>>> = {
  'View FIR Details': { Investigator: true, Analyst: 'redacted', Supervisor: true, Policymaker: 'redacted' },
  'View Accused PII': { Investigator: true, Analyst: false, Supervisor: true, Policymaker: false },
  'Narrative Detector': { Investigator: true, Analyst: true, Supervisor: true, Policymaker: false },
  'Network Analyzer': { Investigator: true, Analyst: true, Supervisor: true, Policymaker: false },
  'Simulate Arrest': { Investigator: false, Analyst: false, Supervisor: true, Policymaker: false },
  'Financial Link Analysis': { Investigator: true, Analyst: 'redacted', Supervisor: true, Policymaker: true },
  'Forecasting Dashboard': { Investigator: false, Analyst: true, Supervisor: true, Policymaker: true },
  'Export Reports': { Investigator: false, Analyst: true, Supervisor: true, Policymaker: true },
  'Audit Log Access': { Investigator: false, Analyst: false, Supervisor: true, Policymaker: false },
  'Governance Settings': { Investigator: false, Analyst: false, Supervisor: false, Policymaker: true },
};

const ROLES: Role[] = ['Investigator', 'Analyst', 'Supervisor', 'Policymaker'];

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  Investigator: 'Field investigators. Access to case files, FIRs, network analysis. PII visible.',
  Analyst: 'Data analysts. Read access to patterns and exports. PII redacted.',
  Supervisor: 'Station/unit supervisors. Full operational access including arrest simulation.',
  Policymaker: 'Senior officers & DCP. Strategic dashboards and forecasting. No PII access.',
};

const ROLE_COLORS: Record<Role, string> = {
  Investigator: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
  Analyst: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
  Supervisor: 'text-green-400 bg-green-500/15 border-green-500/30',
  Policymaker: 'text-red-400 bg-red-500/15 border-red-500/30',
};

function PermCell({ value }: { value: boolean | 'redacted' | undefined }) {
  if (value === true) return <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />;
  if (value === 'redacted') return (
    <div className="flex items-center justify-center gap-1 text-[10px] text-amber-400 font-mono">
      <Eye className="w-3 h-3" />REDACTED
    </div>
  );
  return <Lock className="w-3.5 h-3.5 text-[#1e3a5f] mx-auto" />;
}

const COMPLIANCE_BADGES = [
  { label: 'IT Act 2000', desc: 'Data handling compliance', status: 'compliant' },
  { label: 'PDPB 2023', desc: 'Personal data protection', status: 'compliant' },
  { label: 'CrPC 160–176', desc: 'Investigation procedure', status: 'compliant' },
  { label: 'PMLA 2002', desc: 'Financial investigation protocol', status: 'warning' },
  { label: 'RTI Framework', desc: 'Information access protocol', status: 'compliant' },
  { label: 'CCTNS Standard', desc: 'Crime network system spec', status: 'compliant' },
];

export function Governance() {
  const [activeTab, setActiveTab] = useState<'access' | 'audit' | 'compliance'>('access');
  const [activeRole, setActiveRole] = useState<Role>('Investigator');

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-[#1a2744] rounded-xl border border-[#2a4a7f]">
          <Shield className="w-6 h-6 text-[#94a3b8]" />
        </div>
        <div>
          <h1 className="text-[#e2e8f0]">Governance, RBAC & Audit</h1>
          <p className="text-[#64748b] text-sm">Role-based access control · Audit trail · Compliance dashboard</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-1 w-fit">
        {(['access', 'audit', 'compliance'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm capitalize transition-all ${activeTab === tab ? 'bg-[#1a2744] text-[#e2e8f0]' : 'text-[#64748b] hover:text-[#94a3b8]'}`}
          >
            {tab === 'access' ? 'Access Control' : tab === 'audit' ? 'Audit Log' : 'Compliance'}
          </button>
        ))}
      </div>

      {activeTab === 'access' && (
        <div className="space-y-4">
          {/* Role cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ROLES.map(role => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`text-left p-4 rounded-xl border transition-all ${activeRole === role ? 'ring-1 ring-amber-500/40' : ''} ${ROLE_COLORS[role]}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-semibold">{role}</span>
                </div>
                <p className="text-[#64748b] text-xs leading-relaxed">{ROLE_DESCRIPTIONS[role]}</p>
              </button>
            ))}
          </div>

          {/* Permission matrix */}
          <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1e3a5f] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#64748b]" />
              <span className="text-[#94a3b8] text-xs font-mono">PERMISSION MATRIX</span>
              <span className="ml-auto text-xs text-[#64748b]">Highlighted: {activeRole}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e3a5f]">
                    <th className="text-left px-4 py-3 text-[#64748b] text-xs">Feature / Module</th>
                    {ROLES.map(role => (
                      <th key={role} className={`text-center px-3 py-3 text-xs font-mono ${activeRole === role ? ROLE_COLORS[role].split(' ')[0] : 'text-[#64748b]'}`}>
                        {role}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(PERMISSIONS).map(([feature, perms]) => (
                    <tr
                      key={feature}
                      className={`border-b border-[#1e3a5f] transition-colors ${perms[activeRole] ? 'bg-[#111d33]/50' : ''} hover:bg-[#111d33]`}
                    >
                      <td className="px-4 py-2.5 text-xs text-[#94a3b8]">{feature}</td>
                      {ROLES.map(role => (
                        <td key={role} className={`px-3 py-2.5 text-center ${activeRole === role ? 'bg-[#111d33]' : ''}`}>
                          <PermCell value={perms[role]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-[#1e3a5f] flex items-center gap-4 text-[10px] text-[#64748b]">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-400" /> Full access</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-amber-400" /> Redacted view</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#1e3a5f]" /> No access</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1e3a5f] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#64748b]" />
            <span className="text-[#94a3b8] text-xs font-mono">AUDIT LOG — 2024-07-20</span>
            <span className="ml-auto text-xs text-[#64748b]">{auditLog.length} entries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  {['Timestamp', 'User', 'Role', 'Module', 'Action', 'IP'].map(h => (
                    <th key={h} className="text-left px-4 py-2 text-[#64748b] font-mono">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry) => (
                  <tr key={entry.id} className="border-b border-[#1e3a5f] hover:bg-[#111d33] transition-colors">
                    <td className="px-4 py-2.5 font-mono text-[#64748b] whitespace-nowrap">{entry.timestamp}</td>
                    <td className="px-4 py-2.5 text-[#94a3b8] whitespace-nowrap">{entry.user}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${ROLE_COLORS[entry.role as Role]}`}>
                        {entry.role}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-amber-400 font-mono whitespace-nowrap">{entry.module}</td>
                    <td className="px-4 py-2.5 text-[#94a3b8]">{entry.action}</td>
                    <td className="px-4 py-2.5 font-mono text-[#64748b]">{entry.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMPLIANCE_BADGES.map(badge => (
              <div
                key={badge.label}
                className={`p-4 rounded-xl border ${badge.status === 'compliant' ? 'bg-green-500/5 border-green-500/30' : 'bg-amber-500/5 border-amber-500/30'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold ${badge.status === 'compliant' ? 'text-green-400' : 'text-amber-400'}`}>
                    {badge.label}
                  </span>
                  {badge.status === 'compliant'
                    ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                    : <AlertTriangle className="w-4 h-4 text-amber-400" />
                  }
                </div>
                <p className="text-[#64748b] text-xs">{badge.desc}</p>
                <div className={`mt-2 text-[10px] font-mono px-2 py-0.5 rounded inline-block ${badge.status === 'compliant' ? 'text-green-400 bg-green-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                  {badge.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0d1526] border border-[#1e3a5f] rounded-xl p-5">
            <h3 className="text-[#e2e8f0] text-sm mb-3">Data Handling Principles</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { principle: 'Minimal Data Access', desc: 'Users access only the data required for their role. PII redacted for non-investigator roles.' },
                { principle: 'Audit Every Action', desc: 'All data access and AI-driven actions are logged with user identity, timestamp, and IP.' },
                { principle: 'Explainable AI', desc: 'Every AI insight includes source citations, confidence levels, and evidence chains.' },
                { principle: 'Synthetic Demo Data', desc: 'This prototype uses entirely synthetic data. No real accused persons or victims are referenced.' },
              ].map(p => (
                <div key={p.principle} className="p-3 bg-[#070c18] border border-[#1e3a5f] rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-[#e2e8f0] text-sm">{p.principle}</span>
                  </div>
                  <p className="text-[#64748b] text-xs">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
