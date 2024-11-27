import { useEffect, useState } from "react";
import UpdateClientData from "./UpdateClientData";

function HistoryModal({selectedClient, setHistoryModal}) {

    const [clientHistory, setClientHistory] = useState([])

    const [updateModal, setUpdateModal] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false)

    const getHistory = async() => {
        try{
            const response = await fetch(`http://localhost:8080/client/${selectedClient}/with-loans`);

            if(!response.ok){
            console.log("erro")
            return
            }

            const result = await response.json()

            setClientHistory(result);
            setIsLoaded(true)

            console.log(clientHistory.loans);
        }catch(error){
            console.log(error);
        }
    }

    function formatarData(dataArray) {
        const [ano, mes, dia] = dataArray;
        const data = new Date(ano, mes - 1, dia);
        return data.toLocaleDateString("pt-BR"); 
    }

    useEffect(()=>{
        getHistory();
    }, [])

    return(
        <div className="history-modal">
            {isLoaded &&
            <div className="history-area">
                <div className="client-info">
                    <div> <span>Name:</span> {clientHistory.name}</div>
                    <div> <span>CPF:</span> {clientHistory.cpf}</div>
                </div>
                <div className="history-list">
                    <div className="history-list-header">
                            <div>Loan ID</div>
                            <div>Book name</div>
                            <div>Registry date</div>
                            <div>Return date</div>
                    </div>
                    {clientHistory.loans.map((loan) => (
                        <div className={loan.active ? "history-list-item with-loan" :"history-list-item"}>
                            <div>{loan.id}</div>
                            <div>{loan.book_name}</div>
                            <div>{formatarData(loan.registryDate)}</div>
                            <div>{formatarData(loan.expected_return)}</div>
                        </div>
                    ))}
                </div>
                <div className="close-button" onClick={() => setHistoryModal(false)}>Close history</div>
            </div>
            }
            {updateModal && <UpdateClientData ClientData={clientHistory} setUpdateModal={setUpdateModal} />}
        </div>
    )
}

export default HistoryModal;