
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


const commitDataByRange = {
  7: [
    { day: "Mon", commits: 18 },
    { day: "Tue", commits: 24 },
    { day: "Wed", commits: 21 },
    { day: "Thu", commits: 35 },
    { day: "Fri", commits: 29 },
    { day: "Sat", commits: 12 },
    { day: "Sun", commits: 16 },
  ],
  30: [
    { day: "Week 1", commits: 95 },
    { day: "Week 2", commits: 120 },
    { day: "Week 3", commits: 84 },
    { day: "Week 4", commits: 142 },
  ],
  90: [
    { day: "Week 1–2", commits: 210 },
    { day: "Week 3–4", commits: 245 },
    { day: "Week 5–6", commits: 198 },
    { day: "Week 7–8", commits: 275 },
    { day: "Week 9–10", commits: 230 },
    { day: "Week 11–12", commits: 310 },
  ],
};

type DateRange = 7 | 30 | 90;

export default function CommitActivityChart() {
  const [range, setRange] = useState<DateRange>(7);

  return (
    <div className="w-full min-w-0">
      {/* Date-range selector */}
      <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
        {([7, 30, 90] as const).map((days) => (
          <button
            key={days}
            type="button"
            onClick={() => setRange(days)}
            aria-pressed={range === days}
            className={`shrink-0 rounded-md border px-3 py-2 text-xs font-medium transition-colors ${
              range === days
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-surface text-muted hover:bg-surface-hover hover:text-foreground"
            }`}
          >
            {days} days
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={commitDataByRange[range]}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              axisLine={{ stroke: "#3f3f46" }}
              tickLine={false}
              tickMargin={10}
            />

            <YAxis
              allowDecimals={false}
              width={32}
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111113",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#fafafa",
              }}
              labelStyle={{ color: "#a1a1aa" }}
              itemStyle={{ color: "#fafafa" }}
              formatter={(value) => [value, "Commits"]}
            />

            <Line
              type="monotone"
              dataKey="commits"
              stroke="#fafafa"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#fafafa",
                stroke: "#111113",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-xs text-muted">
        Sample commit activity · Last {range} days selected
      </p>
    </div>
  );
}
