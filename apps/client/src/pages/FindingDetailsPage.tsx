import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";

const finding = {
  id: "F-1001",
  title: "SQL Injection",
  severity: "Critical",
  description:
    "User-controlled input is directly concatenated into an SQL query, allowing attackers to execute arbitrary SQL statements.",

  scanner: "GitHub CodeQL",
  file: "src/routes/user.ts",
  source: "GitHub Code Scanning",

  cwe: "CWE-89",
  cve: "N/A",

  fixStatus: "Pending",

  references: [
    {
      title: "OWASP SQL Injection",
      url: "https://owasp.org/www-community/attacks/SQL_Injection",
    },
    {
      title: "CWE-89",
      url: "https://cwe.mitre.org/data/definitions/89.html",
    },
  ],
};

const getSeverityColor = (
  severity: string
):
  | "error"
  | "warning"
  | "success"
  | "default"
  | "info"
  | "secondary"
  | "primary" => {
  switch (severity.toLowerCase()) {
    case "critical":
      return "error";
    case "high":
      return "warning";
    case "medium":
      return "info";
    case "low":
      return "success";
    default:
      return "default";
  }
};

export default function FindingDetailsPage() {
  return (
    <Box p={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Finding Details
        </Typography>

        <Chip
          label={finding.severity}
          color={getSeverityColor(finding.severity)}
        />
      </Stack>

      <Grid container spacing={3}>
        {/* Finding Information */}

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {finding.title}
              </Typography>

              <Typography color="text.secondary" mb={3}>
                {finding.description}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography fontWeight={600}>Scanner</Typography>
                  <Typography>{finding.scanner}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight={600}>Source</Typography>
                  <Typography>{finding.source}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight={600}>Affected File</Typography>
                  <Typography>{finding.file}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight={600}>Fix Status</Typography>
                  <Chip
                    label={finding.fixStatus}
                    color="warning"
                    size="small"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight={600}>CWE</Typography>
                  <Typography>{finding.cwe}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight={600}>CVE</Typography>
                  <Typography>{finding.cve}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                References
              </Typography>

              <Stack spacing={1}>
                {finding.references.map((reference) => (
                  <Link
                    key={reference.url}
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    {reference.title}
                  </Link>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Placeholder */}

        <Grid item xs={12} md={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                AI Security Analysis
              </Typography>

              <Alert severity="info" sx={{ mb: 3 }}>
                AI integration is not available yet.
              </Alert>

              <Stack spacing={3}>
                <Box>
                  <Typography fontWeight={700}>
                    Root Cause
                  </Typography>

                  <Typography color="text.secondary">
                    Placeholder
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={700}>
                    Business Impact
                  </Typography>

                  <Typography color="text.secondary">
                    Placeholder
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={700}>
                    Attack Scenario
                  </Typography>

                  <Typography color="text.secondary">
                    Placeholder
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={700}>
                    Recommendation
                  </Typography>

                  <Typography color="text.secondary">
                    Placeholder
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={700}>
                    Confidence Score
                  </Typography>

                  <Typography color="text.secondary">
                    --
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  disabled
                >
                  Analyze with AI (Coming Soon)
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}