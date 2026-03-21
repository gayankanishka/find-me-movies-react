import React from 'react';
import { Box, Skeleton } from '@mui/material';

function SkeltonLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          animation="wave"
          width={185}
          height={270}
          sx={{
            borderRadius: '12px',
            bgcolor: 'rgba(129,140,248,0.08)',
            flexShrink: 0
          }}
        />
      ))}
    </Box>
  );
}

export default SkeltonLoader;
