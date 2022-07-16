const Discount = ({bookslist}) => {
    const discountbooks = [];
    for (let i = 4; i < 8; i++) {
        discountbooks.push(bookslist[i]);
    }
    return ( 
        <div id='discounts'>
            <p style={{fontSize: '2rem'}}>Discount Books</p>
            <div id='discountbooks'>
            {
                discountbooks.map(book => {
                    return <div key={book.id} className='discountbook book'>
                        <img className='discountimg' src={book.image} style={{border: '1px solid black'}}></img>
                        <p>{book.title}</p>
                        <p>{book.oldprice}</p>
                        <p>{book.price}</p>
                    </div>
                })
            }
            </div>
        </div>
     );
}
 
export default Discount;