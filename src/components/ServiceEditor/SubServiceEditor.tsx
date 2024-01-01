import React, {useContext} from "react";
import {GlobalContext} from "../../GlobalContext";
import Masonry from "@mui/lab/Masonry";
import {Card} from "@mui/material";

const SubServiceEditor = () => {
    const { application, currentServicePath } = useContext(GlobalContext);
    let currentService: any = application;
    for (let i = 0; i < currentServicePath.length; i++) {
        currentService = currentService.services[currentServicePath[i]];
    }
    return (
        <Masonry>
            {
                Object.values(currentService.services).map((service: any) => {
                    return <Card><div key={service.id}>{service.name}</div></Card>
                })
            }
            {
                Object.values(currentService.flows).map((flow: any) => {
                    return <Card><div key={flow.id}>{flow.name}</div></Card>
                })
            }
        </Masonry>
    )
}

export default SubServiceEditor;