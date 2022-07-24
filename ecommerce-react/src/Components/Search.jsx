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
            <h3 style={{position: 'relative', left: '10%', fontSize: '1.5rem'}}>{selected.length} results for "{value}"</h3>
            <div id="results">
                {selected.map(book => {
                    return <div key={book.id} className="result_item">
                        <img src={book.image}/>
                        <div className="result_item--info">
                            <p>{book.title}</p>
                            <p>{rating(book.rating)}</p>
                            <p>{book.body}</p>
                            <p>{book.price}</p>
                            <button className="button" style={{padding: '2% 3%'}} onClick={() => {
                                if (cartItem.includes(bookslist[book.id - 1])) {
                                    navigate('/cart');
                                    return;
                                }
                                addCart(bookslist[book.id - 1]);
                            }}>{cartItem.includes(bookslist[book.id - 1]) ? 'Checkout' : 'Add to Cart'}</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
     );
}
 
export default Search;