import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

// Custom styled Pagination component to better fit the theme
const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default function BasicPagination() {
  return (
    <div className="flex justify-center items-center py-3">
      <Stack spacing={2}>
        <StyledPagination count={10} shape="rounded" />
      </Stack>
    </div>
  );
}
