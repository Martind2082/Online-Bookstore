import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import { booksContext } from '../App';
import { useContext, useEffect, useRef, useState } from 'react';

import { db } from '../Firebase';
import {collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, doc, deleteDoc, updateDoc} from 'firebase/firestore';
import { Firebasecontext } from '../Firebasecontexts';

const Bookinfo = ({addCart, cartItem, rating}) => {
    const bookslist = useContext(booksContext);
    let navigate = useNavigate();
    const {id} = useParams();
    const reviewsRef = useRef();
    const ratingRef = useRef();
    const [reviewvalue, setReviewvalue] = useState('');

    let rarray = [bookslist[1], bookslist[7], bookslist[2], bookslist[6]];

    function scrolltop() {
        window.scrollTo(0, 0);
    }

    const {user, signinwithgoogle} = useContext(Firebasecontext);
    const [reviews, setReviews] = useState([]);
    const colRef = collection(db, id);
    const q = query(colRef, orderBy('createdAt', 'desc'))
    useEffect(() => {
        const unsub = onSnapshot(q, (snapshot) => {
            const reviewscopy = [];
            snapshot.docs.forEach(doc => {
                reviewscopy.push({...doc.data(), id: doc.id});
            });
            setReviews(reviewscopy);
        });
        return unsub;
    }, []);

    const reviewsclick = () => {
        if (user) {
            reviewsRef.current.style.display = 'block';
        } else {
            document.getElementById('needtosignin').style.display = 'flex';
        }
    }

    const addreview = (e) => {
        e.preventDefault();
        if (reviewvalue === '') {
            let div = document.createElement('div');
            div.classList.add('popup');
            div.textContent = 'Please leave a review';
            document.body.append(div);
            setTimeout(() => {
                div.remove();
            }, 2000)
            return;
        }
        if (reviewvalue.length > 100) {
            let div = document.createElement('div');
            div.classList.add('popup');
            div.textContent = 'Please shorten your review';
            document.body.append(div);
            setTimeout(() => {
                div.remove();
            }, 2000)
            return;
        }
        if (ratingRef.current.value === 'select') {
            let div = document.createElement('div');
            div.classList.add('popup');
            div.textContent = 'Please select a star rating';
            document.body.append(div);
            setTimeout(() => {
                div.remove();
            }, 2000)
            return;
        }
        addDoc(colRef, {
            createdAt: serverTimestamp(),
            text: reviewvalue,
            author: user.displayName,
            profilepic: user.photoURL,
            rating: ratingRef.current.value
        }).then(() => {
            setReviewvalue('');
        })
    }

    function deletereview(bookid) {
        deleteDoc(doc(db, id, bookid))
    }

    return (
        <div id='bookinfo'>
            <div id="needtosignin">
                <FontAwesomeIcon onClick={() => document.getElementById('needtosignin').style.display = 'none'} className='hover' style={{position: 'absolute', top: '1rem', right: '1rem', fontSize: '2rem'}} icon={faXmark}/>
                <p>To leave a review, please sign in with google</p>
                <button style={{padding: '0.5rem 1rem'}} onClick={() => {document.getElementById('needtosignin').style.display = 'none'; signinwithgoogle()}} className='button'>Sign in</button>
            </div>
            <div ref={reviewsRef} id="reviews">
                <FontAwesomeIcon onClick={() => reviewsRef.current.style.display = 'none'} className='hover' style={{position: 'absolute', top: '1rem', right: '1rem', fontSize: '2rem'}} icon={faXmark}/>
                {
                    user ? <div> 
                        <div id="rating">
                        <p>Rate this book</p>
                        <select ref={ratingRef} disabled={!user} defaultValue="select" required>
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
                    <form onSubmit={(e) => addreview(e)}>
                        <textarea value={reviewvalue} onChange={(e => setReviewvalue(e.target.value))} id="writereview" type="text" placeholder='write a review...'></textarea>
                        <div style={{color: reviewvalue.length > 100 ? 'red' : 'black'}}>{reviewvalue.length} out of 100 characters used</div>
                        <input className='button' type="submit" value='Leave review'/>
                    </form>
                </div> : <div style={{display: 'flex', flexDirection: 'column', padding: '1rem 0', justifyContent: 'center', alignItems: 'center'}}>
                    <p>To leave a review, please sign in with google</p>
                    <button style={{padding: '0.5rem 1rem'}} onClick={signinwithgoogle} className='button'>Sign in</button>
                </div>
                }
                <div id="amountofreviews">{reviews.length === 0 ? '' : reviews.length + ' reviews'}</div>
                <div style={{marginTop: '1rem'}}>
                    {reviews.length === 0 ? "There are currently no reviews" : reviews.map(review => {
                        return <div className='review' key={review.id}>
                            <div className='review_top'>
                                <img src={review.profilepic} />
                                <div>{review.author}{review.author === user?.displayName ? " (you)" : ""}</div>
                                <div id="reviewrating">{rating(review.rating)}</div>
                                {
                                    review.author === user?.displayName ? <p onClick={() => deletereview(review.id)} id="deletereview" className='review_links'>Delete</p> : ''
                                }
                            </div>
                            <div id="reviewrating_mobile">{rating(review.rating)}</div>
                            <div id="deletereview_mobile" className='review_links' onClick={() => deletereview(review.id)}>
                                {
                                    review.author === user?.displayName ? 'Delete' : ''
                                }
                            </div>
                            <div className='review_bottom'>
                                    <div style={{color: '#6a6c6e'}}>{new Date(review.createdAt?.seconds * 1000).toString().split(' ').slice(0, 4).join(' ') === 'Invalid Date' ? "" : "Posted on " + new Date(review.createdAt?.seconds * 1000).toString().split(' ').slice(0, 4).join(' ')}</div>
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
                        <div onClick={() => reviewsRef.current.style.display = 'block'} className='review_links'>{reviews.length} reviews</div>
                        <div onClick={reviewsclick} className='review_links'>Leave a review</div>
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
                            return <div onClick={() => {navigate(`/books/${rbook.id}`); scrolltop()}} key={rbook.id} className="rbook hover">
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