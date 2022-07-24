import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import empty from '../Images/empty.png';

const Cart = ({cartItem, setcartItem}) => {
    let navigate = useNavigate();
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
    function totalAmount(cartItem) {
        let amounts = [];
        cartItem.forEach(item => {
            amounts.push(item.amount);
        })
        let amt = amounts.reduce((x, y) => {
            return x + y;
        })
        return amt;
    }
    function totalPrice(cartItem) {
        let prices = [];
        cartItem.forEach(item => {
            prices.push(parseFloat(item.price.slice(1)) * item.amount);
        });
        let total = prices.reduce((x, y) => {
            return x + y;
        })
        if (total.toString().split('').includes('.') && total.toString().split('.')[1].length < 2) {
            return total + '0';
        }
        return total;
    }
    return (
        <div id='cart'>
            <p style={{fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '-5px', marginLeft: '1rem'}}>Cart</p>
            {cartItem.length === 0 ? 
                <div>
                    <img src={empty} id="empty"></img>
                    <p style={{textAlign: 'center', fontSize: '1.5rem'}}>You don't have any books in your cart</p>
                    <button onClick={() => navigate('/books')} style={{display: 'block', margin: 'auto'}} className="button">Browse Books</button>
                </div> : 
                <div id='cart_checkout'>
                    <div id='cart_left'>
                        <p style={{marginLeft: '1rem'}} onClick={() => {
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
                    <div id="cart_right">
                        <div id="total">
                            <p>{totalAmount(cartItem)} items</p>
                            <p style={{fontSize: '1.2rem'}}>Tax: $0.00</p>
                            <p style={{fontSize: '1.2rem'}}>Shipping Cost: $0.00</p>
                            <p>Total: ${totalPrice(cartItem)}</p>
                            <div id="promo" style={{marginBottom: '10%'}}>
                                <p style={{fontSize: '1rem', marginBottom: '0'}}>Promo Code</p>
                                <input />
                                <button>Apply</button>
                            </div>
                            <button className='button' onClick={() => navigate()}>Proceed to check out</button>
                        </div>
                    </div>
                    <div id='payment'>
                        <p>Payment Info.</p>
                        <div>
                            <p>Payment Method</p>
                            <input type="radio" name="method" value="Credit Card"/>
                            <input type="radio" name="method" value="Debit Card"/>
                            <input type="radio" name="method" value="Paypal Card"/>
                        </div>
                        <div>
                            <p>Name on Card:</p>
                            <input />
                        </div>
                        <div>
                            <p>Card number:</p>
                            <input type="number"/>
                        </div>
                        <div>
                            <div style={{display: 'flex', justifyContent: 'spaceBetween'}}>
                                <p>Expiration Date</p>
                                <p>CVV:</p>
                            </div>
                            <div>
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select>
                                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                    <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                                    <option value={new Date().getFullYear() + 2}>{new Date().getFullYear() + 2}</option>
                                    <option value={new Date().getFullYear() + 3}>{new Date().getFullYear() + 3}</option>
                                    <option value={new Date().getFullYear() + 4}>{new Date().getFullYear() + 4}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart;