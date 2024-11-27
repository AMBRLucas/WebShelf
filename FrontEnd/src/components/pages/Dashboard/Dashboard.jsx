import { useEffect, useState, useContext } from "react";
import { DisplayContext } from "../../../contexts/DisplayContext";
import AddNewBookModal from "./components/AddNewBookModal"
import "./Dashboard.css"
import AddNewClientModal from "./components/AddNewClientModal";
import { UilArrowLeft, UilSearch, UilUser, UilArchive, UilCog, UilMultiply, UilPlus } from '@iconscout/react-unicons';
import DeleteBookModal from "./components/DeleteBookModal";
import DeleteClientModal from "./components/DeleteClientModal";
import ProfileModal from "./components/ProfileModal";
import ActiveLoansModal from "./components/ActiveLoansModal";
import LoanHistoryModal from "./components/LoanHistoryModal";
import UserManual from "./components/UserManual";

function Dashboard(){

    const {display, setDisplay, user, setUser} = useContext(DisplayContext) 

    const [library, setLibrary] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeLoansModal, setActiveLoansModal] = useState(false);
    const [loanHistoryModal, setLoanHistoryModal] = useState(false);
    const [userManual, setUserManual] = useState(false);

    const [profileModal, setProfileModal] = useState(false);

    const [addNewBook, setAddNewBook] = useState(false);
    const [deleteBook, setDeleteBook] = useState(false);

    const [addNewClient, setAddNewClient] = useState(false);
    const [deleteClient, setDeleteClient] = useState(false);

    const colectData = async(id) => {
        try{
            const response = await fetch(`http://localhost:8080/library/${id}/w-count`)
            
            if(!response.ok){
                console.log("error")
                return
            }

            const result = await response.json()
            setLibrary(result);
            console.log(library)
            setIsLoaded(true);
        }catch(error){
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("id");
        setUser(null)
        window.location.reload();
    }

    useEffect(()=>{
        colectData(user)
    }, [])

    return(
        <div className="dashboard">
            {!isLoaded ? <p>CARREGANDO...</p> :

                <div className="dashboard-area">
                    <div className="return-button" onClick={()=> setModalIsOpen(true)}> <UilArrowLeft className="back-arrow" /> </div>
                    <div className="actions-area">
                        <div className="libName"><div className="spacer">{library.libraryName} <div className="profile-button"  onClick={() => setProfileModal(true)}><div className="profile-icon"><UilUser className="icon" /></div>Your profile</div></div></div>
                        <div className="section">
                        <div className="dashboard-banner">
                            <div className="banner-blur">
                                <div className="banner-title">
                                    Are you a new webshelf user? 
                                </div>
                                <div className="banner-subtitle">Too much buttons and funcionalities? i know, this can be confuse sometimes</div>
                                <div className="banner-button" onClick={() => setUserManual(true)}>Click here to see a guide</div>
                            </div>
                        </div>
                        <div className="action-section">
                            <div className="title-actions"><span>Collection</span></div>
                            <div className="actions">
                                <div className="action-card" onClick={() => setDisplay("booksearch")}>
                                    <div className="card-icon"> <UilSearch className="transparent-icon" /> </div>
                                    <span>Check Collection</span>
                                </div>
                                <div className="action-card" onClick={() => setAddNewBook(true)}>
                                    <div className="card-icon"> <UilPlus className="transparent-icon" /> </div>
                                    <span>Add new book</span>
                                </div>
                                <div className="action-card" onClick={() => setDeleteBook(true)}>
                                    <div className="card-icon"> <UilMultiply className="transparent-icon" /> </div>
                                    <span>Remove book</span>
                                </div>
                            </div>
                        </div>
                        <div className="action-section">
                            <div className="title-actions"><span>Client</span></div>
                            <div className="actions">
                                <div className="action-card" onClick={() => setDisplay("clientsearch")}>
                                    <div className="card-icon"> <UilSearch className="transparent-icon" /> </div>
                                    <span>Check clients</span>
                                </div>
                                <div className="action-card" onClick={() => setAddNewClient(true)}>
                                    <div className="card-icon"> <UilPlus className="transparent-icon" /> </div>
                                    <span>Registry client</span>
                                </div>
                                <div className="action-card" onClick={() => setDeleteClient(true)}>
                                    <div className="card-icon"> <UilMultiply className="transparent-icon" /> </div>
                                    <span>Remove a client</span>
                                </div>
                            </div>
                        </div>
                        <div className="action-section">
                            <div className="title-actions"><span>Loans</span></div>
                            <div className="actions">
                                <div className="action-card" onClick={() => setActiveLoansModal(true)}>
                                    <span>Check Active loans</span>
                                </div>
                                <div className="action-card" onClick={() => setLoanHistoryModal(true)}>
                                    <span>Loan History</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {modalIsOpen &&
                        <div className="logout-modal">
                            <div className="modal">
                                <div className="exit-title">
                                    <span className="x-button" onClick={() => setModalIsOpen(false)}>X</span>
                                    <span className="x-title">Are you sure you want to leave?</span>
                                </div>
                                <div className="exit-buttons">
                                    <button className="exit" onClick={() => logout()}>Yes, exit</button>
                                </div>
                            </div>
                        </div>
                    }

                    {addNewBook && 
                        <AddNewBookModal setAddNewBook={setAddNewBook} />
                    }

                    {addNewClient &&
                        <AddNewClientModal setAddNewClient={setAddNewClient} />
                    }

                    {deleteBook &&
                        <DeleteBookModal setDeleteBook={setDeleteBook} />
                    }

                    {deleteClient &&
                        <DeleteClientModal setDeleteClientModal={setDeleteClient} />
                    }

                    {profileModal && 
                        <ProfileModal setProfileModal={setProfileModal} />
                    }

                    {activeLoansModal &&
                        <ActiveLoansModal setModal={setActiveLoansModal} />
                    }
                    {loanHistoryModal &&
                        <LoanHistoryModal setModal={setLoanHistoryModal} />
                    }
                    {userManual && 
                        <UserManual setModal={setUserManual} />
                    }
                </div>
            }
        </div>
    )
}

export default Dashboard;