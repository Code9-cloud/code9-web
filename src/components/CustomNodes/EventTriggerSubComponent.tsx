import {useState} from "react";
import {InputLabel, MenuItem, TextField} from "@mui/material";
import Select from "@mui/material/Select";

const EventTriggerSubComponent = ({eventConfig, onEventConfigUpdate}: any) => {
    const [path, setPath] = useState(eventConfig.path || '');

    const handleChange = (event: any) => {
        setPath(event.target.value);
        onEventConfigUpdate({ ...eventConfig, path: event.target.value });
    };

    return (
        <div className={"nopan nodrag"} onClick={ev => {ev.stopPropagation();}} style={{paddingTop: '10px'}}>
            <TextField
                label="Webhook Path"
                id="webhook-path"
                value={path}
                onChange={handleChange}
                fullWidth
            >
            </TextField>
        </div>
    );
}

export default EventTriggerSubComponent;