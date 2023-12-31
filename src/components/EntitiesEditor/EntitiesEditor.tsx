import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState, ReactFlowInstance, Node, Panel,
} from 'reactflow';

import EntityNode from '../CustomNodes/EntityNode';

import 'reactflow/dist/style.css';
import './EntitiesEditor.css';
import {GlobalContext} from "../../GlobalContext";
import EntitySidebar from "../EntitySidebar/EntitySidebar";
import {KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, LibraryAdd} from "@mui/icons-material";
import {Button} from "@mui/material";
import ContextMenuNode from "../CustomNodes/ContextMenuNode";
import ModalCreateEntity from "../ModalCreateEntity/ModalCreateEntity";

const nodeTypes = {
    entityNode: EntityNode,
    contextMenuNode: ContextMenuNode,
};

const minimapStyle = {
    height: 120,
};


const EntitiesEditor = () => {
    const proOptions = { hideAttribution: true };
    const entityEditorRef : React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const {application, loadApplication, addEntityToApplication} = React.useContext(GlobalContext);
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
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const minSidebarWidth = 300;
    const maxSidebarWidth = 1200;
    const [entityCreationModalOpen, setEntityCreationModalOpen] = useState(false);
    const [lastActionPosition, setLastActionPosition] = useState({x: 0, y: 0});

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    }

    const onResizeStart = (event: any) => {
        document.addEventListener('mousemove', onResizeMove);
        document.addEventListener('mouseup', onResizeStop);
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
    }

    const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

    const onNodeClick = (event: any, node: any) => {
        if(node.type === 'entityNode') {
            selectEntity(node.data.id);
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
        } else if(selectedEntity !== null) {
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

    const resetEdges = () => {
        let edges : any[] = [];
        Object.values(application?.entities ? application.entities : []).forEach((entity) => {
            Object.values(entity.attributes).forEach((attribute) => {
                if(attribute.type === 'attribute_ref') {
                    edges.push({
                        id: 'edge_' + entity.id + '_' + attribute.id,
                        source: 'entity_' + attribute.referenceEntityId,
                        sourceHandle: 'et_' + attribute.referenceEntityId + '_at_' + attribute.referenceAttributeId + '-src',
                        target: 'entity_' + entity.id,
                        targetHandle: 'et_' + entity.id + '_at_' + attribute.id + '-tgt',
                        type: 'smoothstep',
                    });
                }
                if(attribute.type === 'entity_ref') {
                    edges.push({
                        id: 'edge_' + entity.id + '_' + attribute.id,
                        source: 'entity_' + attribute.referenceEntityId,
                        sourceHandle: 'et_' + attribute.referenceEntityId + '-src',
                        target: 'entity_' + entity.id,
                        targetHandle: 'et_' + entity.id + '_at_' + attribute.id + '-tgt',
                        type: 'smoothstep',
                    });
                }
            });
        });
        setEdges(edges);
    }

    useEffect(() => {
        //TODO: Add case of reload.
        if(application && application.name !== '' && !loaded) {
            loadNodes();
            resetEdges();
            setLoaded(true);
        }
        if(application && loaded) {
            resetEdges();
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
    // const edgesWithUpdatedTypes = edges.map((edge) => {
    //     if (edge.sourceHandle) {
    //         // @ts-ignore
    //         const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
    //         edge.type = edgeType;
    //     }
    //
    //     return edge;
    // });

    const flowStyle = {
        backgroundColor: "#171727"
    }

    const onPaneContextMenu = (event: any) => {
        event.preventDefault();

        if (!reactFlowInstance) return;

        if(!isContextMenuOpen) {
            setIsContextMenuOpen(true);
        }

        const viewportPoint = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY});
        setLastActionPosition(viewportPoint);

        const newNode = {
            id: 'context-menu', // or any unique ID
            type: 'contextMenuNode',
            data: { label: 'New Node', items: [ {key: 'create-entity', icon: <LibraryAdd />, text: 'Create Entity', onClick: () => { setEntityCreationModalOpen(true); closeContextMenu(); }} ] },
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

    const addEntity = (data:any) => {
        //TODO: Add entity to application state too, but keep in mind not to trigger infinite loop.
        let entity = {
            name: data.entityId,
            id: data.entityId,
            attributes: {
                [data.primaryAttributeId]: {
                    name: data.primaryAttributeId,
                    type: data.primaryAttributeType,
                    id: data.primaryAttributeId,
                    isPrimary: true,
                    isRequired: true,
                    isIndexed: true,
                    isUnique: true,
                    isImmutable: true,
                    isSensitive: false,
                }
            },
            position: lastActionPosition,
        }
        addEntityToApplication(entity);
        setNodes((nds) => {
            return nds.concat({
                id: 'entity_' + entity.id,
                position: {
                    x: entity.position.x,
                    y: entity.position.y,
                },
                data: {
                    id : entity.id,
                },
                type: 'entityNode',
            });
        });
    }

    return (
        <div ref={entityEditorRef} style={{width: '100%', height: '100%'}}>
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
                    <div className="floatingButton" onClick={toggleSidebar}>
                        { isSidebarCollapsed ? <KeyboardDoubleArrowLeft style={{backgroundColor: '#353355'}} /> : <KeyboardDoubleArrowRight style={{backgroundColor: '#353355'}} /> }
                    </div>
                </div>
                { !isSidebarCollapsed && <div className={'entity-editor-sidebar-resizer'} onMouseDown={onResizeStart}></div>}
                <div className={`rightSidebar ${(isSidebarCollapsed || selectedEntity === null) ? 'collapsed' : ''}`} style={(isSidebarCollapsed || selectedEntity === null) ? {} : {width: sidebarWidth}}>
                    <EntitySidebar selectedEntity={selectedEntity} isCollapsed={isSidebarCollapsed || selectedEntity === null}/>
                </div>
                <ModalCreateEntity open={entityCreationModalOpen} onClose={() => { setEntityCreationModalOpen(false); }} onFormSubmit={addEntity} />
                </div>)
            }
        </div>
    );
}

export default EntitiesEditor;