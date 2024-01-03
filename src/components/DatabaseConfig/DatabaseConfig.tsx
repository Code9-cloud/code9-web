import {GlobalContext} from "../../GlobalContext";
import {useContext} from "react";
import {Box, TextField} from "@mui/material";

const DatabaseConfig = () => {
    const {application} = useContext(GlobalContext);
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            databaseUrl: data.get('databaseUrl'),
            databaseName: data.get('databaseName'),
            databaseUsername: data.get('databaseUsername'),
            databasePassword: data.get('databasePassword'),
        });
    }
    return <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: 'column', }}>
                <Box style={{padding: '10px'}}>
                    <TextField
                        id={"databaseUrl"}
                        label={"Database Url"}
                        defaultValue={application.database ? application.database.url : ""}
                    />
                </Box>
                <Box style={{padding: '10px'}}>
                    <TextField
                        id={"databaseName"}
                        label={"Database Name"}
                        defaultValue={application.database ? application.database.name : ""}
                    />
                </Box>
                <Box style={{padding: '10px'}}>
                    <TextField
                        id={"databaseUsername"}
                        label={"Database Username"}
                        defaultValue={application.database ? application.database.username : ""}
                    />
                </Box>
                <Box style={{padding: '10px'}}>
                    <TextField
                        id={"databasePassword"}
                        label={"Database Password"}
                        defaultValue={application.database ? application.database.password : ""}
                    />
                </Box>
                <Box style={{padding: '10px'}}>
                    <button type={"submit"}>Submit</button>
                </Box>
            </div>
        </form>
    </div>
}

export default DatabaseConfig;