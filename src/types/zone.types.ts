export interface Zone {
  id: string;
  name: string;
  climateType: string;
  targetTempC: number | null;
  targetHumidityPtc: number | null;
  createdAt: Date;
}

export interface CreateZoneDTO {
  name: string;
  climateType: string;
  targetTempC?: number;
  targetHumidityPtc?: number;
}

export interface UpdateZoneDTO {
  name?: string;
  climateType?: string;
  targetTempC?: number;
  targetHumidityPсе?: number;
}
