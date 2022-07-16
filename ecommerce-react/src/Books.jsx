import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'

const Books = ({bookslist}) => {
    let fullstar = <FontAwesomeIcon icon={faStar} color="#f5c338" />
    let halfstar = <FontAwesomeIcon icon={faStarHalfStroke} color="#f5c338"></FontAwesomeIcon>
    let emptystar = <svg style={{width: '20px', height: '20px'}} color="yellow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"/></svg>
    
    function rating(rating) {
        if (rating === 5) {
            return <div>{fullstar}{fullstar}{fullstar}{fullstar}{fullstar}</div>
        } else if (rating.toString().length === 1) {
            let array = [];
            for (let i = 0; i < rating; i++) {
                array.push(fullstar);
            }
            for (let i = 0; i < 5 - rating; i++) {
                array.push(emptystar);
            }
            return <div>
                {array.map((val, index) => {
                    return <div key={index} style={{display: 'inline'}}>{val}</div>
                })}
            </div>
        } else {
            let num = Math.floor(rating);
            let array = [];
            for (let i = 0; i < num; i++) {
                array.push(fullstar);
            }
            array.push(halfstar);
            if (array.length !== 5) {
                let need = 5 - array.length;
                for (let i = 0; i < need; i++) {
                    array.push(emptystar);
                }
            }
            return <div>
                {array.map((val, index) => {
                    return <div key={index} style={{display: 'inline'}}>{val}</div>
                })}
            </div>
        }
    }
    return (
        <div id="books">
            <div id='allbooks' style={{fontWeight: 'bold', fontSize: '2.5rem'}}>All Books</div>
            <div id='bookscontainer'>
                {bookslist.map(book => {
                    return <div key={book.id} className="book">
                        <img src={book.image}></img>
                        <p>{book.title}</p>
                        <p>{book.price}</p>
                        {rating(book.rating)}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Books;