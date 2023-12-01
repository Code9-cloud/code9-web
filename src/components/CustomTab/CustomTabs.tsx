import {styled} from "@mui/material/styles";
import {Tabs} from "@mui/material";

const CustomTabs = styled(Tabs)(({theme}) => ({
    '.MuiTabs-indicator': {
        'display': 'none',
    },
}));

export default CustomTabs;