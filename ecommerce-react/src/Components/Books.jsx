import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { booksContext } from '../App';

const Books = ({ rating}) => {
    const bookslist = useContext(booksContext);
    function scrolltop() {
        window.scrollTo(0, 0);
    }
    let navigate = useNavigate();
    const [sort, setSort] = useState('0');

    let names = [];
    bookslist.forEach(book => {
        names.push(book.title);
    });
    names.sort();
    let alpha = [];
    names.forEach(name => {
        for (let i = 0; i < bookslist.length; i++) {
            if (bookslist[i].title === name) {
                alpha.push(bookslist[i]);
            }
        }
    });
    let copyforlow = [...bookslist];
    let low = copyforlow.sort((a, b) => {
        return a.price.slice(1) - b.price.slice(1);
    });
    let high = []
    low.forEach(val => {
        high.unshift(val);
    })

    let copy = [...bookslist]
    let rates = copy.sort((a, b) => {
        return b.rating - a.rating;
    })
    let options = [alpha, high, low, rates];
    return (
        <div id="books">
            <div id='allbooks' style={{fontWeight: 'bold', fontSize: '2.5rem'}}>
                <p style={{fontSize: '2.5rem', marginLeft: '5%', marginTop: '0', marginBottom: '0'}}>All Books</p>
                <div id='sort_container'>
                    <p>Sort</p>
                    <select name="sort" onChange={(e) => setSort(e.target.value)} style={{marginRight: '5rem', padding: '0.7rem'}}>
                        <option value='0'>Alphabetical</option>
                        <option value='1'>Price, High to Low</option>
                        <option value='2'>Price, Low to High</option>
                        <option value='3'>Rating</option>
                    </select>
                </div>
            </div>
            {/* options are alpha, high, low, rates */}
            <div id='books_container'>
                {options[sort].map(book => {
                    return <div key={book.id} className="book" onClick={() => {navigate(`/books/${book.id}`); scrolltop();}}>
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