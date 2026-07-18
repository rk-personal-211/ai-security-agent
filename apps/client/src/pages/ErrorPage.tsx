import { ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ErrorPage(): JSX.Element {
  return (
    <Paper variant="outlined" sx={{ p: 8 }}>
      <Stack alignItems="center" spacing={2} textAlign="center">
        <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
        <Typography component="h2" variant="h5">We could not load this view</Typography>
        <Typography color="text.secondary">No data was changed. Please try again or return to the dashboard.</Typography>
        <Button component={Link} to="/" variant="contained">Return to dashboard</Button>
      </Stack>
    </Paper>
  );
}
