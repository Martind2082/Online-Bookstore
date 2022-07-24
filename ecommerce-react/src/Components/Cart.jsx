import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import empty from '../Images/empty.png';
import thanks from '../Images/thanks.png';
import { useRef, useState } from 'react';

const Cart = ({cartItem, setcartItem}) => {
    const [purchased, setPurchased] = useState(false);
    const [code, setCode] = useState(false);
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
        });
        if (code === true) {
            total = total * 0.9;
        }
        if (total.toString().split('').includes('.') && total.toString().split('.')[1].length < 2) {
            return total + '0';
        }
        return total;
    }
    const promoinput = useRef();
    function checkPromo(e) {
        if (e.key === 'Enter' && code === false && promoinput.current.value === 'readreadread') {
            setCode(true);
        }
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
                                        <div className='quantity'>
                                            <p>Qty:</p>
                                            <FontAwesomeIcon className="hover" onClick={() => quantityClick(item, -1)} icon={faMinus}/>
                                            <p>{item.amount}</p>
                                            <FontAwesomeIcon className="hover" onClick={() => quantityClick(item, 1)} icon={faPlus}/>
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
                            <div style={{fontSize: '1.2rem'}}>{code ? 'saved 10% with promocode' : ''}</div>
                            <p>Total: ${totalPrice(cartItem)}</p>
                            <div id="promo" style={{marginBottom: '10%'}}>
                                <p style={{fontSize: '1rem', marginBottom: '0'}}>Promo Code</p>
                                <input ref={promoinput} onKeyDown={() => checkPromo(event)}/>
                                <button className="hover" onClick={() => {
                                    if (code === false && promoinput.current.value === 'readreadread') {
                                        setCode(true);
                                    }
                                }}>{code ? 'Success' : 'Apply'}</button>
                            </div>
                            <button style={{marginBottom: '1rem'}} className='button' onClick={() => document.getElementById('payment').style.display = 'block'}>Proceed to check out</button>
                        </div>
                    </div>
                    <div id='payment'>
                        {purchased ? <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <p style={{marginTop: '3rem'}}>Thank you for your purchase!</p>
                            <img src={thanks}/>
                            <button style={{marginTop: '1rem'}} onClick={() => {
                                setPurchased(false); 
                                document.getElementById('payment').style.display = 'none';
                                let copy = [...cartItem];
                                for (let i = 0; i < copy.length; i++) {
                                    copy[i].amount = 1;
                                }
                                setcartItem(copy);
                                setcartItem([]);
                            }}
                            className='button'>Okay</button>
                        </div> : <div>
                            <p style={{fontSize: '2rem', fontWeight: 'bold'}}>Payment Info.</p>
                            <div>
                                <p>Payment Method:</p>
                                <input style={{marginRight: '0.5rem'}} type="radio" name="method"/><FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faCreditCard}/>Card <br/>
                                <input style={{marginRight: '0.5rem'}} type="radio" name="method"/><svg style={{width: '1.5rem', marginRight: '0.5rem'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5.5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.7c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2h19.2c1.8-.1 3.5-1.1 4.5-2.6zm159.3-106.7c0-21-16.2-28-34.7-28h-39.7c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4h20.5c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H484c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm47.5-33.3c0-2-1.5-3.5-3.2-3.5h-18.5c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3.5c0 1.8 1.5 3.5 3.5 3.5h16.5c2.5 0 5-2.9 5.2-5.7L544 191.2v-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5.1-9.8-6.9-15.5-16.2-15.5z"/></svg>PayPall <br/>
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
                                <div style={{width: '70%', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em'}}>
                                    <p>Expiration Date</p>
                                </div>
                                <div style={{width: '70%', display: 'flex'}}>
                                    <select style={{marginRight: '2rem', width: '3rem'}}>
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
                                    <select style={{width: '4.5rem'}}>
                                        <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                        <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                                        <option value={new Date().getFullYear() + 2}>{new Date().getFullYear() + 2}</option>
                                        <option value={new Date().getFullYear() + 3}>{new Date().getFullYear() + 3}</option>
                                        <option value={new Date().getFullYear() + 4}>{new Date().getFullYear() + 4}</option>
                                    </select>
                                </div>
                                <div>
                                    <p>CVV:</p>
                                    <input type="number" style={{width: '2.5rem'}} />
                                </div>
                                <div>
                                    <p style={{fontWeight: 'bold'}}>{totalAmount(cartItem)} items</p>
                                    <p style={{fontWeight: 'bold'}}>Total: ${totalPrice(cartItem)}</p>
                                </div>
                                <button style={{marginTop: '1rem'}} onClick={() => setPurchased(true)} className='button'>Confirm purchase</button>
                                <div id='payment_message'>
                                    <p>No need to type anything. Just press confirm purchase</p>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart;