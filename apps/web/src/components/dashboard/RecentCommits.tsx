
import { GitCommit, GitPullRequest } from "lucide-react";

type Commit = {
  hash: string;
  message: string;
  author: string;
  time: string;
  filesChanged: number;
};

const commits: Commit[] = [
  {
    hash: "a31f9c2",
    message: "Fix token refresh handling",
    author: "Alex Morgan",
    time: "12 minutes ago",
    filesChanged: 4,
  },
  {
    hash: "b82d1e7",
    message: "Add payment validation",
    author: "Priya Sharma",
    time: "48 minutes ago",
    filesChanged: 7,
  },
  {
    hash: "c19a4f6",
    message: "Refactor user service",
    author: "Rahul Kumar",
    time: "2 hours ago",
    filesChanged: 3,
  },
  {
    hash: "d47e8b1",
    message: "Update database migrations",
    author: "Alex Morgan",
    time: "4 hours ago",
    filesChanged: 2,
  },
];

export default function RecentCommits() {
  return (
    <div className="space-y-1">
      {commits.map((commit) => (
        <div
          key={commit.hash}
          className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-surface-hover"
        >
          <div className="mt-0.5 rounded-md border border-border p-2">
            <GitCommit
              size={16}
              className="text-muted"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {commit.message}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
              <span>{commit.author}</span>
              <span aria-hidden="true">·</span>
              <span>{commit.time}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
              <code className="rounded border border-border bg-background px-1.5 py-0.5">
                {commit.hash}
              </code>

              <span className="flex items-center gap-1">
                <GitPullRequest size={13} aria-hidden="true" />
                {commit.filesChanged} files changed
              </span>
            </div>
          </div>
        </div>
      ))}

      <p className="border-t border-border pt-3 text-xs text-muted">
        Sample commit data. Live Git history will be connected later.
      </p>
    </div>
  );
}
