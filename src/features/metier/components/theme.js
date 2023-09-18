import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  overrides: {
    MuiDialog: {
      paper: {
        backgroundColor: 'lightblue',
        border: '2px solid blue',
      }
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: '80%',
          maxWidth: 'none',
        },
      },
    },
  },
});

export default theme;
