import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bookslist from '../Bookslist.json';

const Bookinfo = ({addCart, cartItem}) => {
    let navigate = useNavigate();
    const {id} = useParams();
    const {bookslist} = Bookslist;
    return ( 
        <div id='bookinfo'>
            <div id='bookinfo_left'>
                <img src={bookslist[id - 1].image} />
            </div>
            <div id='bookinfo_right'>
                <p>{bookslist[id - 1].title}</p>
                <p>{bookslist[id - 1].body}</p>
                <p>{bookslist[id - 1].price}</p>
                <button className="button" style={{width: '40%'}} onClick={() => {
                    if (cartItem.includes(id)) {
                        navigate('/cart');
                        return;
                    }
                    addCart(id);
                    setCheckout(true);
                }}>{cartItem.includes(id) ? 'Checkout' : 'Add to Cart'}</button>
            </div>
        </div>
     );
}
 
export default Bookinfo;