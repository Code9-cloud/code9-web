import {useContext} from "react";
import {GlobalContext} from "../../GlobalContext";

const Deployment = () => {
    const {application_id} = useContext(GlobalContext);
    return application_id ? (<>Deployed at {application_id}.app.code9.cloud</>) : (<>Not Deployed</>);
}

export default Deployment;