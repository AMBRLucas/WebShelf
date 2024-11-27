import { useEffect, useState, useContext } from "react";
import { DisplayContext } from "../../../../contexts/DisplayContext";
import { UilUser } from '@iconscout/react-unicons'
import { CartesianGrid, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function ProfileModal({setProfileModal}){

    const { user } = useContext(DisplayContext);

    const [actualYear, setActualYear] = useState(0);
    const [actualMonth, setActualMonth] = useState(0);

    const [loanData, setLoanData] = useState('');
    const [userInfos, setUserInfos] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const date = new Date();
        setActualMonth(date.getMonth() + 1);
        setActualYear(date.getFullYear());
      }, []);
    
      useEffect(() => {
        if (actualYear !== 0 && actualMonth !== 0) {
          const getData = async () => {
            try {
              const response = await fetch(`http://localhost:8080/loan/monthly?month=${actualMonth}&year=${actualYear}&libraryId=${user}`);
              const result = await response.json();
              setLoanData(result);
              console.log(result);
            } catch (error) {
              console.log(error);
            }
    
            try {
              const rawUserData = await fetch(`http://localhost:8080/library/${user}`);
              const userData = await rawUserData.json();
              setUserInfos(userData);
              console.log(userData);
            } catch (error) {
              console.log(error);
            }
    
            setIsLoaded(true);
          };
    
          getData();
        }
      }, [actualYear, actualMonth, user]); // Dependências para garantir que `getData` só rode após esses valores estarem prontos
    
    return (
        <div className="profile-modal">
            {isLoaded &&
                <div className="profile-area">
                <div className="profile-header">
                    <div className="profile-icon">
                        <UilUser className="icon-img"/>
                    </div>
                    <div className="profile-user-infos">
                        <p className="title">{userInfos.libraryName}</p>
                        <p>Registraded books: <span>{userInfos.booksDTO.length}</span></p>
                        <p>Registraded clients: <span>{userInfos.clientDTO.length}</span></p>
                        <p>Maked loans: <span>{userInfos.loanDTO.length}</span></p>
                    </div>
                </div>
                <span>Your loans in this month:</span>
                {loanData.length > 0 &&
                    <ResponsiveContainer width={800} height={300} className="loan-grafic">
                    <BarChart data={loanData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" label={{value: 'Day', position: "insideBottomLeft"}} />
                      <YAxis label={{value: 'Loans', angle: -90}} allowDecimals={false}/>
                      <Bar dataKey="loans" fill="#551111" barSize={40}/>
                    </BarChart>
                  </ResponsiveContainer>
                }
                  <button className="profile-close" onClick={() => setProfileModal(false)}>Close</button>
            </div>   
            }
        </div>
    )
}

export default ProfileModal;