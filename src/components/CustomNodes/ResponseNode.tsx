import {Box, Card, Typography} from "@mui/material";
import {TaskAlt} from "@mui/icons-material";
import {Handle, Position} from "reactflow";
import './ResponseNode.css';

const ResponseNode = ({data}: any) => {
    return <Card className={"response-node"}>
        <Box>
            <TaskAlt fontSize={"large"}/>
        </Box>
        <Box>
            <Typography variant={"body1"}>Done</Typography>
        </Box>
        <Handle type={"target"} position={Position.Left} />
    </Card>;
}

export default ResponseNode;