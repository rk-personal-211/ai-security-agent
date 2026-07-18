import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFoundPage(): JSX.Element {
  return (
    <Paper variant="outlined" sx={{ p: 8 }}>
      <Stack alignItems="center" spacing={2} textAlign="center">
        <Typography component="h2" variant="h3">404</Typography>
        <Typography variant="h5">Page not found</Typography>
        <Typography color="text.secondary">The page you requested does not exist.</Typography>
        <Button component={Link} to="/" variant="contained">Go to dashboard</Button>
      </Stack>
    </Paper>
  );
}
