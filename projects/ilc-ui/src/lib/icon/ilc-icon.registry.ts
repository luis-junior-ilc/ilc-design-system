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
  close: { paths: ['m18 6-12 12M6 6l12 12'] }
};
