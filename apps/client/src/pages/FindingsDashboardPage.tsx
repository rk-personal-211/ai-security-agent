import { useMemo, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { Box, Chip, InputAdornment, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import { mockFindings, type FindingSeverity, type MockFinding } from "../features/findings/mock-findings.js";

const severityColor: Record<FindingSeverity, "error" | "warning" | "info" | "success"> = {
  Critical: "error",
  High: "warning",
  Low: "success",
  Medium: "info",
};

const columns: GridColDef<MockFinding>[] = [
  { field: "severity", headerName: "Severity", minWidth: 105, renderCell: (params) => <Chip color={severityColor[params.row.severity]} label={params.row.severity} size="small" /> },
  { field: "title", flex: 1, headerName: "Title", minWidth: 240 },
  { field: "scanner", headerName: "Scanner", minWidth: 120 },
  { field: "cwe", headerName: "CWE", minWidth: 100 },
  { field: "cve", headerName: "CVE", minWidth: 145, valueGetter: (_value, row) => row.cve ?? "—" },
  { field: "filePath", headerName: "File", minWidth: 220 },
  {
    field: "fixAvailable",
    headerName: "Fix available",
    minWidth: 130,
    renderCell: (params) => <Chip color={params.value ? "success" : "default"} label={params.value ? "Available" : "Manual review"} size="small" variant={params.value ? "filled" : "outlined"} />,
  },
];

export function FindingsDashboardPage(): JSX.Element {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<"all" | FindingSeverity>("all");
  const navigate = useNavigate();

  const filteredFindings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return mockFindings.filter((finding) => {
      const isSeverityMatch = severity === "all" || finding.severity === severity;
      const searchableText = [finding.title, finding.scanner, finding.cwe, finding.cve, finding.filePath, finding.repository].join(" ").toLowerCase();

      return isSeverityMatch && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
  }, [search, severity]);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography component="h2" variant="h4">Findings</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.75 }}>Mock security findings from GitHub, Dependabot, and SARIF sources.</Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Search findings"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Title, scanner, CWE, CVE, or file"
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
            value={search}
          />
          <TextField label="Severity" onChange={(event) => setSeverity(event.target.value as "all" | FindingSeverity)} select sx={{ minWidth: { md: 180 } }} value={severity}>
            <MenuItem value="all">All severities</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ height: 600, width: "100%" }}>
        <DataGrid
          columns={columns}
          disableRowSelectionOnClick
          onRowClick={(params) => navigate(`/findings/${params.row.id}`)}
          pageSizeOptions={[5, 10, 25]}
          pagination
          rows={filteredFindings}
          sx={{ border: 0, "& .MuiDataGrid-row": { cursor: "pointer" } }}
        />
      </Paper>
    </Stack>
  );
}
