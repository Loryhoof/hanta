"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import type { OutbreakRegion } from "@/lib/content";
import { getRiskLabel } from "@/lib/risk";

export function RiskMap({ regions }: { regions: OutbreakRegion[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = new maplibregl.Map({
      container: ref.current,
      center: [0, 28],
      zoom: 1.25,
      attributionControl: false,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "OpenStreetMap contributors",
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }],
      },
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    regions.forEach((region) => {
      const risk = getRiskLabel(region.riskLevel);
      const marker = document.createElement("div");
      marker.className =
        "h-5 w-5 rounded-full border-2 border-white shadow-lg ring-4 ring-teal-900/10";
      marker.style.background = risk.score >= 4 ? "#be123c" : risk.score >= 3 ? "#d97706" : "#0f766e";

      new maplibregl.Marker({ element: marker })
        .setLngLat(region.coordinates)
        .setPopup(
          new maplibregl.Popup({ offset: 18 }).setHTML(
            `<strong>${region.name}</strong><br/>${risk.label} indicator<br/><span>${region.summary}</span>`,
          ),
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [regions]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm">
      <div ref={ref} className="h-[460px] w-full" aria-label="Interactive hantavirus risk map" />
    </div>
  );
}
