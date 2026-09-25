export type TruckStatus =
  | "HAULING_LOADED"
  | "DUMPING_CRUSHER"
  | "EMPTY_RETURN"
  | "SPOTTING_SHOVEL"
  | "LOADING_UNDER_SHOVEL"
  | "MAINTENANCE_BAY";

export type DumpDestination =
  | "PRIMARY_CRUSHER_1"
  | "HIGH_GRADE_DOME_A"
  | "MEDIUM_GRADE_DOME_B"
  | "OVERBURDEN_WASTE_DUMP";

export interface HaulTruck {
  id: string;
  model: string;             // Komatsu 930E-5 / CAT 797F
  payloadTons: number;       // Current cargo tons (0 - 320 tons)
  maxCapacityTons: number;   // 320 tons
  currentSpeedKmh: number;
  engineRpm: number;
  fuelBurnLph: number;       // Liters per hour
  tirePressurePsi: number;
  assignedShovelId: string;
  destination: DumpDestination;
  status: TruckStatus;
  cycleTimeMinutes: number;
  totalTripsToday: number;
}

export interface HydraulicShovel {
  id: string;
  model: string;             // PC8000-11 / CAT 6060
  pitLocation: string;       // Bench -120m RL North Pit
  bucketCapacityM3: number;  // 42 m³
  cycleTimeSeconds: number;  // 32s per pass
  operatingRateTph: number;  // Tons per hour
  targetMaterial: "SAPROLITE_HIGH_GRADE" | "LIMONITE_ORE" | "OVERBURDEN_WASTE";
  assignedTrucksCount: number;
  status: "DIGGING_ACTIVE" | "CLEANING_BENCH" | "STANDBY_NO_TRUCKS";
}

export interface StockpileDome {
  id: string;
  name: string;
  materialType: string;
  surveyedVolumeM3: number;
  bulkDensityTPerM3: number;
  totalTonnageTons: number;
  moistureContentPct: number;
  nickelGradeNiPct: number;
  ironContentFePct: number;
  silicaMagnesiaRatio: number; // SiO2/MgO ratio (Ideal: 1.8 - 2.1)
  targetSmelterPct: number;    // % blend allocation to smelter feed
}

export interface MiningKPIs {
  totalDailyOreMovedTons: number;
  totalDailyWasteMovedBcm: number;
  instantStrippingRatio: number;   // Waste BCM / Ore Ton
  crusherFeedRateTph: number;      // Tons per hour
  activeFleetTrucksCount: number;
  averageHaulCycleMins: number;
  fleetFuelBurnRateTotalLph: number;
  targetNiBlendFeedPct: number;
}
