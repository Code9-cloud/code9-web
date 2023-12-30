import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#12111C',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            // '"Cascadia Code"',
        ].join(','),
    },
});

export default theme;