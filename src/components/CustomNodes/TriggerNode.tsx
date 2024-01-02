import {ElectricBolt} from "@mui/icons-material";
import {Box, Card, Typography} from "@mui/material";
import './TriggerNode.css';
import {Handle, Position} from "reactflow";

const TriggerNode = ({data}: any) => {
    return <Card className={"trigger-node"}>
        <Box>
            <ElectricBolt fontSize={"large"}/>
        </Box>
        <Box>
            <Typography variant={"body1"}>Trigger</Typography>
        </Box>
        <Handle type={"source"} position={Position.Right} />
    </Card>;
}

export default TriggerNode;