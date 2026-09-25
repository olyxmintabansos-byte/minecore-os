import type { Metadata } from "next";
import "./globals.css";
import { MineProvider } from "@/context/MineContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MineCore OS - Heavy Open-Pit Fleet & Stockpile ERP",
  description: "Enterprise Open-Pit Fleet Dispatch, 60 FPS Elevation Contour Canvas & Nickel Ore Blending Simulator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#0b0f19] text-slate-100 antialiased">
        <MineProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
        </MineProvider>
      </body>
    </html>
  );
}
