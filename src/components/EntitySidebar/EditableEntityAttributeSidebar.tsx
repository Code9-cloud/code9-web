import {Box, IconButton, MenuItem, Select, TextField, Typography} from "@mui/material";
import {ArrowDropDown, ArrowDropUp, Key as KeyIcon} from "@mui/icons-material";
import React from "react";
import { createTheme } from '@mui/material/styles';
import "../../fonts/font.css"
import "./editable-sidebar.css"
import {ThemeProvider} from "@mui/material/styles";
import CodeStyledTextField from "../CodeStyled/CodeStyledTextField";
import CodeStyledMenuItem from "../CodeStyled/CodeStyledMenuItem";
import CodeStyledTypography from "../CodeStyled/CodeStyledTypography";
import CustomTextField from "../CustomComponents/CustomTextField";
import CodeStyledDropDown from "../CodeStyled/CodeStyledDropDown";

function EditableEntityAttributeSidebar( {data, isEditing} : any) {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [attributeCopy, setAttributeCopy] = React.useState(data);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }


    return (
        <>
        
            <div>
                <Box sx={{backgroundColor: "#2A2A4D", padding: "4px 0", borderRadius: "5px"}}>
                        <Box
                            sx={{
                                display: "flex",
                                marginLeft: "5px",
                            }}>
                            {/* {data.isPrimary && <KeyIcon />} */}
                            {!isEditing && (<CodeStyledTypography style={{fontSize: "14px", marginLeft: "5px", padding: "0", height: "25px"}} variant="body2">{data.name}</CodeStyledTypography>)}
                            {isEditing && (<CodeStyledTextField inputProps={{style: {fontSize: "14px", marginLeft: "5px", padding: "0", height: "25px"}}} value={attributeCopy.name} onChange={(event) => { setAttributeCopy({...attributeCopy, name: event.target.value})}} />)}
                    <IconButton  onClick={toggleCollapse} style={{padding:'0', color: 'white', marginLeft: "auto"}} size={"small"} disableRipple={true}>{ isCollapsed ? <ArrowDropDown fontSize={"small"} /> : <ArrowDropUp fontSize={"small"}/> } {/* Replace with your chosen icon */}
                    </IconButton >
                        </Box>
                </Box>
            </div>
            { !isCollapsed && <div style={{padding: '5px 10px 0px'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: "10px",
                            marginBottom: "10px"
                        }}>
                        <CodeStyledTypography variant="caption" className="entity-attribute--sidebar">ID</CodeStyledTypography>
                        { !isEditing && <CodeStyledTypography variant="caption">{data.id}</CodeStyledTypography> }
                        { isEditing && <CodeStyledTextField inputProps={{style: {padding: "7px 13px", fontSize: "12px", width: "126px", border: "1px solid white", borderRadius: "3px"}}}   value={attributeCopy.id} onChange={(event) => { setAttributeCopy({...attributeCopy, id: event.target.value})}} /> }
                    </Box>
                    <CodeStyledDropDown title="type" pdata={data.type} isEditing={isEditing} attributeCopy={attributeCopy} setAttributeCopy={setAttributeCopy}  />
                    <CodeStyledDropDown title="Required" pdata={data.isRequired} isEditing={isEditing} attributeCopy={attributeCopy} setAttributeCopy={setAttributeCopy}  />
                    <CodeStyledDropDown title="Unique" pdata={data.isUnique} isEditing={isEditing} attributeCopy={attributeCopy} setAttributeCopy={setAttributeCopy}  />
                    {/* <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: 'white',
                            // marginBottom: "10px"
                        }}
                        >
                        <CodeStyledTypography variant="caption">type</CodeStyledTypography>
                        { !isEditing && <CodeStyledTypography variant="caption">{data.type}</CodeStyledTypography> }
                        { isEditing && <Select style={{marginTop: "10px", fontFamily: 'Cascadia Code', color: "white" , height: "25px", fontSize: "12px", width: "155px", border: "1px solid white", borderRadius: "3px"}} className="entity-attribute-sidebar-textfield" value={attributeCopy.type} onChange={(event) => { setAttributeCopy({...attributeCopy, type: event.target.value})}}>
                            <CodeStyledMenuItem style={{ padding: "1px 15px"}} value="string">String</CodeStyledMenuItem>
                            <CodeStyledMenuItem style={{ padding: "5px 15px"}} value="number">Number</CodeStyledMenuItem>
                            {!data.isPrimary && <CodeStyledMenuItem style={{ padding: "5px 15px"}} value="boolean">Boolean</CodeStyledMenuItem>}
                            {!data.isPrimary && <CodeStyledMenuItem style={{ padding: "5px 15px"}} value="entity_ref">EntityRef</CodeStyledMenuItem>}
                            {!data.isPrimary && <CodeStyledMenuItem style={{ padding: "5px 15px"}} value="attribute_ref">AttributeRef</CodeStyledMenuItem>}
                            </Select>}
                    </Box> */}
                    {/* <CustomTextField title="Required" isEditing={isEditing} pdata={data.isRequired} attributeCopy={attributeCopy.isRequired} mainAttribute={attributeCopy} setAttributeCopy={setAttributeCopy} /> */}
                    {/* <CustomTextField title="Unique" isEditing={isEditing} pdata={data.isUnique} attributeCopy={attributeCopy.isUnique} mainAttribute={attributeCopy} setAttributeCopy={setAttributeCopy} /> */}
                    {/* <Box
                    
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <CodeStyledTypography variant="caption" >Required</CodeStyledTypography>
                        { !isEditing && <CodeStyledTypography variant="caption">{data.isRequired ? 'true' : 'false'}</CodeStyledTypography> }
                        { isEditing && <input type="checkbox" checked={attributeCopy.isRequired} onChange={(event) => { setAttributeCopy({...attributeCopy, isRequired: event.target.checked})}} /> }
                    </Box> */}
                    {/* <Box
                        typography={{
                            FontFace: "Cascadia Code"
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontFamily: 'Cascadia Code'
                        }}>
                        <CodeStyledTypography variant="caption">Unique</CodeStyledTypography>
                        { !isEditing && <CodeStyledTypography variant="caption">{data.isUnique ? 'true' : 'false'}</CodeStyledTypography> }
                        { isEditing && <input type="checkbox" checked={attributeCopy.isUnique} onChange={(event) => { setAttributeCopy({...attributeCopy, isUnique: event.target.checked})}} /> }
                    </Box> */}
            </div> }
        </>);
}

export default EditableEntityAttributeSidebar;