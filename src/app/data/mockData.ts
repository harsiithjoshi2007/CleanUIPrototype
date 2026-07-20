// Synthetic data for KSP Crime Intelligence Platform — DEMO USE ONLY

// ─── WITNESS STATEMENTS ───────────────────────────────────────────────────────

export type Claim = {
  id: string;
  category: 'time' | 'count' | 'vehicle' | 'weapon' | 'attire' | 'location' | 'duration' | 'identity';
  text: string;
  sentenceIndex: number;
  confidence: number;
};

export type WitnessStatement = {
  id: string;
  witnessName: string;
  witnessAge: number;
  relation: string;
  recordedAt: string;
  officerName: string;
  text: string;
  sentences: string[];
  claims: Claim[];
  reliabilityScore: number;
};

export const witnessStatements: WitnessStatement[] = [
  {
    id: 'ws-001',
    witnessName: 'Anita Sharma',
    witnessAge: 34,
    relation: 'Shop owner (victim)',
    recordedAt: '2024-03-15 23:45',
    officerName: 'SI Ramesh Patil',
    reliabilityScore: 0.72,
    text: `I was closing my jewellery shop at around 9:15 PM when three men entered. They came on a red motorcycle — I noticed it parked outside. All three of them were wearing black masks covering their faces completely so I could not identify any of them. One of them pointed a knife at me and demanded I open the safe. The whole incident lasted about 10 minutes. They took gold ornaments worth approximately ₹4.5 lakhs and fled towards the main road.`,
    sentences: [
      'I was closing my jewellery shop at around 9:15 PM when three men entered.',
      'They came on a red motorcycle — I noticed it parked outside.',
      'All three of them were wearing black masks covering their faces completely so I could not identify any of them.',
      'One of them pointed a knife at me and demanded I open the safe.',
      'The whole incident lasted about 10 minutes.',
      'They took gold ornaments worth approximately ₹4.5 lakhs and fled towards the main road.',
    ],
    claims: [
      { id: 'c-a1', category: 'time', text: '9:15 PM', sentenceIndex: 0, confidence: 0.75 },
      { id: 'c-a2', category: 'count', text: 'three men', sentenceIndex: 0, confidence: 0.80 },
      { id: 'c-a3', category: 'vehicle', text: 'red motorcycle', sentenceIndex: 1, confidence: 0.85 },
      { id: 'c-a4', category: 'attire', text: 'black masks (faces covered)', sentenceIndex: 2, confidence: 0.90 },
      { id: 'c-a5', category: 'weapon', text: 'knife', sentenceIndex: 3, confidence: 0.88 },
      { id: 'c-a6', category: 'duration', text: '10 minutes', sentenceIndex: 4, confidence: 0.55 },
    ],
  },
  {
    id: 'ws-002',
    witnessName: 'Ramesh Kumar',
    witnessAge: 58,
    relation: 'Passerby on street',
    recordedAt: '2024-03-16 01:20',
    officerName: 'SI Ramesh Patil',
    reliabilityScore: 0.51,
    text: `I was walking past the jewellery shop around 9:45 PM and saw two men rush out. They got into a black SUV that was waiting nearby with the engine running. I clearly saw the face of one of the men under the streetlight — he was around 28-30 years old, clean-shaven, and had a scar on his left cheek. One of them was carrying what looked like a pistol. The car sped off within 20 seconds. The whole thing happened very fast, maybe 2-3 minutes from when I saw them come out.`,
    sentences: [
      'I was walking past the jewellery shop around 9:45 PM and saw two men rush out.',
      'They got into a black SUV that was waiting nearby with the engine running.',
      'I clearly saw the face of one of the men under the streetlight — he was around 28-30 years old, clean-shaven, and had a scar on his left cheek.',
      'One of them was carrying what looked like a pistol.',
      'The car sped off within 20 seconds.',
      'The whole thing happened very fast, maybe 2-3 minutes from when I saw them come out.',
    ],
    claims: [
      { id: 'c-b1', category: 'time', text: '9:45 PM', sentenceIndex: 0, confidence: 0.60 },
      { id: 'c-b2', category: 'count', text: 'two men', sentenceIndex: 0, confidence: 0.65 },
      { id: 'c-b3', category: 'vehicle', text: 'black SUV', sentenceIndex: 1, confidence: 0.80 },
      { id: 'c-b4', category: 'attire', text: 'faces visible (no masks)', sentenceIndex: 2, confidence: 0.70 },
      { id: 'c-b5', category: 'weapon', text: 'pistol', sentenceIndex: 3, confidence: 0.65 },
      { id: 'c-b6', category: 'duration', text: '2-3 minutes (escape)', sentenceIndex: 5, confidence: 0.50 },
    ],
  },
];

export type ContradictionLevel = 'critical' | 'major' | 'minor' | 'consistent';

export type Contradiction = {
  category: string;
  claimA: string;
  claimB: string;
  level: ContradictionLevel;
  explanation: string;
  investigatorNote: string;
};

export const contradictions: Contradiction[] = [
  {
    category: 'Time of Incident',
    claimA: '9:15 PM (Witness A — shop owner, inside)',
    claimB: '9:45 PM (Witness B — passerby, outside)',
    level: 'critical',
    explanation: '30-minute discrepancy. Could indicate B witnessed departure rather than arrival, but gap is too large.',
    investigatorNote: 'Cross-reference with CCTV timestamp from nearby ATM. Shop alarm triggered at 21:22.',
  },
  {
    category: 'Number of Perpetrators',
    claimA: 'Three men (Witness A)',
    claimB: 'Two men (Witness B)',
    level: 'major',
    explanation: 'A third person may have remained inside or acted as driver. B may only have seen those who exited.',
    investigatorNote: 'Possible: third person stayed as getaway coordinator. Check SUV seating capacity footage.',
  },
  {
    category: 'Escape Vehicle',
    claimA: 'Red motorcycle (Witness A)',
    claimB: 'Black SUV (Witness B)',
    level: 'critical',
    explanation: 'Irreconcilable vehicle descriptions. Possible: motorcycle used for arrival, SUV for escape (vehicle switch).',
    investigatorNote: 'High priority. Alert traffic CCTV for both vehicles in 500m radius between 21:00–22:00.',
  },
  {
    category: 'Weapon Used',
    claimA: 'Knife (Witness A — inside shop)',
    claimB: 'Pistol (Witness B — outside)',
    level: 'major',
    explanation: 'Different weapons may have been used inside vs outside, or B misidentified under stress.',
    investigatorNote: 'Knife corroborated by victim scratch marks on counter. Pistol sighting by B is unverified.',
  },
  {
    category: 'Attire / Identification',
    claimA: 'Black masks — faces not visible (Witness A)',
    claimB: 'Face clearly visible — scar on left cheek (Witness B)',
    level: 'critical',
    explanation: 'Directly contradictory. Masks may have been removed during escape. B\'s facial description is high-value lead.',
    investigatorNote: 'B\'s description (28-30, clean-shaven, scar on left cheek) flagged for facial recognition database match.',
  },
  {
    category: 'Incident Duration',
    claimA: '~10 minutes inside shop (Witness A)',
    claimB: '2-3 minutes to escape (Witness B)',
    level: 'minor',
    explanation: 'Not directly contradictory — B only witnessed the escape phase. Consistent with A\'s account if escape was fast.',
    investigatorNote: 'Timelines can be reconciled. No conflict in underlying events.',
  },
];

// ─── CRIMINAL NETWORK ─────────────────────────────────────────────────────────

export type NodeRole = 'leader' | 'operations' | 'financier' | 'operative' | 'location' | 'financial_entity';
export type NodeStatus = 'active' | 'surveillance' | 'arrested' | 'unknown';

export type NetworkNode = {
  id: string;
  name: string;
  shortName: string;
  role: NodeRole;
  x: number;
  y: number;
  radius: number;
  betweenness: number;
  arrestImpact: number;
  status: NodeStatus;
  fir?: string;
  details: string;
  aliases?: string[];
  priority: number;
};

export type NetworkEdge = {
  id: string;
  from: string;
  to: string;
  type: 'commands' | 'funds' | 'coordinates' | 'launders' | 'operates' | 'supplies' | 'transport';
  strength: number;
  label: string;
};

export const networkNodes: NetworkNode[] = [
  { id: 'n1', name: 'Rajan Kumar', shortName: 'R.Kumar', role: 'leader', x: 395, y: 240, radius: 28, betweenness: 0.95, arrestImpact: 78, status: 'surveillance', fir: 'FIR/BGN/2024/0412', details: 'Known gang leader, 3 prior convictions. Controls all operations.', aliases: ['Raja', 'The Captain'], priority: 1 },
  { id: 'n2', name: 'Suresh Rao', shortName: 'S.Rao', role: 'operations', x: 230, y: 155, radius: 22, betweenness: 0.72, arrestImpact: 42, status: 'surveillance', fir: 'FIR/BGN/2024/0413', details: 'Operations head. Coordinates field teams and logistics.', aliases: ['Suri'], priority: 2 },
  { id: 'n3', name: 'Mohan Nair', shortName: 'M.Nair', role: 'financier', x: 560, y: 145, radius: 22, betweenness: 0.68, arrestImpact: 38, status: 'active', fir: undefined, details: 'Financial controller. Routes proceeds through shell companies.', aliases: ['The Accountant'], priority: 3 },
  { id: 'n4', name: 'Dev Reddy', shortName: 'D.Reddy', role: 'operative', x: 275, y: 350, radius: 19, betweenness: 0.54, arrestImpact: 24, status: 'active', fir: 'FIR/MYS/2023/1872', details: 'Field commander. Leads robbery squads. Prior conviction for assault.', aliases: ['Deva'], priority: 4 },
  { id: 'n5', name: 'Arun Singh', shortName: 'A.Singh', role: 'operative', x: 105, y: 90, radius: 16, betweenness: 0.21, arrestImpact: 8, status: 'unknown', fir: undefined, details: 'Arms and tools supplier. Low digital footprint.', aliases: ['Arjun'], priority: 7 },
  { id: 'n6', name: 'Priya Shah', shortName: 'P.Shah', role: 'operative', x: 600, y: 315, radius: 16, betweenness: 0.18, arrestImpact: 6, status: 'active', fir: undefined, details: 'Money mule. Transfers funds across accounts.', aliases: ['Preethi'], priority: 8 },
  { id: 'n7', name: 'Vikram Pillai', shortName: 'V.Pillai', role: 'operative', x: 120, y: 290, radius: 16, betweenness: 0.12, arrestImpact: 5, status: 'active', fir: 'FIR/BGN/2024/0198', details: 'Primary driver. Handles getaway vehicles and logistics.', aliases: ['Vicky'], priority: 9 },
  { id: 'n8', name: 'Anand Joshi', shortName: 'A.Joshi', role: 'operative', x: 445, y: 395, radius: 14, betweenness: 0.09, arrestImpact: 4, status: 'active', fir: undefined, details: 'Surveillance and lookout specialist.', aliases: ['Annu'], priority: 10 },
  { id: 'n9', name: 'Shell Corp Alpha', shortName: 'SC Alpha', role: 'financial_entity', x: 665, y: 205, radius: 18, betweenness: 0.31, arrestImpact: 18, status: 'active', fir: 'FIR/BGN/2024/0415', details: 'Registered in Bengaluru. Suspected front for laundering proceeds.', priority: 5 },
  { id: 'n10', name: 'Shell Corp Beta', shortName: 'SC Beta', role: 'financial_entity', x: 685, y: 80, radius: 14, betweenness: 0.15, arrestImpact: 7, status: 'active', fir: undefined, details: 'Secondary shell. Transfers to offshore accounts.', priority: 6 },
  { id: 'n11', name: 'Warehouse KMG', shortName: 'Warehouse', role: 'location', x: 165, y: 385, radius: 18, betweenness: 0.22, arrestImpact: 12, status: 'surveillance', fir: 'FIR/BGN/2024/0414', details: 'Koramangala warehouse. Used for storing stolen goods.', priority: 6 },
  { id: 'n12', name: 'Hotel Indiranagar', shortName: 'Hotel ING', role: 'location', x: 490, y: 100, radius: 16, betweenness: 0.19, arrestImpact: 9, status: 'active', fir: undefined, details: 'Planning meetings held in Room 302. Booked under aliases.', priority: 7 },
];

export const networkEdges: NetworkEdge[] = [
  { id: 'e1', from: 'n1', to: 'n2', type: 'commands', strength: 0.95, label: 'commands' },
  { id: 'e2', from: 'n1', to: 'n3', type: 'funds', strength: 0.90, label: 'funds' },
  { id: 'e3', from: 'n1', to: 'n4', type: 'commands', strength: 0.88, label: 'commands' },
  { id: 'e4', from: 'n1', to: 'n12', type: 'operates', strength: 0.75, label: 'meets at' },
  { id: 'e5', from: 'n2', to: 'n5', type: 'coordinates', strength: 0.80, label: 'coordinates' },
  { id: 'e6', from: 'n2', to: 'n7', type: 'transport', strength: 0.85, label: 'transport' },
  { id: 'e7', from: 'n2', to: 'n11', type: 'operates', strength: 0.78, label: 'operates from' },
  { id: 'e8', from: 'n3', to: 'n9', type: 'launders', strength: 0.92, label: 'launders via' },
  { id: 'e9', from: 'n3', to: 'n10', type: 'launders', strength: 0.78, label: 'launders via' },
  { id: 'e10', from: 'n4', to: 'n8', type: 'coordinates', strength: 0.82, label: 'coordinates' },
  { id: 'e11', from: 'n4', to: 'n6', type: 'coordinates', strength: 0.75, label: 'coordinates' },
  { id: 'e12', from: 'n6', to: 'n9', type: 'funds', strength: 0.70, label: 'routes funds' },
  { id: 'e13', from: 'n9', to: 'n10', type: 'funds', strength: 0.85, label: 'transfers to' },
  { id: 'e14', from: 'n7', to: 'n11', type: 'transport', strength: 0.72, label: 'delivers to' },
  { id: 'e15', from: 'n3', to: 'n12', type: 'funds', strength: 0.65, label: 'funds' },
];

// ─── TIMELINE EVENTS ──────────────────────────────────────────────────────────

export type TimelineSource = 'cctv' | 'phone' | 'witness' | 'digital';
export type ConflictLevel = 'none' | 'minor' | 'major' | 'critical';

export type TimelineEvent = {
  id: string;
  source: TimelineSource;
  timestamp: string;
  time: number; // minutes from 21:00 (9 PM)
  event: string;
  location: string;
  confidence: number;
  conflictsWith?: string[];
  conflictLevel: ConflictLevel;
  conflictNote?: string;
  reconciledTime?: number;
  reconciledNote?: string;
};

export const timelineEvents: TimelineEvent[] = [
  // CCTV
  { id: 't1', source: 'cctv', timestamp: '21:08', time: 8, event: 'Red motorcycle (KA-03-MX-1122) spotted on Brigade Road', location: 'Brigade Rd, 200m from shop', confidence: 0.96, conflictLevel: 'none' },
  { id: 't2', source: 'cctv', timestamp: '21:14', time: 14, event: '3 individuals in dark clothing approach MG Jewellers', location: 'MG Jewellers frontage', confidence: 0.94, conflictLevel: 'none', reconciledTime: 14, reconciledNote: 'High-confidence CCTV — sets anchor time' },
  { id: 't3', source: 'cctv', timestamp: '21:27', time: 27, event: 'Black SUV (KA-05-HB-3310) parks 60m from shop', location: 'Residency Rd side lane', confidence: 0.91, conflictLevel: 'none' },
  { id: 't4', source: 'cctv', timestamp: '21:35', time: 35, event: '2 individuals exit jewellery shop and board SUV', location: 'MG Jewellers frontage', confidence: 0.93, conflictLevel: 'minor', conflictsWith: ['t7'], conflictNote: 'Witness B reports 21:45 for this event — 10 min discrepancy' },

  // Phone Pings
  { id: 't5', source: 'phone', timestamp: '21:05', time: 5, event: 'Phone #9844-XXXX last pinged BTS tower at Church Street', location: 'Church Street BTS', confidence: 0.80, conflictLevel: 'none' },
  { id: 't6', source: 'phone', timestamp: '21:12', time: 12, event: 'Phone #9844-XXXX pings MG Road BTS (300m from shop)', location: 'MG Road BTS', confidence: 0.80, conflictLevel: 'none' },
  { id: 't7', source: 'phone', timestamp: '21:40', time: 40, event: 'Phone #9880-XXXX (unknown suspect) leaves MG Road zone', location: 'MG Road BTS', confidence: 0.75, conflictLevel: 'minor', conflictsWith: ['t4'], conflictNote: '5-min lag vs CCTV exit at 21:35. Possible phone left in vehicle.' },

  // Witness
  { id: 't8', source: 'witness', timestamp: '21:15', time: 15, event: 'Shop owner (Witness A): 3 men entered with knife. "About 9:15 PM"', location: 'MG Jewellers interior', confidence: 0.72, conflictLevel: 'critical', conflictsWith: ['t2'], conflictNote: 'Witness A recalls 21:15, CCTV shows approach at 21:14. Close match after memory bias correction.', reconciledTime: 14, reconciledNote: 'CCTV at 21:14 is authoritative. Witness 1-min recall error within acceptable range.' },
  { id: 't9', source: 'witness', timestamp: '21:45', time: 45, event: 'Witness B: "2 men ran out, got into black SUV at about 9:45 PM"', location: 'Street outside shop', confidence: 0.51, conflictLevel: 'critical', conflictsWith: ['t4'], conflictNote: 'CCTV confirms exit at 21:35. B overestimated by 10 min. Nighttime stress recall bias.', reconciledTime: 35, reconciledNote: 'Overridden by CCTV at 21:35. B\'s time rejected.' },
  { id: 't10', source: 'witness', timestamp: '21:20', time: 20, event: 'Witness A: robbery in progress — safe forced open', location: 'MG Jewellers interior', confidence: 0.70, conflictLevel: 'none', reconciledTime: 20, reconciledNote: 'Consistent with timeline. Accepted.' },

  // Digital
  { id: 't11', source: 'digital', timestamp: '21:22', time: 22, event: 'Shop alarm system triggered (silent alarm to security firm)', location: 'MG Jewellers server log', confidence: 0.99, conflictLevel: 'none', reconciledTime: 22, reconciledNote: 'System log — highest reliability. Confirms robbery in progress by 21:22.' },
  { id: 't12', source: 'digital', timestamp: '21:31', time: 31, event: 'ATM camera (Brigade Rd) captures partial plate KA-05-HB-3310', location: 'SBI ATM, Brigade Rd', confidence: 0.88, conflictLevel: 'none', reconciledTime: 31, reconciledNote: 'Confirms SUV presence. Cross-corroborates CCTV.' },
  { id: 't13', source: 'digital', timestamp: '21:48', time: 48, event: 'Control room PCR call received from passerby (Witness B)', location: 'PCR Control Room log', confidence: 0.99, conflictLevel: 'none' },
];

// ─── FINANCIAL TRANSACTIONS ───────────────────────────────────────────────────

export type FinancialNode = {
  id: string;
  name: string;
  type: 'person' | 'account' | 'business' | 'crime';
  x: number;
  y: number;
  suspicious: boolean;
};

export type FinancialEdge = {
  id: string;
  from: string;
  to: string;
  amount: number;
  date: string;
  method: string;
  suspicious: boolean;
  flagReason?: string;
};

export const financialNodes: FinancialNode[] = [
  { id: 'fn1', name: 'Rajan Kumar', type: 'person', x: 120, y: 200, suspicious: true },
  { id: 'fn2', name: 'Mohan Nair', type: 'person', x: 280, y: 120, suspicious: true },
  { id: 'fn3', name: 'Priya Shah', type: 'person', x: 280, y: 280, suspicious: true },
  { id: 'fn4', name: 'Shell Corp Alpha', type: 'business', x: 460, y: 120, suspicious: true },
  { id: 'fn5', name: 'Shell Corp Beta', type: 'business', x: 460, y: 280, suspicious: true },
  { id: 'fn6', name: 'Acct: HDFC 4***2291', type: 'account', x: 630, y: 80, suspicious: true },
  { id: 'fn7', name: 'Acct: SBI 7***8832', type: 'account', x: 630, y: 200, suspicious: true },
  { id: 'fn8', name: 'Acct: ICICI 3***5519', type: 'account', x: 630, y: 320, suspicious: false },
  { id: 'fn9', name: 'Crime Proceeds', type: 'crime', x: 120, y: 360, suspicious: true },
];

export const financialEdges: FinancialEdge[] = [
  { id: 'fe1', from: 'fn9', to: 'fn1', amount: 450000, date: '2024-03-16', method: 'Cash', suspicious: true, flagReason: 'Undeclared cash — matches stolen amount ₹4.5L' },
  { id: 'fe2', from: 'fn1', to: 'fn2', amount: 200000, date: '2024-03-17', method: 'NEFT', suspicious: true, flagReason: 'No declared transaction basis' },
  { id: 'fe3', from: 'fn1', to: 'fn3', amount: 80000, date: '2024-03-17', method: 'UPI', suspicious: true, flagReason: 'Structuring: split to avoid ₹1L threshold' },
  { id: 'fe4', from: 'fn2', to: 'fn4', amount: 190000, date: '2024-03-18', method: 'RTGS', suspicious: true, flagReason: 'No legitimate business activity found for Shell Corp' },
  { id: 'fe5', from: 'fn3', to: 'fn5', amount: 75000, date: '2024-03-19', method: 'NEFT', suspicious: true, flagReason: 'Money mule pattern: receive then immediately forward' },
  { id: 'fe6', from: 'fn4', to: 'fn6', amount: 185000, date: '2024-03-20', method: 'Wire', suspicious: true, flagReason: 'Offshore transfer. FATF high-risk jurisdiction.' },
  { id: 'fe7', from: 'fn4', to: 'fn7', amount: 5000, date: '2024-03-20', method: 'NEFT', suspicious: false },
  { id: 'fe8', from: 'fn5', to: 'fn8', amount: 70000, date: '2024-03-21', method: 'NEFT', suspicious: false },
];

// ─── OFFENDER PROFILES ────────────────────────────────────────────────────────

export type Offender = {
  id: string;
  name: string;
  age: number;
  gender: string;
  district: string;
  riskScore: number;
  convictions: number;
  activeCases: number;
  modus: string[];
  linkedFIRs: string[];
  lastKnownLocation: string;
  status: 'at-large' | 'surveillance' | 'arrested' | 'parole';
  crimeTypes: string[];
  behavioralFlags: string[];
};

export const offenders: Offender[] = [
  { id: 'o1', name: 'Rajan Kumar', age: 38, gender: 'M', district: 'Bengaluru Urban', riskScore: 94, convictions: 3, activeCases: 2, modus: ['Armed robbery', 'Team-based operations', 'Prior CCTV awareness'], linkedFIRs: ['FIR/BGN/2024/0412', 'FIR/BGN/2023/0891', 'FIR/MYS/2022/0334'], lastKnownLocation: 'Jayanagar, Bengaluru', status: 'surveillance', crimeTypes: ['Robbery', 'Extortion', 'Criminal conspiracy'], behavioralFlags: ['Organizer', 'Evades digital trails', 'Uses burner phones'] },
  { id: 'o2', name: 'Suresh Rao', age: 35, gender: 'M', district: 'Bengaluru Urban', riskScore: 82, convictions: 2, activeCases: 1, modus: ['Logistics coordinator', 'Warehouse operations', 'Vehicle procurement'], linkedFIRs: ['FIR/BGN/2024/0413', 'FIR/BGN/2022/1021'], lastKnownLocation: 'Marathahalli, Bengaluru', status: 'surveillance', crimeTypes: ['Robbery', 'Handling stolen property'], behavioralFlags: ['Secondary commander', 'Known associates in transport sector'] },
  { id: 'o3', name: 'Dev Reddy', age: 29, gender: 'M', district: 'Mysuru', riskScore: 71, convictions: 1, activeCases: 1, modus: ['Direct field operations', 'Intimidation tactics', 'Knife use'], linkedFIRs: ['FIR/MYS/2023/1872', 'FIR/BGN/2024/0412'], lastKnownLocation: 'Kengeri, Bengaluru', status: 'active', crimeTypes: ['Robbery', 'Assault', 'Theft'], behavioralFlags: ['Impulsive under pressure', 'Escalates to violence'] },
  { id: 'o4', name: 'Mohan Nair', age: 44, gender: 'M', district: 'Bengaluru Urban', riskScore: 68, convictions: 0, activeCases: 1, modus: ['Financial structuring', 'Shell company management', 'RTGS splitting'], linkedFIRs: ['FIR/BGN/2024/0415'], lastKnownLocation: 'Indiranagar, Bengaluru', status: 'active', crimeTypes: ['Money laundering', 'Financial fraud'], behavioralFlags: ['White-collar profile', 'No prior convictions', 'High financial literacy'] },
  { id: 'o5', name: 'Vikram Pillai', age: 26, gender: 'M', district: 'Bengaluru Urban', riskScore: 45, convictions: 1, activeCases: 1, modus: ['Getaway driver', 'Vehicle theft'], linkedFIRs: ['FIR/BGN/2024/0198', 'FIR/BGN/2024/0412'], lastKnownLocation: 'Rajajinagar, Bengaluru', status: 'active', crimeTypes: ['Vehicle theft', 'Aiding robbery'], behavioralFlags: ['Recruited via associates', 'Low initiative, follows orders'] },
  { id: 'o6', name: 'Kiran Hegde', age: 32, gender: 'M', district: 'Dakshina Kannada', riskScore: 61, convictions: 2, activeCases: 0, modus: ['Burglary', 'Lock bypass techniques', 'Solo operations'], linkedFIRs: ['FIR/MNG/2023/0441', 'FIR/MNG/2022/1102'], lastKnownLocation: 'Mangaluru', status: 'parole', crimeTypes: ['Burglary', 'Theft'], behavioralFlags: ['Technical skills (lockpicking)', 'On parole — high re-offense risk'] },
];

// ─── CRIME STATISTICS ─────────────────────────────────────────────────────────

export const districtCrimeData = [
  { district: 'Bengaluru Urban', robbery: 142, burglary: 89, cybercrime: 312, assault: 201, total: 744, lat: 12.97, lng: 77.59, intensity: 9.2 },
  { district: 'Mysuru', robbery: 67, burglary: 45, cybercrime: 89, assault: 112, total: 313, lat: 12.30, lng: 76.65, intensity: 6.1 },
  { district: 'Dakshina Kannada', robbery: 34, burglary: 52, cybercrime: 143, assault: 78, total: 307, lat: 12.87, lng: 74.84, intensity: 5.9 },
  { district: 'Dharwad', robbery: 45, burglary: 38, cybercrime: 62, assault: 94, total: 239, lat: 15.46, lng: 75.01, intensity: 4.7 },
  { district: 'Ballari', robbery: 56, burglary: 41, cybercrime: 28, assault: 134, total: 259, lat: 15.15, lng: 76.92, intensity: 5.1 },
  { district: 'Belagavi', robbery: 41, burglary: 33, cybercrime: 55, assault: 89, total: 218, lat: 15.85, lng: 74.50, intensity: 4.3 },
  { district: 'Tumakuru', robbery: 29, burglary: 44, cybercrime: 71, assault: 67, total: 211, lat: 13.34, lng: 77.10, intensity: 4.1 },
  { district: 'Shivamogga', robbery: 22, burglary: 31, cybercrime: 48, assault: 55, total: 156, lat: 13.93, lng: 75.56, intensity: 3.1 },
];

export const monthlyTrendData = [
  { month: 'Oct 23', robbery: 98, burglary: 72, cybercrime: 201, assault: 145 },
  { month: 'Nov 23', robbery: 112, burglary: 68, cybercrime: 224, assault: 138 },
  { month: 'Dec 23', robbery: 131, burglary: 85, cybercrime: 248, assault: 162 },
  { month: 'Jan 24', robbery: 119, burglary: 79, cybercrime: 271, assault: 148 },
  { month: 'Feb 24', robbery: 108, burglary: 71, cybercrime: 288, assault: 131 },
  { month: 'Mar 24', robbery: 127, burglary: 88, cybercrime: 312, assault: 156 },
];

// ─── FORECASTING ALERTS ───────────────────────────────────────────────────────

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export type ForecastAlert = {
  id: string;
  severity: AlertSeverity;
  title: string;
  district: string;
  crimeType: string;
  predictedTimeWindow: string;
  confidence: number;
  evidence: string[];
  recommendedActions: string[];
  trend: number; // % increase
};

export const forecastAlerts: ForecastAlert[] = [
  {
    id: 'fa1',
    severity: 'critical',
    title: 'Armed Robbery Cluster — Bengaluru South',
    district: 'Bengaluru Urban',
    crimeType: 'Armed Robbery',
    predictedTimeWindow: 'Next 7 days (Jul 20–27)',
    confidence: 0.87,
    evidence: ['4 robberies in same 2km radius in 14 days', 'Repeat use of red motorcycle (3 FIRs)', 'Target pattern: jewellery shops closing time', 'Known network active in area'],
    recommendedActions: ['Increase beat patrol 21:00–23:00 in JP Nagar', 'Alert jewellery associations for security audit', 'Set up vehicle checkpoints on Brigade Rd'],
    trend: +42,
  },
  {
    id: 'fa2',
    severity: 'high',
    title: 'Cybercrime Surge — UPI Fraud',
    district: 'Bengaluru Urban',
    crimeType: 'Cybercrime / UPI Fraud',
    predictedTimeWindow: 'Next 14 days',
    confidence: 0.79,
    evidence: ['UPI fraud complaints up 38% in 30 days', 'Linked phone numbers trace to Jharkhand cluster', 'Elderly victims targeted (60+ age group)', '3 new SIM registrations flagged'],
    recommendedActions: ['Cyber cell awareness drive in retirement communities', 'Coordinate with telecom providers for SIM monitoring', 'Fast-track complaint portal for seniors'],
    trend: +38,
  },
  {
    id: 'fa3',
    severity: 'high',
    title: 'Gang Territory Expansion — Mysuru',
    district: 'Mysuru',
    crimeType: 'Extortion / Gang Activity',
    predictedTimeWindow: 'Next 21 days',
    confidence: 0.72,
    evidence: ['2 known Bengaluru gang members seen in Mysuru (surveillance)', 'Local extortion complaint mentions outsiders', 'Pattern matches Rajan Kumar network MO'],
    recommendedActions: ['Intelligence sharing with Mysuru division', 'Monitor associate Anand Joshi movements', 'Increase presence at identified meeting spots'],
    trend: +28,
  },
  {
    id: 'fa4',
    severity: 'medium',
    title: 'Residential Burglary — Dharwad',
    district: 'Dharwad',
    crimeType: 'Burglary',
    predictedTimeWindow: 'Next 30 days',
    confidence: 0.65,
    evidence: ['5 burglaries targeting absent households', 'Weekend pattern (Fri–Sun)', 'Tool marks consistent across cases', 'One suspect description repeated across 3 FIRs'],
    recommendedActions: ['Community policing alerts to resident welfare associations', 'Deploy plainclothes in high-risk areas Fri–Sun evenings'],
    trend: +18,
  },
  {
    id: 'fa5',
    severity: 'medium',
    title: 'Vehicle Theft Uptick — Belagavi',
    district: 'Belagavi',
    crimeType: 'Vehicle Theft',
    predictedTimeWindow: 'Next 30 days',
    confidence: 0.61,
    evidence: ['14 two-wheelers reported stolen in 21 days', 'Three vehicles recovered in Maharashtra border zone', 'Possible cross-state gang activity'],
    recommendedActions: ['Coordinate with Maharashtra police at border points', 'Alert VAHAN database for swift registration checks'],
    trend: +22,
  },
  {
    id: 'fa6',
    severity: 'low',
    title: 'Seasonal Pickup in Petty Theft — Coastal Districts',
    district: 'Dakshina Kannada',
    crimeType: 'Petty Theft',
    predictedTimeWindow: 'Next 45 days',
    confidence: 0.55,
    evidence: ['Historical pattern: tourist season (Jul–Aug) correlates with 15–20% uptick', 'Increased footfall in Mangaluru market areas', 'Limited intelligence signals at this time'],
    recommendedActions: ['Seasonal beat increase in Mangaluru market zones', 'Tourist police desk activation'],
    trend: +14,
  },
];

// ─── FIR CASES ────────────────────────────────────────────────────────────────

export const firCases = [
  { id: 'FIR/BGN/2024/0412', title: 'Armed Robbery — MG Jewellers', district: 'Bengaluru Urban', date: '2024-03-15', status: 'under investigation', accused: ['Rajan Kumar', 'Unknown x2'], section: 'IPC 392, 395, 397', stage: 'charge sheet pending' },
  { id: 'FIR/BGN/2024/0413', title: 'Criminal Conspiracy — Organized Crime Network', district: 'Bengaluru Urban', date: '2024-03-16', status: 'under investigation', accused: ['Suresh Rao', 'Rajan Kumar'], section: 'IPC 120B, 420', stage: 'investigation' },
  { id: 'FIR/BGN/2024/0415', title: 'Money Laundering — Shell Companies', district: 'Bengaluru Urban', date: '2024-03-20', status: 'under investigation', accused: ['Mohan Nair', 'Shell Corp Alpha'], section: 'PMLA 2002 — Sec 3, 4', stage: 'ED referred' },
  { id: 'FIR/MYS/2023/1872', title: 'Grievous Assault — Market Brawl', district: 'Mysuru', date: '2023-11-08', status: 'charge sheet filed', accused: ['Dev Reddy'], section: 'IPC 326, 34', stage: 'trial pending' },
  { id: 'FIR/BGN/2024/0198', title: 'Vehicle Theft — Honda Activa Fleet', district: 'Bengaluru Urban', date: '2024-01-22', status: 'under investigation', accused: ['Vikram Pillai'], section: 'IPC 379, 411', stage: 'investigation' },
];

// ─── AUDIT LOG ────────────────────────────────────────────────────────────────

export const auditLog = [
  { id: 'al1', timestamp: '2024-07-20 09:14:32', user: 'SI Ramesh Patil (ID: BGN-2241)', action: 'Accessed FIR/BGN/2024/0412', module: 'Case Management', role: 'Investigator', ip: '10.0.24.51' },
  { id: 'al2', timestamp: '2024-07-20 09:18:47', user: 'SI Ramesh Patil (ID: BGN-2241)', action: 'Ran Narrative Inconsistency Detector on WS-001, WS-002', module: 'Narrative Detector', role: 'Investigator', ip: '10.0.24.51' },
  { id: 'al3', timestamp: '2024-07-20 09:31:02', user: 'Insp. Deepa Nair (ID: BGN-1809)', action: 'Accessed Network Analyzer — viewed Rajan Kumar node details', module: 'Network Analyzer', role: 'Supervisor', ip: '10.0.24.42' },
  { id: 'al4', timestamp: '2024-07-20 09:45:18', user: 'Analyst Kumar (ID: ANA-0341)', action: 'Exported Crime Pattern Report — Bengaluru Urban', module: 'Crime Patterns', role: 'Analyst', ip: '10.0.24.67' },
  { id: 'al5', timestamp: '2024-07-20 10:02:55', user: 'SI Ramesh Patil (ID: BGN-2241)', action: 'Queried Conversational AI: "Show robbery FIRs last 30 days"', module: 'Conversational AI', role: 'Investigator', ip: '10.0.24.51' },
  { id: 'al6', timestamp: '2024-07-20 10:15:30', user: 'Insp. Deepa Nair (ID: BGN-1809)', action: 'Simulated arrest of Rajan Kumar in Network Analyzer', module: 'Network Analyzer', role: 'Supervisor', ip: '10.0.24.42' },
  { id: 'al7', timestamp: '2024-07-20 10:28:11', user: 'DCP Krishnamurthy (ID: DCP-0012)', action: 'Accessed Forecasting Dashboard — reviewed critical alerts', module: 'Forecasting', role: 'Policymaker', ip: '10.0.24.10' },
  { id: 'al8', timestamp: '2024-07-20 11:04:42', user: 'Analyst Kumar (ID: ANA-0341)', action: 'Accessed Offender Profile — Mohan Nair (PII redacted for analyst role)', module: 'Offender Profiles', role: 'Analyst', ip: '10.0.24.67' },
];

// ─── CANNED AI RESPONSES ──────────────────────────────────────────────────────

export type AIResponse = {
  query: string;
  response: string;
  kannadaResponse: string;
  sources: string[];
};

export const cannedResponses: AIResponse[] = [
  {
    query: 'Show all robberies in Bengaluru Urban last month',
    response: 'Found **14 robbery FIRs** in Bengaluru Urban for March 2024. Key details:\n\n• **FIR/BGN/2024/0412** — MG Jewellers, Brigade Rd (Mar 15) — ₹4.5L lost — Under Investigation\n• **FIR/BGN/2024/0398** — Cash courier, Koramangala (Mar 12) — ₹1.2L — Charge sheet filed\n• **FIR/BGN/2024/0387** — Pharmacy, Jayanagar (Mar 09) — ₹0.8L — Under Investigation\n\n*...and 11 more cases. Avg loss per case: ₹2.1L. Primary hotspot: South Bengaluru corridors.*',
    kannadaResponse: '**14 ದರೋಡೆ ಎಫ್‌ಐಆರ್‌ಗಳು** ಬೆಂಗಳೂರು ನಗರದಲ್ಲಿ ಮಾರ್ಚ್ 2024 ರಲ್ಲಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ.\n\n• **FIR/BGN/2024/0412** — MG ಜ್ಯುವೆಲ್ಲರ್ಸ್ — ₹4.5 ಲಕ್ಷ ಕಳವು — ತನಿಖೆ ನಡೆಯುತ್ತಿದೆ\n• **FIR/BGN/2024/0398** — ಕೊರಮಂಗಲ — ₹1.2 ಲಕ್ಷ — ಆರೋಪಪಟ್ಟಿ ಸಲ್ಲಿಸಲಾಗಿದೆ\n\n*ಸರಾಸರಿ ನಷ್ಟ: ₹2.1 ಲಕ್ಷ ಪ್ರತಿ ಪ್ರಕರಣ.*',
    sources: ['Case Management DB', 'FIR Registry — Mar 2024'],
  },
  {
    query: 'Who are the repeat offenders in this network?',
    response: 'Identified **3 repeat offenders** in the Rajan Kumar criminal network:\n\n1. **Rajan Kumar** — 3 prior convictions, 2 active cases. Risk: CRITICAL (94/100)\n2. **Suresh Rao** — 2 prior convictions, 1 active case. Risk: HIGH (82/100)\n3. **Dev Reddy** — 1 prior conviction, 1 active case. Risk: MEDIUM-HIGH (71/100)\n\n*Network also includes 3 individuals with zero convictions but active financial/operational involvement (Mohan Nair, Priya Shah, Arun Singh).*',
    kannadaResponse: '**3 ಪುನರಾವರ್ತಿತ ಅಪರಾಧಿಗಳು** ರಾಜನ್ ಕುಮಾರ್ ನೆಟ್‌ವರ್ಕ್‌ನಲ್ಲಿ ಗುರುತಿಸಲಾಗಿದೆ:\n\n1. **ರಾಜನ್ ಕುಮಾರ್** — 3 ಹಿಂದಿನ ಅಪರಾಧಗಳು — ಅಪಾಯ: ವಿಮರ್ಶಾತ್ಮಕ (94/100)\n2. **ಸುರೇಶ್ ರಾವ್** — 2 ಅಪರಾಧಗಳು — ಅಪಾಯ: ಅಧಿಕ (82/100)\n3. **ದೇವ್ ರೆಡ್ಡಿ** — 1 ಅಪರಾಧ — ಅಪಾಯ: ಮಧ್ಯಮ (71/100)',
    sources: ['Offender Database', 'Criminal Network Analysis'],
  },
  {
    query: 'Summarize FIR #FIR/BGN/2024/0412',
    response: '**FIR/BGN/2024/0412 — Summary**\n\n**Incident:** Armed robbery at MG Jewellers, Brigade Road, Bengaluru\n**Date/Time:** March 15, 2024, approx. 21:14–21:35\n**Loss:** ₹4,50,000 in gold ornaments\n**Sections:** IPC 392 (Robbery), 395 (Dacoity), 397 (Robbery with harm)\n\n**Key Evidence:**\n• CCTV — 3 suspects, red motorcycle + black SUV\n• Digital log — Alarm triggered at 21:22\n• 2 witness statements (1 major contradiction: time of incident)\n\n**Status:** Under Investigation — Charge sheet pending\n**Lead Investigator:** SI Ramesh Patil (BGN-2241)\n**Accused identified:** Rajan Kumar (surveillance), 2 unidentified',
    kannadaResponse: '**FIR/BGN/2024/0412 — ಸಾರಾಂಶ**\n\n**ಘಟನೆ:** MG ಜ್ಯುವೆಲ್ಲರ್ಸ್, ಬ್ರಿಗೇಡ್ ರಸ್ತೆ, ಬೆಂಗಳೂರು — ಸಶಸ್ತ್ರ ದರೋಡೆ\n**ದಿನಾಂಕ:** ಮಾರ್ಚ್ 15, 2024, ರಾತ್ರಿ 9:14–9:35\n**ನಷ್ಟ:** ₹4,50,000 ಬಂಗಾರದ ಆಭರಣಗಳು\n\n**ಸ್ಥಿತಿ:** ತನಿಖೆ ನಡೆಯುತ್ತಿದೆ\n**ಮುಖ್ಯ ತನಿಖಾ ಅಧಿಕಾರಿ:** ಸಿ.ಐ. ರಮೇಶ್ ಪಾಟೀಲ್',
    sources: ['FIR/BGN/2024/0412', 'Evidence Register', 'CCTV Log'],
  },
  {
    query: 'Show hotspot areas for next week',
    response: '**Predicted Hotspots — Next 7 Days (Jul 20–27)**\n\n🔴 **CRITICAL — South Bengaluru (Confidence: 87%)**\nArmed robbery cluster. JP Nagar, BTM Layout, Jayanagar corridors. Likely targeting: jewellery + cash businesses, 21:00–23:00.\n\n🟠 **HIGH — North Bengaluru (Confidence: 71%)**\nUPI fraud calls. Primary target: seniors in Mathikere, RT Nagar areas.\n\n🟡 **MEDIUM — Mysuru City (Confidence: 65%)**\nGang presence noted. Commercial areas near Devaraja Market.\n\n*Predictions based on 180-day rolling pattern analysis + current intelligence signals.*',
    kannadaResponse: '**ಮುಂದಿನ 7 ದಿನಗಳ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು**\n\n🔴 **ಉಗ್ರ — ದಕ್ಷಿಣ ಬೆಂಗಳೂರು (ವಿಶ್ವಾಸ: 87%)**\nಜೆಪಿ ನಗರ, ಬಿಟಿಎಂ ಲೇಔಟ್ ಪ್ರದೇಶ. ರಾತ್ರಿ 9–11 ಅಪಾಯ ಹೆಚ್ಚಿನದು.\n\n🟠 **ಹೆಚ್ಚು — ಉತ್ತರ ಬೆಂಗಳೂರು (ವಿಶ್ವಾಸ: 71%)**\nಸೈಬರ್ ಮೋಸ ಪ್ರಕರಣಗಳು ಹೆಚ್ಚಳ.',
    sources: ['Forecasting Engine', 'Historical Pattern DB', 'Current Intelligence'],
  },
];
