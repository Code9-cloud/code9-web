import React from "react";
import { Box } from "@mui/material";
import CodeStyledTypography from "../CodeStyled/CodeStyledTypography";

const CustomTextField = ({ title, pdata, isEditing, attributeCopy, setAttributeCopy, mainAttribute}: any) => {
    return (
            <Box
                    
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: "10px"
                }}>
                <CodeStyledTypography variant="caption" >{title}</CodeStyledTypography>
                { !isEditing && <CodeStyledTypography variant="caption">{pdata ? 'true' : 'false'}</CodeStyledTypography> }
                { isEditing && (title==="Required") && <input type="checkbox" checked={attributeCopy} onChange={(event) => { setAttributeCopy({...mainAttribute, isRequired : event.target.checked})}} /> }
                { isEditing && (title==="Unique") && <input type="checkbox" checked={attributeCopy} onChange={(event) => { setAttributeCopy({...mainAttribute, isUnique : event.target.checked})}} /> }
            </Box>
    );
};

export default CustomTextField