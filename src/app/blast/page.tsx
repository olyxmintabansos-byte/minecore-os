"use client";

import React from "react";
import { useMine } from "@/context/MineContext";
import confetti from "canvas-confetti";
import {
  Flame,
  RotateCcw,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ShieldCheck,
} from "lucide-react";

export default function DrillAndBlastPage() {
  const { blastConfig, blastHoles, fireBlastSequence, resetBlastPattern } = useMine();

  const handleDetonate = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#f59e0b", "#ea580c", "#dc2626"],
    });
    fireBlastSequence();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            Drill &amp; Blast Engineering Studio &amp; Ground Vibration Simulator
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Pola Pemboran &amp; Peledakan Saprolite // Bench RL -120m // Nonel Delay 25ms Staggered
          </p>
        </div>

        <div className="flex items-center gap-2">
          {blastConfig.isBlasted ? (
            <button
              onClick={resetBlastPattern}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono hover:bg-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> RESET PATTERN
            </button>
          ) : (
            <button
              onClick={handleDetonate}
              className="flex items-center gap-2 px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-amber-600/30 cursor-pointer animate-pulse"
            >
              <Zap className="w-4 h-4 fill-slate-950" /> DETONATE 24-HOLE BLAST
            </button>
          )}
        </div>
      </div>

      {/* Blast Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40 font-mono text-xs">
          <span className="text-slate-400">POWDER FACTOR (PF)</span>
          <p className="text-2xl font-bold text-amber-400 mt-1">{blastConfig.powderFactorKgPerBcm}</p>
          <p className="text-[10px] text-slate-500">kg Emulsion / BCM (Target 0.40 - 0.48)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40 font-mono text-xs">
          <span className="text-slate-400">PEAK PARTICLE VELOCITY</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{blastConfig.calculatedPpvMmSec} mm/s</p>
          <p className="text-[10px] text-slate-500">Batas Aman ESDM: &lt; {blastConfig.vibrationPpvLimitMmSec} mm/s</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40 font-mono text-xs">
          <span className="text-slate-400">AIRBLAST OVERPRESSURE</span>
          <p className="text-2xl font-bold text-cyan-400 mt-1">{blastConfig.calculatedAirblastDb} dBL</p>
          <p className="text-[10px] text-slate-500">Threshold: &lt; {blastConfig.airblastDbLimit} dBL (Compliant)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40 font-mono text-xs">
          <span className="text-slate-400">YIELD ROCK FRAGMENTATION</span>
          <p className="text-2xl font-bold text-slate-200 mt-1">32.600 BCM</p>
          <p className="text-[10px] text-slate-500">P80 Passing: 280 mm (Feed Crusher)</p>
        </div>
      </div>

      {/* 24-Hole Blast Pattern Grid Visualization */}
      <div className="p-6 rounded-xl bg-slate-900/80 border border-amber-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h3 className="font-mono font-bold text-sm text-slate-200 uppercase tracking-wider">
              Bench -120m Staggered Blast Hole Matrix (4.5m Burden × 5.5m Spacing)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            STATUS: {blastConfig.isBlasted ? "FIRED & MUCKED" : "CHARGED & STEMMED"}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {blastHoles.map((hole) => (
            <div
              key={hole.holeId}
              className={`p-3 rounded-lg border text-center transition-all ${
                hole.isFired
                  ? "bg-amber-950/40 border-amber-500 text-amber-300"
                  : "bg-slate-950 border-slate-800 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="font-mono text-xs font-bold">{hole.holeId}</span>
              </div>
              <p className="text-[10px] font-mono text-slate-500 mt-1">{hole.depthM}m Depth</p>
              <p className="text-[10px] font-mono text-amber-400">{hole.explosiveKg} kg</p>
              <span
                className={`inline-block mt-2 text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                  hole.isFired
                    ? "bg-amber-500 text-slate-950"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {hole.isFired ? "FIRED" : `${hole.delayMs}ms`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Vibration Envelope */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-amber-900/40 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-mono font-bold text-sm text-slate-100">
            ESDM Kepmen 1827 K/30/MEM/2018 - Standar Baku Mutu Tingkat Getaran Peledakan
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Hasil pemodelan getaran tanah (*Peak Particle Velocity*) sebesar <strong>2.84 mm/s</strong> berada jauh di bawah ambang batas kritis 5.0 mm/s untuk bangunan pemukiman dan lereng *highwall* tambang. Gelombang kejut suara (*Airblast*) sebesar <strong>108.5 dBL</strong> memenuhi kepatuhan baku mutu lingkungan radius 1.5 km.
        </p>
      </div>
    </div>
  );
}
