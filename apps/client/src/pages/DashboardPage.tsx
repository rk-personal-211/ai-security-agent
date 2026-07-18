import {
  AddLink as AddLinkIcon,
  AutoFixHigh as AutoFixHighIcon,
  ErrorOutline as ErrorOutlineIcon,
  PriorityHigh as PriorityHighIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { Box, Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import { mockFindings, mockFindingSummary, type FindingSeverity } from "../features/findings/mock-findings.js";
import { RepositorySelector } from "../features/repositories/RepositorySelector.js";
import { beginGitHubOAuth } from "../services/github-service.js";

const severityColor: Record<FindingSeverity, "error" | "warning" | "info" | "success"> = {
  Critical: "error",
  High: "warning",
  Medium: "info",
  Low: "success",
};

const summaryCards = [
  { icon: <SecurityIcon color="primary" />, label: "Total findings", value: mockFindingSummary.total },
  { icon: <ErrorOutlineIcon color="error" />, label: "Critical", value: mockFindingSummary.critical },
  { icon: <PriorityHighIcon color="warning" />, label: "High", value: mockFindingSummary.high },
  { icon: <AutoFixHighIcon color="success" />, label: "Auto-fix available", value: mockFindingSummary.autoFixAvailable },
];

export function DashboardPage(): JSX.Element {
  return (
    <Stack spacing={4}>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography component="h2" variant="h4">Security overview</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>Review and remediate findings across your connected repositories.</Typography>
        </Box>
        <Button onClick={beginGitHubOAuth} startIcon={<AddLinkIcon />} variant="contained">Connect GitHub</Button>
      </Box>

      <RepositorySelector />

      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {summaryCards.map((card) => (
          <Paper key={card.label} variant="outlined" sx={{ p: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="text.secondary" variant="body2">{card.label}</Typography>
              {card.icon}
            </Stack>
            <Typography variant="h4" sx={{ mt: 1.5 }}>{card.value}</Typography>
          </Paper>
        ))}
      </Box>

      <Paper variant="outlined">
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography component="h3" variant="h6">Recent findings</Typography>
            <Typography variant="body2" color="text.secondary">Mock data for the frontend shell</Typography>
          </Box>
          <Button size="small" href="/findings">View all</Button>
        </Box>
        <TableContainer>
          <Table aria-label="Recent security findings">
            <TableHead><TableRow><TableCell>Finding</TableCell><TableCell>Severity</TableCell><TableCell>Scanner</TableCell><TableCell>Updated</TableCell></TableRow></TableHead>
            <TableBody>
              {mockFindings.map((finding) => (
                <TableRow hover key={finding.id}>
                  <TableCell><Typography fontWeight={600}>{finding.title}</Typography><Typography variant="caption" color="text.secondary">{finding.repository}</Typography></TableCell>
                  <TableCell><Chip color={severityColor[finding.severity]} label={finding.severity} size="small" /></TableCell>
                  <TableCell>{finding.scanner}</TableCell>
                  <TableCell>{finding.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
