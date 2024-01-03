import React from "react";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";

const CodeStyledSelect = styled(Select)(({ theme }) => ({
    fontFamily: "Cascadia Code",
    color: "white",
    height: "30px",
    fontSize: "12px",
    width: "155px",
    border: "1px solid white",
}))

export default CodeStyledSelect