import './FlowSidebar.css';

const FlowSidebar = ({isCollapsed}:any) => {
    return (
    <div className={`flow-editor-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="flow-sidebar__header">
        <h2>Flow Sidebar</h2>
      </div>
      <div className="flow-sidebar__content">
        <p>Content</p>
      </div>
    </div>
  );
}

export default FlowSidebar;