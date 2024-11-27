import { useState, useContext, useEffect } from 'react';
import { DisplayContext } from "../../../contexts/DisplayContext";
import { UilArrowLeft, UilSearch, UilUser, UilArchive, UilCog } from '@iconscout/react-unicons';
import './ClientSearch.css'
import logo from '../../../images/webshelfLogoBlack.png';
import HistoryModal from './components/HistoryModal';
import jsPDF from 'jspdf';

function ClientSearch() {

    const { user, setDisplay } = useContext(DisplayContext);

    const [isLoaded, setIsloaded] = useState(false);
    const [clients, setClients] = useState();
    const [selectedClient, setSelectedClient] = useState();

    const [searchTerm, setSearchTerm] = useState('');

    const [searchOptions, setSearchOptions] = useState(false)

    const [historyModal, setHistoryModal] = useState(false);

    const [typeSearch, setTypeSearch] = useState('cpf');

    const openHistoryModal = (clientId) => {
        setHistoryModal(true)
        setSelectedClient(clientId);
    }

    const clearInputs = () => {
        setSearchTerm('')
    }

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleOpenSearchOptions = () => {
        setSearchOptions(!searchOptions);
    }

    const handleSearchByCpf = () => {
        clearInputs();
        setTypeSearch('cpf')
    }

    const handleSearchByName = () => {
        clearInputs();
        setTypeSearch('name')
    }

    const handleSearchByEmail = () => {
        clearInputs();
        setTypeSearch('email')
    }

    const getData = async() => {
        const response = await fetch(`http://localhost:8080/library/${user}`);
        if(!response.ok){
            console.log("error");
            return;
        }

        const result = await response.json();
        
        setClients(result);
        setIsloaded(true);

        console.log(clients)
    }

    useEffect(()=>{
        getData();
    }, [])

    const generateCard = (id, libraryName, cpf, name, email) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: "cm",
            format: [9, 6] 
        });
    
        const imageData = logo;
        const imgWidth = 5;
        const imgHeight = 2.5;
        const imgX = (9 - imgWidth) / 2;
        const imgY = 0.25;
    
        doc.addImage(imageData, "PNG", imgX, imgY, imgWidth, imgHeight);
    
        const textX = 0.5; 
        const textY = imgY + imgHeight + 0.5;
    
        doc.setFont("Helvetica");
        doc.setFontSize(12)
        const lines = `Library: ${libraryName}\nID: ${id}\nCPF: ${cpf}\nNome: ${name}\nEmail: ${email}`;
        doc.text(lines, textX, textY);
        
        doc.save(`${id}.pdf`);
    };

    return(
        <div className="dashboard">
            <div className="dashboard-area">
                <div className="back-button" onClick={()=>setDisplay('dashboard')}> <UilArrowLeft /> </div>
                {isLoaded && 
                    <div className="book-search-area">
                        <div className="book-search-header">
                            <div className="libName">{clients.libraryName} <span> - Client Searching</span></div>
                            <div className="search-bar">
                                <UilSearch className="search-icon" />
                                {typeSearch === "cpf" && (
                                    <input type="text" placeholder="Search by cpf" value={searchTerm} onChange={handleSearchTermChange} />
                                )}
                                {typeSearch === "name" && (
                                    <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchTermChange} />
                                )}
                                {typeSearch === "email" && (
                                    <input type="text" placeholder="Search by email" value={searchTerm} onChange={handleSearchTermChange} />
                                )}
                                <UilCog className={searchOptions ? "gear-icon-desactive" : "gear-icon"} onClick={handleOpenSearchOptions} />
                            </div>
                        </div>
                        {searchOptions && (
                        <div className="search-options">
                            <div>
                                Select the search type:
                                <button className={typeSearch === "cpf" ? "active" : ""} onClick={handleSearchByCpf}>Search by CPF</button>
                                <button className={typeSearch === "name" ? "active" : ""} onClick={handleSearchByName}>Search by Name</button>
                                <button className={typeSearch === "email" ? "active" : ""} onClick={handleSearchByEmail}>Search by Email</button>
                            </div>
                        </div>
                    )}
                    {searchTerm.trim() === '' &&
                        <div className="list-clients">
                            {clients.clientDTO.map((client) => (
                                <div className={client.hasActiveLoan ? 'list-client-item with-loan' : "list-client-item"}>
                                    <div className="item-icon"> <UilUser /> </div>
                                    <div className="item-data">
                                        <div>ID: {client.id}</div>
                                        <div>CPF: {client.cpf}</div>
                                        <div>Email: {client.email}</div>
                                        {client.name}
                                    </div>
                                    <div className="item-buttons">
                                        <button onClick={() => generateCard(client.id, clients.libraryName, client.cpf, client.name, client.email)}><UilArchive className='button-icon'/> <span>Generate client card</span></button>
                                        <button onClick={() => openHistoryModal(client.id)}><UilSearch  className="button-icon"/> <span>View history</span></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {(typeSearch === "cpf" && searchTerm.trim() !== '') &&
                        <div className="list-clients">
                        {clients.clientDTO.filter((client) => client.cpf.toLowerCase().includes(searchTerm.toLowerCase())).map((client) => (
                            <div className={client.hasActiveLoan ? 'list-client-item with-loan' : "list-client-item"}>
                                <div className="item-icon"> <UilUser /> </div>
                                <div className="item-data">
                                    <div>ID: {client.id}</div>
                                    <div>CPF: {client.cpf}</div>
                                    <div>Email: {client.email}</div>
                                    {client.name}
                                </div>
                                <div className="item-buttons">
                                    <button onClick={() => generateCard(client.id, clients.libraryName, client.cpf, client.name, client.email)}><UilArchive className='button-icon'/> <span>Generate client card</span></button>
                                    <button onClick={() => openHistoryModal(client.id)}><UilSearch className="button-icon"/> <span>View history</span></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    {(typeSearch === "name" && searchTerm.trim() !== '') &&
                        <div className="list-clients">
                        {clients.clientDTO.filter((client) => client.name.toLowerCase().includes(searchTerm.toLowerCase())).map((client) => (
                            <div className={client.hasActiveLoan ? 'list-client-item with-loan' : "list-client-item"}>
                                <div className="item-icon"> <UilUser /> </div>
                                <div className="item-data">
                                    <div>ID: {client.id}</div>
                                    <div>CPF: {client.cpf}</div>
                                    <div>Email: {client.email}</div>
                                    {client.name}
                                </div>
                                <div className="item-buttons">
                                    <button onClick={() => generateCard(client.id, clients.libraryName, client.cpf, client.name, client.email)}><UilArchive className='button-icon'/> <span>Generate client card</span></button>
                                    <button onClick={() => openHistoryModal(client.id)}><UilSearch  className="button-icon"/> <span>View history</span></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    {(typeSearch === "email" && searchTerm.trim() !== '') &&
                        <div className="list-clients">
                        {clients.clientDTO.filter((client) => client.email.toLowerCase().includes(searchTerm.toLowerCase())).map((client) => (
                            <div className={client.hasActiveLoan ? 'list-client-item with-loan' : "list-client-item"}>
                                <div className="item-icon"> <UilUser /> </div>
                                <div className="item-data">
                                    <div>ID: {client.id}</div>
                                    <div>CPF: {client.cpf}</div>
                                    <div>Email: {client.email}</div>
                                    {client.name}
                                </div>
                                <div className="item-buttons">
                                    <button onClick={() => generateCard(client.id, clients.libraryName, client.cpf, client.name, client.email)}><UilArchive className='button-icon'/> <span>Generate client card</span></button>
                                    <button onClick={() => openHistoryModal(client.id)}><UilSearch  className="button-icon"/> <span>View history</span></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    </div>
                }
            </div>
            {historyModal && 
                <HistoryModal selectedClient={selectedClient} setHistoryModal={setHistoryModal}/>
            }
        </div>
    )
}

export default ClientSearch;