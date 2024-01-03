import React from "react";
import { Box, InputAdornment, Select } from "@mui/material";
import CodeStyledTypography from "./CodeStyledTypography";
import CodeStyledMenuItem from "./CodeStyledMenuItem";
import RectangleIcon from '@mui/icons-material/Rectangle';
import CodeStyledSelect from "./CodeStyledSelect";

const CodeStyledDropDown = ({title, isEditing, pdata, attributeCopy, setAttributeCopy}: any) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                marginBottom: "10px",
                marginTop: "15px",
                // border: "1px solid red",
            }}
            >
            {console.log(pdata)}
            <CodeStyledTypography variant="caption">{title}</CodeStyledTypography>
            { title==="type" && !isEditing && <CodeStyledTypography variant="caption">{pdata}</CodeStyledTypography> }
            { title==="type" && isEditing && <CodeStyledSelect value={attributeCopy.type} onChange={(event) => { setAttributeCopy({...attributeCopy, type: event.target.value})}}>
                <CodeStyledMenuItem value="string">String</CodeStyledMenuItem>
                <CodeStyledMenuItem value="number">Number</CodeStyledMenuItem>
                {!pdata.isPrimary && <CodeStyledMenuItem value="boolean">Boolean</CodeStyledMenuItem>}
                {!pdata.isPrimary && <CodeStyledMenuItem value="entity_ref">EntityRef</CodeStyledMenuItem>}
                {!pdata.isPrimary && <CodeStyledMenuItem value="attribute_ref">AttributeRef</CodeStyledMenuItem>}
                </CodeStyledSelect>}

            { title==="Required" && !isEditing && <CodeStyledTypography variant="caption">{pdata ? 'true' : 'false'}</CodeStyledTypography> }
            { title==="Required" && isEditing && <CodeStyledSelect value={attributeCopy.isRequired} onChange={(event) => { setAttributeCopy({...attributeCopy, isRequired: event.target.value})}}>
                <CodeStyledMenuItem value="true"><span>true</span> &ensp;</CodeStyledMenuItem>
                <CodeStyledMenuItem value="false"><span>false</span> &ensp;</CodeStyledMenuItem>
                </CodeStyledSelect>}

            { title==="Unique" && !isEditing && <CodeStyledTypography variant="caption">{pdata ? 'true' : 'false'}</CodeStyledTypography> }
            { title==="Unique" && isEditing && <CodeStyledSelect value={attributeCopy.isUnique} onChange={(event) => { setAttributeCopy({...attributeCopy, isUnique: event.target.value})}}>
                <CodeStyledMenuItem value="true"><span>true</span> &ensp;</CodeStyledMenuItem>
                <CodeStyledMenuItem value="false"><span>false</span> &ensp;</CodeStyledMenuItem>
                </CodeStyledSelect>}
        </Box>
    );
}

export default CodeStyledDropDown;