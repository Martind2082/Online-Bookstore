import empty from './Images/empty.png';

const Cart = () => {
    return (
        <div id='cart'>
            <p style={{marginLeft: '10%', fontWeight: 'bold'}}>Cart</p>
            <div>
                <p>Book</p>
                <p style={{width: '10%'}}>Quantity</p>
                <p id='price'>Price</p>
            </div>
            <img style={{width: '35%'}} src={empty}></img>
            <p style={{textAlign: 'center'}}>You don't have any books in your cart</p>
        </div>
    )
}

export default Cart;