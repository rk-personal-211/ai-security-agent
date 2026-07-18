import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { createAppTheme, type ThemeMode } from "@security-agent/ui";
import { AppLayout } from "../layouts/AppLayout.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import { EmptyStatePage } from "../pages/EmptyStatePage.js";
import { ErrorPage } from "../pages/ErrorPage.js";
import FindingDetailsPage from "../pages/FindingDetailsPage.js";
import { FindingsDashboardPage } from "../pages/FindingsDashboardPage.js";
import { LoadingPage } from "../pages/LoadingPage.js";
import { NotFoundPage } from "../pages/NotFoundPage.js";
import PatchReviewPage from "../pages/PatchReviewPage.js";
export function App(): JSX.Element {
  const [mode, setMode] = useState<ThemeMode>("light");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout
        mode={mode}
        onThemeToggle={() =>
          setMode((currentMode) => (currentMode === "light" ? "dark" : "light"))
        }
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/findings" element={<FindingsDashboardPage />} />
          <Route path="/findings/:findingId" element={<FindingDetailsPage />} />
          <Route path="/empty" element={<EmptyStatePage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/patch-review" element={<PatchReviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}
