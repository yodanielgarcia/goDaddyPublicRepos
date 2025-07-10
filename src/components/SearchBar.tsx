import React from "react";
import { TextField } from "@mui/material";
import type { SearchBarProps } from "../types/IListItems";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <TextField
      label="Search Repositories"
      variant="outlined"
      fullWidth
      sx={{ mb: 3 }}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;