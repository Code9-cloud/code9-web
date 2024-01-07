import {Reply} from "@mui/icons-material";
import {Handle, Position} from "reactflow";
import './ResponseNode.css';
import FlowNodeHeader from "./FlowNodeHeader";
import React from "react";

const ResponseNode = ({data}: any) => {
    const [isMinimised, setIsMinimised] = React.useState<boolean>(false);
    const toggleMinimise = (ev:any) => {
        ev.stopPropagation();
        setIsMinimised(!isMinimised);
    }
    return <div className={"response-node"}>
        <FlowNodeHeader isMinimised={isMinimised} onMinimiseClicked={toggleMinimise} icon={<Reply />} title={"Send Response"} onDeleteClicked={() => { console.log("Delete");} }/>
        <Handle type={"target"} position={Position.Left} />
    </div>;
}

export default ResponseNode;