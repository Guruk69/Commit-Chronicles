import {
  Activity,
  CalendarClock,
  Code2,
  FileChartColumn,
  FolderGit2,
  LayoutDashboard,
  Search,
  Settings,
  ShieldAlert,
  Users,
  Bug,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";
import Button from "./components/ui/Button";
import RepositorySummary from "./components/dashboard/RepositorySummary";
import RecentScans from "./components/dashboard/RecentScans";
import ScanStatus from "./components/ui/ScanStatus";
import RepositoryHealth from "./components/dashboard/RepositoryHealth";
// import Card from "./components/ui/Card";
import PageHeader from "./components/ui/PageHeader";
import MetricCard from "./components/ui/MetricCard";
import RiskBadge from "./components/ui/RiskBadge";
import RiskProgress from "./components/ui/RiskProgress";
import SectionCard from "./components/ui/SectionCard";
import CommitActivityChart from "./components/dashboard/CommitActivityChart";
import RiskDistributionChart from "./components/dashboard/RiskDistributionChart";
import HighRiskFiles from "./components/dashboard/HighRiskFiles";
import RecentCommits from "./components/dashboard/RecentCommits";
import EmptyState from "./components/ui/EmptyState";
import PageContainer from "./components/ui/PageContainer";
const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Repositories", path: "/repositories", icon: FolderGit2 },
  { label: "Analytics", path: "/analytics", icon: Activity },
  { label: "Risk Analysis", path: "/risk-analysis", icon: ShieldAlert },
  { label: "Reports", path: "/reports", icon: FileChartColumn },
  { label: "Scheduled Scans", path: "/scheduled-scans", icon: CalendarClock },
  { label: "Integrations", path: "/integrations", icon: Code2 },
  { label: "Team", path: "/team", icon: Users },
  { label: "Settings", path: "/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
          <Code2 size={21} />
        </div>
        <div>
          <p className="font-semibold tracking-tight">Commit Chronicles</p>
          <p className="text-xs text-muted">Engineering Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        <p className="px-3 pb-2 pt-3 text-xs font-medium uppercase tracking-wider text-muted">
          Workspace
        </p>

        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-surface-hover text-foreground"
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-sm font-medium">Developer Workspace</p>
        <p className="mt-1 text-xs text-muted">Local environment</p>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Search size={17} />
        <span>Search repositories, files, commits...</span>
      </div>

      <Button variant="secondary">Connect GitHub</Button>
    </header>
  );
}

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


export function DashboardPage() {
  const metrics = [
    {
      title: "Total Repositories",
      value: "—",
      description: "Awaiting repository data",
      icon: FolderGit2,
    },
    {
      title: "Total Commits",
      value: "—",
      description: "Awaiting repository data",
      icon: Activity,
    },
    {
      title: "High Risk Files",
      value: "—",
      description: "Awaiting repository analysis",
      icon: ShieldAlert,
    },
    {
      title: "Predicted Bug-Prone Files",
      value: "—",
      description: "Awaiting model predictions",
      icon: Bug,
    },
  ];

  return (
    <PageContainer className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="An overview of repository health and engineering activity."
      />

      {/* Summary metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Repository health */}
      <div className="grid gap-4">
        <RepositoryHealth
          healthScore={72}
          highRiskFiles={12}
          analyzedFiles={100}
        />
      </div>

      {/* Risk map and commit activity */}
      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <SectionCard
          title="Repository Risk Map"
          description="Example risk distribution across repository files."
        >
          <div className="space-y-6">
            {[
              { name: "auth.service.ts", score: 85 },
              { name: "payment.controller.ts", score: 55 },
              { name: "user.dto.ts", score: 20 },
            ].map((file) => (
              <div key={file.name} className="min-w-0">
                <p className="mb-2 truncate text-sm font-medium">
                  {file.name}
                </p>
                <RiskProgress score={file.score} />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
            <span className="text-xs text-muted">Risk levels:</span>
            <RiskBadge level="high" />
            <RiskBadge level="medium" />
            <RiskBadge level="low" />
          </div>
        </SectionCard>

        <SectionCard
          title="Commit Activity"
          description="Daily commit volume across the selected period."
        >
          <CommitActivityChart />
        </SectionCard>
      </div>

      {/* Risk distribution */}
      <SectionCard
        title="Risk Distribution"
        description="Breakdown of files by risk category."
      >
        <RiskDistributionChart />
      </SectionCard>

      {/* Repositories */}
      <SectionCard
        title="Repositories"
        description="Example repositories and their current risk levels."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <RepositorySummary
            name="commit-chronicles"
            description="Repository analytics and code-risk intelligence."
            branch="main"
            commits={248}
            risk="high"
          />

          <RepositorySummary
            name="payment-service"
            description="Payment processing and transaction management."
            branch="main"
            commits={132}
            risk="medium"
          />

          <RepositorySummary
            name="user-service"
            description="User profiles and authentication."
            branch="develop"
            commits={86}
            risk="low"
          />
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Scan status preview
          </p>

          <div className="flex flex-wrap gap-2">
            <ScanStatus status="completed" />
            <ScanStatus status="running" />
            <ScanStatus status="failed" />
            <ScanStatus status="queued" />
          </div>
        </div>
      </SectionCard>

      {/* High-risk files and recent commits */}
      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <SectionCard
          title="High-Risk Files"
          description="Files that may need additional review or testing."
        >
          <HighRiskFiles />
        </SectionCard>

        <SectionCard
          title="Recent Commits"
          description="A timeline of recent repository changes."
        >
          <RecentCommits />
        </SectionCard>
      </div>

      {/* Recent scan activity */}
      <SectionCard
        title="Scan Activity"
        description="The latest analysis runs across your repositories."
      >
        <RecentScans />
      </SectionCard>
    </PageContainer>
  );
}


function PlaceholderPage({ title }: { title: string }) {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">
        The {title.toLowerCase()} page is ready for implementation.
      </p>
    </section>
  );
}


export function RepositoriesPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Repositories"
        description="Connect and manage the Git repositories you want to analyze."
      />

      <EmptyState
        icon={FolderGit2}
        title="No repositories connected"
        description="Connect a GitHub repository to start analyzing commit history, identifying risky files, and tracking codebase health."
        actionLabel="Connect GitHub"
        onAction={() => {
          alert("GitHub integration will be implemented in a later task.");
        }}
      />
    </section>
  );
}


export function AnalyticsPage() {
  return <PlaceholderPage title="Analytics" />;
}

export function RiskAnalysisPage() {
  return <PlaceholderPage title="Risk Analysis" />;
}

export function ReportsPage() {
  return <PlaceholderPage title="Reports" />;
}

export function ScheduledScansPage() {
  return <PlaceholderPage title="Scheduled Scans" />;
}

export function IntegrationsPage() {
  return <PlaceholderPage title="Integrations" />;
}

export function TeamPage() {
  return <PlaceholderPage title="Team" />;
}

export function SettingsPage() {
  return <PlaceholderPage title="Settings" />;
}
