const TABS = [
    { key: "videos", label: "Videos" },
    { key: "settings", label: "Channel" },
];

const ChannelTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="channel-tabs">
            {TABS.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={`channel-tab ${activeTab === tab.key ? "channel-tab--active" : ""}`}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default ChannelTabs;