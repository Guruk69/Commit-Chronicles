
import { Clock3, GitCommit } from "lucide-react";
import Card from "../ui/Card";
import ScanStatus from "../ui/ScanStatus";

type Scan = {
  id: string;
  repository: string;
  branch: string;
  commit: string;
  time: string;
  status: "completed" | "running" | "failed" | "queued";
};

const scans: Scan[] = [
  {
    id: "1",
    repository: "commit-chronicles",
    branch: "main",
    commit: "a83f21c",
    time: "10 minutes ago",
    status: "completed",
  },
  {
    id: "2",
    repository: "payment-service",
    branch: "main",
    commit: "b72d914",
    time: "25 minutes ago",
    status: "running",
  },
  {
    id: "3",
    repository: "user-service",
    branch: "develop",
    commit: "c41e620",
    time: "1 hour ago",
    status: "failed",
  },
];

export default function RecentScans() {
  return (
    <Card>
      <div>
        <h2 className="font-medium">Recent Scans</h2>
        <p className="mt-2 text-sm text-muted">
          Latest repository analysis activity.
        </p>
      </div>

      <div className="mt-5 divide-y divide-border">
        {scans.map((scan) => (
          <div
            key={scan.id}
            className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="rounded-md border border-border bg-surface-hover p-2">
                <GitCommit size={18} className="text-muted" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {scan.repository}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span>{scan.branch}</span>
                  <span>·</span>
                  <code>{scan.commit}</code>
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <Clock3 size={12} />
                  {scan.time}
                </p>
              </div>
            </div>

            <div className="sm:shrink-0">
              <ScanStatus status={scan.status} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
