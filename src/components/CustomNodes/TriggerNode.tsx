import {Bolt, Delete, Webhook} from "@mui/icons-material";
import {Box, Button, ButtonGroup, Card, MenuItem, Typography} from "@mui/material";
import './TriggerNode.css';
import {Handle, Position} from "reactflow";
import {useState} from "react";
import ScheduleTriggerSubComponent from "./ScheduleTriggerSubComponent";
import Select from "@mui/material/Select";
import FlowNodeHeader from "./FlowNodeHeader";
import EventTriggerSubComponent from "./EventTriggerSubComponent";

const TriggerNode = ({data}: any) => {
    const [isScheduling, setIsScheduling] = useState<boolean>(data.isScheduling || false);
    const [scheduleConfig, setScheduleConfig] = useState<any>(data.scheduleConfig || {});
    const [eventConfig, setEventConfig] = useState<any>(data.eventConfig || {});
    const [isMinimised, setIsMinimised] = useState<boolean>(false);
    const onDelete = data.onDelete || (() => {});
    const toggleMinimise = (ev:any) => {
        ev.stopPropagation();
        setIsMinimised(!isMinimised);
    }

    const handleChangeIsScheduling = (newIsScheduling: boolean) => {
        if(newIsScheduling !== isScheduling) {
            setIsScheduling(newIsScheduling);
        }
    }

    const handleChangeScheduleConfig = (newScheduleConfig: any) => {
        setScheduleConfig(newScheduleConfig);
    }

    const handleChangeEventConfig = (newEventConfig: any) => {
        setEventConfig(newEventConfig);
    }

    return <div className={"trigger-node"}>
        <FlowNodeHeader isMinimised={isMinimised} onMinimiseClicked={toggleMinimise} icon={<Bolt />} title={"Trigger"} onDeleteClicked={onDelete}/>
        <div className={`trigger-node__body ${isMinimised ? 'minimised' : ''}`}>
        <Box>
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
            {isScheduling && <ScheduleTriggerSubComponent scheduleConfig={scheduleConfig} onScheduleConfigUpdate={handleChangeScheduleConfig} />}
            {!isScheduling && <EventTriggerSubComponent eventConfig={eventConfig} onEventConfigUpdate={handleChangeEventConfig} />}
        </Box>
        </div>
        <Handle type={"source"} position={Position.Right} />
    </div>;
}

export default TriggerNode;