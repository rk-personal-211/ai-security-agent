import { CircularProgress, Paper, Stack, Typography } from "@mui/material";

export function LoadingPage(): JSX.Element {
  return (
    <Paper variant="outlined" sx={{ p: 8 }}>
      <Stack alignItems="center" spacing={2}>
        <CircularProgress aria-label="Loading" />
        <Typography component="h2" variant="h6">Loading your security workspace</Typography>
        <Typography color="text.secondary">This is a frontend shell loading-state preview.</Typography>
      </Stack>
    </Paper>
  );
}
