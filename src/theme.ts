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
            // '"Plus Jakarta Sans"',
        ].join(','),
    },
});

export default theme;