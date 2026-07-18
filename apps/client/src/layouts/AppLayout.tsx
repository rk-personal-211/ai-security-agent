import { useState, type PropsWithChildren } from "react";
import { Box, Container } from "@mui/material";

import type { ThemeMode } from "@security-agent/ui";
import { AppHeader } from "../components/AppHeader.js";
import { AppSidebar, appSidebarWidth } from "../components/AppSidebar.js";

interface AppLayoutProps extends PropsWithChildren {
  mode: ThemeMode;
  onThemeToggle: () => void;
}

export function AppLayout({ children, mode, onThemeToggle }: AppLayoutProps): JSX.Element {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex" }}>
      <AppSidebar isOpen={isNavigationOpen} onClose={() => setIsNavigationOpen(false)} />
      <Box component="section" sx={{ minWidth: 0, flexGrow: 1, ml: { lg: `${appSidebarWidth}px` } }}>
        <AppHeader mode={mode} onMenuClick={() => setIsNavigationOpen(true)} onThemeToggle={onThemeToggle} />
        <Container component="main" maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
