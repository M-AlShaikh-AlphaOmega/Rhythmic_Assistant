import { useBLEStore } from '../store';

// Phase 2: implement scanning & streaming via react-native-ble-plx
// Requires EAS custom dev client — will not work in Expo Go
export function useBLE() {
  const { connectedDevice, isScanning, setScanning, setConnectedDevice } =
    useBLEStore();

  return {
    connectedDevice,
    isScanning,
    startScan: () => setScanning(true),
    stopScan: () => setScanning(false),
    disconnect: () => setConnectedDevice(null),
  };
}
