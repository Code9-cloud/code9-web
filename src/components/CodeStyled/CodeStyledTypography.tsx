import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const CodeStyledTypography = styled(Typography) (({theme, fsize}: any) => ({
    fontFamily: 'Cascadia Code',
    marginLeft: "5px",
    padding: "0",
    color: "white"
}));

export default CodeStyledTypography;