import './CodeBlockNode.css';
import {Box, Typography} from "@mui/material";
import React from "react";
import {Handle, NodeResizeControl, Position} from "reactflow";
import {Code, SouthEast, Terminal} from "@mui/icons-material";
import FlowNodeHeader from "./FlowNodeHeader";
import CodeBlockEditor from "../CodeEditor/CodeBlockEditor";
import {Resizable, ResizableBox} from 'react-resizable';

const CodeBlockNode = ({data}: any) => {
    const [isMinimised, setIsMinimised] = React.useState<boolean>(false);
    const [code, setCode] = React.useState<string>(data.code || '');

    const toggleMinimise = (ev:any) => {
        ev.stopPropagation();
        setIsMinimised(!isMinimised);
    }

    const onCodeUpdate = (newCode: string) => {
        setCode(newCode);
        // TODO: Update code in parent
    }

    return <div className={`code-block-node ${isMinimised ? 'minimised' : ''}`}>
        { !isMinimised && <NodeResizeControl style={{
            background: 'transparent',
            border: 'none',
            right: 0,
            bottom: 0,
        }}>
            <SouthEast style={{right: '2px', bottom: '2px', position: 'absolute', height: '15px', width: '15px', color: '#2B2B38'}} />
        </NodeResizeControl> }
        <FlowNodeHeader isMinimised={isMinimised} onMinimiseClicked={toggleMinimise} icon={<Terminal />} title={"Code Block"} onDeleteClicked={() => { console.log("Delete");} }/>
        <Handle type={"target"} id="in" position={Position.Left} />
        <div className={`code-block-node__body ${isMinimised ? 'minimised' : ''}`}>
            <CodeBlockEditor code={code} onCodeUpdate={onCodeUpdate} />
        </div>
        <Handle type={"source"} id="next" position={Position.Right}/>
    </div>
}

export default CodeBlockNode;