import {Box, IconButton, Typography} from "@mui/material";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import React from "react";
import {Handle, Position} from "reactflow";

function EntityAttribute( {data, entity} : any) {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }
    // console.log(data);
    return (
        <>
            <div style={{padding: isCollapsed ? '5px 10px' : '5px 10px 0px', borderTop: '1px solid #2B2B38'}}>
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // padding: '5px 10px',
                    // Add additional styling as needed
                }}
            >
                    <Typography variant="body2">{data.name}</Typography>
                    <IconButton onClick={toggleCollapse} style={{padding:'0'}} size={"small"} disableRipple={true}>{ isCollapsed ? <ArrowDropDown fontSize={"small"} /> : <ArrowDropUp fontSize={"small"}/> } {/* Replace with your chosen icon */}
                    </IconButton>
                    <Handle type={'target'} position={Position.Right} id={'et_'+entity+'_at_'+data.id+'-tgt'} style={{top: "unset"}} />
                </Box>
            </div>
            { !isCollapsed && <div style={{padding: '5px 10px 5px', backgroundColor: '#2A2A4D'}}>
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="caption">ID</Typography>
                    <Typography variant="caption">{data.id}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">type</Typography>
                    <Typography variant="caption">{data.type}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">Required</Typography>
                    <Typography variant="caption">{data.isRequired ? 'true' : 'false'}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="caption">Unique</Typography>
                    <Typography variant="caption">{data.isUnique ? 'true' : 'false'}</Typography>
                </Box>
            </div> }
        </>);
}

export default EntityAttribute;