import React from 'react'

export default function Header() {
    const views = ['../routes/rankings', '../routes/game_history',
                   '../routes/add_game'];
    const currentView = views[0];

    return(
        <div className="tabs">
            <ol className="tab-list">
            {children.map((child) => {
                const { label } = child.props;

                return (
                <Tab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    onClick={onClickTabItem}
                />
                );
            })}
            </ol>
            <div className="tab-content">
            {children.map((child) => {
                if (child.props.label !== activeTab) return undefined;
                return child.props.children;
            })}
            </div>
        </div>
    );
}