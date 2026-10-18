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
  Menu,
  X
} from "lucide-react";
import { useMemo } from "react";
import {  Plus } from "lucide-react";
import RepositoryCard, {
  type Repository,
} from "./components/repositories/RepositoryCard";
import { useState } from "react";
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
// import EmptyState from "./components/ui/EmptyState";
import PageContainer from "./components/ui/PageContainer";
import LoadingState from "./components/ui/LoadingState";
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


function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      
<div className="flex min-h-20 shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3">
  <div className="flex min-w-0 items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black">
      <Code2 size={21} />
    </div>

    <div className="min-w-0">
      <p className="text-sm font-semibold leading-5 tracking-tight">
        Commit Chronicles
      </p>
      <p className="mt-1 text-xs leading-4 text-muted">
        Engineering Intelligence
      </p>
    </div>
  </div>

  <button
    type="button"
    onClick={onClose}
    aria-label="Close navigation menu"
    className="shrink-0 rounded-md p-2 text-muted hover:bg-surface-hover hover:text-foreground lg:hidden"
  >
    <X size={20} />
  </button>
</div>


      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="px-3 pb-2 pt-3 text-xs font-medium uppercase tracking-wider text-muted">
          Workspace
        </p>

        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            onClick={onClose}
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

      <div className="shrink-0 border-t border-border p-4">
        <p className="text-sm font-medium">Developer Workspace</p>
        <p className="mt-1 text-xs text-muted">Local environment</p>
      </div>
    </aside>
  );
}


function Topbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="flex h-16 min-w-0 items-center justify-between gap-4 border-b border-border px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-expanded={false}
          className="rounded-md p-2 text-muted hover:bg-surface-hover hover:text-foreground lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="flex min-w-0 items-center gap-2 text-sm text-muted">
          <Search size={17} className="shrink-0" />
          <span className="hidden truncate sm:inline">
            Search repositories, files, commits...
          </span>
          <span className="sm:hidden">Search...</span>
        </div>
      </div>

      <div className="shrink-0">
        <Button variant="secondary">Connect GitHub</Button>
      </div>
    </header>
  );
}


export function AppLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {isMobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileNav}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}

      <Sidebar
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
      />

      <div className="min-w-0 flex-1">
        <Topbar
          onMenuClick={() => setIsMobileNavOpen(true)}
        />

        <main className="min-w-0 p-4 sm:p-6">
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
            <RiskBadge level="med" />
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


const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "commit-chronicles",
    description: "Engineering intelligence and code-risk analysis platform.",
    branch: "main",
    commits: 248,
    risk: "high",
    lastScan: "10 minutes ago",
  },
  {
    id: "2",
    name: "field-sales-tracker",
    description: "Field sales tracking and reporting application.",
    branch: "develop",
    commits: 186,
    risk: "med",
    lastScan: "35 minutes ago",
  },
  {
    id: "3",
    name: "blood-connect",
    description: "Connect blood donors with people who need blood.",
    branch: "main",
    commits: 124,
    risk: "low",
    lastScan: "2 hours ago",
  },
  {
    id: "4",
    name: "api-service",
    description: "REST API service for application data and authentication.",
    branch: "main",
    commits: 312,
    risk: "high",
    lastScan: "Yesterday",
  },
  {
    id: "5",
    name: "analytics-dashboard",
    description: "Interactive dashboard for engineering metrics.",
    branch: "main",
    commits: 97,
    risk: "med",
    lastScan: "Yesterday",
  },
  {
    id: "6",
    name: "documentation",
    description: "Project documentation and developer guides.",
    branch: "main",
    commits: 56,
    risk: "low",
    lastScan: "2 days ago",
  },
];


export function RepositoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredRepositories = useMemo(() => {
    return mockRepositories.filter((repository) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        repository.name.toLowerCase().includes(query) ||
        repository.description.toLowerCase().includes(query);

      const matchesRisk =
        riskFilter === "all" || repository.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, riskFilter]);

  return (
    <PageContainer>
      <section className="space-y-6">
        {/* Page header and primary action */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            title="Repositories"
            description="Manage repositories and monitor their code health."
          />

          <button
            type="button"
            onClick={() =>
              alert(
                "Repository selection will be implemented with GitHub integration."
              )
            }
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
          >
            <Plus size={16} />
            Connect repository
          </button>
        </div>

        {/* Search and risk filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-md sm:flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search repositories..."
              aria-label="Search repositories"
              className="h-11 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground/40"
            />
          </div>

          <select
            value={riskFilter}
            onChange={(event) => setRiskFilter(event.target.value)}
            aria-label="Filter by risk level"
            className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-foreground/40 sm:w-48"
          >
            <option value="all">All risk levels</option>
            <option value="high">High risk</option>
            <option value="medium">Medium risk</option>
            <option value="low">Low risk</option>
          </select>
        </div>

        {/* Repository count */}
        <p className="text-sm text-muted">
          {filteredRepositories.length}{" "}
          {filteredRepositories.length === 1
            ? "repository"
            : "repositories"}
        </p>

        {/* Repository cards */}
        {filteredRepositories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredRepositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border px-6 py-12 text-center">
            <p className="font-medium">No repositories found</p>
            <p className="mt-2 text-sm text-muted">
              Try a different search term or risk filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setRiskFilter("all");
              }}
              className="mt-4 text-sm underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </PageContainer>
  );
}




export function AnalyticsPage() {
  return (
    <PageContainer className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Explore commit activity and codebase trends over time."
      />

      <SectionCard
        title="Repository Analytics"
        description="Analysis results will appear here once repository data is available."
      >
        <LoadingState message="Preparing analytics..." />
      </SectionCard>
    </PageContainer>
  );
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
