import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    let navigate = useNavigate();
    return ( 
        <div id='header'>
            <img onClick={() => navigate("/")} className='headeritem' id='headerleft' src="https://react-library1.firebaseapp.com/static/media/Library.70d0a6a90c21c295982ded03f9ea8615.svg" />
            <div id='headerright'>
                <p className='headeritem' onClick={() => navigate("/")}>Home</p>
                <p className='headeritem' onClick={() => navigate("/books")}>Books</p>
                <FontAwesomeIcon icon={faShoppingCart} id='carticon' onClick={() => navigate("/cart")}/>
            </div>
        </div>
     );
}
 
export default Header;