import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Header = ({cartItem}) => {
    let navigate = useNavigate();
    return ( 
        <div id='header'>
            <img onClick={() => navigate("/")} className='header_item' id='header_left' src="https://react-library1.firebaseapp.com/static/media/Library.70d0a6a90c21c295982ded03f9ea8615.svg" />
            <div id='header_right'>
                <p className='header_item' onClick={() => navigate("/")}>Home</p>
                <p className='header_item' onClick={() => navigate("/books")}>Books</p>
                <div id="cart_icon--container" style={{position: 'relative'}}>
                    <FontAwesomeIcon icon={faShoppingCart} id='cart_icon' onClick={() => navigate("/cart")}/>
                    {cartItem.length === 0 ? <div></div> : <div id="cart_amount">{cartItem.length}</div>}
                </div>
            </div>
        </div>
     );
}
 
export default Header;