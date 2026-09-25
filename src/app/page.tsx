"use client";

import React from "react";
import { useMine } from "@/context/MineContext";
import { PitElevationCanvas } from "@/components/PitElevationCanvas";
import { formatNumber } from "@/lib/utils";
import {
  Truck,
  Fuel,
  Activity,
  Gauge,
  AlertTriangle,
  RotateCw,
  Layers,
  Wrench,
  CheckCircle,
} from "lucide-react";
import { DumpDestination } from "@/types/mine";

export default function FleetDispatchPage() {
  const {
    trucks,
    kpis,
    isPitHalted,
    reassignDestination,
    toggleTruckMaintenance,
  } = useMine();

  const destinationOptions: { label: string; value: DumpDestination }[] = [
    { label: "Primary Crusher 1", value: "PRIMARY_CRUSHER_1" },
    { label: "High-Grade Dome A", value: "HIGH_GRADE_DOME_A" },
    { label: "Medium-Grade Dome B", value: "MEDIUM_GRADE_DOME_B" },
    { label: "Overburden Waste Dump", value: "OVERBURDEN_WASTE_DUMP" },
  ];

  return (
    <div className="space-y-6">
      {/* Pit Emergency Banner */}
      {isPitHalted && (
        <div className="p-4 rounded-xl bg-rose-950/80 border-2 border-rose-600 text-rose-200 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-rose-400" />
            <div>
              <h2 className="text-base font-bold font-mono uppercase tracking-wide">
                PIT MUSTER &amp; LIGHTNING WARNING ACTIVE
              </h2>
              <p className="text-xs text-rose-300">
                Semua truk pengangkut diperintahkan menepi di ramp terdekat. Kecepatan haul dibatasi 0 km/jam.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-rose-900 font-mono text-xs font-bold uppercase">
            PIT HALTED
          </span>
        </div>
      )}

      {/* Mining KPIs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Daily Ore Production</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-amber-400">
              {formatNumber(kpis.totalDailyOreMovedTons, 0)}
            </span>
            <span className="text-xs font-mono text-slate-400">TONS</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">Target: 35.000 Tons/Day (78% Hit)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overburden Stripping</span>
            <Gauge className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-orange-400">
              {formatNumber(kpis.totalDailyWasteMovedBcm, 0)}
            </span>
            <span className="text-xs font-mono text-slate-400">BCM</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">Ratio 1:{kpis.instantStrippingRatio} BCM/Ton</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Primary Crusher Feed</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-emerald-400">
              {formatNumber(kpis.crusherFeedRateTph, 0)}
            </span>
            <span className="text-xs font-mono text-slate-400">TPH</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">Gyratory Crusher 60-89 Mk-II</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Fleet Fuel Burn</span>
            <Fuel className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-cyan-400">
              {formatNumber(kpis.fleetFuelBurnRateTotalLph, 0)}
            </span>
            <span className="text-xs font-mono text-slate-400">L / HR</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">
            {kpis.activeFleetTrucksCount} of 8 Trucks Hauling
          </p>
        </div>
      </div>

      {/* 60 FPS Real-time Pit Elevation Contour Canvas */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              Open-Pit Haul Road Elevation Profile &amp; Ramp Gradient (60 FPS Telemetry)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Topography: Bench RL -120m to +85m Surface</span>
        </div>
        <PitElevationCanvas
          activeTrucksCount={kpis.activeFleetTrucksCount}
          crusherFeedTph={kpis.crusherFeedRateTph}
          isPitHalted={isPitHalted}
        />
      </div>

      {/* 8 Haul Trucks Fleet Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-200">Ultra-Class Haul Fleet Telemetry Matrix</h3>
            <p className="text-xs text-slate-400">
              Pemantauan payload muatan, konsumsi solar per jam, tujuan dumping, dan siklus sirkulasi truk
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-slate-900 border border-amber-900/40 rounded text-amber-400">
            FLEET DISPATCH AUTO-SOLVER ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trucks.map((truck) => {
            const isMaint = truck.status === "MAINTENANCE_BAY";
            return (
              <div
                key={truck.id}
                className={`p-4 rounded-xl border transition-all ${
                  isMaint
                    ? "bg-slate-950/60 border-slate-800 opacity-60"
                    : "bg-slate-900/80 border-amber-900/40 hover:border-amber-500/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-100">{truck.id}</span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          isMaint
                            ? "bg-slate-800 text-slate-400"
                            : truck.status === "HAULING_LOADED"
                            ? "bg-amber-950 text-amber-300 border border-amber-700/40"
                            : truck.status === "DUMPING_CRUSHER"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-700/40"
                            : "bg-sky-950 text-sky-300 border border-sky-700/40"
                        }`}
                      >
                        {truck.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{truck.model}</p>
                  </div>

                  <button
                    onClick={() => toggleTruckMaintenance(truck.id)}
                    title={isMaint ? "Return to Fleet Dispatch" : "Send to Maintenance Bay"}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isMaint
                        ? "bg-emerald-950 border-emerald-600/40 text-emerald-400 hover:bg-emerald-900"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-amber-400 hover:bg-slate-700"
                    }`}
                  >
                    <Wrench className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Telemetry Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500">PAYLOAD TONNAGE</span>
                    <p className="font-bold text-amber-400 text-sm">
                      {truck.payloadTons} / {truck.maxCapacityTons} T
                    </p>
                  </div>
                  <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500">HAUL VELOCITY</span>
                    <p className="font-bold text-sky-400 text-sm">{truck.currentSpeedKmh} KM/H</p>
                  </div>
                  <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500">FUEL BURN RATE</span>
                    <p className="font-bold text-slate-200">{truck.fuelBurnLph} L/HR</p>
                  </div>
                  <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500">TRIPS COMPLETED</span>
                    <p className="font-bold text-emerald-400">{truck.totalTripsToday} TRIPS</p>
                  </div>
                </div>

                {/* Shovel & Cycle Time */}
                <div className="mt-3 flex items-center justify-between text-xs font-mono py-1.5 border-t border-slate-800/80">
                  <span className="text-slate-400">Assigned Shovel:</span>
                  <span className="font-bold text-amber-400">{truck.assignedShovelId}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pb-2">
                  <span className="text-slate-400">Cycle Time:</span>
                  <span className="font-bold text-slate-300">{truck.cycleTimeMinutes} Mins</span>
                </div>

                {/* Destination Dropdown */}
                <div className="mt-2 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400">Dump Destination:</span>
                  <select
                    disabled={isMaint || isPitHalted}
                    value={truck.destination}
                    onChange={(e) => reassignDestination(truck.id, e.target.value as DumpDestination)}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer disabled:opacity-40"
                  >
                    {destinationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
