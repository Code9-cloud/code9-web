import {Box, IconButton, MenuItem, TextField, Typography} from "@mui/material";
import {ArrowDropDown, ArrowDropUp, Key as KeyIcon} from "@mui/icons-material";
import React from "react";
import {GlobalContext} from "../../GlobalContext";
import CodeStyledTextField from "../CodeStyled/CodeStyledTextField";

function EditableEntityAttributeSidebar( {data, selectedEntityId, isEditing, onChange} : any) {
    const { application } = React.useContext(GlobalContext);
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [attributeCopy, setAttributeCopy] = React.useState(data);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    const handleChange = (attributeCopy: any) => {
        onChange(attributeCopy);
        setAttributeCopy(attributeCopy);
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
                        {isEditing && (<CodeStyledTextField value={attributeCopy.name} onChange={(event) => { handleChange({...attributeCopy, name: event.target.value})}} />)}
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
                    <Typography variant="caption">{data.id}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">type</Typography>
                    { !isEditing && <Typography variant="caption">{data.type}</Typography> }
                    { isEditing && <TextField select value={attributeCopy.type} onChange={(event) => { handleChange({...attributeCopy, type: event.target.value})}}>
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
                    { !isEditing && (attributeCopy.type === 'entity_ref' || attributeCopy.type === 'attribute_ref') &&
                        <Typography variant="caption">Reference Entity</Typography> }
                    { !isEditing && (attributeCopy.type === 'entity_ref' || attributeCopy.type === 'attribute_ref') &&
                        <Typography variant="caption">{attributeCopy.referenceEntityId}</Typography>
                    }
                    { isEditing && (attributeCopy.type === 'entity_ref' || attributeCopy.type === 'attribute_ref') &&
                        <TextField
                            select
                            label="Reference Entity"
                            name="referenceEntityId"
                            value={attributeCopy.referenceEntityId ? attributeCopy.referenceEntityId : ''}
                            onChange={(event) => { handleChange({...attributeCopy, referenceEntityId: event.target.value})}}
                            fullWidth
                            margin="normal">
                            { Object.values(application ? Object.values(application.entities).filter((et) => { return et.id !== selectedEntityId}) : []).map((et) => {
                                return (<MenuItem value={et.id} key={et.id}>{et.name}</MenuItem>)
                            }) }
                        </TextField>}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    { !isEditing && (attributeCopy.type === 'attribute_ref' && attributeCopy.referenceEntityId) &&
                        <Typography variant="caption">Reference Attribute</Typography> }
                    { !isEditing && (attributeCopy.type === 'attribute_ref' && attributeCopy.referenceEntityId) &&
                        <Typography variant="caption">{attributeCopy.referenceAttributeId}</Typography> }
                    { isEditing && (attributeCopy.type === 'attribute_ref' && attributeCopy.referenceEntityId) &&
                        <TextField
                            select
                            label="Reference Attribute"
                            name="referenceAttributeId"
                            value={attributeCopy.referenceAttributeId ? attributeCopy.referenceAttributeId : ''}
                            onChange={(event) => { handleChange({...attributeCopy, referenceAttributeId: event.target.value})}}
                            fullWidth
                            margin="normal">
                            { Object.values(application && application.entities[attributeCopy.referenceEntityId] ? Object.values(application.entities[attributeCopy.referenceEntityId].attributes) : []).map((at) => {
                                return (<MenuItem value={at.id} key={at.id}>{at.name}</MenuItem>)
                            }) }
                        </TextField>}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">Required</Typography>
                    { !isEditing && <Typography variant="caption">{data.isRequired ? 'true' : 'false'}</Typography> }
                    { isEditing && <input type="checkbox" checked={attributeCopy.isRequired} onChange={(event) => { handleChange({...attributeCopy, isRequired: event.target.checked})}} /> }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">Unique</Typography>
                    { !isEditing && <Typography variant="caption">{data.isUnique ? 'true' : 'false'}</Typography> }
                    { isEditing && <input type="checkbox" checked={attributeCopy.isUnique} onChange={(event) => { handleChange({...attributeCopy, isUnique: event.target.checked})}} /> }
                </Box>
            </div> }
        </>);
}

export default EditableEntityAttributeSidebar;