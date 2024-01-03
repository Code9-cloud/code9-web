import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";

const CodeStyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: "white",
    fontFamily: "Cascadia Code",
    height: '15px',
    fontSize: '12px',
    padding: "5px 15px",
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between"
}));

export default CodeStyledMenuItem