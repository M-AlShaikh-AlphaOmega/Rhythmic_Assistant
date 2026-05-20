import { create } from 'zustand';
import type { BLEDevice } from './types';

interface BLEState {
  connectedDevice: BLEDevice | null;
  isScanning: boolean;
  setConnectedDevice: (device: BLEDevice | null) => void;
  setScanning: (scanning: boolean) => void;
}

export const useBLEStore = create<BLEState>((set) => ({
  connectedDevice: null,
  isScanning: false,
  setConnectedDevice: (device) => set({ connectedDevice: device }),
  setScanning: (scanning) => set({ isScanning: scanning }),
}));
