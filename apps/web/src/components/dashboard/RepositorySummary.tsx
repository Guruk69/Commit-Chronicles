
import { GitBranch, GitCommit, FolderGit2 } from "lucide-react";
import Card from "../ui/Card";
import RiskBadge from "../ui/RiskBadge";

type RepositorySummaryProps = {
  name: string;
  description: string;
  branch: string;
  commits: number;
  risk: "high" | "medium" | "low";
};

export default function RepositorySummary({
  name,
  description,
  branch,
  commits,
  risk,
}: RepositorySummaryProps) {
  return (
    <Card className="min-w-0">
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-border bg-surface-hover p-2">
          <FolderGit2 size={20} className="text-muted" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium">{name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <GitBranch size={15} />
          {branch}
        </span>

        <span className="flex items-center gap-1.5">
          <GitCommit size={15} />
          {commits.toLocaleString()} commits
        </span>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <RiskBadge level={risk} />
      </div>
    </Card>
  );
}
