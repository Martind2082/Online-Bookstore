import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { Firebasecontext } from '../Firebasecontexts';

const Header = ({cartItem}) => {
    const {signinwithgoogle, signout, user} = useContext(Firebasecontext);
    const handleauth = () => {
        if (user) {
            signout();
        } else {
            signinwithgoogle();
        }
    }
    const mobilemenu = useRef();
    const togglemenu = () => {
        mobilemenu.current.classList.toggle('visible');
        if (mobilemenu.current.classList.contains('visible')) {
            document.querySelector('html').style.overflowY = 'hidden';
        } else {
            document.querySelector('html').style.overflowY = 'auto';
        }
    }

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
                <button onClick={handleauth} className='button'>
                    {user ? 'Log out' : 'Sign in'}
                </button>
            </div>
            <div id="header_right_mobile" className='mobile'>
                <button onClick={handleauth} className='button'>
                    {user ? 'Log out' : 'Sign in'}
                </button>
                <FontAwesomeIcon onClick={togglemenu} id="header_burger" className='mobile' icon={faBars} />
            </div>
            <div ref={mobilemenu} className="header_mobile_menu mobile">
                <Link className='link' to="/"><p onClick={togglemenu}>Home</p></Link>
                <Link className='link' to="/books"><p onClick={togglemenu}>Books</p></Link>
                <Link className='link' to="/cart"><p onClick={togglemenu}>Cart</p></Link>
            </div>
        </div>
     );
}
 
export default Header;