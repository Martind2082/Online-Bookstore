import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import { booksContext } from '../App';
import { useContext } from 'react';

const Bookinfo = ({addCart, cartItem, rating}) => {
    const bookslist = useContext(booksContext);
    let navigate = useNavigate();
    const {id} = useParams();

    let rbook1; let rbook2; let rbook3; let rbook4;
    let rarray = [];
    const getrbooks = () => {
        rbook1 = bookslist[Math.floor(Math.random() * bookslist.length/4)];
        rbook2 = bookslist[Math.floor(Math.random() * bookslist.length/4 + bookslist.length/4)];
        rbook3 = bookslist[Math.floor(Math.random() * bookslist.length/4 + bookslist.length/2)];
        rbook4 = bookslist[Math.floor(Math.random() * bookslist.length/4 + bookslist.length*0.75)];
        rarray = [rbook1, rbook2, rbook3, rbook4];
    }
    getrbooks();
    while (rbook1 === rbook2 || rbook2 === rbook3 || rbook3 === rbook4) {
        getrbooks();
    }
    return (
        <div id='bookinfo'>
            <div id="bookinfo_first">
                <div id='bookinfo_left'>
                    <img src={bookslist[id - 1].image} />
                </div>
                <div id='bookinfo_right'>
                    <p>{bookslist[id - 1].title}</p>
                    <p>{bookslist[id - 1].body}</p>
                    <div>{rating(bookslist[id - 1].rating)}</div>
                    <p>{bookslist[id - 1].price}</p>
                    <div id='buttons'>
                        <div onClick={() => navigate('/books')}><FontAwesomeIcon id='leftarrow' icon={faChevronLeft} />Continue Shopping</div>
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
            <div id="bookinfo_second">
                <p id="recommended_title">Recommended Books</p>
                <div className='recommended'>
                    {
                        rarray.map(rbook => {
                            return <div key={rbook.id} className="rbook">
                                <img src={rbook.image} />
                                <p>{rbook.title}</p>
                                <div>{rating(rbook.rating)}</div>
                                <p>{rbook.price}</p>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
     );
}
 
export default Bookinfo;