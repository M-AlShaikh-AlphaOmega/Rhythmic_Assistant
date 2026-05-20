export interface BLEDevice {
  id: string;
  name: string | null;
  rssi: number | null;
}

export interface BLECharacteristic {
  serviceUUID: string;
  characteristicUUID: string;
}
