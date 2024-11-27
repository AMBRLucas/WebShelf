function UpdateClientData({ClientData, setUpdateClient}){

    return(
        <div className="update-client-modal">
            <div className="update-client-area">
                <div className="update-client-title">
                    Update client info
                </div>
                <div className="update-client-inputs">
                    <input type="text" name="name" />
                </div>
            </div>
        </div>
    )
}

export default UpdateClientData;