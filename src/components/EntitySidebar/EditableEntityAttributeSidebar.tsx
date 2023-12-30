import {Box, IconButton, MenuItem, Select, TextField, Typography} from "@mui/material";
import {ArrowDropDown, ArrowDropUp, Key as KeyIcon} from "@mui/icons-material";
import React from "react";
import { createTheme } from '@mui/material/styles';
import "../../fonts/font.css"
import "./editable-sidebar.css"
import {ThemeProvider} from "@mui/material/styles";

function EditableEntityAttributeSidebar( {data, isEditing} : any) {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [attributeCopy, setAttributeCopy] = React.useState(data);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    const theme = createTheme({
        typography: {
            fontFamily: "Cascadia Code",
        },
    })

    return (
        <>
        
            <div style={{borderTop: '1px solid #2B2B38',}}>
                <Box>
                    <ThemeProvider theme={theme}>
                        <Box
                            sx={{
                                display: "flex",
                            }}>
                            {data.isPrimary && <KeyIcon />}
                            {!isEditing && (<Typography style={{fontSize: "14px", marginLeft: "5px", padding: "0", height: "25px"}} variant="body2">{data.name}</Typography>)}
                            {isEditing && (<TextField inputProps={{style: {height: "25px", fontSize: "14px", padding: "0", color: 'white', marginLeft: "5px"}}} value={attributeCopy.name} onChange={(event) => { setAttributeCopy({...attributeCopy, name: event.target.value})}} />)}
                    <IconButton  onClick={toggleCollapse} style={{padding:'0', color: 'white', marginLeft: "auto"}} size={"small"} disableRipple={true}>{ isCollapsed ? <ArrowDropDown fontSize={"small"} /> : <ArrowDropUp fontSize={"small"}/> } {/* Replace with your chosen icon */}
                    </IconButton >
                        </Box>
                    </ThemeProvider>
                </Box>
            </div>
            { !isCollapsed && <div style={{padding: '5px 10px 5px', backgroundColor: '#2A2A4D'}}>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Typography variant="caption" className="entity-attribute--sidebar">ID</Typography>
                        { !isEditing && <Typography variant="caption">{data.id}</Typography> }
                        { isEditing && <TextField inputProps={{style: {color: "white", padding: '0 0 0 3px', fontSize: "12px", width: "150px", border: "1px solid white", borderRadius: "3px"}}}   value={attributeCopy.id} onChange={(event) => { setAttributeCopy({...attributeCopy, id: event.target.value})}} /> }
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: 'white'
                        }}>
                        <Typography variant="caption">type</Typography>
                        { !isEditing && <Typography variant="caption">{data.type}</Typography> }
                        { isEditing && <Select style={{color: "white", padding: "0 0 0", height: "15px", fontSize: "12px", width: "155px", border: "1px solid white", borderRadius: "3px"}} className="entity-attribute-sidebar-textfield" value={attributeCopy.type} onChange={(event) => { setAttributeCopy({...attributeCopy, type: event.target.value})}}>
                            <MenuItem style={{ height: "15px", fontSize: "12px", padding: "1px  15px"}} value="string">String</MenuItem>
                            <MenuItem style={{ height: "15px", fontSize: "12px", padding: "5px 15px"}} value="number">Number</MenuItem>
                            {!data.isPrimary && <MenuItem style={{ height: "15px", fontSize: "12px", padding: "5px 15px"}} value="boolean">Boolean</MenuItem>}
                            {!data.isPrimary && <MenuItem style={{ height: "15px", fontSize: "12px", padding: "5px 15px"}} value="entity_ref">EntityRef</MenuItem>}
                            {!data.isPrimary && <MenuItem style={{ height: "15px", fontSize: "12px", padding: "5px 15px"}} value="attribute_ref">AttributeRef</MenuItem>}
                        </Select> }
                    </Box>
                    <Box
                    
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Typography variant="caption" >Required</Typography>
                        { !isEditing && <Typography variant="caption">{data.isRequired ? 'true' : 'false'}</Typography> }
                        { isEditing && <input type="checkbox" checked={attributeCopy.isRequired} onChange={(event) => { setAttributeCopy({...attributeCopy, isRequired: event.target.checked})}} /> }
                    </Box>
                    <Box
                        typography={{
                            FontFace: "Cascadia Code"
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontFamily: 'Cascadia Code'
                        }}>
                        <Typography variant="caption">Unique</Typography>
                        { !isEditing && <Typography variant="caption">{data.isUnique ? 'true' : 'false'}</Typography> }
                        { isEditing && <input type="checkbox" checked={attributeCopy.isUnique} onChange={(event) => { setAttributeCopy({...attributeCopy, isUnique: event.target.checked})}} /> }
                    </Box>
                </ThemeProvider>
            </div> }
        </>);
}

export default EditableEntityAttributeSidebar;