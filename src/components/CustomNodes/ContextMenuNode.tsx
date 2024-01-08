import './ContextMenuNode.css';

function ContextMenuNode({data}: any) {
    // Assume items in data of form {key:string, icon: React.Node, text: string, onClick: function}
    return (
        <div className="context-menu-node nodrag nopan">
            <div className="context-menu-header">
                Select Action
            </div>
            {data.items.map((item: any) => (
                <div key={item.key} className="context-menu-node__item" onClick={item.onClick}>
                    {item.icon}
                    <div className="context-menu-node__item__text">{item.text}</div>
                </div>
            ))}
        </div>
    );
}

export default ContextMenuNode;