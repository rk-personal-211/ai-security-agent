import { CloudUploadOutlined as CloudUploadOutlinedIcon } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

export function EmptyStatePage(): JSX.Element {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 4, md: 8 }, textAlign: "center" }}>
      <Stack alignItems="center" spacing={2}>
        <Box sx={{ bgcolor: "primary.50", borderRadius: "50%", display: "grid", height: 56, placeItems: "center", width: 56 }}><CloudUploadOutlinedIcon color="primary" /></Box>
        <Typography component="h2" variant="h5">No findings yet</Typography>
        <Typography color="text.secondary" maxWidth={440}>Connect a GitHub repository or upload a SARIF report to begin reviewing security findings.</Typography>
        <Button variant="contained">Connect repository</Button>
      </Stack>
    </Paper>
  );
}
