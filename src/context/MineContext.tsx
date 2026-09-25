"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  HaulTruck,
  HydraulicShovel,
  StockpileDome,
  MiningKPIs,
  DumpDestination,
} from "@/types/mine";

const INITIAL_TRUCKS: HaulTruck[] = [
  {
    id: "DT-101",
    model: "Komatsu 930E-5 (Ultra-Class)",
    payloadTons: 312,
    maxCapacityTons: 320,
    currentSpeedKmh: 26.4,
    engineRpm: 1840,
    fuelBurnLph: 182,
    tirePressurePsi: 112,
    assignedShovelId: "EX-01",
    destination: "PRIMARY_CRUSHER_1",
    status: "HAULING_LOADED",
    cycleTimeMinutes: 24.2,
    totalTripsToday: 18,
  },
  {
    id: "DT-102",
    model: "Komatsu 930E-5 (Ultra-Class)",
    payloadTons: 298,
    maxCapacityTons: 320,
    currentSpeedKmh: 24.8,
    engineRpm: 1780,
    fuelBurnLph: 176,
    tirePressurePsi: 114,
    assignedShovelId: "EX-01",
    destination: "HIGH_GRADE_DOME_A",
    status: "HAULING_LOADED",
    cycleTimeMinutes: 23.8,
    totalTripsToday: 19,
  },
  {
    id: "DT-103",
    model: "CAT 797F 400T",
    payloadTons: 0,
    maxCapacityTons: 360,
    currentSpeedKmh: 34.2,
    engineRpm: 1650,
    fuelBurnLph: 142,
    tirePressurePsi: 118,
    assignedShovelId: "EX-01",
    destination: "PRIMARY_CRUSHER_1",
    status: "EMPTY_RETURN",
    cycleTimeMinutes: 22.5,
    totalTripsToday: 21,
  },
  {
    id: "DT-104",
    model: "CAT 797F 400T",
    payloadTons: 345,
    maxCapacityTons: 360,
    currentSpeedKmh: 0.0,
    engineRpm: 1100,
    fuelBurnLph: 98,
    tirePressurePsi: 115,
    assignedShovelId: "EX-02",
    destination: "PRIMARY_CRUSHER_1",
    status: "DUMPING_CRUSHER",
    cycleTimeMinutes: 25.1,
    totalTripsToday: 17,
  },
  {
    id: "DT-105",
    model: "Komatsu 930E-5 (Ultra-Class)",
    payloadTons: 310,
    maxCapacityTons: 320,
    currentSpeedKmh: 22.1,
    engineRpm: 1820,
    fuelBurnLph: 180,
    tirePressurePsi: 111,
    assignedShovelId: "EX-02",
    destination: "MEDIUM_GRADE_DOME_B",
    status: "HAULING_LOADED",
    cycleTimeMinutes: 24.6,
    totalTripsToday: 18,
  },
  {
    id: "DT-106",
    model: "Komatsu 930E-5 (Ultra-Class)",
    payloadTons: 0,
    maxCapacityTons: 320,
    currentSpeedKmh: 4.2,
    engineRpm: 1200,
    fuelBurnLph: 110,
    tirePressurePsi: 110,
    assignedShovelId: "EX-02",
    destination: "OVERBURDEN_WASTE_DUMP",
    status: "SPOTTING_SHOVEL",
    cycleTimeMinutes: 26.0,
    totalTripsToday: 16,
  },
  {
    id: "DT-107",
    model: "CAT 797F 400T",
    payloadTons: 330,
    maxCapacityTons: 360,
    currentSpeedKmh: 18.5,
    engineRpm: 1890,
    fuelBurnLph: 195,
    tirePressurePsi: 116,
    assignedShovelId: "EX-01",
    destination: "OVERBURDEN_WASTE_DUMP",
    status: "HAULING_LOADED",
    cycleTimeMinutes: 27.4,
    totalTripsToday: 15,
  },
  {
    id: "DT-108",
    model: "Komatsu 930E-5 (Ultra-Class)",
    payloadTons: 0,
    maxCapacityTons: 320,
    currentSpeedKmh: 0.0,
    engineRpm: 0,
    fuelBurnLph: 0,
    tirePressurePsi: 95,
    assignedShovelId: "EX-01",
    destination: "PRIMARY_CRUSHER_1",
    status: "MAINTENANCE_BAY",
    cycleTimeMinutes: 0.0,
    totalTripsToday: 6,
  },
];

const INITIAL_SHOVELS: HydraulicShovel[] = [
  {
    id: "EX-01",
    model: "Komatsu PC8000-11 Loading Shovel",
    pitLocation: "North Pit Bench RL -120m",
    bucketCapacityM3: 42,
    cycleTimeSeconds: 31,
    operatingRateTph: 3650,
    targetMaterial: "SAPROLITE_HIGH_GRADE",
    assignedTrucksCount: 5,
    status: "DIGGING_ACTIVE",
  },
  {
    id: "EX-02",
    model: "CAT 6060 Hydraulic Excavator",
    pitLocation: "Central Pit Bench RL -40m",
    bucketCapacityM3: 34,
    cycleTimeSeconds: 28,
    operatingRateTph: 2840,
    targetMaterial: "LIMONITE_ORE",
    assignedTrucksCount: 3,
    status: "DIGGING_ACTIVE",
  },
];

const INITIAL_STOCKPILES: StockpileDome[] = [
  {
    id: "DOME-A",
    name: "Stockpile Dome A (High-Grade Saprolite)",
    materialType: "Saprolite Ore (Ni > 1.80%)",
    surveyedVolumeM3: 84200,
    bulkDensityTPerM3: 1.58,
    totalTonnageTons: 133036,
    moistureContentPct: 32.4,
    nickelGradeNiPct: 1.94,
    ironContentFePct: 14.8,
    silicaMagnesiaRatio: 2.05,
    targetSmelterPct: 60,
  },
  {
    id: "DOME-B",
    name: "Stockpile Dome B (Medium-Grade Limonite)",
    materialType: "Limonite Ore (Ni 1.20 - 1.50%)",
    surveyedVolumeM3: 112500,
    bulkDensityTPerM3: 1.45,
    totalTonnageTons: 163125,
    moistureContentPct: 36.2,
    nickelGradeNiPct: 1.38,
    ironContentFePct: 42.1,
    silicaMagnesiaRatio: 1.15,
    targetSmelterPct: 40,
  },
  {
    id: "DOME-C",
    name: "Stockpile Dome C (Run-Of-Mine Low Grade)",
    materialType: "Low Grade Mineralized Waste",
    surveyedVolumeM3: 65000,
    bulkDensityTPerM3: 1.62,
    totalTonnageTons: 105300,
    moistureContentPct: 29.5,
    nickelGradeNiPct: 0.95,
    ironContentFePct: 22.4,
    silicaMagnesiaRatio: 1.68,
    targetSmelterPct: 0,
  },
  {
    id: "WASTE-01",
    name: "South Waste Dump (Overburden)",
    materialType: "Barren Sandstone / Clay Overburden",
    surveyedVolumeM3: 420000,
    bulkDensityTPerM3: 1.75,
    totalTonnageTons: 735000,
    moistureContentPct: 22.0,
    nickelGradeNiPct: 0.12,
    ironContentFePct: 6.5,
    silicaMagnesiaRatio: 3.40,
    targetSmelterPct: 0,
  },
];

interface MineContextType {
  trucks: HaulTruck[];
  shovels: HydraulicShovel[];
  stockpiles: StockpileDome[];
  kpis: MiningKPIs;
  isPitHalted: boolean;
  reassignDestination: (truckId: string, dest: DumpDestination) => void;
  toggleTruckMaintenance: (truckId: string) => void;
  updateStockpileBlend: (domeId: string, newPct: number) => void;
  togglePitEmergencyHalt: () => void;
  resetToDefaults: () => void;
}

const MineContext = createContext<MineContextType | undefined>(undefined);

export const MineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trucks, setTrucks] = useState<HaulTruck[]>(INITIAL_TRUCKS);
  const [shovels] = useState<HydraulicShovel[]>(INITIAL_SHOVELS);
  const [stockpiles, setStockpiles] = useState<StockpileDome[]>(INITIAL_STOCKPILES);
  const [isPitHalted, setIsPitHalted] = useState<boolean>(false);

  // Sync from LocalStorage
  useEffect(() => {
    try {
      const savedTrucks = localStorage.getItem("mine_trucks_v1");
      const savedDomes = localStorage.getItem("mine_domes_v1");
      if (savedTrucks) setTrucks(JSON.parse(savedTrucks));
      if (savedDomes) setStockpiles(JSON.parse(savedDomes));
    } catch {
      console.warn("Storage fallback");
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("mine_trucks_v1", JSON.stringify(trucks));
    localStorage.setItem("mine_domes_v1", JSON.stringify(stockpiles));
  }, [trucks, stockpiles]);

  // Recalculate KPIs
  const activeTrucks = isPitHalted ? [] : trucks.filter((t) => t.status !== "MAINTENANCE_BAY");
  const totalDailyOre = activeTrucks.reduce((acc, t) => acc + (t.totalTripsToday * t.maxCapacityTons * 0.95), 0);
  const totalDailyWaste = Math.round(totalDailyOre * 3.4); // 3.4 BCM per Ore Ton
  const instantSR = 3.4;
  const crusherTph = isPitHalted ? 0 : 2850 + activeTrucks.length * 120;
  const totalFuel = activeTrucks.reduce((acc, t) => acc + t.fuelBurnLph, 0);

  // Calculate composite blended Ni %
  const domeA = stockpiles.find((s) => s.id === "DOME-A");
  const domeB = stockpiles.find((s) => s.id === "DOME-B");
  const blendedNi =
    ((domeA ? domeA.nickelGradeNiPct * (domeA.targetSmelterPct / 100) : 0) +
      (domeB ? domeB.nickelGradeNiPct * (domeB.targetSmelterPct / 100) : 0));

  const kpis: MiningKPIs = {
    totalDailyOreMovedTons: Math.round(totalDailyOre),
    totalDailyWasteMovedBcm: totalDailyWaste,
    instantStrippingRatio: instantSR,
    crusherFeedRateTph: crusherTph,
    activeFleetTrucksCount: activeTrucks.length,
    averageHaulCycleMins: 24.3,
    fleetFuelBurnRateTotalLph: totalFuel,
    targetNiBlendFeedPct: parseFloat(blendedNi.toFixed(2)),
  };

  const reassignDestination = (truckId: string, dest: DumpDestination) => {
    setTrucks((prev) =>
      prev.map((t) => (t.id === truckId ? { ...t, destination: dest } : t))
    );
  };

  const toggleTruckMaintenance = (truckId: string) => {
    setTrucks((prev) =>
      prev.map((t) => {
        if (t.id === truckId) {
          const isMaint = t.status === "MAINTENANCE_BAY";
          return {
            ...t,
            status: isMaint ? "HAULING_LOADED" : "MAINTENANCE_BAY",
            currentSpeedKmh: isMaint ? 24.0 : 0.0,
            engineRpm: isMaint ? 1800 : 0,
            fuelBurnLph: isMaint ? 175 : 0,
            payloadTons: isMaint ? 305 : 0,
          };
        }
        return t;
      })
    );
  };

  const updateStockpileBlend = (domeId: string, newPct: number) => {
    setStockpiles((prev) => {
      const otherId = domeId === "DOME-A" ? "DOME-B" : "DOME-A";
      const clamped = Math.max(0, Math.min(100, newPct));
      return prev.map((s) => {
        if (s.id === domeId) return { ...s, targetSmelterPct: clamped };
        if (s.id === otherId) return { ...s, targetSmelterPct: 100 - clamped };
        return s;
      });
    });
  };

  const togglePitEmergencyHalt = () => {
    setIsPitHalted((prev) => !prev);
  };

  const resetToDefaults = () => {
    setTrucks(INITIAL_TRUCKS);
    setStockpiles(INITIAL_STOCKPILES);
    setIsPitHalted(false);
    localStorage.removeItem("mine_trucks_v1");
    localStorage.removeItem("mine_domes_v1");
  };

  return (
    <MineContext.Provider
      value={{
        trucks,
        shovels,
        stockpiles,
        kpis,
        isPitHalted,
        reassignDestination,
        toggleTruckMaintenance,
        updateStockpileBlend,
        togglePitEmergencyHalt,
        resetToDefaults,
      }}
    >
      {children}
    </MineContext.Provider>
  );
};

export const useMine = () => {
  const context = useContext(MineContext);
  if (!context) throw new Error("useMine must be used within MineProvider");
  return context;
};
