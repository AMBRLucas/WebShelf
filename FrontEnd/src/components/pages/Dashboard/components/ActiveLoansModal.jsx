import { useContext, useEffect, useState } from "react";
import { DisplayContext } from "../../../../contexts/DisplayContext";
import { UilArrowLeft, UilSearch, UilUser, UilArchive, UilCog, UilMultiply, UilPlus } from '@iconscout/react-unicons';

function ActiveLoansModal({ setModal }){

    const { user } = useContext(DisplayContext);

    const [activeLoans, setActiveLoans] = useState("");

    const getData = async() => {
        try{
            const response = await fetch(`http://localhost:8080/library/${user}`);
            const result = await response.json();

            setActiveLoans(result.loanDTO);
            console.log(result.loanDTO);
        }catch(error){

        }
    }

    const dataFormatter = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    useEffect(()=>{
        getData();
    }, [])

    return(
        <div className="active-loans-modal">
            <div className="active-loans-area">
                <div className="return-button" onClick={() => setModal(false)}> <UilArrowLeft className="back-arrow" /> </div>
                <div className="active-loans-content">
                    <span>Active Loans</span>
                    <div className="active-loans-table">
                        <div className="active-loans-header">
                            <div>ID</div>
                            <div>Book Name</div>
                            <div>Client Name</div>
                            <div>Expected Return</div>
                        </div>
                        <div className="active-loans-list">
                            {activeLoans.length > 0 && 
                                <>
                                {activeLoans.filter(loan => loan.active).map((loan)=>(
                                    <div className="active-loans-list-item">
                                        <div>{loan.id}</div>
                                        <div>{loan.book_name}</div>
                                        <div>{loan.client_name}</div>
                                        <div>{dataFormatter(loan.expected_return)}</div>
                                    </div>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveLoansModal;