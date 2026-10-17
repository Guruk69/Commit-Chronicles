
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import "./index.css";

import {
  AnalyticsPage,
  AppLayout,
  DashboardPage,
  IntegrationsPage,
  ReportsPage,
  RepositoriesPage,
  RiskAnalysisPage,
  ScheduledScansPage,
  SettingsPage,
  TeamPage,
} from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "repositories", Component: RepositoriesPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "risk-analysis", Component: RiskAnalysisPage },
      { path: "reports", Component: ReportsPage },
      { path: "scheduled-scans", Component: ScheduledScansPage },
      { path: "integrations", Component: IntegrationsPage },
      { path: "team", Component: TeamPage },
      { path: "settings", Component: SettingsPage },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
