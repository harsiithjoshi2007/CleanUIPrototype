import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { NarrativeDetector } from './components/NarrativeDetector';
import { NetworkAnalyzer } from './components/NetworkAnalyzer';
import { TimelineReconciler } from './components/TimelineReconciler';
import { ConversationalAI } from './components/ConversationalAI';
import { CrimePatterns } from './components/CrimePatterns';
import { OffenderProfiles } from './components/OffenderProfiles';
import { FinancialLinks } from './components/FinancialLinks';
import { Forecasting } from './components/Forecasting';
import { Governance } from './components/Governance';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'narrative', Component: NarrativeDetector },
      { path: 'network', Component: NetworkAnalyzer },
      { path: 'timeline', Component: TimelineReconciler },
      { path: 'ai', Component: ConversationalAI },
      { path: 'patterns', Component: CrimePatterns },
      { path: 'offenders', Component: OffenderProfiles },
      { path: 'financial', Component: FinancialLinks },
      { path: 'forecasting', Component: Forecasting },
      { path: 'governance', Component: Governance },
    ],
  },
]);
