import React, {useContext} from "react";
import {GlobalContext} from "../../GlobalContext";
import Masonry from "@mui/lab/Masonry";
import {Card, CardActionArea} from "@mui/material";
import styled from "@emotion/styled";
import {AccountTree, Api, Home} from "@mui/icons-material";

const HoverCard = styled(Card)({
    '&:hover': {
        backgroundColor: '#5245FF',
    },
});

const SubServiceEditor = () => {
    const { application, currentServicePath, setCurrentServicePath } = useContext(GlobalContext);
    let currentService: any = application;
    for (let i = 0; i < currentServicePath.length; i++) {
        currentService = currentService.services[currentServicePath[i]];
    }

    const navigateToSubServiceOrFlow = (id: string) => () => {
        setCurrentServicePath([...currentServicePath, id]);
    }

    return (
        <Masonry columns={{xs:4, sm: 6}}>
            {
                Object.values(currentService.services).map((service: any) => {
                    return <HoverCard key={service.id}>
                        <CardActionArea>
                            <div onClick={navigateToSubServiceOrFlow(service.id)} style={{minHeight: 100}}>
                                <Api />
                                {service.name}
                            </div>
                        </CardActionArea>
                    </HoverCard>
                })
            }
            {
                Object.values(currentService.flows).map((flow: any) => {
                    return <HoverCard key={flow.id}>
                        <CardActionArea>
                            <div onClick={navigateToSubServiceOrFlow(flow.id)} style={{minHeight: 100}}>
                                <AccountTree />
                                {flow.name}
                            </div>
                        </CardActionArea>
                    </HoverCard>
                })
            }
        </Masonry>
    )
}

export default SubServiceEditor;