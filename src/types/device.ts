export interface Device {
  id?: string;
  name?: string;
  mobileNumber?: string;
  lastConnection?: string;
  latitude?: number;
  longitude?: number;
}

export type Coordinates = [number, number];
