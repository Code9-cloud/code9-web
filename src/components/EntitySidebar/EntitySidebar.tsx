import React from "react";
import './EntitySidebar.css';

const EntitySidebar : React.FC<{selectedEntity: string|null, isCollapsed: boolean}> = ({selectedEntity, isCollapsed}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    return (
        <div className={`entity-editor-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            { selectedEntity === null && (<div>
                Selected Entity Details will show up here
            </div>) }
        </div>
    );
}

export default EntitySidebar;