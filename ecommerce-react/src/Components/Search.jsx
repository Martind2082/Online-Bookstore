import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { booksContext } from "../App";

const Search = ({cartItem, addCart, rating}) => {
    let navigate = useNavigate();
    const bookslist = useContext(booksContext);
    const {value} = useParams();
    let selected = [];
    for (let i = 0; i < bookslist.length; i++) {
        let str = bookslist[i].title.toLowerCase().split(' ').join('');
        let r = new RegExp(value.toLowerCase().split(' ').join(''));
        if (r.test(str)) {
            selected.push(bookslist[i]);
        }
    }
    return ( 
        <div id='search'>
            <div id="search_top">
                <div id='backtohome' onClick={() => navigate('/')}><FontAwesomeIcon icon={faChevronLeft} />Back to Home</div>
                <h3>{selected.length} results for "{value}"</h3>
            </div>
            <div id="results">
                {selected.map(book => {
                    return <div key={book.id} className="result_item">
                        <div className="result_item--img">
                            <img src={book.image}/>
                            <div>
                                <p>{book.title}</p>
                                <p>{rating(book.rating)}</p>
                            </div>
                        </div>
                        <div className="result_item--info">
                            <p>{book.title}</p>
                            <p>{rating(book.rating)}</p>
                            <p>{book.body}</p>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '2rem'}}>
                                <p style={{display: 'block'}}>{book.price}</p>
                                <button className="button" style={{fontSize: '0.8rem', marginLeft: '5rem'}} onClick={() => {
                                    if (cartItem.includes(bookslist[book.id - 1])) {
                                        navigate('/cart');
                                        return;
                                    }
                                    addCart(bookslist[book.id - 1]);
                                }}>{cartItem.includes(bookslist[book.id - 1]) ? 'Checkout' : 'Add to Cart'}</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
     );
}
 
export default Search;