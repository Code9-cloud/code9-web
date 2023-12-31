import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import './EntityNode.css';
import {Typography} from "@mui/material";
import EntityAttribute from "./EntityAttribute";
import {GlobalContext} from "../../GlobalContext";

const handleStyle = { left: 10 };

function EntityNodeHeader({ name, id } : any) {
    return (
        <div className="entity-node__header">
            <Handle type={'target'} position={Position.Left} id={'et_'+id+'-tgt'} style={{top: "unset", visibility: "hidden"}} />
            <Typography variant={"body1"}>{name}</Typography>
            <Handle type={'source'} position={Position.Right} id={'et_'+id+'-src'} style={{top: "unset", visibility: "hidden"}} />
        </div>
    );
}

function EntityNode({ data } : any) {
    const {application} = React.useContext(GlobalContext);
    const entity = application.entities[data.id];
    const attributes = entity.attributes;


    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className={`entity-node ${data.selected ? 'selected' : ''}`}>
            <EntityNodeHeader name={entity.name} id={entity.id} />
            {/*<div className="entity-node__header">*/}
            {/*    <Typography variant={"body1"}>{data.entity_name}</Typography>*/}
            {/*    <Handle type={'source'} position={Position.Right} id={data.entity_name+'-src'} style={{visibility: 'hidden'}}/>*/}
            {/*</div>*/}
            <div className="entity-node__item_container">
                { attributes && Object.values(attributes).map((attribute: any) => (
                    <EntityAttribute key={attribute.id} data={attribute} entity={entity.id} />
                    // <div className="entity-node__item">
                    //     <div className="entity-node__item__name">{attribute.name}</div>
                    //     <div className="entity-node__item__type">{attribute.type}</div>
                    // </div>
                ))}
                {/*<Handle type={'target'} position={Position.Left} id={entity?.name+'-tgt'} />*/}
            </div>
        </div>
    );
}

export default EntityNode;