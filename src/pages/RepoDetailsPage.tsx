import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useRepoStore } from "../store/repoStore";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RepoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const repoId = Number(id);
  const { repos, fetchRepos } = useRepoStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepoData = async () => {
      try {
        if (repos.length === 0) {
          await fetchRepos();
        }
      } catch (error) {
        setError("Error fetching repository data. Please try again later."+error);
      } finally {
        setLoading(false);
      }
    };

    loadRepoData();
  }, [repos, fetchRepos]);

  const repo = repos.find((r) => r.id === repoId);

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={10} textAlign="center">
        <Typography variant="h5" color="error">
          {error}
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Home List
        </Button>
      </Box>
    );
  }

  if (!repo) {
    return (
      <Box mt={10} textAlign="center">
        <Typography variant="h5" color="error">
          Repository not found
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Home List
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="80vh">
      {/* Botón Back to Home List centrado con estilos personalizados */}
      <Box width="100%" textAlign="center" mb={2} mt={2}>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            backgroundColor: "#0b757a", // Color de fondo
            color: "#ffffff", // Color de texto
            padding: "0.5rem 1rem", // Espaciado interno
            borderRadius: "8px", // Bordes redondeados
            "&:hover": {
              backgroundColor: "#095c5e", // Color de fondo al pasar el mouse
            },
          }}
        >
          Back to Home List
        </Button>
      </Box>
      <Card sx={{ maxWidth: 500, width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {repo.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {repo.description || "No description"}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <img
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login}'s avatar`}
              style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10 }}
            />
            <Typography variant="body2">
              Owner: <Link href={repo.owner.html_url} target="_blank">{repo.owner.login}</Link>
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label={`Stars: ${repo.stargazers_count}`} />
            <Chip label={`Forks: ${repo.forks_count}`} />
            <Chip label={`Open Issues: ${repo.open_issues_count}`} />
            <Chip label={`Watchers: ${repo.watchers_count}`} />
          </Stack>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Created at: {new Date(repo.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Last updated: {new Date(repo.updated_at).toLocaleDateString()}
          </Typography>
          {repo.license && (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              License: <Link href={repo.license.url} target="_blank">{repo.license.name}</Link>
            </Typography>
          )}
          {repo.archived && (
            <Typography variant="body2" color="error" gutterBottom>
              This repository is archived.
            </Typography>
          )}
          <Button
            component={Link}
            href={repo.html_url}
            target="_blank"
            rel="noopener"
            endIcon={<GitHubIcon />}
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
          >
            See on GitHub
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
