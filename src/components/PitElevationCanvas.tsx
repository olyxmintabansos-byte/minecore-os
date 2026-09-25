"use client";

import React, { useEffect, useRef } from "react";

interface PitElevationCanvasProps {
  activeTrucksCount: number;
  crusherFeedTph: number;
  isPitHalted: boolean;
}

export const PitElevationCanvas: React.FC<PitElevationCanvasProps> = ({
  activeTrucksCount,
  crusherFeedTph,
  isPitHalted,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Simulated haul trucks on ramp
    const simulatedTrucks = [
      { progress: 0.15, direction: 1, payload: 310, id: "DT-101" },
      { progress: 0.42, direction: 1, payload: 295, id: "DT-102" },
      { progress: 0.78, direction: 1, payload: 320, id: "DT-105" },
      { progress: 0.28, direction: -1, payload: 0, id: "DT-103" },
      { progress: 0.65, direction: -1, payload: 0, id: "DT-106" },
      { progress: 0.92, direction: -1, payload: 0, id: "DT-108" },
    ];

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = 170);

      ctx.clearRect(0, 0, width, height);

      // Pit Contour Profile Grid
      ctx.strokeStyle = "rgba(245, 158, 11, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (isPitHalted) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 13px monospace";
        ctx.fillText("PIT MUSTER HALT: ALL FLEETS STOPPED (LIGHTNING DETECTED)", width / 2 - 200, height / 2);
        return;
      }

      // Draw Open Pit Terraced Benches (Topography Profile)
      ctx.beginPath();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.moveTo(0, 45); // Surface (+85m RL)
      ctx.lineTo(120, 45);
      ctx.lineTo(160, 75); // Bench 1 (+50m)
      ctx.lineTo(240, 75);
      ctx.lineTo(280, 105); // Bench 2 (+10m)
      ctx.lineTo(360, 105);
      ctx.lineTo(410, 140); // Bottom Pit (-120m RL Shovel Face)
      ctx.lineTo(width, 140);
      ctx.stroke();

      // Shovel Dig Face Graphic
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(width - 90, 115, 28, 25);
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 9px monospace";
      ctx.fillText("EX-01", width - 87, 131);

      // Primary Crusher Hopper Graphic at Surface
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(40, 25, 35, 20);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 8px monospace";
      ctx.fillText("CRUSH", 43, 38);

      // Animate Haul Road Ramp (8% gradient)
      const rampStart = { x: width - 110, y: 140 };
      const rampEnd = { x: 75, y: 45 };

      ctx.beginPath();
      ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
      ctx.lineWidth = 6;
      ctx.moveTo(rampStart.x, rampStart.y);
      ctx.lineTo(rampEnd.x, rampEnd.y);
      ctx.stroke();

      // Animate Trucks moving on Ramp
      t += 0.003 * (activeTrucksCount / 8);
      simulatedTrucks.forEach((truck) => {
        let p = truck.progress + t * truck.direction;
        while (p > 1) p -= 1;
        while (p < 0) p += 1;

        const tx = rampStart.x + (rampEnd.x - rampStart.x) * p;
        const ty = rampStart.y + (rampEnd.y - rampStart.y) * p;

        // Truck Icon Box
        ctx.fillStyle = truck.direction === 1 ? "#f59e0b" : "#94a3b8";
        ctx.fillRect(tx - 6, ty - 6, 12, 8);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.strokeRect(tx - 6, ty - 6, 12, 8);

        // Small payload indicator
        if (truck.payload > 0) {
          ctx.fillStyle = "#dc2626";
          ctx.fillRect(tx - 4, ty - 8, 8, 2);
        }
      });

      // HUD Text
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px monospace";
      ctx.fillText(
        `RAMP GRADE: 8.2% // HAUL ROAD VELOCITY: ${(24.5).toFixed(1)} KM/H // CRUSHER FEED: ${crusherFeedTph.toFixed(0)} TPH`,
        12,
        20
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTrucksCount, crusherFeedTph, isPitHalted]);

  return (
    <div className="relative w-full h-[170px] bg-slate-950/80 rounded-xl border border-amber-900/40 p-2 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 right-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
          60 FPS PIT ELEVATION RADAR
        </span>
      </div>
    </div>
  );
};
