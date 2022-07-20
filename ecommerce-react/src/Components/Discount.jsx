import { useNavigate } from "react-router-dom";

const Discount = ({bookslist, rating}) => {
    function scrolltop() {
        window.scrollTo(0, 0);
    }
    let navigate = useNavigate();
    const discountids = [1, 5, 7, 8];
    return ( 
        <div id='discounts'>
            <p style={{fontSize: '2rem'}}>Discount Books</p>
            <div id='discount_books'>
            {
                discountids.map(id => {
                    return <div key={id} className='discount_book book' onClick={() => {navigate(`/books/${id}`); scrolltop()}}>
                        <img className='discount_img' src={bookslist[id - 1].image} style={{border: '1px solid black'}}></img>
                        <p>{bookslist[id - 1].title}</p>
                        <p>{rating(bookslist[id - 1].rating)}</p>
                        <p id='discount_price'><strike style={{color: '#c2c1be'}}>{bookslist[id - 1].oldprice}</strike>{bookslist[id - 1].price}</p>
                    </div>
                })
            }
            </div>
        </div>
     );
}
 
export default Discount;