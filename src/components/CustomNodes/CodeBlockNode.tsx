import './CodeBlockNode.css';
import {Box, Card, Typography} from "@mui/material";
import React from "react";
import {Handle, Position} from "reactflow";
import {Code} from "@mui/icons-material";
const CodeBlockNode = ({data}: any) => {
    return <Card className={"code-block-node"}>
        <Handle type={"target"} id="in" position={Position.Left} />
        <Box>
            <Code fontSize={"large"}/>
        </Box>
        <Box>
            <Typography variant={"body1"}>Code Block</Typography>
        </Box>
        <Handle type={"source"} id="next" position={Position.Right} style={{top: '33%'}}/>
        <Handle type={"source"} id="fail" position={Position.Right} style={{top: '67%', backgroundColor: 'red'}}/>
    </Card>;
}

export default CodeBlockNode;