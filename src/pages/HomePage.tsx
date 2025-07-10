import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Tooltip,
} from "@mui/material";
import { useRepoStore } from "../store/repoStore";
import CustomPagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Tittle from "../components/Tittle";

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
      <Tittle />
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
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
                    <Tooltip
                      key={repo.id}
                      title="Click to see more details"
                      arrow
                    >
                      <TableRow
                        onClick={() =>
                          (window.location.href = `/detail/${repo.id}`)
                        }
                        sx={{
                          textDecoration: "none",
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                      >
                        <TableCell>{repo.name}</TableCell>
                        <TableCell>
                          {repo.description || "No description"}
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box display="flex" justifyContent="center" my={2}>
            <CustomPagination
              count={Math.ceil(filteredRepos.length / reposPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
