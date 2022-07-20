import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import empty from '../Images/empty.png';

const Cart = ({cartItem, bookslist}) => {
    let navigate = useNavigate();
    // const [quantity, setQuantity] = useState([]);
    return (
        <div id='cart'>
            <p style={{fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '-5px'}}>Cart</p>
            {cartItem.length === 0 ? 
                <div>
                    <img style={{width: '35%'}} src={empty} id="empty"></img>
                    <p style={{textAlign: 'center', fontSize: '1.5rem'}}>You don't have any books in your cart</p>
                    <button onClick={() => navigate('/books')} style={{display: 'block', margin: 'auto'}} className="button">Browse Books</button>
                </div> : 
                <div>
                    <p className="remove">Remove all Items</p>
                    <div id="cart_info">
                        <p>Item</p>
                        <p>Price</p>
                    </div>
                    {cartItem.map(item => {
                        return <div className="cart_book">
                            <div className="cart_book--book">
                                <img src={bookslist[item - 1].image} onClick={() => {navigate(`/books/${item}`); scrolltop()}}/>
                                <div>
                                    <p>{bookslist[item - 1].title}, by {bookslist[item - 1].author}</p>
                                    <p>Quantity: <input value="1" type="number" style={{width: '2.5rem', paddingLeft: '0.5rem', height: '2rem', borderRadius: '10px', border: '1px solid black'}} /></p>
                                    <p className="remove">Remove</p>
                                </div>
                            </div>
                            <p style={{alignSelf: 'start', fontSize: '1.5em', marginTop: '0', fontWeight: 'bold'}}>{bookslist[item - 1].price}</p>
                        </div>
                    })}
                </div>
            }
        </div>
    )
}

export default Cart;