import { DarkModeOutlined as DarkModeOutlinedIcon, LightModeOutlined as LightModeOutlinedIcon, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

import type { ThemeMode } from "@security-agent/ui";

interface AppHeaderProps {
  mode: ThemeMode;
  onMenuClick: () => void;
  onThemeToggle: () => void;
}

export function AppHeader({ mode, onMenuClick, onThemeToggle }: AppHeaderProps): JSX.Element {
  return (
    <AppBar color="inherit" elevation={0} position="sticky" sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ gap: 1 }}>
        <IconButton aria-label="Open navigation" edge="start" onClick={onMenuClick} sx={{ display: { lg: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography component="p" variant="subtitle2" color="text.secondary">Fix Factory</Typography>
          <Typography component="h1" variant="h6" fontWeight={700}>Security workspace</Typography>
        </Box>
        <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} theme`}>
          <IconButton aria-label="Toggle theme" onClick={onThemeToggle}>
            {mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
