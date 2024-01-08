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
    const onDelete = data.onDelete || (() => {});
    const toggleMinimise = (ev:any) => {
        ev.stopPropagation();
        setIsMinimised(!isMinimised);
    }
    return <div className={"response-node"}>
        <FlowNodeHeader isMinimised={isMinimised} onMinimiseClicked={toggleMinimise} icon={<Reply />} title={"Send Response"} onDeleteClicked={onDelete}/>
        <div className={`response-node__body ${isMinimised ? 'minimised' : ''}`}>
            <InputLabel id="status-code-label">Status Code</InputLabel>
            <Select className={"nopan nodrag"} labelId={"status-code-label"} fullWidth
                    value={data.statusCode || 200} onChange={(ev) => { console.log(ev.target.value); }} >
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