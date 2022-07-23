import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import { booksContext } from '../App';
import { useContext } from 'react';

const Bookinfo = ({addCart, cartItem}) => {
    const bookslist = useContext(booksContext);
    let navigate = useNavigate();
    const {id} = useParams();
    return (
        <div id='bookinfo'>
            <div id='bookinfo_left'>
                <img src={bookslist[id - 1].image} />
            </div>
            <div id='bookinfo_right'>
                <p>{bookslist[id - 1].title}</p>
                <p>{bookslist[id - 1].body}</p>
                <p>{bookslist[id - 1].price}</p>
                <div id='buttons'>
                    <p onClick={() => navigate('/books')}><FontAwesomeIcon id='leftarrow' icon={faChevronLeft} />Continue Shopping</p>
                    <button className="button" style={{width: '20%', minWidth: '150px'}} onClick={() => {
                        if (cartItem.includes(bookslist[id - 1])) {
                            navigate('/cart');
                            return;
                        }
                        addCart(bookslist[id - 1]);
                    }}>{cartItem.includes(bookslist[id - 1]) ? 'Checkout' : 'Add to Cart'}</button>
                </div>
            </div>
        </div>
     );
}
 
export default Bookinfo;