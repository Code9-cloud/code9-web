import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, useReactFlow} from "reactflow";
import {IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";

export default function EdgeWithDeleteIcon({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       selected,
                                       style = {},
                                       markerEnd,
                                       data
                                   }: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const onDelete = data.onDelete || ((_:string) => {});

    const onEdgeClick = () => {
        onDelete(id);
    };

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            { selected && <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <IconButton className="edgebutton" onClick={onEdgeClick}>
                        <Close />
                    </IconButton>
                </div>
            </EdgeLabelRenderer> }
        </>
    );
}