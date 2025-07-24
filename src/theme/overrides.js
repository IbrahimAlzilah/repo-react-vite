// src/theme/overrides.js
const overrides = (mode) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        textTransform: 'none',
        ...(mode === 'dark' && {
          backgroundColor: '#333',
          '&:hover': {
            backgroundColor: '#444',
          },
        }),
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderRadius: 8,
      },
    },
  },
  // Add more component overrides here...
});

export default overrides;
