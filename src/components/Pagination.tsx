import React from "react";
import { Pagination } from "@mui/material";
import type { PaginationProps } from "../types/IListItems";

const CustomPagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
    />
  );
};

export default CustomPagination;