import React from "react";
import './EntitySidebar.css';
import {GlobalContext} from "../../GlobalContext";
import {Box, Button, IconButton, TextField, Typography} from "@mui/material";
import {Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon} from "@mui/icons-material";
import EditableEntityAttributeSidebar from "./EditableEntityAttributeSidebar";
import ModalAddAttribute from "../ModalAddAttribute/ModalAddAttribute";

const EntitySidebar : React.FC<{selectedEntity: string|null, isCollapsed: boolean}> = ({selectedEntity, isCollapsed}) => {
    const {application, addAttributeToEntity, setAttribute, changeEntityName } = React.useContext(GlobalContext);
    const entity = application && selectedEntity ? application?.entities[selectedEntity] : null;
    const [isEditing, setIsEditing] = React.useState(false);
    const [addAttributeModalOpen, setAddAttributeModalOpen] = React.useState(false);

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

    const addAttribute = (formData: any) => {
        if (!selectedEntity) return;
        let attributeData: any = {
            id: formData.attributeId,
            name: formData.attributeId,
            type: formData.attributeType,
            isRequired: formData.isRequired,
            isIndexed: false,
            isUnique: formData.isUnique,
            isImmutable: false,
            isSensitive: false,
        }
        if(formData.attributeType === 'attribute_ref') {
            attributeData['referenceEntityId'] = formData.referenceEntityId;
            attributeData['referenceAttributeId'] = formData.referenceAttributeId;
        }
        if(formData.attributeType === 'entity_ref') {
            attributeData['referenceEntityId'] = formData.referenceEntityId;
        }
        addAttributeToEntity(selectedEntity, attributeData);
    }

    const handleAttributeUpdate = (attributeData: any) => {
        const attributeId = attributeData.id;
        if (!selectedEntity || !entity) return;
        const { referenceEntityId, referenceAttributeId , ...updatedAttribute } : any = {...entity.attributes[attributeId]};
        updatedAttribute.name = attributeData.name;
        updatedAttribute.type = attributeData.type;
        updatedAttribute.isRequired = attributeData.isRequired;
        updatedAttribute.isUnique = attributeData.isUnique;
        if(attributeData.type === 'attribute_ref') {
            updatedAttribute['referenceEntityId'] = attributeData.referenceEntityId;
            updatedAttribute['referenceAttributeId'] = attributeData.referenceAttributeId;
        }
        if(attributeData.type === 'entity_ref') {
            updatedAttribute['referenceEntityId'] = attributeData.referenceEntityId;
        }
        setAttribute(selectedEntity, attributeId, updatedAttribute);
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
                            { !isEditing && <Typography variant={"h5"}>{entity.name}</Typography> }
                            { isEditing && <TextField value={entity.name} onChange={(event) => { changeEntityName(selectedEntity ? selectedEntity : '', event.target.value); }} /> }
                            {/*{ isEditing && (<IconButton onClick={handleDiscardClick}><DeleteIcon /></IconButton>)}*/}
                            <IconButton onClick={isEditing ? handleSaveClick : handleEditClick}>
                                {isEditing ? <SaveIcon /> : <EditIcon />}
                            </IconButton>
                        </Box>
                    </div>
                    <div className="entity-edit-sidebar-attributes">
                        { Object.values(entity.attributes).map((attribute: any) => (
                            <div className="entity-edit-sidebar-attribute" key={attribute.id}>
                                <EditableEntityAttributeSidebar data={attribute} selectedEntityId={selectedEntity} isEditing={isEditing} onChange={handleAttributeUpdate}/>
                            </div>
                        ))}
                    </div>
                    {isEditing && (
                        <Button variant="contained" color="primary" onClick={() => { setAddAttributeModalOpen(true); }}>
                            + Add Attribute
                        </Button>
                    )}
                    <ModalAddAttribute open={addAttributeModalOpen} onClose={() => { setAddAttributeModalOpen(false); }} onFormSubmit={addAttribute} currentEntityId={selectedEntity}/>
                </div>)
            }
        </div>
    );
}

export default EntitySidebar;