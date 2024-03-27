import { createTheme, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
            light: '#dfe1e7'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
        white: {
            main: '#fff'
        }
    }
});

export const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);
