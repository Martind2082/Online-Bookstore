const Header = () => {
    return ( 
        <div id='header'>
            <p id='left'>Library</p>
            <div id='right'>
                <p>Home</p>
                <p>Books</p>
                <div id='cartContainer'>
                    <img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" alt="cart" />
                    <div id='cartcount'>0</div>
                </div>
            </div>
        </div>
     );
}
 
export default Header;