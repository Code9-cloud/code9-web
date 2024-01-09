import {Reply} from "@mui/icons-material";
import {Handle, Position} from "reactflow";
import './ResponseNode.css';
import FlowNodeHeader from "./FlowNodeHeader";
import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {InputLabel} from "@mui/material";

const ResponseNode = ({data}: any) => {
    const [isMinimised, setIsMinimised] = React.useState<boolean>(false);
    const [statusCode, setStatusCode] = React.useState<number>(data.statusCode || 200);
    const onDelete = data.onDelete || (() => {});
    const onConfigUpdate = data.onConfigUpdate || ((_:any) => {});
    const toggleMinimise = (ev:any) => {
        ev.stopPropagation();
        setIsMinimised(!isMinimised);
    }

    const handleStatusCodeChange = (ev: any) => {
        onConfigUpdate({statusCode: ev.target.value});
        setStatusCode(ev.target.value);
    }

    return <div className={"response-node"}>
        <FlowNodeHeader isMinimised={isMinimised} onMinimiseClicked={toggleMinimise} icon={<Reply />} title={"Send Response"} onDeleteClicked={onDelete}/>
        <div className={`response-node__body ${isMinimised ? 'minimised' : ''}`} onClick={(ev) => {ev.stopPropagation();}}>
            <InputLabel id="status-code-label">Status Code</InputLabel>
            <Select className={"nopan nodrag"} labelId={"status-code-label"} fullWidth
                    value={statusCode} onChange={handleStatusCodeChange} >
                <MenuItem value={200}>200</MenuItem>
                <MenuItem value={400}>400</MenuItem>
                <MenuItem value={401}>401</MenuItem>
                <MenuItem value={403}>403</MenuItem>
                <MenuItem value={404}>404</MenuItem>
                <MenuItem value={500}>500</MenuItem>
            </Select>
        </div>
        <Handle type={"target"} position={Position.Left} />
    </div>;
}

export default ResponseNode;