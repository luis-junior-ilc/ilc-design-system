import { IlcIconName } from './ilc-icon.types';

export interface IlcIconDefinition {
  paths: readonly string[];
  circles?: readonly { cx: number; cy: number; r: number }[];
}

export const ILC_ICON_REGISTRY: Readonly<Record<IlcIconName, IlcIconDefinition>> = {
  save: { paths: ['M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z', 'M17 21v-8H7v8M7 3v5h8'] },
  edit: { paths: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z'] },
  delete: { paths: ['M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6'] },
  search: { paths: ['m20 20-4-4'], circles: [{ cx: 11, cy: 11, r: 7 }] },
  add: { paths: ['M12 5v14M5 12h14'] },
  close: { paths: ['m18 6-12 12M6 6l12 12'] },
  truck: {
    paths: ['M1 3h15v13H1z', 'M16 8h4l3 3v5h-7V8z'],
    circles: [{ cx: 5.5, cy: 18.5, r: 2.5 }, { cx: 18.5, cy: 18.5, r: 2.5 }]
  },
  package: {
    paths: ['M16.5 9.4 7.5 4.2', 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', 'M3.27 6.96 12 12.01l8.73-5.05', 'M12 22.08V12']
  },
  download: { paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'] },
  upload: { paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'] },
  filter: { paths: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'] },
  check: { paths: ['M20 6 9 17l-5-5'] },
  alert: { paths: ['M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'] },
  info: { paths: ['M12 16v-4', 'M12 8h.01'], circles: [{ cx: 12, cy: 12, r: 10 }] },
  calendar: { paths: ['M16 2v4', 'M8 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'] },
  user: { paths: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'], circles: [{ cx: 12, cy: 7, r: 4 }] },
  menu: { paths: ['M3 12h18', 'M3 6h18', 'M3 18h18'] },
  'chevron-down': { paths: ['m6 9 6 6 6-6'] },
  'chevron-right': { paths: ['m9 18 6-6-6-6'] },
  refresh: { paths: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'] },
  eye: { paths: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'], circles: [{ cx: 12, cy: 12, r: 3 }] }
};
