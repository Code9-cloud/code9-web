import {GlobalContext} from "../../GlobalContext";
import {useContext} from "react";
import {Breadcrumbs, Chip} from "@mui/material";

const ServiceEditor = () => {
    const { currentServicePath } = useContext(GlobalContext);
    return <div className={"service-editor"}>
        <Breadcrumbs>
            <Chip label={"Root"} />
            {
                currentServicePath.map((service: string) => {
                    return <Chip label={service} />
                })
            }
        </Breadcrumbs>
    </div>;
}

export default ServiceEditor;
