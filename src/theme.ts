import { createTheme } from '@mui/material/styles';
import "./fonts/font.css"

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#12111C',
        },
    },
    typography: {
        allVariants: {
            fontFamily: ['Plus Jakarta Sans', "Cascadia Code"].join(",")
        }
    }
});

export default theme;