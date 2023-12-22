import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import './EntityNode.css';
import {Typography} from "@mui/material";
import EntityAttribute from "./EntityAttribute";

const handleStyle = { left: 10 };

function EntityNodeHeader({ data } : any) {
    return (
        <div className="entity-node__header">
            <Typography variant={"body1"}>{data.entity_name}</Typography>
            <Handle type={'source'} position={Position.Right} id={data.entity_name+'-src'} style={{visibility: 'hidden'}}/>
        </div>
    );
}

function EntityNode({ data } : any) {
    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="entity-node">
            <EntityNodeHeader data={data} />
            {/*<div className="entity-node__header">*/}
            {/*    <Typography variant={"body1"}>{data.entity_name}</Typography>*/}
            {/*    <Handle type={'source'} position={Position.Right} id={data.entity_name+'-src'} style={{visibility: 'hidden'}}/>*/}
            {/*</div>*/}
            <div className="entity-node__item_container">
                { data.attributes.map((attribute: any) => (
                    <EntityAttribute key={attribute.name} data={attribute} />
                    // <div className="entity-node__item">
                    //     <div className="entity-node__item__name">{attribute.name}</div>
                    //     <div className="entity-node__item__type">{attribute.type}</div>
                    // </div>
                ))}
                <Handle type={'target'} position={Position.Left} id={data.entity_name+'-tgt'} />
            </div>
        </div>
    );
}

export default EntityNode;