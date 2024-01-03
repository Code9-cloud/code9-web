import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
const CodeStyledTextField = styled(TextField)(({ theme }) => ({
    '& input': {
        fontFamily: 'Cascadia Code',
        color: 'white',
    }
}));
export default CodeStyledTextField;