import {Box, IconButton, MenuItem, TextField, Typography} from "@mui/material";
import {ArrowDropDown, ArrowDropUp, Key as KeyIcon} from "@mui/icons-material";
import React from "react";

function EditableEntityAttributeSidebar( {data, isEditing} : any) {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [attributeCopy, setAttributeCopy] = React.useState(data);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }
    return (
        <>
            <div style={{padding: isCollapsed ? '5px 10px' : '5px 10px 0px', borderTop: '1px solid #2B2B38'}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // padding: '5px 10px',
                        // Add additional styling as needed
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                        }}>
                        {data.isPrimary && <KeyIcon />}
                        {!isEditing && (<Typography variant="body2">{data.name}</Typography>)}
                        {isEditing && (<TextField value={attributeCopy.name} onChange={(event) => { setAttributeCopy({...attributeCopy, name: event.target.value})}} />)}
                    </Box>
                    <IconButton onClick={toggleCollapse} style={{padding:'0'}} size={"small"} disableRipple={true}>{ isCollapsed ? <ArrowDropDown fontSize={"small"} /> : <ArrowDropUp fontSize={"small"}/> } {/* Replace with your chosen icon */}
                    </IconButton>
                </Box>
            </div>
            { !isCollapsed && <div style={{padding: '5px 10px 5px', backgroundColor: '#2A2A4D'}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">ID</Typography>
                    { !isEditing && <Typography variant="caption">{data.id}</Typography> }
                    { isEditing && <TextField value={attributeCopy.id} onChange={(event) => { setAttributeCopy({...attributeCopy, id: event.target.value})}} /> }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">type</Typography>
                    { !isEditing && <Typography variant="caption">{data.type}</Typography> }
                    { isEditing && <TextField select value={attributeCopy.type} onChange={(event) => { setAttributeCopy({...attributeCopy, type: event.target.value})}}>
                        <MenuItem value="string">String</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        {!data.isPrimary && <MenuItem value="boolean">Boolean</MenuItem>}
                        {!data.isPrimary && <MenuItem value="entity_ref">EntityRef</MenuItem>}
                        {!data.isPrimary && <MenuItem value="attribute_ref">AttributeRef</MenuItem>}
                    </TextField> }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">Required</Typography>
                    { !isEditing && <Typography variant="caption">{data.isRequired ? 'true' : 'false'}</Typography> }
                    { isEditing && <input type="checkbox" checked={attributeCopy.isRequired} onChange={(event) => { setAttributeCopy({...attributeCopy, isRequired: event.target.checked})}} /> }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">Unique</Typography>
                    { !isEditing && <Typography variant="caption">{data.isUnique ? 'true' : 'false'}</Typography> }
                    { isEditing && <input type="checkbox" checked={attributeCopy.isUnique} onChange={(event) => { setAttributeCopy({...attributeCopy, isUnique: event.target.checked})}} /> }
                </Box>
            </div> }
        </>);
}

export default EditableEntityAttributeSidebar;