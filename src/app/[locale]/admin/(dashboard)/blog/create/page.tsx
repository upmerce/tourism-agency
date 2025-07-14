// -------------------------------------------------------------------------
// 3. COMPLETE FILE: /src/app/[locale]/admin/(dashboard)/blog/create/page.tsx
// This file remains the same.
// -------------------------------------------------------------------------
import CreateArticleForm from "@/components/admin/CreateArticleForm";
import { Box, Typography, Paper } from "@mui/material";

export default function CreateArticlePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Create New Article
      </Typography>
      <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
        <CreateArticleForm />
      </Paper>
    </Box>
  );
}
