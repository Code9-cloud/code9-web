import React from "react";
import './EntitySidebar.css';
import {GlobalContext} from "../../GlobalContext";
import {Box, Button, IconButton, TextField, Typography} from "@mui/material";
import {Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon} from "@mui/icons-material";
import EditableEntityAttributeSidebar from "./EditableEntityAttributeSidebar";

const EntitySidebar : React.FC<{selectedEntity: string|null, isCollapsed: boolean}> = ({selectedEntity, isCollapsed}) => {
    const {application} = React.useContext(GlobalContext);
    const entity = application && selectedEntity ? application?.entities[selectedEntity] : null;
    const [isEditing, setIsEditing] = React.useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        // TODO: Save changes to entity
        setIsEditing(false);
    }

    const handleDiscardClick = () => {
        //TODO: Discard changes to entity
        setIsEditing(false);
    }

    return (
        <div className={`entity-editor-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            { !entity && (<div>
                Selected Entity Details will show up here
            </div>) }
            {
                entity && (<div>
                    <div className="entity-edit-sidebar-header">
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                // padding: '5px 10px',
                                // Add additional styling as needed
                            }}
                        >
                            { !isEditing && <Typography style={{fontSize: "16px", marginLeft: "13px", padding: '11px 0'}} variant={"h5"}>{entity.name}</Typography> }
                            { isEditing && <TextField inputProps={{style: {height: "10px"}}}value={entity.name} onChange={(event) => { /* logic to update entity name */}} /> }
                            { isEditing && (<IconButton onClick={handleDiscardClick}><DeleteIcon /></IconButton>)}
                            <IconButton onClick={isEditing ? handleSaveClick : handleEditClick}>
                                {isEditing ? <SaveIcon /> : <EditIcon />}
                            </IconButton>
                        </Box>
                    </div>
                    <br />
                    <div className="entity-edit-sidebar-attributes">
                        { Object.values(entity.attributes).map((attribute: any) => (
                            <div className="entity-edit-sidebar-attribute" key={attribute.id}>
                                <EditableEntityAttributeSidebar data={attribute} isEditing={isEditing} />
                                <br />
                            </div>
                        ))}
                    </div>
                    {isEditing && (
                        <Button variant="contained" color="primary" onClick={() => {/* logic to add a new attribute */}}>
                            + Add Attribute
                        </Button>
                    )}
                </div>)
            }
        </div>
    );
}

export default EntitySidebar;