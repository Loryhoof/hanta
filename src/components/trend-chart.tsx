"use client";

import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  type GridComponentOption,
  type LegendComponentOption,
  type TooltipComponentOption,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";
import type { MetricPoint } from "@/lib/content";

echarts.use([BarChart, LineChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

type ChartOption = echarts.ComposeOption<
  GridComponentOption | LegendComponentOption | TooltipComponentOption
>;

export function TrendChart({ data }: { data: MetricPoint[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = echarts.init(ref.current);
    const option: ChartOption = {
      color: ["#0f766e", "#a16207", "#334155"],
      tooltip: { trigger: "axis" },
      legend: { bottom: 0 },
      grid: { top: 24, right: 20, left: 48, bottom: 54 },
      xAxis: { type: "category", data: data.map((point) => String(point.year)) },
      yAxis: { type: "value" },
      series: [
        {
          name: "Infections",
          type: "bar",
          data: data.map((point) => point.infections),
          barMaxWidth: 34,
        },
        {
          name: "Deaths",
          type: "line",
          smooth: true,
          data: data.map((point) => point.deaths),
        },
        {
          name: "Countries",
          type: "line",
          smooth: true,
          data: data.map((point) => point.countries),
        },
      ],
    };

    chart.setOption(option);
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} className="h-[360px] w-full" aria-label="Hantavirus trend chart" />;
}
