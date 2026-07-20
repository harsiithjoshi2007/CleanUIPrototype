import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import {
  LayoutDashboard, FileSearch, Network, Clock, MessageSquare,
  MapPin, User, DollarSign, TrendingUp, Shield,
  ChevronLeft, ChevronRight, Bell, FlaskConical, Menu, X, ChevronDown
} from 'lucide-react';

export type Role = 'Investigator' | 'Analyst' | 'Supervisor' | 'Policymaker';

const ROLES: Role[] = ['Investigator', 'Analyst', 'Supervisor', 'Policymaker'];

const ROLE_CONFIG: Record<Role, { dot: string; name: string; initials: string }> = {
  Investigator: { dot: '#06b6d4', name: 'SI R. Patil', initials: 'RP' },
  Analyst:      { dot: '#f59e0b', name: 'Analyst A. Kumar', initials: 'AK' },
  Supervisor:   { dot: '#22c55e', name: 'Insp. D. Nair', initials: 'DN' },
  Policymaker:  { dot: '#ef4444', name: 'DCP Krishnamurthy', initials: 'KM' },
};

const NAV_SECTIONS = [
  {
    label: null,
    items: [
      { path: '/', label: 'Command Center', icon: LayoutDashboard },
    ],
  },
  {
    label: 'HERO DEMOS',
    items: [
      { path: '/narrative', label: 'Narrative Detector', icon: FileSearch, hero: true },
      { path: '/network',   label: 'Network Analyzer',  icon: Network,     hero: true },
      { path: '/timeline',  label: 'Timeline Reconciler', icon: Clock,     hero: true },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { path: '/ai',        label: 'Conversational AI',   icon: MessageSquare },
      { path: '/patterns',  label: 'Crime Patterns',      icon: MapPin },
      { path: '/offenders', label: 'Offender Profiles',   icon: User },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { path: '/financial',   label: 'Financial Links', icon: DollarSign },
      { path: '/forecasting', label: 'Forecasting',     icon: TrendingUp },
      { path: '/governance',  label: 'Governance',      icon: Shield },
    ],
  },
];

const PAGE_META: Record<string, { title: string; section: string }> = {
  '/':           { title: 'Command Center',               section: 'Overview' },
  '/narrative':  { title: 'Narrative Inconsistency Detector', section: 'Hero Demo · 1 of 3' },
  '/network':    { title: 'Criminal Network Analyzer',    section: 'Hero Demo · 2 of 3' },
  '/timeline':   { title: 'Forensic Timeline Reconciler', section: 'Hero Demo · 3 of 3' },
  '/ai':         { title: 'Conversational Intelligence',  section: 'Intelligence' },
  '/patterns':   { title: 'Crime Pattern Analysis',       section: 'Intelligence' },
  '/offenders':  { title: 'Offender Profiling',           section: 'Intelligence' },
  '/financial':  { title: 'Financial Link Analysis',      section: 'Operations' },
  '/forecasting':{ title: 'Early Warning System',         section: 'Operations' },
  '/governance': { title: 'Governance & Audit',           section: 'Operations' },
};

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole]           = useState<Role>('Investigator');
  const [roleOpen, setRoleOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const page = PAGE_META[location.pathname] ?? { title: 'KSP Intel', section: '' };
  const rc   = ROLE_CONFIG[role];

  return (
    <div
      className="flex h-screen w-screen overflow-hidden text-[#e2e8f0]"
      style={{ background: '#04070f' }}
    >
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────────────── */}
      <aside
        className={`fixed lg:relative z-40 h-full flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${collapsed ? 'w-[68px]' : 'w-[236px]'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: 'linear-gradient(180deg,#070d1c 0%,#04070f 100%)', borderRight: '1px solid #0f1e35' }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid #0f1e35' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow: '0 0 24px rgba(245,158,11,0.25)' }}
          >
            <Shield className="w-5 h-5 text-black" />
          </div>
          {!collapsed && (
            <div className="min-w-0 overflow-hidden">
              <div style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', lineHeight: 1 }}>
                KSP INTEL
              </div>
              <div style={{ color: '#2d3f5a', fontSize: '10px', letterSpacing: '0.04em', marginTop: 4 }}>
                Crime Intelligence · v2.4
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-5 px-2.5 space-y-5">
          {NAV_SECTIONS.map((section, si) => (
            <div key={si} className="space-y-0.5">
              {section.label && !collapsed && (
                <div style={{ color: '#1e3050', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', paddingLeft: '10px', marginBottom: '8px' }}>
                  {section.label}
                </div>
              )}
              {section.items.map((item) => {
                const Icon    = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg transition-all duration-150 group relative"
                    style={isActive
                      ? {
                          background: 'linear-gradient(90deg,rgba(245,158,11,0.14),rgba(245,158,11,0.04))',
                          borderLeft: '2px solid #f59e0b',
                          paddingLeft: '10px',
                          paddingRight: '12px',
                          paddingTop: '9px',
                          paddingBottom: '9px',
                          color: '#fbbf24',
                        }
                      : {
                          paddingLeft: '12px',
                          paddingRight: '12px',
                          paddingTop: '9px',
                          paddingBottom: '9px',
                          color: '#3d5273',
                        }
                    }
                  >
                    {({ isActive: _ }) => (
                      <>
                        <Icon
                          className="flex-shrink-0"
                          style={{ width: 16, height: 16, color: isActive ? '#f59e0b' : '#3d5273' }}
                        />
                        {!collapsed && (
                          <>
                            <span style={{ fontSize: '12.5px', flex: 1, color: isActive ? '#fbbf24' : '#6b82a0' }}>
                              {item.label}
                            </span>
                            {'hero' in item && item.hero && (
                              <span style={{ fontSize: '9px', padding: '1px 5px', background: 'rgba(245,158,11,0.12)', color: '#d97706', borderRadius: 3, border: '1px solid rgba(245,158,11,0.22)', fontFamily: 'monospace' }}>
                                ★
                              </span>
                            )}
                          </>
                        )}
                        {collapsed && (
                          <div
                            className="absolute left-full ml-3 px-3 py-1.5 rounded-lg whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl"
                            style={{ background: '#0d1a2e', border: '1px solid #1a2e4a', color: '#e2e8f0', fontSize: '12px' }}
                          >
                            {item.label}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* System status */}
        {!collapsed && (
          <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid #0f1e35' }}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span style={{ color: '#1a5c32', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                ALL SYSTEMS ONLINE
              </span>
            </div>
          </div>
        )}

        {/* Collapse button */}
        <div className="flex-shrink-0 px-2.5 py-3" style={{ borderTop: '1px solid #0a1220' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-2 rounded-lg transition-all hover:bg-[#0a1628]"
            style={{ color: '#1e3050' }}
          >
            {collapsed
              ? <ChevronRight style={{ width: 14, height: 14 }} />
              : <ChevronLeft  style={{ width: 14, height: 14 }} />
            }
          </button>
        </div>
      </aside>

      {/* ── Main area ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header
          className="flex-shrink-0 h-[56px] flex items-center px-6 gap-4"
          style={{ background: '#070d1c', borderBottom: '1px solid #0f1e35' }}
        >
          {/* Mobile hamburger */}
          <button className="lg:hidden" style={{ color: '#3d5273' }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          </button>

          {/* Breadcrumb title */}
          <div className="flex items-center gap-2 min-w-0">
            {page.section && (
              <>
                <span style={{ color: '#253750', fontSize: '11px', letterSpacing: '0.04em' }}>{page.section}</span>
                <span style={{ color: '#0f1e35', fontSize: '13px' }}>/</span>
              </>
            )}
            <span style={{ color: '#c8d6e8', fontSize: '13px', fontWeight: 500 }}>{page.title}</span>
          </div>

          {/* Synthetic data badge */}
          <div
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full ml-2"
            style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.14)' }}
          >
            <FlaskConical style={{ width: 11, height: 11, color: '#92700a' }} />
            <span style={{ color: '#92700a', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
              SIMULATED AI · SYNTHETIC DATA
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Live pulse */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span style={{ color: '#1a5c32', fontSize: '10px', fontFamily: 'monospace' }}>LIVE</span>
            </div>

            {/* Notifications */}
            <button
              className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-[#0a1628]"
              style={{ color: '#3d5273' }}
            >
              <Bell style={{ width: 15, height: 15 }} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            {/* Divider */}
            <div className="w-px h-5" style={{ background: '#0f1e35' }} />

            {/* Role switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleOpen(!roleOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-[#0a1628]"
                style={{ border: '1px solid #0f1e35' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: rc.dot }} />
                <span style={{ color: '#7a90aa', fontSize: '11.5px' }}>{role}</span>
                <ChevronDown style={{ width: 11, height: 11, color: '#253750' }} />
              </button>

              {roleOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setRoleOpen(false)} />
                  <div
                    className="absolute right-0 top-full mt-1.5 w-44 rounded-xl py-1 z-50 shadow-2xl"
                    style={{ background: '#0a1628', border: '1px solid #142035' }}
                  >
                    {ROLES.map((r) => (
                      <button
                        key={r}
                        onClick={() => { setRole(r); setRoleOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left transition-all hover:bg-[#0f1e35]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: ROLE_CONFIG[r].dot }} />
                        <span style={{ color: r === role ? '#e2e8f0' : '#3d5273', fontSize: '12px' }}>{r}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono"
                style={{ background: '#0a1628', border: '1px solid #142035', color: rc.dot, fontSize: '11px' }}
              >
                {rc.initials}
              </div>
              <div className="hidden md:block">
                <div style={{ fontSize: '12px', color: '#c8d6e8', lineHeight: 1.3 }}>{rc.name}</div>
                <div style={{ fontSize: '10px', color: '#253750', lineHeight: 1.3 }}>{role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto" style={{ background: '#04070f' }}>
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  );
}
