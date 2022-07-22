import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import empty from '../Images/empty.png';
import { useContext, useRef } from 'react';
import { booksContext } from '../App';

const Cart = ({cartItem, setcartItem}) => {
    const bookslist = useContext(booksContext);
    let number = useRef();
    function quantityClick(id, amount) {
        console.log(id, amount);
        console.log(bookslist[id - 1].amount);
        bookslist[id - 1].amount += amount;
    }
    let navigate = useNavigate();
    return (
        <div id='cart'>
            <p style={{fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '-5px'}}>Cart</p>
            {cartItem.length === 0 ? 
                <div>
                    <img style={{width: '35%'}} src={empty} id="empty"></img>
                    <p style={{textAlign: 'center', fontSize: '1.5rem'}}>You don't have any books in your cart</p>
                    <button onClick={() => navigate('/books')} style={{display: 'block', margin: 'auto'}} className="button">Browse Books</button>
                </div> : 
                <div id='cart_checkout'>
                    <div id='cart_left'>
                        <p onClick={() => setcartItem([])} className="remove">Remove all Items</p>
                        <div id="cart_info">
                            <p>Item</p>
                            <p>Price</p>
                        </div>
                        {cartItem.map(item => {
                            return <div key={item} className="cart_book">
                                <div className="cart_book--book">
                                    <img src={bookslist[item - 1].image} onClick={() => {navigate(`/books/${item}`); scrolltop()}}/>
                                    <div>
                                        <p style={{width: 'max-content'}}>{bookslist[item - 1].title}, by {bookslist[item - 1].author}</p>
                                        <div id='quantity'>
                                            <p>Qty:</p>
                                            <FontAwesomeIcon id={item} onClick={() => quantityClick(item, -1)} icon={faMinus}/>
                                            <p id='item' ref={number}>{bookslist[item - 1].amount}</p>
                                            <FontAwesomeIcon id={item} onClick={() => quantityClick(item, 1)} icon={faPlus}/>
                                        </div>
                                        <p style={{width: 'max-content'}} onClick={() => {
                                            let copy = [...cartItem];
                                            let index = copy.indexOf(item);
                                            copy.splice(index, 1);
                                            setcartItem(copy);
                                        }} className="remove">Remove</p>
                                    </div>
                                </div>
                                <p style={{alignSelf: 'start', fontSize: '1.5em', marginTop: '0', fontWeight: 'bold'}}>{bookslist[item - 1].price}</p>
                            </div>
                        })}
                    </div>
                    <div id="cart_right">Payment Info. credit card, paypal, name on credit card, card number, expiration date, cvv</div>
                </div>
            }
        </div>
    )
}

export default Cart;