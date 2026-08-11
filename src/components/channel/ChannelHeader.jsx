const ChannelHeader = ({ avatarUrl, displayName, channelName, description }) => {
    return (
        <div className="channel-header">
            <img src={avatarUrl} alt={channelName} className="channel-header__avatar" />
            <div className="channel-header__info">
                <p className="channel-header__display-name">{displayName}</p>
                <h1 className="channel-header__channel-name">{channelName}</h1>
                <p className="channel-header__description">{description}</p>
            </div>
        </div>
    );
};

export default ChannelHeader;