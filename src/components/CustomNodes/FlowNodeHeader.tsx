import React, {ReactNode} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {Add, Delete, Remove} from "@mui/icons-material";

type Props = {
    isMinimised: boolean,
    onMinimiseClicked: (ev:any) => void,
    onDeleteClicked: () => void,
    icon: ReactNode,
    title: string,
}

const FlowNodeHeader = (props: Props) => {
    const {isMinimised, onMinimiseClicked, onDeleteClicked, icon, title} = props;

    return (
        <div className="flow-node-header" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px 2px'}}>
            <Box style={{display: "flex", flexDirection: "row"}}>
                {icon}
                <Typography variant="body1">{title}</Typography>
            </Box>
            <Box className={"nodrag nopan"}>
                <IconButton onClick={onMinimiseClicked}>{isMinimised ? <Add /> : <Remove />}</IconButton>
                <IconButton onClick={ev => { ev.stopPropagation(); onDeleteClicked()}}><Delete /></IconButton>
            </Box>
        </div>
    );
}

export default FlowNodeHeader;