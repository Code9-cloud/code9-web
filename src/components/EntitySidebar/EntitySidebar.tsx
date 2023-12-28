import React from "react";
import './EntitySidebar.css';
import {GlobalContext} from "../../GlobalContext";
import {IconButton, Typography} from "@mui/material";
import {Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon} from "@mui/icons-material";
import EntityAttribute from "../CustomNodes/EntityAttribute";

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
                        <Typography variant={"h5"}>{entity.name}</Typography>
                        { isEditing && (<IconButton onClick={handleDiscardClick}><DeleteIcon /></IconButton>)}
                        <IconButton onClick={isEditing ? handleSaveClick : handleEditClick}>
                            {isEditing ? <SaveIcon /> : <EditIcon />}
                        </IconButton>
                    </div>
                    <div className="entity-edit-sidebar-attributes">
                        { Object.values(entity.attributes).map((attribute: any) => (
                            <div className="entity-edit-sidebar-attribute" key={attribute.id}>
                                <EntityAttribute data={attribute} />
                            </div>
                        ))}
                    </div>
                    {isEditing && (
                        <button onClick={() => {/* logic to add a new attribute */}}>
                            Add Attribute
                        </button>
                    )}
                </div>)
            }
        </div>
    );
}

export default EntitySidebar;