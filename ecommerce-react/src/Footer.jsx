import { useNavigate } from "react-router-dom";

const Footer = () => {
    let navigate = useNavigate();
    return (
        <div id='footer'>
            <div>
                <p onClick={() => navigate("/")}>Home</p>
                <p onClick={() => navigate("/books")}>Books</p>
                <p onClick={() => navigate("/cart")}>Cart</p>
            </div>
            <p id='copyright'>Copyright © 2022 Library</p>
        </div>
    )
}

export default Footer;