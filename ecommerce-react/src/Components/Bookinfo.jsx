import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import { booksContext } from '../App';
import { useContext, useEffect, useState } from 'react';

import { db } from '../Firebase';
import {collection, onSnapshot} from 'firebase/firestore';
import { Firebasecontext } from '../Firebasecontexts';

const Bookinfo = ({addCart, cartItem, rating}) => {
    const bookslist = useContext(booksContext);
    let navigate = useNavigate();
    const {id} = useParams();

    let rbook1; let rbook2; let rbook3; let rbook4;
    let rarray = [];
    const getrbooks = () => {
        rbook1 = bookslist[Math.floor(Math.random() * bookslist.length/4)];
        rbook2 = bookslist[Math.floor(Math.random() * bookslist.length/4 + bookslist.length/4)];
        rbook3 = bookslist[Math.floor(Math.random() * bookslist.length/4 + bookslist.length/2)];
        rbook4 = bookslist[Math.floor(Math.random() * bookslist.length/4 + bookslist.length*0.75)];
        rarray = [rbook1, rbook2, rbook3, rbook4];
    }
    getrbooks();
    while (rbook1 === rbook2 || rbook2 === rbook3 || rbook3 === rbook4) {
        getrbooks();
    }

    const {user} = useContext(Firebasecontext);
    const [reviews, setReviews] = useState([]);
    const colRef = collection(db, id);
    useEffect(() => {
        const reviews = [];
        const unsub = onSnapshot(colRef, (snapshot) => {
            snapshot.docs.forEach(doc => {
                reviews.push({...doc.data(), id: doc.id});
            });
            setReviews(reviews);
        });
        return unsub;
    }, [])
    return (
        <div id='bookinfo'>
            <div id="reviews">
                <div id="rating">
                    <p>Rate this book</p>
                    <select defaultValue="select" required>
                        <option value="select" disabled>select</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                        <option value="3.5">3.5</option>
                        <option value="4">4</option>
                        <option value="4.5">4.5</option>
                        <option value="5">5</option>
                    </select>
                    <p>stars</p>
                </div>
                <form>
                    <textarea id="writereview" type="text" placeholder='write a review...'></textarea>
                    <input className='button' type="submit" />
                </form>
                <div>
                    {reviews.length === 0 ? "There are no reviews" : reviews.map(review => {
                        return <div className='review' key={review.id}>
                            <div className='review_top'>
                                <img src={user.photoURL} />
                                <div>{user.displayName}</div>
                            </div>
                            <div className='review_bottom'>
                                <div style={{display: 'flex', width: 'maxContent'}}>
                                    <div style={{marginRight: '1rem', width: 'maxContent'}}>{rating(review.rating)}</div>
                                    <div>Posted on {new Date(review.createdAt.seconds * 1000).toString().split(' ').slice(0, 4).join(' ')}</div>  
                                </div>
                                <div>{review.text}</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div id="bookinfo_first">
                <div id='bookinfo_left'>
                    <img src={bookslist[id - 1].image} />
                </div>
                <div id='bookinfo_right'>
                    <p>{bookslist[id - 1].title}</p>
                    <p>{bookslist[id - 1].body}</p>
                    <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                        <div>{rating(bookslist[id - 1].rating)}</div>
                        <div className='review_links'>{reviews.length} reviews</div>
                        <div className='review_links'>Leave a review</div>
                    </div>
                    <p>{bookslist[id - 1].price}</p>
                    <div id='buttons'>
                        <div id="buttons_button--left" onClick={() => navigate('/books')}><FontAwesomeIcon id='leftarrow' icon={faChevronLeft} /><p>Continue Shopping</p></div>
                        <button className="button" style={{width: '20%', minWidth: '150px'}} onClick={() => {
                            if (cartItem.includes(bookslist[id - 1])) {
                                navigate('/cart');
                                return;
                            }
                            addCart(bookslist[id - 1]);
                        }}>{cartItem.includes(bookslist[id - 1]) ? 'Checkout' : 'Add to Cart'}</button>
                    </div>
                </div>
            </div>
            <div id="bookinfo_second">
                <p id="recommended_title">Recommended Books</p>
                <div className='recommended'>
                    {
                        rarray.map(rbook => {
                            return <div key={rbook.id} className="rbook">
                                <img src={rbook.image} />
                                <p>{rbook.title}</p>
                                <div>{rating(rbook.rating)}</div>
                                <p>{rbook.price}</p>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
     );
}
 
export default Bookinfo;