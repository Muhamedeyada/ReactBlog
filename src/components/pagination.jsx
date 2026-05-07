import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination() {
  return (
    <div className="flex justify-center items-center py-12">
      <Stack spacing={2}>
        <Pagination 
          count={5} 
          shape="rounded" 
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '12px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              '&.Mui-selected': {
                bgcolor: '#15803d',
                color: 'white',
                '&:hover': {
                  bgcolor: '#14532d',
                }
              },
              '&:hover': {
                bgcolor: '#f0fdf4',
              }
            }
          }}
        />
      </Stack>
    </div>
  );
}
