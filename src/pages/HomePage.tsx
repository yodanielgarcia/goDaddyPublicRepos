import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Box,
  Pagination,
  Paper,
  Tooltip,
  TextField,
} from "@mui/material";
import { useRepoStore } from "../store/repoStore";

export default function HomePage() {
  const { repos, fetchRepos } = useRepoStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const reposPerPage = 8;

  useEffect(() => {
    const loadRepos = async () => {
      try {
        await fetchRepos();
      } catch (error) {
        setError(
          "Error fetching repositories. Please try again later. " + error
        );
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, [fetchRepos]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description &&
        repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedRepos = filteredRepos.slice(
    (page - 1) * reposPerPage,
    page * reposPerPage
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5, height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          fontWeight: "bold",
          color: "#ffffff",
          backgroundColor: "#0b757a",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <svg
          viewBox="0 0 27 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            height: "2rem",
            fill: "#ffffff",
          }}
        >
          <path d="M23.29 1.096c-2.806-1.747-6.5-1.335-9.795.733-3.284-2.066-6.98-2.48-9.783-.733-4.433 2.766-4.972 9.89-1.203 15.91 2.779 4.44 7.124 7.04 10.992 6.993 3.868.047 8.214-2.553 10.992-6.993 3.765-6.02 3.231-13.145-1.202-15.91zM4.548 15.736a14.403 14.403 0 0 1-1.74-3.977 11.347 11.347 0 0 1-.377-3.748c.168-2.224 1.076-3.957 2.554-4.88 1.479-.924 3.433-.977 5.515-.154.316.127.626.27.928.429a16.975 16.975 0 0 0-2.99 3.586c-2.288 3.655-2.986 7.725-2.187 10.967a14.883 14.883 0 0 1-1.703-2.223zm19.648-3.977a14.438 14.438 0 0 1-1.74 3.977 14.891 14.891 0 0 1-1.702 2.228c.714-2.908.229-6.469-1.522-9.81a.44.44 0 0 0-.633-.172l-5.459 3.406a.446.446 0 0 0-.142.613l.801 1.279a.444.444 0 0 0 .615.141l3.538-2.206c.115.343.23.68.315 1.028a11.35 11.35 0 0 1 .378 3.749c-.169 2.225-1.076 3.958-2.555 4.881a4.998 4.998 0 0 1-2.53.731h-.114a4.993 4.993 0 0 1-2.53-.73c-1.48-.924-2.388-2.657-2.556-4.882a11.383 11.383 0 0 1 .378-3.749 14.835 14.835 0 0 1 4.557-7.279 11.42 11.42 0 0 1 3.204-1.982c2.076-.824 4.034-.77 5.514.153s2.386 2.656 2.554 4.88c.085 1.26-.04 2.525-.371 3.744z"></path>
        </svg>
        GoDaddy Public Repositories
      </Typography>
      <TextField
        label="Search Repositories"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Paper
            elevation={2}
            sx={{ flex: 1, overflow: "auto", border: "1px solid #ddd" }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRepos.map((repo) => (
                    <Tooltip key={repo.id} title="Click to see more details" arrow>
                      <TableRow
                        onClick={() => window.location.href = `/repo/${repo.id}`} // Navegación al hacer clic
                        sx={{
                          textDecoration: "none",
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                      >
                        <TableCell>{repo.name}</TableCell>
                        <TableCell>{repo.description || "No description"}</TableCell>
                      </TableRow>
                    </Tooltip>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box display="flex" justifyContent="center" my={2}>
            <Pagination
              count={Math.ceil(filteredRepos.length / reposPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
