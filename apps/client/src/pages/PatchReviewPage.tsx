import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

import PatchSummary from "../features/patches/PatchSummary.js";
import PatchDiffViewer from "../features/patches/PatchDiffViewer.js";
import PatchActions from "../features/patches/PatchActions.js";

export default function PatchReviewPage() {
  const patch = {
    explanation:
      "Replaced string concatenation with parameterized query.",

    confidence: 98,

    originalCode: `const query = \`SELECT * FROM users WHERE id=\${id}\`;`,

    patchedCode: `const query = "SELECT * FROM users WHERE id = ?";
db.query(query,[id]);`,
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Review AI Patch
      </Typography>

      <Stack spacing={3}>
        <PatchSummary patch={patch} />

        <Card>
          <CardContent>
            <PatchDiffViewer patch={patch} />
          </CardContent>
        </Card>

        <PatchActions />
      </Stack>
    </Box>
  );
}