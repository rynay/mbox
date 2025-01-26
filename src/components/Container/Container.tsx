import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode,
}

const Container: FC<Props> = ({ children }) => (
    <Box sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle, rgba(19,7,103,1) 4%, rgba(159,19,199,1) 89%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box
          component="div"
          sx={{
            width: 600,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#fefefe',
            padding: '5px 40px 15px',
            borderRadius: '5px',
          }}
        >
          {children}
        </Box>
      </Box>
);

export default Container;