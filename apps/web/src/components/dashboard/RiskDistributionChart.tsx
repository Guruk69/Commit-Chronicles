
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "High Risk", files: 12, color: "#ef4444" },
  { name: "Medium Risk", files: 28, color: "#f59e0b" },
  { name: "Low Risk", files: 60, color: "#22c55e" },
];

export default function RiskDistributionChart() {
  const totalFiles = data.reduce((sum, item) => sum + item.files, 0);

  return (
    <div className="grid items-center gap-6 sm:grid-cols-2">
      <div className="h-56 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="files"
              nameKey="name"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#111113",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#fafafa",
              }}
              formatter={(value, name) => [
                `${value} files`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-muted">Files analyzed</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">
            {totalFiles}
          </p>
        </div>

        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted">{item.name}</span>
              </div>

              <span className="font-medium tabular-nums">
                {item.files}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
