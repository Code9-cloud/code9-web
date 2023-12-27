import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState, ReactFlowInstance, Node,
} from 'reactflow';

import EntityNode from '../CustomNodes/EntityNode';

import 'reactflow/dist/style.css';
import './EntitiesEditor.css';
import {GlobalContext} from "../../GlobalContext";
import EntitySidebar from "../EntitySidebar/EntitySidebar";
import {KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight} from "@mui/icons-material";

const nodeTypes = {
    entityNode: EntityNode,
};

const minimapStyle = {
    height: 120,
};


const EntitiesEditor = () => {
    const proOptions = { hideAttribution: true };
    const entityEditorRef : React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const {application, loadApplication} = React.useContext(GlobalContext);
    const initNodes : Node[] = application?.entities ? Object.values(application.entities).map((entity) => { return { id: 'entity_' + entity.id,
        position: {
            x: entity.position.x,
            y: entity.position.y,
        },
        data: {
            id : entity.id,
        },
        type: 'entityNode',
    } }) : [];
    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);
    const [loaded, setLoaded] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [isResizing, setIsResizing] = useState(false);
    const minSidebarWidth = 300;
    const maxSidebarWidth = 1200;

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    }

    const onResizeStart = (event: any) => {
        document.addEventListener('mousemove', onResizeMove);
        document.addEventListener('mouseup', onResizeStop);
        setIsResizing(true);
    }

    const onResizeMove = (event: any) => {
        if (!entityEditorRef.current) return;

        const containerRect = entityEditorRef.current.getBoundingClientRect();
        const newWidth = Math.max(Math.min((containerRect.right - event.clientX), maxSidebarWidth), minSidebarWidth);
        setSidebarWidth(newWidth);
    }

    const onResizeStop = (event: any) => {
        document.removeEventListener('mousemove', onResizeMove);
        document.removeEventListener('mouseup', onResizeStop);
        setIsResizing(false);
    }

    const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

    const onNodeClick = (event: any, node: any) => {
        if(node.type === 'entityNode') {
            selectEntity(node.data.id);
        }
    }

    const onPaneClick = (event: any) => {
        if(selectedEntity !== null) {
            unselectEntity();
        }
    }

    const selectEntity = (entityId: string) => {
        if(selectedEntity === entityId) return;
        if(selectedEntity !== entityId) {
            setNodes((nds) => {
                return nds.map((nd) => {
                    if(nd.id === 'entity_' + entityId) {
                        nd.data = { ...nd.data, selected: true };
                    } else if (selectedEntity !== null && nd.id === 'entity_' + selectedEntity) {
                        nd.data = { ...nd.data, selected: false };
                    }
                    return nd;
                });
            });
        }
        setSelectedEntity(entityId);
    }
    const unselectEntity = () => {
        if(selectedEntity === null) return;
        setNodes((nds) => {
            return nds.map((nd) => {
                if(nd.id === 'entity_' + selectedEntity) {
                    nd.data = { ...nd.data, selected: false };
                }
                return nd;
            });
        });
        setSelectedEntity(null);
    }

    useEffect(() => {
        if(application && !loaded) {
            loadNodes();
            setLoaded(true);
        }
    }, [application]);

    const loadNodes = () => {
        const nodes : Node[] = application?.entities ? Object.values(application.entities).map((entity) => { return { id: 'entity_' + entity.id,
            position: {
                x: entity.position.x,
                y: entity.position.y,
            },
            data: {
                id : entity.id,
            },
            type: 'entityNode',
        } }) : [];
        setNodes(nodes);
    }

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
        <div ref={entityEditorRef} style={{width: '100%', height: '100%'}}>
            { (application === null) ? ( <div>
                    <h1>Application not loaded</h1>
                    <button onClick={loadApplication}>Load Application</button>
                </div>) :
                ( <div style={{width: '100%', height: '100%', display: 'flex'}}>
                <div className={"reactFlowContainer"}>
                    <ReactFlow
                        style={flowStyle}
                            nodes={nodes}
                            edges={edgesWithUpdatedTypes}
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
                    </ReactFlow>
                    <div className="floatingButton" onClick={toggleSidebar}>
                        { isSidebarCollapsed ? <KeyboardDoubleArrowLeft style={{backgroundColor: '#353355'}} /> : <KeyboardDoubleArrowRight style={{backgroundColor: '#353355'}} /> }
                    </div>
                </div>
                { !isSidebarCollapsed && <div className={'entity-editor-sidebar-resizer'} onMouseDown={onResizeStart}></div>}
                <div className={`rightSidebar ${isSidebarCollapsed ? 'collapsed' : ''}`} style={isSidebarCollapsed ? {} : {width: sidebarWidth}}>
                    <EntitySidebar selectedEntity={selectedEntity} isCollapsed={isSidebarCollapsed}/>
                </div>
                </div>)
            }
        </div>
    );
}

export default EntitiesEditor;