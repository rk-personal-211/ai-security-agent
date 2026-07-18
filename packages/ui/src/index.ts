import { createTheme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export function createAppTheme(mode: ThemeMode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: mode === "light" ? "#1d4ed8" : "#93c5fd" },
      background: {
        default: mode === "light" ? "#f6f8fc" : "#0f172a",
        paper: mode === "light" ? "#ffffff" : "#172033",
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      h4: { fontWeight: 700, letterSpacing: "-0.02em" },
      h5: { fontWeight: 700, letterSpacing: "-0.01em" },
    },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    },
  });
}
