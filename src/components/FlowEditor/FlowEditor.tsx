import React, {useCallback, useRef, useState} from "react";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState, ReactFlowInstance,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './InitialElements';
import CustomNode from './CustomNode';
import EntityNode from '../CustomNodes/EntityNode';

import 'reactflow/dist/style.css';
import './overview.css';

const nodeTypes = {
    custom: CustomNode,
    entityNode: EntityNode,
};

const minimapStyle = {
    height: 120,
};

const FlowEditor = () => {
    const proOptions = { hideAttribution: true };
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

    const onInit = (reactFlowInstance: ReactFlowInstance) => {
        // console.log('flow loaded:', reactFlowInstance);
        setReactFlowInstance(reactFlowInstance);
    };

    // TODO: Migrate code to entity editor too & use react flow panels to put add entity button.

    // we are using a bit of a shortcut here to adjust the edge type
    // this could also be done with a custom edge for example
    const edgesWithUpdatedTypes = edges.map((edge) => {
        if (edge.sourceHandle) {
            // @ts-ignore
            const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
            edge.type = edgeType;
        }

        return edge;
    });

    const flowStyle = {
        backgroundColor: "#171727"
    }

    const onPaneContextMenu = (event: any) => {
        event.preventDefault();

        if (!reactFlowInstance) return;

        const viewportPoint = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY});

        const newNode = {
            id: 'context-menu', // or any unique ID
            data: { label: 'New Node' },
            position: viewportPoint,
            // other node properties
        };

        setNodes((nds) => {
            let idx = nds.findIndex((nd) => { return nd.id === 'context-menu'});
            if(idx > -1) {
                nds.splice(idx, 1);
            }
            return nds.concat(newNode);
        });
    };

    return (
        <div style={{width: '100%', height: '100%'}}>
            <ReactFlow
                style={flowStyle}
                nodes={nodes}
                edges={edgesWithUpdatedTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                onPaneContextMenu={onPaneContextMenu}
                fitView
                proOptions={proOptions}
                nodeTypes={nodeTypes}
                maxZoom={1}
            >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                <Background color="#2B2B38" gap={16} size={3} />
            </ReactFlow>
        </div>
    );
}

export default FlowEditor;