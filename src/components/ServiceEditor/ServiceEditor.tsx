import {GlobalContext} from "../../GlobalContext";
import {useContext, useEffect} from "react";
import {Box, Breadcrumbs, Button, Chip} from "@mui/material";
import {Home} from "@mui/icons-material";
import SubFlowEditor from "./SubFlowEditor";
import SubServiceEditor from "./SubServiceEditor";

const ServiceEditor = () => {
    const { application, currentServicePath } = useContext(GlobalContext);
    const isRoot = currentServicePath.length === 0;
    const isFlowChecker = () => {
        //TODO: Check doesn't validate cases exhaustively.
        if (isRoot) return false;
        let service : any = application;
        for (let i = 0; i < currentServicePath.length-1; i++) {
            service = service.services[currentServicePath[i]];
        }
        return (service.flows[currentServicePath[currentServicePath.length - 1]] === undefined);

    }
    let isFlow = isFlowChecker();

    useEffect(() => {
        isFlow = isFlowChecker();
    }, [currentServicePath]);

    return <div className={"service-editor"}>
        <Box display={'flex'} alignContent={'center'} justifyContent={'space-between'}>
            <Breadcrumbs>
                <Chip icon={<Home />} />
                {
                    currentServicePath.map((service: string) => {
                        return <Chip label={service} />
                    })
                }
            </Breadcrumbs>
            <Box>
                <Button>Create Service</Button>
                <Button>Create Flow</Button>
            </Box>
        </Box>
        <Box>
            {isFlow && <SubFlowEditor />}
            {!isFlow && <SubServiceEditor />}
        </Box>
    </div>;
}

export default ServiceEditor;
