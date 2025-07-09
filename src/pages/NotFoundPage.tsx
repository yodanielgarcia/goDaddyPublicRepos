import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom color="error">
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
}