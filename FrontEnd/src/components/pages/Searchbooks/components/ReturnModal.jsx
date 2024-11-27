function ReturnModal({bookId, setReturnModal}){

    const returnBook = async() => {
        const response = await fetch(`http://localhost:8080/loan/return/book/${bookId}`, {
            method: "PUT"
        })

        const result = await response.json();

        setReturnModal(false);
    }

    return (
        <div className="return-modal">
            <div className="return-area">
                <div className="return-title">
                    Are you sure that you want return this book?
                </div>
                <div className="return-buttons">
                    <button className="positive" onClick={returnBook}>Yes, Return</button>
                    <button className="cancel" onClick={() => setReturnModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ReturnModal;