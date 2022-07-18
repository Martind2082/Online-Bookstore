import reading from './Images/reading.png';
import backward from './Images/back.png';
import forward from './Images/forward.png';
import Discount from './Discount';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({bookslist, rating}) => {
    let navigate = useNavigate();
    const [counter, setCounter] = useState(0);
    const [buttonclicked, setbuttonclicked] = useState(false);
    const circles = useRef();
    const featured = useRef();
    function front() {
        setbuttonclicked(true);
    }
    function back() {
        if (counter === 0) {
            return 3;
        }
        return counter - 1;
    }
    useEffect(() => {
        for (let i = 0; i < 4; i++) {
            circles.current.children[i].style.backgroundColor = 'rgb(193, 189, 189)';
        }
        circles.current.children[counter].style.backgroundColor = 'orange';
    }, [counter]);
    return ( 
        <div>
            <div id='welcome'>
                <p style={{fontSize: "3rem", height: '1rem', fontWeight: 'bold'}}>Welcome to the Bookstore!</p>
                <p style={{fontSize: '2rem'}}>Find your dream book</p>
                <button onClick={() => navigate("/books")} className="button" id='browsenow'>Browse Now</button>
                <img src={reading} style={{width: '50%', height: '50%'}}></img>
            </div>
            <div id='featured' ref={featured}>
                <p id="featured_title">Featured Books</p>
                <div id='frontbackbtns'>
                    <img onClick={() => setCounter(back())} id='back' className='frontbackbtn' src={backward}></img>
                    <img onClick={() => {front()}} id='front' className='frontbackbtn' src={forward}></img>
                </div>
                <div id='bookcontainer'>
                    <div key={bookslist[counter].id} className={buttonclicked ? "featuredbook slideout" : "featuredbook"}>
                    <img id='featuredbookimg' src={bookslist[counter].image}></img>
                    <div style={{marginTop: '2%'}} className='featuredbookinfo'>{bookslist[counter].title}</div>
                    <div className='featuredbookinfo'>{bookslist[counter].price}</div>
                    </div>
                </div>
                <div key={bookslist[counter + 1].id} className={buttonclicked ? "featuredbooknext slidein" : "featuredbooknext"}>
                    <img id='featuredbooknextimg' src={bookslist[counter + 1].image}></img>
                    <div style={{marginTop: '2%', fontSize: '1.5rem'}}>{bookslist[counter + 1].title}</div>
                    <div style={{fontSize: '1.5rem'}}>{bookslist[counter + 1].price}</div>
                </div>
                <div ref={circles} id='circles'>
                    <circle className='circle'></circle>
                    <circle className='circle'></circle>
                    <circle className='circle'></circle>
                    <circle className='circle'></circle>
                </div>
            </div>
            <Discount bookslist={bookslist} rating={rating}/>
        </div>
     );
}
 
export default Home;