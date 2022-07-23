import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import empty from '../Images/empty.png';

const Cart = ({cartItem, setcartItem}) => {
    function scrolltop() {
        window.scrollTo(0, 0);
    }

    function handleprice(price, amount) {
        price = price.slice(1) * amount;
        price = price.toString().split('');
        if (price.includes('.') === false) {
            return '$' + price.join('');
        }
        if (price.includes('.') && price.join('').split('.')[1].length < 2) {
            return '$' + price.join('') + 0;
        } else {
            price = price.join('').split('.');
            let first = price[0];
            let second = price[1];
            second = second.split('');
            second.splice(2);
            return `$${first}.${second.join('')}`;
        }
    }
    function quantityClick(item, amount) {
        let arr = [...cartItem];
        let index = arr.indexOf(item);
        arr[index].amount += amount;
        if (arr[index].amount === 0) {
            arr[index].amount = 1;
        }
        setcartItem(arr);
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
                        <p onClick={() => {
                            let copy = [...cartItem];
                            for (let i = 0; i < copy.length; i++) {
                                copy[i].amount = 1;
                            }
                            setcartItem(copy);
                            setcartItem([]);
                        }} className="remove">Remove all Items</p>
                        <div id="cart_info">
                            <p>Item</p>
                            <p>Price</p>
                        </div>
                        {cartItem.map(item => {
                            return <div key={item.id} className="cart_book">
                                <div className="cart_book--book">
                                    <img src={item.image} onClick={() => {navigate(`/books/${item.id}`); scrolltop()}}/>
                                    <div>
                                        <p style={{width: 'max-content'}}>{item.title}, by {item.author}</p>
                                        <div id='quantity'>
                                            <p>Qty:</p>
                                            <FontAwesomeIcon onClick={() => quantityClick(item, -1)} icon={faMinus}/>
                                            <p>{item.amount}</p>
                                            <FontAwesomeIcon onClick={() => quantityClick(item, 1)} icon={faPlus}/>
                                        </div>
                                        <p style={{width: 'max-content'}} onClick={() => {
                                            let copy = [...cartItem];
                                            let index = copy.indexOf(item);
                                            copy[index].amount = 1;
                                            copy.splice(index, 1);
                                            setcartItem(copy);
                                        }} className="remove">Remove</p>
                                    </div>
                                </div>
                                <p style={{alignSelf: 'start', fontSize: '1.5em', marginTop: '0', fontWeight: 'bold'}}>{handleprice(item.price, item.amount)}</p>
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