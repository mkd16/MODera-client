const ManageChannelTab = () => {
    return (
        <form className="channel-settings-form">
            <div className="form-group">
                <label className="form-label" htmlFor="channelName">Channel name</label>
                <input id="channelName" name="channelName" type="text" className="form-input" placeholder="e.g. Aarav Codes" />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="handle">Handle</label>
                <input id="handle" name="handle" type="text" className="form-input" placeholder="@aaravcodes" />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea id="description" name="description" className="form-input form-textarea" rows={4} placeholder="Tell viewers about your channel" />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="channelVisibility">Channel visibility</label>
                <select id="channelVisibility" name="channelVisibility" className="form-input">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
            </div>

            <div className="channel-settings-form__actions">
                <button type="button" className="btn btn--secondary">Cancel</button>
                <button type="submit" className="btn btn--primary">Save changes</button>
            </div>
        </form>
    );
};

export default ManageChannelTab;