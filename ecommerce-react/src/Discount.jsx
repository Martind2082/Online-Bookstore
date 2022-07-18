import { useNavigate } from "react-router-dom";

const Discount = ({bookslist, rating}) => {
    function scrolltop() {
        window.scrollTo(0, 0);
    }
    let navigate = useNavigate();
    const discountbooks = [];
    for (let i = 4; i < 8; i++) {
        discountbooks.push(bookslist[i]);
    }
    return ( 
        <div id='discounts'>
            <p style={{fontSize: '2rem'}}>Discount Books</p>
            <div id='discount_books'>
            {
                discountbooks.map(book => {
                    return <div key={book.id} className='discount_book book' onClick={() => {navigate(`/books/${book.id}`); scrolltop()}}>
                        <img className='discount_img' src={book.image} style={{border: '1px solid black'}}></img>
                        <p>{book.title}</p>
                        <p>{rating(book.rating)}</p>
                        <p id='discount_price'><strike>{book.oldprice}</strike>{book.price}</p>
                    </div>
                })
            }
            </div>
        </div>
     );
}
 
export default Discount;