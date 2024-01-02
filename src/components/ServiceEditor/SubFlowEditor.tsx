import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    ReactFlowInstance,
    useEdgesState,
    useNodesState
} from "reactflow";
import React, {useCallback, useState} from "react";
import {GlobalContext} from "../../GlobalContext";
import FlowSidebar from "../FlowSidebar/FlowSidebar";
import ContextMenuNode from "../CustomNodes/ContextMenuNode";
import TriggerNode from "../CustomNodes/TriggerNode";
import MethodInvokeNode from "../CustomNodes/MethodInvokeNode";
import ResponseNode from "../CustomNodes/ResponseNode";
import {LibraryAdd} from "@mui/icons-material";
import CodeBlockNode from "../CustomNodes/CodeBlockNode";

const nodeTypes = {
    triggerNode: TriggerNode,
    methodInvokeNode: MethodInvokeNode,
    codeBlockNode: CodeBlockNode,
    responseNode: ResponseNode,
    contextMenuNode: ContextMenuNode,
};

const minimapStyle = {
    height: 120,
};

const SubFlowEditor = () => {
    const {application, loadApplication} = React.useContext(GlobalContext);
    const proOptions = { hideAttribution: true };
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const minSidebarWidth = 300;
    const maxSidebarWidth = 1200;
    const [lastActionPosition, setLastActionPosition] = useState({x: 0, y: 0});

    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    const onNodeClick = (event: any, node: any) => {
        if(node.type === 'triggerNode' || node.type === 'methodInvokeNode' || node.type === 'responseNode') {
            selectNode(node.data.id);
        }
    }

    const closeContextMenu = () => {
        setNodes((nds) => {
            return nds.filter((nd) => { return nd.id !== 'context-menu' });
        });
        setIsContextMenuOpen(false);
    }

    const onPaneClick = (event: any) => {
        if(isContextMenuOpen) {
            closeContextMenu();
        } else if(selectedNode !== null) {
            unselectNode();
        }
    }

    const selectNode = (nodeId: string) => {
        if(selectedNode === nodeId) return;
        if(selectedNode !== nodeId) {
            setNodes((nds) => {
                return nds.map((nd) => {
                    if(nd.id === 'node_' + nodeId) {
                        nd.data = { ...nd.data, selected: true };
                    } else if (selectedNode !== null && nd.id === 'node_' + selectedNode) {
                        nd.data = { ...nd.data, selected: false };
                    }
                    return nd;
                });
            });
        }
        setSelectedNode(nodeId);
    }
    const unselectNode = () => {
        if(selectedNode === null) return;
        setNodes((nds) => {
            return nds.map((nd) => {
                if(nd.id === 'node_' + selectedNode) {
                    nd.data = { ...nd.data, selected: false };
                }
                return nd;
            });
        });
        setSelectedNode(null);
    }

    const flowStyle = {
        backgroundColor: "#171727"
    }

    const onInit = (reactFlowInstance: ReactFlowInstance) => {
        // console.log('flow loaded:', reactFlowInstance);
        setReactFlowInstance(reactFlowInstance);
    };

    const onPaneContextMenu = (event: any) => {
        event.preventDefault();

        if (!reactFlowInstance) return;

        if(!isContextMenuOpen) {
            setIsContextMenuOpen(true);
        }

        const viewportPoint = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY});
        setLastActionPosition(viewportPoint);

        const createTriggerNode = () => {
            const newNode = {
                id: 'node_' + Math.random(),
                type: 'triggerNode',
                data: { label: 'Trigger Node', selected: false },
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
        }

        const createMethodInvokeNode = () => {
            const newNode = {
                id: 'node_' + Math.random(),
                type: 'methodInvokeNode',
                data: { label: 'Method Invoke Node', selected: false },
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
        }

        const createCodeBlockNode = () => {
            const newNode = {
                id: 'node_' + Math.random(),
                type: 'codeBlockNode',
                data: { label: 'Code Block Node', selected: false },
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
        }

        const createResponseNode = () => {
            const newNode = {
                id: 'node_' + Math.random(),
                type: 'responseNode',
                data: { label: 'Response Node', selected: false },
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
        }

        const newNode = {
            id: 'context-menu', // or any unique ID
            type: 'contextMenuNode',
            data: { label: 'Context Menu Node', items: [
                {key: 'create-trigger', icon: <LibraryAdd />, text: 'Add Trigger Node', onClick: () => { createTriggerNode(); closeContextMenu(); }},
                {key: 'create-code-block-node', icon: <LibraryAdd />, text: 'Code Block', onClick: () => { createCodeBlockNode(); closeContextMenu(); }},
                // {key: 'create-method-invoke', icon: <LibraryAdd />, text: 'Invoke Method', onClick: () => { createMethodInvokeNode(); closeContextMenu(); }},
                {key: 'create-response', icon: <LibraryAdd />, text: 'Add Response Node', onClick: () => { createResponseNode(); closeContextMenu(); }},
                ] },
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
            { (application.name === '') ? ( <div>
                    <h1>Application not loaded</h1>
                    <button onClick={loadApplication}>Load Application</button>
                </div>) :
                ( <div style={{width: '100%', height: '100%', display: 'flex'}}>
                    <div className={"reactFlowContainer"}>
                        <ReactFlow
                            style={flowStyle}
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onNodeClick={onNodeClick}
                            onPaneClick={onPaneClick}
                            onConnect={onConnect}
                            onInit={onInit}
                            onPaneContextMenu={onPaneContextMenu}
                            fitView
                            proOptions={proOptions}
                            nodeTypes={nodeTypes}
                            maxZoom={1}
                        >
                            <MiniMap style={minimapStyle} zoomable pannable/>
                            <Controls/>
                            <Background color="#2B2B38" gap={16} size={3}/>
                            {/*<Panel position={'top-right'} style={{right: 30}}>*/}
                            {/*    <Button>Create Entity</Button>*/}
                            {/*</Panel>*/}
                        </ReactFlow>
                    </div>
                    <div className={`rightSidebar ${(isSidebarCollapsed || selectedNode === null) ? 'collapsed' : ''}`} style={(isSidebarCollapsed || selectedNode === null) ? {} : {width: sidebarWidth}}>
                        <FlowSidebar isCollapsed={isSidebarCollapsed || selectedNode === null}/>
                    </div>
                </div>)
            }
        </div>
    );
}

export default SubFlowEditor;