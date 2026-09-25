"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMine } from "@/context/MineContext";
import { formatNumber } from "@/lib/utils";
import {
  Truck,
  Layers,
  Flame,
  FileText,
  AlertOctagon,
  RefreshCw,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { kpis, isPitHalted, togglePitEmergencyHalt, resetToDefaults } = useMine();

  const navItems = [
    { label: "Fleet Dispatch", href: "/" },
    { label: "Stockpile & Blending", href: "/stockpile/" },
    { label: "Drill & Blast", href: "/blast/" },
    { label: "Minerba COA A4", href: "/assay/" },
  ];

  const icons: Record<string, React.ReactNode> = {
    "/": <Truck className="w-4 h-4" />,
    "/stockpile/": <Layers className="w-4 h-4" />,
    "/blast/": <Flame className="w-4 h-4" />,
    "/assay/": <FileText className="w-4 h-4" />,
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-amber-900/40 text-slate-100">
      {/* Top SCADA Ticker Strip */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-slate-900/80 border-b border-amber-950 text-xs font-mono">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-slate-400">PIT DISPATCH HUD:</span>
            <span className="text-amber-400 font-bold">MOROWALI NICKEL PROJECT</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">DAILY ORE:</span>
            <span className="text-amber-300 font-bold">{formatNumber(kpis.totalDailyOreMovedTons, 0)} TONS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">STRIP RATIO:</span>
            <span className="text-orange-400 font-bold">1:{kpis.instantStrippingRatio} BCM/T</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">CRUSHER FEED:</span>
            <span className="text-emerald-400 font-bold">{formatNumber(kpis.crusherFeedRateTph, 0)} TPH</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">SMELTER Ni FEED:</span>
            <span className="text-cyan-400 font-bold">{kpis.targetNiBlendFeedPct}% Ni</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePitEmergencyHalt}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
              isPitHalted
                ? "bg-emerald-950 border border-emerald-500 text-emerald-300 hover:bg-emerald-900"
                : "bg-rose-950/80 border border-rose-600 text-rose-300 hover:bg-rose-900 animate-pulse"
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            {isPitHalted ? "RESUME PIT DISPATCH" : "MUSTER EMERGENCY HALT"}
          </button>

          <button
            onClick={resetToDefaults}
            title="Reset Simulation Data"
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Truck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-wider text-slate-100">MINECORE</span>
              <span className="px-1.5 py-0.2 text-[10px] font-mono bg-amber-950 text-amber-400 rounded border border-amber-800">
                SCADA OS
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">Heavy Open-Pit Fleet &amp; Stockpile Ore Blending ERP</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm shadow-amber-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                }`}
              >
                <span className={`${isActive ? "text-amber-400" : "text-slate-400"}`}>
                  {icons[item.href]}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
