export interface Zone {
  id: string;
  name: string;
  climateType: string;
  targetTempC: number | null;
  targetHumidityPсt: number | null;
  createdAt: Date;
}

export interface CreateZoneDTO {
  name: string;
  climateType: string;
  targetTempC?: number;
  targetHumidityPсt?: number;
}

export interface UpdateZoneDTO {
  name?: string;
  climateType?: string;
  targetTempC?: number;
  targetHumidityPсt?: number;
}
