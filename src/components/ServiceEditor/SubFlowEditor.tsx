import ReactFlow, {
    addEdge,
    Background, Connection,
    Controls,
    MiniMap, NodeChange,
    ReactFlowInstance,
    useEdgesState,
    useNodesState, XYPosition
} from "reactflow";
import React, {useCallback, useState} from "react";
import {GlobalContext} from "../../GlobalContext";
import FlowSidebar from "../FlowSidebar/FlowSidebar";
import ContextMenuNode from "../CustomNodes/ContextMenuNode";
import TriggerNode from "../CustomNodes/TriggerNode";
import MethodInvokeNode from "../CustomNodes/MethodInvokeNode";
import ResponseNode from "../CustomNodes/ResponseNode";
import {Bolt, Reply, Terminal} from "@mui/icons-material";
import CodeBlockNode from "../CustomNodes/CodeBlockNode";
import EdgeWithDeleteIcon from "../CustomEdges/EdgeWithDeleteIcon";

const nodeTypes = {
    triggerNode: TriggerNode,
    methodInvokeNode: MethodInvokeNode,
    codeBlockNode: CodeBlockNode,
    responseNode: ResponseNode,
    contextMenuNode: ContextMenuNode,
};

const edgeTypes = {
    deletable: EdgeWithDeleteIcon,
};

const minimapStyle = {
    height: 120,
};

const SubFlowEditor = ({flowPath, updateFlow}:{flowPath: string[], updateFlow: (flow: any) => void}) => {
    const {application, loadApplication} = React.useContext(GlobalContext);
    const proOptions = { hideAttribution: true };

    const getFlow = () => {
        let flow : any = application;
        for (let i=0; i < flowPath.length - 1; i++){
            flow = flow.services[flowPath[i]];
        }
        flow = flow.flows[flowPath[flowPath.length - 1]];
        return flow;
    }

    const loadNodes = () : any[] => {
        let flow = getFlow();
        return Object.values(flow.nodes).map((nd: any) => {
            let currNode : any = {
                id: nd.id,
                position: nd.position,
            };
            if(nd.type === 'trigger') {
                currNode.type = 'triggerNode';
                currNode.data = { label: 'Trigger Node', selected: false,
                    isScheduling: nd.config.isScheduling,
                    eventConfig: {
                        path: nd.config.eventConfig.path,
                    },
                    scheduleConfig: {
                        frequency: nd.config.scheduleConfig.frequency,
                    },
                    onConfigUpdate: (config: any) => { updateTriggerConfigInFlow(currNode.id, config); },
                    onDelete: () => {
                        onNodeDelete(currNode.id);
                    }
                };
            } else if (nd.type === 'code') {
                currNode.type = 'codeBlockNode';
                currNode.data = { label: 'Code Block Node', selected: false,
                    code: nd.config.code,
                    onCodeUpdate: (code: string) => { updateCodeInFlow(currNode.id, code); },
                    onDelete: () => {
                        onNodeDelete(currNode.id);
                    },
                };
            } else if (nd.type === 'response') {
                currNode.type = 'responseNode';
                currNode.data = { label: 'Response Node', selected: false,
                    statusCode: nd.config.statusCode,
                    onConfigUpdate: (config: any) => { updateResponseConfigInFlow(currNode.id, config); },
                    onDelete: () => {
                        onNodeDelete(currNode.id);
                    },
                };
            }
            return currNode;
        });
    }

    const loadEdges = () : any[] => {
        let flow = getFlow();
        return Object.values(flow.edges).map((ed: any) => {
            return {
                id: ed.id,
                source: ed.source,
                target: ed.target,
                type: 'deletable',
                data: {
                    onDelete: (edgeId:string) => { handleOnEdgeDelete(edgeId); }
                }
            };
        });
    }

    const initNodes = loadNodes();
    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(loadEdges());
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const minSidebarWidth = 300;
    const maxSidebarWidth = 1200;



    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    // let flow : any = application;
    // for (let i=0; i < flowPath.length - 1; i++){
    //     flow = flow.services[flowPath[i]];
    // }
    // flow = flow.flows[flowPath[flowPath.length - 1]];

    const handleUpdateFlow = (newFlow: any) => {
        updateFlow(newFlow);
    }

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

    const createTriggerNode = (viewportPoint: XYPosition) => {
        const newNode = {
            id: 'node_' + Math.random(),
            type: 'triggerNode',
            data: { label: 'Trigger Node', selected: false,
                isScheduling: false,
                eventConfig: {
                    path: '',
                },
                scheduleConfig: {
                    frequency: 'day',
                },
                onConfigUpdate: (config: any) => { updateTriggerConfigInFlow(newNode.id, config); },
                onDelete: () => {
                    onNodeDelete(newNode.id);
                }
            },
            position: viewportPoint,
            // other node properties
        };

        let flow = getFlow();

        handleUpdateFlow({
            ...flow,
            nodes: [
                ...flow.nodes,
                {
                    id: newNode.id,
                    type: 'trigger',
                    config: {
                        isScheduling: false,
                        eventConfig: {
                            path: '',
                        },
                        scheduleConfig: {
                            frequency: 'day',
                        },
                    },
                    position: viewportPoint,
                }
            ]
        });

        setNodes((nds) => {
            let idx = nds.findIndex((nd) => { return nd.id === 'context-menu'});
            if(idx > -1) {
                nds.splice(idx, 1);
            }
            return nds.concat(newNode);
        });
    }

    const createMethodInvokeNode = (viewportPoint: XYPosition) => {
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

    const updateCodeInFlow = (nodeId: string, code: string) => {
        let flow = getFlow();
        handleUpdateFlow({
            ...flow,
            nodes: flow.nodes.map((nd: any) => {
                if(nd.id === nodeId) {
                    nd.config.code = code;
                }
                return nd;
            })
        });
    }

    const updateTriggerConfigInFlow = (nodeId: string, config: any) => {
        let flow = getFlow();
        handleUpdateFlow({
            ...flow,
            nodes: flow.nodes.map((nd: any) => {
                if(nd.id === nodeId) {
                    nd.config = config;
                }
                return nd;
            })
        });
    }

    const updateResponseConfigInFlow = (nodeId: string, config: any) => {
        let flow = getFlow();
        handleUpdateFlow({
            ...flow,
            nodes: flow.nodes.map((nd: any) => {
                if(nd.id === nodeId) {
                    nd.config = config;
                }
                return nd;
            })
        });
    }

    const deleteNodeInFlow = (nodeId: string) => {
        let flow = getFlow();
        handleUpdateFlow({
            ...flow,
            nodes: flow.nodes.filter((nd: any) => {
                return nd.id !== nodeId;
            })
        });
    }

    const onNodeDelete = (nodeId: string) => {
        setNodes((nds) => {
            setEdges((eds) => {
                eds.map((ed) => {
                    if(ed.source === nodeId || ed.target === nodeId) {
                        deleteEdgeInFlow(ed.id);
                    }
                    return ed;
                });
                return eds.filter((ed) => {
                    return ed.source !== nodeId && ed.target !== nodeId;
                });
            });
            return nds.filter((nd) => { return nd.id !== nodeId });
        });
        deleteNodeInFlow(nodeId);
    }

    const createCodeBlockNode = (viewportPoint: XYPosition) => {
        const newNode = {
            id: 'node_' + Math.random(),
            type: 'codeBlockNode',
            data: { label: 'Code Block Node', selected: false,
                code: '',
                onCodeUpdate: (code: string) => { updateCodeInFlow(newNode.id, code); },
                onDelete: () => {
                    onNodeDelete(newNode.id);
                },
            },
            position: viewportPoint,
            // other node properties
        };

        let flow = getFlow();

        handleUpdateFlow({
            ...flow,
            nodes: [
                ...flow.nodes,
                {
                    id: newNode.id,
                    type: 'code',
                    config: {
                        code: '',
                    },
                    position: viewportPoint,
                }
            ]
        });

        setNodes((nds) => {
            let idx = nds.findIndex((nd) => { return nd.id === 'context-menu'});
            if(idx > -1) {
                nds.splice(idx, 1);
            }
            return nds.concat(newNode);
        });
    }

    const createResponseNode = (viewportPoint: XYPosition) => {
        const newNode = {
            id: 'node_' + Math.random(),
            type: 'responseNode',
            data: { label: 'Response Node', selected: false,
                statusCode: 200,
                onConfigUpdate: (config: any) => { updateResponseConfigInFlow(newNode.id, config); },
                onDelete: () => {
                    onNodeDelete(newNode.id);
                },
            },
            position: viewportPoint,
            // other node properties
        };

        let flow = getFlow();
        handleUpdateFlow({
            ...flow,
            nodes: [
                ...flow.nodes,
                {
                    id: newNode.id,
                    type: 'response',
                    config: {
                        statusCode: 200,
                    },
                    position: viewportPoint,
                }
            ]
        });

        setNodes((nds) => {
            let idx = nds.findIndex((nd) => { return nd.id === 'context-menu'});
            if(idx > -1) {
                nds.splice(idx, 1);
            }
            return nds.concat(newNode);
        });
    }

    const handleOnEdgesChange = (changes: any) : void => {
        onEdgesChange(changes);
    }

    const handleOnNodesChange = (changes: NodeChange[]) : void => {
        //TODO: Reflex move in application state
        changes.map((change) => {
            if(change.type === 'position' && change.position){
                let flow = getFlow();
                handleUpdateFlow({
                    ...flow,
                    nodes: flow.nodes.map((nd: any) => {
                        if(nd.id === change.id) {
                            nd.position = change.position;
                        }
                        return nd;
                    })
                });
            }
        });
        onNodesChange(changes);
    }

    const deleteEdgeInFlow = (edgeId: string) => {
        let flow = getFlow();
        handleUpdateFlow({
            ...flow,
            edges: flow.edges.filter((ed: any) => {
                return ed.id !== edgeId;
            })
        });
    }

    const handleOnEdgeDelete = (edgeId: string) => {
        deleteEdgeInFlow(edgeId);
        setEdges((eds) => {
            return eds.filter((ed) => { return ed.id !== edgeId });
        });
    }

    const handleOnConnect = (params: Connection) : void => {
        let id : string = 'edge_' + Math.random();
        let flow = getFlow();
        handleUpdateFlow({
            ...flow,
            edges: [
                ...flow.edges,
                {
                    id: id,
                    source: params.source,
                    target: params.target,
                }
            ]
        });
        setEdges((eds) => addEdge({...params,
            id: id,
            type: 'deletable', data: {
            onDelete: (edgeId: string) => { handleOnEdgeDelete(edgeId); }
            }}, eds));
    }

    const onPaneContextMenu = (event: any) => {
        event.preventDefault();

        if (!reactFlowInstance) return;

        if(!isContextMenuOpen) {
            setIsContextMenuOpen(true);
        }

        const viewportPoint = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY});

        const newNode = {
            id: 'context-menu', // or any unique ID
            type: 'contextMenuNode',
            data: { label: 'Context Menu Node', items: [
                {key: 'create-trigger', icon: <Bolt />, text: 'Add Trigger Node', onClick: () => { createTriggerNode(viewportPoint); closeContextMenu(); }},
                {key: 'create-code-block-node', icon: <Terminal />, text: 'Code Block', onClick: () => { createCodeBlockNode(viewportPoint); closeContextMenu(); }},
                // {key: 'create-method-invoke', icon: <LibraryAdd />, text: 'Invoke Method', onClick: () => { createMethodInvokeNode(viewportPoint); closeContextMenu(); }},
                {key: 'create-response', icon: <Reply />, text: 'Add Response Node', onClick: () => { createResponseNode(viewportPoint); closeContextMenu(); }},
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
                            onNodesChange={handleOnNodesChange}
                            onEdgesChange={handleOnEdgesChange}
                            onNodeClick={onNodeClick}
                            onPaneClick={onPaneClick}
                            onConnect={handleOnConnect}
                            onInit={onInit}
                            onPaneContextMenu={onPaneContextMenu}
                            proOptions={proOptions}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            maxZoom={1.5}
                            defaultViewport={{x:0, y:0, zoom: 1}}
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