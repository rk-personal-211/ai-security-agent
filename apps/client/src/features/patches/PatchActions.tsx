import { Button, Stack } from "@mui/material";

export default function PatchActions() {
  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button variant="outlined">Regenerate</Button>

      <Button variant="contained">Approve Patch</Button>
    </Stack>
  );
}
