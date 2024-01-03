import {Box, IconButton, MenuItem, TextField, Typography} from "@mui/material";
import {ArrowDropDown, ArrowDropUp, Key as KeyIcon} from "@mui/icons-material";
import React from "react";
import {GlobalContext} from "../../GlobalContext";
import CodeStyledTextField from "../CodeStyled/CodeStyledTextField";
import CodeStyledTypography from "../CodeStyled/CodeStyledTypography";
import CodeStyledMenuItem from "../CodeStyled/CodeStyledMenuItem";
import CodeStyledSelect from "../CodeStyled/CodeStyledSelect";

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
            <div style={{padding: isCollapsed ? '5px 0px' : '5px 0px'}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#2A2A4D',
                        borderRadius: '5px',
                        padding: '5px 0px',
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
                        {/*{data.isPrimary && <KeyIcon />}*/}
                        {!isEditing && (<CodeStyledTypography style={{fontSize: "18px", marginLeft: "5px", padding: "0", height: "25px"}} variant="body2">{data.name}</CodeStyledTypography>)}
                        {isEditing && (<CodeStyledTextField style={{paddingLeft: "5px"}} inputProps={{style: {fontSize: "16px", marginLeft: "5px", padding: "0", height: "25px"}}}  value={attributeCopy.name} onChange={(event) => { handleChange({...attributeCopy, name: event.target.value})}} />)}
                    </Box>
                    <IconButton onClick={toggleCollapse} style={{padding:'0'}} size={"small"} disableRipple={true}>{ isCollapsed ? <ArrowDropDown fontSize={"small"} /> : <ArrowDropUp fontSize={"small"}/> } {/* Replace with your chosen icon */}
                    </IconButton>
                </Box>
            </div>
            { !isCollapsed && <div style={{padding: '5px 10px 5px', display: "flex", flexDirection: "column"}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <CodeStyledTypography variant="caption">ID</CodeStyledTypography>
                    <CodeStyledTypography variant="caption">{data.id}</CodeStyledTypography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '5px',
                    }}>
                    <CodeStyledTypography variant="caption">type</CodeStyledTypography>
                    { !isEditing && <CodeStyledTypography variant="caption">{data.type}</CodeStyledTypography> }
                    { isEditing && <CodeStyledSelect value={attributeCopy.type} onChange={(event) => { handleChange({...attributeCopy, type: event.target.value})}}>
                        <CodeStyledMenuItem value="string">String</CodeStyledMenuItem>
                        <CodeStyledMenuItem value="number">Number</CodeStyledMenuItem>
                        {!data.isPrimary && <CodeStyledMenuItem value="boolean">Boolean</CodeStyledMenuItem>}
                        {!data.isPrimary && <CodeStyledMenuItem value="entity_ref">EntityRef</CodeStyledMenuItem>}
                        {!data.isPrimary && <CodeStyledMenuItem value="attribute_ref">AttributeRef</CodeStyledMenuItem>}
                    </CodeStyledSelect> }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: (attributeCopy.type === 'entity_ref' || attributeCopy.type === 'attribute_ref') ? '5px' : '0px',
                    }}>
                    { (attributeCopy.type === 'entity_ref' || attributeCopy.type === 'attribute_ref') &&
                        <CodeStyledTypography variant="caption">Entity</CodeStyledTypography> }
                    { !isEditing && (attributeCopy.type === 'entity_ref' || attributeCopy.type === 'attribute_ref') &&
                        <CodeStyledTypography variant="caption">{attributeCopy.referenceEntityId}</CodeStyledTypography>
                    }
                    { isEditing && (attributeCopy.type === 'entity_ref' || attributeCopy.type === 'attribute_ref') &&
                        <CodeStyledSelect
                            label="Reference Entity"
                            name="referenceEntityId"
                            value={attributeCopy.referenceEntityId ? attributeCopy.referenceEntityId : ''}
                            onChange={(event) => { handleChange({...attributeCopy, referenceEntityId: event.target.value})}}
                            fullWidth>
                            { Object.values(application ? Object.values(application.entities).filter((et) => { return et.id !== selectedEntityId}) : []).map((et) => {
                                return (<CodeStyledMenuItem value={et.id} key={et.id}>{et.name}</CodeStyledMenuItem>)
                            }) }
                        </CodeStyledSelect>}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: (attributeCopy.type === 'attribute_ref' && attributeCopy.referenceEntityId) ? '5px' : '0px',
                    }}>
                    { (attributeCopy.type === 'attribute_ref' && attributeCopy.referenceEntityId) &&
                        <CodeStyledTypography variant="caption">Attribute</CodeStyledTypography> }
                    { !isEditing && (attributeCopy.type === 'attribute_ref' && attributeCopy.referenceEntityId) &&
                        <CodeStyledTypography variant="caption">{attributeCopy.referenceAttributeId}</CodeStyledTypography> }
                    { isEditing && (attributeCopy.type === 'attribute_ref' && attributeCopy.referenceEntityId) &&
                        <CodeStyledSelect
                            label="Reference Attribute"
                            name="referenceAttributeId"
                            value={attributeCopy.referenceAttributeId ? attributeCopy.referenceAttributeId : ''}
                            onChange={(event) => { handleChange({...attributeCopy, referenceAttributeId: event.target.value})}}
                            fullWidth>
                            { Object.values(application && application.entities[attributeCopy.referenceEntityId] ? Object.values(application.entities[attributeCopy.referenceEntityId].attributes) : []).map((at) => {
                                return (<CodeStyledMenuItem value={at.id} key={at.id}>{at.name}</CodeStyledMenuItem>)
                            }) }
                        </CodeStyledSelect>}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '5px',
                    }}>
                    <CodeStyledTypography variant="caption">Required</CodeStyledTypography>
                    { !isEditing && <CodeStyledTypography variant="caption">{data.isRequired ? 'true' : 'false'}</CodeStyledTypography> }
                    { isEditing && <CodeStyledSelect value={data.isRequired ? 'true' : 'false'} onChange={(event) => { handleChange({...attributeCopy, isRequired: (event.target.value === "true")})}}>
                        <CodeStyledMenuItem value="true"><span>true</span> &ensp;</CodeStyledMenuItem>
                        <CodeStyledMenuItem value="false"><span>false</span> &ensp;</CodeStyledMenuItem>
                    </CodeStyledSelect> }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '5px',
                    }}>
                    <CodeStyledTypography variant="caption">Unique</CodeStyledTypography>
                    { !isEditing && <CodeStyledTypography variant="caption">{data.isUnique ? 'true' : 'false'}</CodeStyledTypography> }
                    { isEditing && <CodeStyledSelect value={data.isUnique ? 'true' : 'false'} onChange={(event) => { handleChange({...attributeCopy, isUnique: (event.target.value === "true")})}}>
                            <CodeStyledMenuItem value="true"><span>true</span> &ensp;</CodeStyledMenuItem>
                            <CodeStyledMenuItem value="false"><span>false</span> &ensp;</CodeStyledMenuItem>
                        </CodeStyledSelect>}
                </Box>
            </div> }
        </>);
}

export default EditableEntityAttributeSidebar;