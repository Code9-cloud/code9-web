import {GlobalContext} from "../../GlobalContext";
import {useContext, useEffect, useState} from "react";
import {Box, Breadcrumbs, Button, Chip} from "@mui/material";
import {Home} from "@mui/icons-material";
import SubFlowEditor from "./SubFlowEditor";
import SubServiceEditor from "./SubServiceEditor";
import ModalCreateService from "./ModalCreateService";
import ModalCreateFlow from "./ModalCreateFlow";

const ServiceEditor = () => {
    const { application, setApplication , currentServicePath, setCurrentServicePath } = useContext(GlobalContext);
    const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] = useState(false);
    const [isCreateFlowModalOpen, setIsCreateFlowModalOpen] = useState(false);
    const isRoot = currentServicePath.length === 0;
    const isFlowChecker = () => {
        //TODO: Check doesn't validate cases exhaustively.
        if (isRoot) return false;
        let service : any = application;
        for (let i = 0; i < currentServicePath.length-1; i++) {
            service = service.services[currentServicePath[i]];
        }
        return !(service.flows[currentServicePath[currentServicePath.length - 1]] === undefined);

    }
    let isFlow = isFlowChecker();

    const handleCreateServiceModalClose = () => {
        setIsCreateServiceModalOpen(false);
    }

    const handleCreateServiceModalOpen = () => {
        setIsCreateServiceModalOpen(true);
    }

    const handleCreateFlowModalClose = () => {
        setIsCreateFlowModalOpen(false);
    }

    const handleCreateFlowModalOpen = () => {
        setIsCreateFlowModalOpen(true);
    }

    const handleCreateService = (data: {serviceId: string, serviceName: string}) => {
        let applicationCopy = {...application}
        let service : any = applicationCopy;
        for (let i=0; i < currentServicePath.length; i++){
            service = service.services[currentServicePath[i]];
        }
        service.services[data.serviceId] = {
            name: data.serviceName,
            id: data.serviceId,
            services: {},
            flows: {}
        };
        setApplication(applicationCopy);
    }

    const handleCreateFlow = (data: {flowId: string, flowName: string}) => {
        let applicationCopy = {...application}
        let service : any = applicationCopy;
        for (let i=0; i < currentServicePath.length; i++){
            service = service.services[currentServicePath[i]];
        }
        service.flows[data.flowId] = {
            name: data.flowName,
            id: data.flowId,
        };
        setApplication(applicationCopy);
    }

    const navigateToServicePathIndex = (index: number) => () => {
        setCurrentServicePath(currentServicePath.slice(0, index));
    }

    useEffect(() => {
        isFlow = isFlowChecker();
    }, [currentServicePath]);

    return <div className={"service-editor"}>
        <Box display={'flex'} alignContent={'center'} justifyContent={'space-between'} style={{padding: '10px'}}>
            <Breadcrumbs>
                <Chip icon={<Home />} key={0} onClick={navigateToServicePathIndex(0)}/>
                {
                    currentServicePath.map((service: string, index: number) => {
                        return <Chip key={index+1} label={service} onClick={navigateToServicePathIndex(index + 1)}/>
                    })
                }
            </Breadcrumbs>
            <Box>
                { !isFlow && <Button onClick={handleCreateServiceModalOpen} style={{padding: '0px 5px', backgroundColor: '#5245FF', marginRight: '10px', color: "white"}}>Create Service</Button>}
                { !isFlow && <Button onClick={handleCreateFlowModalOpen} style={{padding: '0px 5px', backgroundColor: '#5245FF', color: "white"}}>Create Flow</Button> }
            </Box>
            <ModalCreateService open={isCreateServiceModalOpen} onClose={handleCreateServiceModalClose} onFormSubmit={handleCreateService}/>
            <ModalCreateFlow open={isCreateFlowModalOpen} onClose={handleCreateFlowModalClose} onFormSubmit={handleCreateFlow}/>
        </Box>
        <Box>
            {isFlow && <SubFlowEditor />}
            {!isFlow && <SubServiceEditor />}
        </Box>
    </div>;
}

export default ServiceEditor;
