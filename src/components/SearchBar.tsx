import React from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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