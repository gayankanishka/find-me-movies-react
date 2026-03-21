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
        <Box key={index} sx={{ flexShrink: 0, width: 185 }}>
          {/* Poster */}
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={185}
            height={220}
            sx={{
              borderRadius: '12px',
              bgcolor: 'rgba(232,184,75,0.06)'
            }}
          />
          {/* Info bar */}
          <Box sx={{ pt: 1, px: 0.5 }}>
            <Skeleton
              variant="text"
              animation="wave"
              width="80%"
              sx={{ bgcolor: 'rgba(232,184,75,0.06)', borderRadius: '4px' }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              width="40%"
              sx={{ bgcolor: 'rgba(232,184,75,0.04)', borderRadius: '4px' }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default SkeltonLoader;
