import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination() {
  return (
    <div className="flex justify-center items-center py-16">
      <Stack spacing={2}>
        <Pagination 
          count={5} 
          shape="rounded" 
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '16px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              color: '#94a3b8',
              border: '1px solid rgba(255,255,255,0.05)',
              bgcolor: 'rgba(30, 41, 59, 0.5)',
              '&.Mui-selected': {
                bgcolor: '#6366f1',
                color: 'white',
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)',
                '&:hover': {
                  bgcolor: '#4f46e5',
                }
              },
              '&:hover': {
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                color: '#8b5cf6',
                borderColor: 'rgba(99, 102, 241, 0.3)',
              }
            }
          }}
        />
      </Stack>
    </div>
  );
}
