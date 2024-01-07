import {Webhook} from "@mui/icons-material";
import {Box, Button, ButtonGroup, Card, MenuItem, Typography} from "@mui/material";
import './TriggerNode.css';
import {Handle, Position} from "reactflow";
import {useState} from "react";
import ScheduleTriggerSubComponent from "./ScheduleTriggerSubComponent";
import Select from "@mui/material/Select";

const TriggerNode = ({data}: any) => {
    const [isScheduling, setIsScheduling] = useState<boolean>(data.isScheduling || false);
    const [scheduleConfig, setScheduleConfig] = useState<any>(data.scheduleConfig || {});
    const handleChangeIsScheduling = (newIsScheduling: boolean) => {
        if(newIsScheduling !== isScheduling) {
            setIsScheduling(newIsScheduling);
        }
    }

    const handleChangeScheduleConfig = (newScheduleConfig: any) => {
        setScheduleConfig(newScheduleConfig);
    }

    return <Card className={"trigger-node"}>
        <Box sx={{padding: '10px'}}>
            <Typography variant={"body1"} style={{paddingBottom: '5px'}}>Trigger Type</Typography>
            <ButtonGroup className={"nodrag"} variant={"outlined"} aria-label={"Trigger Type"}>
                <Button onClick={
                    (ev) => {
                        ev.stopPropagation();
                        handleChangeIsScheduling(true);}}
                    >
                    Frequency Based
                </Button>
                <Button onClick={
                    (ev) => {
                        ev.stopPropagation();
                        handleChangeIsScheduling(false);}}
                    >
                    Event Based
                </Button>
            </ButtonGroup>
        </Box>
        <Box>
            <Typography variant={"body1"}>Schedule</Typography>
            {isScheduling && <ScheduleTriggerSubComponent scheduleConfig={scheduleConfig} onScheduleConfigUpdate={handleChangeScheduleConfig} />}
        </Box>
        <Box>
            <Webhook fontSize={"large"}/>
        </Box>
        <Box>
            <Typography variant={"body1"}>Trigger</Typography>
        </Box>
        <Handle type={"source"} position={Position.Right} />
    </Card>;
}

export default TriggerNode;