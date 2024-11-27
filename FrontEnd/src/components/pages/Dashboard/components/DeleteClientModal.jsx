import { useState } from 'react'

function DeleteClientModal({ setDeleteClientModal }) {

    const [clientID, setCLientID] = useState('') 

    const handleClientIdChange = (event) => {
        setCLientID(event.target.value)
    }

    const handleDeleteCLient = async() => {
        try{
            const response = await fetch(`http://localhost:8080/client/delete/${clientID}`, {
                method: "DELETE"
            })

            setDeleteClientModal(false)
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="delete-client-modal">
            <div className="delete-client-area">
                <div className="delete-title">Delete a client</div>
                <div className="delete-subtitle">Are you sure that you want delete a client? it's permanent, to make sure is that you want to delete a client you need to know his ID</div>
                <input type="text" name="clientID" value={clientID} onChange={handleClientIdChange} placeholder="Client ID" />
                <button className="remove" onClick={handleDeleteCLient}>Delete</button>
                <button className="cancel" onClick={() => setDeleteClientModal(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteClientModal;