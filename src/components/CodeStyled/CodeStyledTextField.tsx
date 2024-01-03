import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
const CodeStyledTextField = styled(TextField)(({ }) => ({
    '& input': {
        fontFamily: 'Cascadia Code',
    }
}));
export default CodeStyledTextField;