"use client";

import React, { useState } from "react";
import { useMine } from "@/context/MineContext";
import { formatNumber } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Award,
  DollarSign,
} from "lucide-react";

export default function MinerbaAssayPage() {
  const { minerbaCoa, updateCoaParameters } = useMine();

  const [wetTons, setWetTons] = useState(minerbaCoa.totalWetMetricTons);
  const [niPct, setNiPct] = useState(minerbaCoa.assayNiPct);
  const [mcPct, setMcPct] = useState(minerbaCoa.moistureContentPct);
  const [hpmUsd, setHpmUsd] = useState(minerbaCoa.hpmNickelUsdPerDmt);

  const handleRecalculate = (w: number, ni: number, mc: number, hpm: number) => {
    setWetTons(w);
    setNiPct(ni);
    setMcPct(mc);
    setHpmUsd(hpm);
    updateCoaParameters(w, ni, mc, hpm);
  };

  const handlePrint = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden on Print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-amber-900/40">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Minerba ESDM Official Certificate of Sampling &amp; Analysis (COA) Studio
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Sertifikat Kualitas Bijih Nikel Surveyor Sucofindo &amp; Faktur Royalti PNBP 10% ESDM A4
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Printer className="w-4 h-4" /> CETAK SERTIFIKAT A4 (1-CLICK PRINT)
        </button>
      </div>

      {/* Sampling Calibrator Sliders (Hidden on Print) */}
      <div className="no-print p-5 rounded-xl bg-slate-900/80 border border-amber-900/40 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-200 uppercase">
              Independent Surveyor Assay &amp; HPM Calibrator
            </span>
          </div>
          <span className="text-slate-400">Kepmen ESDM No. 294.K/MB.01/MEM.B/2023</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Wet Metric Tons (WMT):</span>
              <span className="font-bold text-amber-400">{formatNumber(wetTons, 0)} WMT</span>
            </div>
            <input
              type="range"
              min="5000"
              max="25000"
              step="500"
              value={wetTons}
              onChange={(e) => handleRecalculate(parseInt(e.target.value), niPct, mcPct, hpmUsd)}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Assay Nickel (Ni %):</span>
              <span className="font-bold text-cyan-400">{niPct}% Ni</span>
            </div>
            <input
              type="range"
              min="1.40"
              max="2.20"
              step="0.02"
              value={niPct}
              onChange={(e) => handleRecalculate(wetTons, parseFloat(e.target.value), mcPct, hpmUsd)}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Moisture Content (MC %):</span>
              <span className="font-bold text-blue-400">{mcPct}%</span>
            </div>
            <input
              type="range"
              min="25.0"
              max="40.0"
              step="0.5"
              value={mcPct}
              onChange={(e) => handleRecalculate(wetTons, niPct, parseFloat(e.target.value), hpmUsd)}
              className="w-full accent-blue-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>HPM ESDM Base (USD/DMT):</span>
              <span className="font-bold text-emerald-400">${hpmUsd}</span>
            </div>
            <input
              type="range"
              min="30.00"
              max="65.00"
              step="0.50"
              value={hpmUsd}
              onChange={(e) => handleRecalculate(wetTons, niPct, mcPct, parseFloat(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Official A4 Document Container */}
      <div className="max-w-[850px] mx-auto bg-white text-slate-900 shadow-2xl rounded-xl p-8 sm:p-12 border border-slate-300 font-sans print:border-none print:shadow-none print:p-0">
        {/* Header Sucofindo & Minerba */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-amber-600 text-white flex items-center justify-center font-black text-xl">
              SCI
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide text-slate-900 uppercase">
                PT SUCOFINDO (PERSERO) // MINERAL &amp; MINING LABORATORY
              </h1>
              <h2 className="text-xs font-bold text-slate-600 tracking-wider">
                CERTIFICATE OF SAMPLING AND ANALYSIS (COA) // MINERAL ORE CONCESSION
              </h2>
            </div>
          </div>

          <div className="text-right font-mono text-[10px] text-slate-600">
            <p><strong>KAN ACCREDITED:</strong> LP-024-IDN</p>
            <p><strong>STANDARDS:</strong> SNI 13-3494 / ISO 9001</p>
            <p><strong>REPORT DATE:</strong> 25-SEP-2026</p>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="mt-4 text-center space-y-1">
          <h2 className="text-lg font-black tracking-wider uppercase underline underline-offset-4">
            CERTIFICATE OF SAMPLING &amp; CHEMICAL ANALYSIS
          </h2>
          <p className="text-xs font-mono text-slate-600">
            HASIL ANALISIS KUALITAS BIJIH NIKEL &amp; REKONSILIASI ROYALTI PNBP ESDM
          </p>
          <div className="inline-block px-3 py-0.5 rounded bg-slate-100 border border-slate-300 text-xs font-mono font-bold mt-1">
            CERTIFICATE NO: {minerbaCoa.certificateNo}
          </div>
        </div>

        {/* Shipment Details Table */}
        <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden text-xs">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="w-1/4 p-2.5 bg-slate-50 font-bold text-slate-700">CONCESSION IUP-OP:</td>
                <td className="w-1/4 p-2.5 font-mono">{minerbaCoa.concessionName}</td>
                <td className="w-1/4 p-2.5 bg-slate-50 font-bold text-slate-700">ESDM PERMIT NO:</td>
                <td className="w-1/4 p-2.5 font-mono">{minerbaCoa.esdmPermitIupNo}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">VESSEL / TUG &amp; BARGE:</td>
                <td className="p-2.5 font-mono font-bold">{minerbaCoa.vesselBargeName}</td>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">LOT NUMBER:</td>
                <td className="p-2.5 font-mono">{minerbaCoa.lotNumber}</td>
              </tr>
              <tr>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">SAMPLING DATE:</td>
                <td className="p-2.5 font-mono font-bold text-amber-800">{minerbaCoa.samplingDate}</td>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">INSPECTED AT:</td>
                <td className="p-2.5 font-mono">JETTY MOROWALI INDUSTRIAL PORT</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Chemical Assay Results Table */}
        <div className="mt-6 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            CHEMICAL ASSAY PARAMETERS (XRF SPECTROMETRY METHOD)
          </h3>

          <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
            <table className="w-full border-collapse font-mono">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-left text-slate-700 font-sans">
                  <th className="p-2.5">ELEMENT / COMPOUND</th>
                  <th className="p-2.5 text-right">TEST RESULT (%)</th>
                  <th className="p-2.5 text-right">COMMERCIAL BASIS</th>
                  <th className="p-2.5 text-right">TEST METHOD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-amber-50/60 font-bold">
                  <td className="p-2.5 font-sans">Nickel Content (Ni)</td>
                  <td className="p-2.5 text-right text-base text-amber-800">{minerbaCoa.assayNiPct}%</td>
                  <td className="p-2.5 text-right">Dry Basis</td>
                  <td className="p-2.5 text-right text-slate-500">SNI 13-3494-1994 (XRF)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Iron Content (Fe)</td>
                  <td className="p-2.5 text-right font-bold text-orange-700">{minerbaCoa.assayFePct}%</td>
                  <td className="p-2.5 text-right">Dry Basis</td>
                  <td className="p-2.5 text-right text-slate-500">ASTM E246</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Moisture Content (MC)</td>
                  <td className="p-2.5 text-right font-bold text-blue-700">{minerbaCoa.moistureContentPct}%</td>
                  <td className="p-2.5 text-right">As Received</td>
                  <td className="p-2.5 text-right text-slate-500">ISO 589 Gravimetric</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Silica (SiO2) / Magnesia (MgO)</td>
                  <td className="p-2.5 text-right font-bold">{minerbaCoa.assaySio2Pct}% / {minerbaCoa.assayMgoPct}%</td>
                  <td className="p-2.5 text-right font-bold text-emerald-800">S/M: {minerbaCoa.silicaMagnesiaRatio}</td>
                  <td className="p-2.5 text-right text-slate-500">XRF Wavelength</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Cobalt Content (Co)</td>
                  <td className="p-2.5 text-right font-bold">{minerbaCoa.assayCoPct}%</td>
                  <td className="p-2.5 text-right">Dry Basis</td>
                  <td className="p-2.5 text-right text-slate-500">ICP-OES Optical</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Volumetric Reconciliation & PNBP Royalty Table */}
        <div className="mt-6 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            ESDM HPM VALUATION &amp; PNBP ROYALTY BILLING (PP NO. 26 TAHUN 2022)
          </h3>

          <div className="border border-slate-300 rounded-lg overflow-hidden text-xs font-mono">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="w-1/2 p-2.5 font-sans font-medium">Total Wet Metric Tons (WMT):</td>
                  <td className="w-1/2 p-2.5 text-right font-bold">{formatNumber(minerbaCoa.totalWetMetricTons, 0)} WMT</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="p-2.5 font-sans font-medium">Total Dry Metric Tons (DMT):</td>
                  <td className="p-2.5 text-right font-bold text-slate-900">{formatNumber(minerbaCoa.totalDryMetricTons, 0)} DMT</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-medium">ESDM Harga Patokan Mineral (HPM Base):</td>
                  <td className="p-2.5 text-right font-bold text-emerald-700">${minerbaCoa.hpmNickelUsdPerDmt} / DMT</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-medium">Gross Mineral Ore Cargo Value:</td>
                  <td className="p-2.5 text-right font-bold text-slate-900">${formatNumber(minerbaCoa.grossOreValueUsd, 0)} USD</td>
                </tr>
                <tr className="bg-amber-50/80 font-bold text-slate-900">
                  <td className="p-3 font-sans text-sm">PNBP ROYALTI MINERBA (10.0% TARIF RESMI):</td>
                  <td className="p-3 text-right text-base text-amber-800">
                    Rp {formatNumber(minerbaCoa.pnbpRoyaltyPayableIdr, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3-Party Signatures Block */}
        <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-3 gap-6 text-center text-xs font-sans">
          <div className="space-y-2">
            <p className="font-bold text-slate-700">INDEPENDENT SURVEYOR</p>
            <p className="text-[10px] text-slate-500 font-mono">PT Sucofindo Lead Assayer</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-sky-900 border-b border-dotted border-slate-400 px-4">
                Ahmad Fauzi
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{minerbaCoa.chiefSurveyorName}</p>
            <p className="text-[9px] text-slate-400 font-mono">REG: SCI-ASSAY-9841</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-slate-700">KEPALA TEKNIK TAMBANG (KTT)</p>
            <p className="text-[10px] text-slate-500 font-mono">IUP-OP Concessionaire</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-amber-900 border-b border-dotted border-slate-400 px-4">
                Rudi Hartono
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{minerbaCoa.kttMiningManagerName}</p>
            <p className="text-[9px] text-slate-400 font-mono">KTT NO: 442/ESDM/KTT/2021</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-slate-700">SMELTER RECEIVING METALLURGIST</p>
            <p className="text-[10px] text-slate-500 font-mono">RKEF Buyer Representative</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-slate-800 border-b border-dotted border-slate-400 px-4">
                Lin Wei
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{minerbaCoa.buyerInspectorName}</p>
            <p className="text-[9px] text-slate-400 font-mono">RKEF-QA-0812</p>
          </div>
        </div>

        {/* Verification Seal */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AUTHENTICATED BY SIMPONI ESDM DIGITAL SYSTEM // VERIF: {minerbaCoa.qrVerificationHash}</span>
          </div>
          <span>TIMESTAMP: 25-SEP-2026 12:20 UTC+8</span>
        </div>
      </div>
    </div>
  );
}
