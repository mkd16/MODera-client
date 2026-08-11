import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ChannelHeader from "../components/channel/ChannelHeader";
import ChannelTabs from "../components/channel/ChannelTabs";
import ManageVideosTab from "../components/channel/ManageVideosTab";
import ManageChannelTab from "../components/channel/ManageChannelTab";
import UploadModal from "../components/Upload/UploadModal";

const Channel = () => {
    const [activeTab, setActiveTab] = useState("videos");
    const [searchParams, setSearchParams] = useSearchParams();

    const isUploadOpen = searchParams.get("upload") === "true";

    const closeUploadModal = () => {
        searchParams.delete("upload");
        setSearchParams(searchParams);
    };

    return (
        <div className="channel-page">
            <ChannelHeader
                avatarUrl="https://i.pravatar.cc/150?img=12"
                displayName="Aarav Sharma"
                channelName="Aarav Codes"
                description="Tutorials on React, Node.js and building things from scratch. New videos every week."
            />

            <ChannelTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="channel-tab-content">
                {activeTab === "videos" ? <ManageVideosTab /> : <ManageChannelTab />}
            </div>

            {isUploadOpen && <UploadModal onClose={closeUploadModal} />}
        </div>
    );
};

export default Channel;