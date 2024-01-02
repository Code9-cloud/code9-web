import React, {useEffect, useState} from "react";
import {Box, Button, IconButton, MenuItem, Modal, TextField} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";

function ModalCreateFlow({open, onClose, onFormSubmit}: any){
    const [formData, setFormData] = useState({
        flowId: '',
        flowName: '',
    });

    const handleSubmit = (event: any) => {
        event.preventDefault(); // Prevents default form submission action

        // Check if all fields are filled
        if (formData.flowId && formData.flowName) {
            onFormSubmit(formData);
        }
        onClose();
    };

    // Handle input changes
    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Reset form state when modal is closed
    useEffect(() => {
        if (!open) {
            setFormData({
                flowId: '',
                flowName: '',
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
            aria-labelledby="Create Service Modal"
            aria-describedby="Creates Service by Specifying Service ID and Service Name"
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
                        label="Flow ID"
                        name="flowId"
                        value={formData.flowId}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Flow Name"
                        name="flowName"
                        value={formData.flowName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
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

export default ModalCreateFlow;