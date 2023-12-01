import { styled } from '@mui/material/styles';
import {Tab} from "@mui/material";

const CustomTab = styled(Tab)(({ theme }) => ({
    // backgroundColor: selected ? 'lightblue' : 'transparent', // Change colors as needed
    borderRadius: '20px', // Adjust for more or less roundness
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1, 2),
    '&.Mui-selected': {
        backgroundColor: '#5245FF', // Hover effect
        opacity: 1,
        color: theme.palette.text.primary,
    },
}));

export default CustomTab;