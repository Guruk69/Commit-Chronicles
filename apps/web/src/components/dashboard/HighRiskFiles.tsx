
import { ArrowUpRight, FileCode2 } from "lucide-react";
import RiskBadge from "../ui/RiskBadge";
import RiskProgress from "../ui/RiskProgress";

type RiskLevel = "high" | "medium" | "low";

type RiskFile = {
  path: string;
  score: number;
  risk: RiskLevel;
  changes: number;
};

const riskFiles: RiskFile[] = [
  {
    path: "src/auth/auth.service.ts",
    score: 92,
    risk: "high",
    changes: 28,
  },
  {
    path: "src/payments/payment.controller.ts",
    score: 84,
    risk: "high",
    changes: 21,
  },
  {
    path: "src/api/user.controller.ts",
    score: 76,
    risk: "high",
    changes: 18,
  },
  {
    path: "src/database/connection.ts",
    score: 58,
    risk: "medium",
    changes: 12,
  },
  {
    path: "src/users/user.dto.ts",
    score: 24,
    risk: "low",
    changes: 4,
  },
];

export default function HighRiskFiles() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-150 text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted">
            <th className="pb-3 pr-4 font-medium">File</th>
            <th className="pb-3 pr-4 font-medium">Risk score</th>
            <th className="pb-3 pr-4 font-medium">Risk level</th>
            <th className="pb-3 text-right font-medium">
              Changes
            </th>
          </tr>
        </thead>

        <tbody>
          {riskFiles.map((file) => (
            <tr
              key={file.path}
              className="border-b border-border last:border-0"
            >
              <td className="py-4 pr-4">
                <div className="flex min-w-0 items-center gap-2">
                  <FileCode2
                    size={16}
                    className="shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <span
                    className="truncate font-medium"
                    title={file.path}
                  >
                    {file.path}
                  </span>
                </div>
              </td>

              <td className="w-40 py-4 pr-4">
                <RiskProgress score={file.score} />
              </td>

              <td className="py-4 pr-4">
                <RiskBadge level={file.risk} />
              </td>

              <td className="py-4 text-right tabular-nums">
                <span className="inline-flex items-center justify-end gap-1">
                  {file.changes}
                  <ArrowUpRight
                    size={14}
                    className="text-muted"
                    aria-hidden="true"
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-xs text-muted">
        Illustrative data only. Risk scores are not yet calculated
        from repository history.
      </p>
      <br></br>
    </div>
  );
}
