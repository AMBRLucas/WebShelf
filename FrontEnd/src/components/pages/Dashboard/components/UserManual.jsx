import { UilArrowLeft, UilSearch, UilUser, UilArchive, UilCog, UilMultiply, UilPlus } from '@iconscout/react-unicons';

function UserManual({setModal}){

    return(
        <div className="manual-modal">
            <div className="manual-content">
                <div className="return-button"> <UilArrowLeft className="back-arrow" /> </div>
                <div className='manual-infos'>
                    <div className='manual-title'>User manual</div>
                    <div className="manual-info-section">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManual;