import { useState } from 'react';
import Error from './Error';

function DeleteBookModal({ setDeleteBook }) {

    const [deleteId, setDeleteId] = useState('');
    const [error, setError] = useState(false);

    const handleDeleteIdChange = (event) => {
        setDeleteId(event.target.value);
    }

    const deleteBook = async() => {
        if(deleteId.trim() !== ''){
            try{
                const response = await fetch(`http://localhost:8080/book/delete/${deleteId}`, {
                    method: "DELETE"
                });

                if(response.status === 500){
                    setError(true)
                    return;
                }

                setDeleteBook(false);

            }catch(error){
                console.log(error);
            }
        }
    }

    return(
        <div className="delete-book-modal">
            <div className="delete-book">
                <div className="delete-title">
                    Delete a book
                </div>
                <div className="delete-subtitle">
                    Are you sure that you want remove one from your collection? to avoid deleting books by acident you must insert the ID from the book that you want remove, is boring i know, but is for you security.
                </div>
                {error && <Error msg="Não foi possivel excluir, ou o ID não foi encontrado, ou o livro em questão está emprestado" />}
                <input type="text" name="id" placeholder="Book ID" value={deleteId} onChange={handleDeleteIdChange} />
                <button className="remove" onClick={deleteBook}>Remove book</button>
                <button className="cancel" onClick={() => setDeleteBook(false)}>Cancel</button>
            </div>
        </div>
    )

}

export default DeleteBookModal;