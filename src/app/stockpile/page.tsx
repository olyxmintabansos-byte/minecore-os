"use client";

import React from "react";
import { useMine } from "@/context/MineContext";
import { formatNumber } from "@/lib/utils";
import {
  Layers,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  Box,
  Compass,
} from "lucide-react";

export default function StockpilePage() {
  const { stockpiles, kpis, updateStockpileBlend } = useMine();

  const domeA = stockpiles.find((s) => s.id === "DOME-A");
  const domeB = stockpiles.find((s) => s.id === "DOME-B");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Stockpile Dome Volumetrics &amp; Smelter Feed Ore Blending Desk
          </h2>
          <p className="text-xs text-slate-400">
            Survei fotogrametri/LiDAR volume kubik, densitas bulk, serta kalkulator pencampuran bijih nikel (Ni, Fe, SiO2/MgO)
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-amber-900/40 px-3 py-1.5 rounded-lg text-xs font-mono">
          <span className="text-slate-400">SMELTER TARGET FEED:</span>
          <span className="font-bold text-emerald-400 text-sm">
            {kpis.targetNiBlendFeedPct}% Ni (RKEF Spek)
          </span>
        </div>
      </div>

      {/* 4 Stockpiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stockpiles.map((dome) => (
          <div
            key={dome.id}
            className="p-5 rounded-xl bg-slate-900/80 border border-amber-900/40 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-amber-400" />
                  <h3 className="font-mono font-bold text-sm text-slate-100">{dome.name}</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{dome.materialType}</p>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 border border-amber-700/40 text-amber-300 font-bold">
                {dome.totalTonnageTons > 0 ? "SURVEY ACTIVE" : "EMPTY"}
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500">SURVEY VOLUME</span>
                <p className="font-bold text-cyan-400">{formatNumber(dome.surveyedVolumeM3, 0)} m³</p>
              </div>
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500">BULK DENSITY</span>
                <p className="font-bold text-slate-200">{dome.bulkDensityTPerM3} t/m³</p>
              </div>
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500">TOTAL TONNAGE</span>
                <p className="font-bold text-amber-400">{formatNumber(dome.totalTonnageTons, 0)} T</p>
              </div>
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500">MOISTURE (MC)</span>
                <p className="font-bold text-blue-400">{dome.moistureContentPct}%</p>
              </div>
            </div>

            {/* Assay Chemical Quality */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Nickel Grade (Ni):</span>
                <span className="font-bold text-amber-400">{dome.nickelGradeNiPct}% Ni</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Iron Content (Fe):</span>
                <span className="font-bold text-orange-400">{dome.ironContentFePct}% Fe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Silica-Magnesia Ratio (S/M):</span>
                <span className="font-bold text-emerald-400">{dome.silicaMagnesiaRatio} (Ideal: 1.8 - 2.1)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Smelter Feed Ore Blending Studio */}
      <div className="p-6 rounded-xl bg-slate-900/80 border border-amber-900/40 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-mono font-bold text-sm text-slate-100">
                RKEF Rotary Kiln Electric Furnace - Ore Blending Solver
              </h3>
              <p className="text-xs text-slate-400">
                Sesuaikan proporsi rasio pencampuran Saprolite (Dome A) dan Limonite (Dome B) untuk memenuhi standar slag smelter
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-600/40 text-emerald-300 font-mono text-xs font-bold">
            SLAG VISCOSITY OPTIMAL
          </span>
        </div>

        {/* Blending Sliders */}
        <div className="space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Dome A (High-Grade Saprolite) Allocation:
              </span>
              <span className="font-bold text-amber-400 text-sm">{domeA?.targetSmelterPct || 60}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={domeA?.targetSmelterPct || 60}
              onChange={(e) => updateStockpileBlend("DOME-A", parseInt(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-2 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Dome B (Medium-Grade Limonite) Allocation:
              </span>
              <span className="font-bold text-cyan-400 text-sm">{domeB?.targetSmelterPct || 40}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={domeB?.targetSmelterPct || 40}
              onChange={(e) => updateStockpileBlend("DOME-B", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-2 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Resulting Blend Output Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/60 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div>
            <span className="text-slate-500">BLENDED COMPOSITE Ni:</span>
            <p className="text-xl font-bold text-amber-400 mt-1">{kpis.targetNiBlendFeedPct}% Ni</p>
            <p className="text-[10px] text-slate-500">Target Range: 1.70% - 1.80% Ni</p>
          </div>
          <div>
            <span className="text-slate-500">COMPOSITE Fe CONTENT:</span>
            <p className="text-xl font-bold text-orange-400 mt-1">
              {(
                ((domeA ? domeA.ironContentFePct * (domeA.targetSmelterPct / 100) : 0) +
                  (domeB ? domeB.ironContentFePct * (domeB.targetSmelterPct / 100) : 0))
              ).toFixed(1)}
              % Fe
            </p>
            <p className="text-[10px] text-slate-500">Target Max: &lt; 25.0% Fe</p>
          </div>
          <div>
            <span className="text-slate-500">SILICA/MAGNESIA RATIO:</span>
            <p className="text-xl font-bold text-emerald-400 mt-1">
              {(
                ((domeA ? domeA.silicaMagnesiaRatio * (domeA.targetSmelterPct / 100) : 0) +
                  (domeB ? domeB.silicaMagnesiaRatio * (domeB.targetSmelterPct / 100) : 0))
              ).toFixed(2)}
            </p>
            <p className="text-[10px] text-slate-500">Ideal Refractory Index: 1.85 - 2.10</p>
          </div>
        </div>
      </div>
    </div>
  );
}
