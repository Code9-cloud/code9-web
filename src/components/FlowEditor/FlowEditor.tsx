import React, {useCallback} from "react";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
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

const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);

const FlowEditor = () => {
    const proOptions = { hideAttribution: true };
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

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

    return (
        <ReactFlow
            style={flowStyle}
            nodes={nodes}
            edges={edgesWithUpdatedTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            fitView
            proOptions={proOptions}
            nodeTypes={nodeTypes}
            maxZoom={1}
        >
            <MiniMap style={minimapStyle} zoomable pannable />
            <Controls />
            <Background color="#2B2B38" gap={16} size={3} />
        </ReactFlow>
    );
}

export default FlowEditor;