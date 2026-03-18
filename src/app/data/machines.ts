export interface Machine {
  id: string;
  name: string;
  status: 'Running' | 'Stopped' | 'Warning';
  temperature: number;
  power: number;
  production: number;
  location: string;
  lastMaintenance: string;
}

export const machines: Machine[] = [
  {
    id: 'M-001',
    name: 'CNC Machine 01',
    status: 'Running',
    temperature: 72.5,
    power: 485,
    production: 1247,
    location: 'Floor A - Section 1',
    lastMaintenance: '2026-03-10',
  },
  {
    id: 'M-002',
    name: 'CNC Machine 02',
    status: 'Running',
    temperature: 68.3,
    power: 452,
    production: 1189,
    location: 'Floor A - Section 1',
    lastMaintenance: '2026-03-12',
  },
  {
    id: 'M-003',
    name: 'Lathe Machine 01',
    status: 'Warning',
    temperature: 85.2,
    power: 523,
    production: 892,
    location: 'Floor A - Section 2',
    lastMaintenance: '2026-02-28',
  },
  {
    id: 'M-004',
    name: 'Milling Machine 01',
    status: 'Running',
    temperature: 71.8,
    power: 498,
    production: 1305,
    location: 'Floor B - Section 1',
    lastMaintenance: '2026-03-15',
  },
  {
    id: 'M-005',
    name: 'Press Machine 01',
    status: 'Stopped',
    temperature: 45.0,
    power: 0,
    production: 0,
    location: 'Floor B - Section 2',
    lastMaintenance: '2026-03-05',
  },
  {
    id: 'M-006',
    name: 'Welding Robot 01',
    status: 'Running',
    temperature: 76.4,
    power: 512,
    production: 967,
    location: 'Floor C - Section 1',
    lastMaintenance: '2026-03-08',
  },
  {
    id: 'M-007',
    name: 'Assembly Line 01',
    status: 'Running',
    temperature: 65.2,
    power: 445,
    production: 1423,
    location: 'Floor C - Section 2',
    lastMaintenance: '2026-03-14',
  },
  {
    id: 'M-008',
    name: 'Packaging Unit 01',
    status: 'Warning',
    temperature: 82.7,
    power: 478,
    production: 1156,
    location: 'Floor C - Section 3',
    lastMaintenance: '2026-03-01',
  },
];

export const generateMachineData = (machineId: string) => {
  const baseValue = Math.random() * 50 + 40;
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    temperature: baseValue + Math.random() * 20 - 10,
    power: 400 + Math.random() * 200,
    production: Math.floor(Math.random() * 100) + 20,
  }));
};
