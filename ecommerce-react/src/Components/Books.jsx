import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { booksContext } from '../App';

const Books = ({ rating}) => {
    const bookslist = useContext(booksContext);
    function scrolltop() {
        window.scrollTo(0, 0);
    }
    let navigate = useNavigate();
    return (
        <div id="books">
            <div id='allbooks' style={{fontWeight: 'bold', fontSize: '2.5rem'}}>All Books</div>
            <div id='books_container'>
                {bookslist.map(book => {
                    return <div key={book.id} className="book" onClick={() => {navigate(`/books/${book.id}`); scrolltop()}}>
                        <img src={book.image}></img>
                        <p>{book.title}</p>
                        <p>{book.price}</p>
                        {rating(book.rating)}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Books;