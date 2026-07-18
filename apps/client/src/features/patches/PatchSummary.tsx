import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

export default function PatchSummary({
  patch,
}: any) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          AI Recommendation
        </Typography>

        <Typography mt={2}>
          {patch.explanation}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          mt={3}
        >
          <Chip
            label={`Confidence ${patch.confidence}%`}
            color="success"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}