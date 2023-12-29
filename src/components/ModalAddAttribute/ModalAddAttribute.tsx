import React, {useEffect, useState} from "react";
import {Box, Button, IconButton, MenuItem, Modal, TextField, Typography} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import {GlobalContext} from "../../GlobalContext";

function ModalAddAttribute({open, onClose, onFormSubmit, currentEntityId}: any){
    const {application} = React.useContext(GlobalContext);
    const [formData, setFormData] = useState({
        attributeId: '',
        attributeType: '',
        referenceEntityId: '',
        referenceAttributeId: '',
        isRequired: false,
        isUnique: false,
    });
    // const entities = application ? Object.values(application.entities).filter((entity) => { return entity.id !== currentEntityId}) : [];

    const handleSubmit = (event: any) => {
        event.preventDefault(); // Prevents default form submission action

        // Check if all fields are filled
        if (formData.attributeId && formData.attributeType) {
            if(formData.attributeType === 'entity_ref' && !formData.referenceEntityId) {
                onClose();
                return;
            }
            if(formData.attributeType === 'attribute_ref' && (!formData.referenceEntityId || !formData.referenceAttributeId)) {
                onClose();
                return;
            }
            onFormSubmit(formData);
        }
        onClose();
    };

    // Handle input changes
    const handleChange = (event: any) => {
        if(event.target.name === 'isRequired' || event.target.name === 'isUnique'){
            setFormData({ ...formData, [event.target.name]: event.target.checked });
            return;
        }
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Reset form state when modal is closed
    useEffect(() => {
        if (!open) {
            setFormData({
                attributeId: '',
                attributeType: '',
                referenceEntityId: '',
                referenceAttributeId: '',
                isRequired: false,
                isUnique: false,
            });
        }
    }, [open]);

    const handleClose = (event: any, reason: string) => {
        if(reason && reason === 'backdropClick') return;
        onClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Create Entity Modal"
            aria-describedby="Creates Entity by Specifying Entity ID and Primary Attribute ID, Type"
            // disableBackdropClick
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <IconButton
                    onClick={onClose}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                >
                    <CloseIcon />
                </IconButton>
                {/* Form content */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Attribute ID"
                        name="attributeId"
                        value={formData.attributeId}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Attribute Type"
                        name="attributeType"
                        value={formData.attributeType}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="string">String</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="boolean">Boolean</MenuItem>
                        <MenuItem value="entity_ref">EntityRef</MenuItem>
                        <MenuItem value="attribute_ref">AttributeRef</MenuItem>
                    </TextField>
                    {(formData.attributeType === 'entity_ref' || formData.attributeType === 'attribute_ref') &&
                        <TextField
                            select
                            label="Reference Entity"
                            name="referenceEntityId"
                            value={formData.referenceEntityId}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            { Object.values(application ? application.entities : []).filter((et) => {return et.id !== currentEntityId }).map((entity) => {
                                return (<MenuItem key={entity.id} value={entity.id}>{entity.name}</MenuItem>)
                            }) }
                        </TextField>
                    }
                    {(formData.referenceEntityId && formData.attributeType === 'attribute_ref') &&
                        <TextField
                            select
                            label="Reference Attribute"
                            name="referenceAttributeId"
                            value={formData.referenceAttributeId}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            { Object.values(application && formData.referenceEntityId ? application.entities[formData.referenceEntityId].attributes : []).map((attribute) => {
                                return (<MenuItem key={attribute.id} value={attribute.id}>{attribute.name}</MenuItem>)
                            }) }
                        </TextField>
                    }
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Typography variant="caption">Is Required</Typography>
                        <Checkbox
                            name="isRequired"
                            checked={formData.isRequired}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Typography variant="caption">Is Unique</Typography>
                        <Checkbox
                            name="isUnique"
                            checked={formData.isUnique}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box marginTop={2} display="flex" justifyContent="flex-end">
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default ModalAddAttribute;