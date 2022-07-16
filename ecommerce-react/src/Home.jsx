import reading from './Images/reading.png';
import backward from './Images/back.png';
import forward from './Images/forward.png';
import Discount from './Discount';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({bookslist}) => {
    let navigate = useNavigate();
    const [counter, setCounter] = useState(0);
    const circles = useRef();
    function front() {
        if (counter === 3) {
            return 0;
        }
        return counter + 1;
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
                <button onClick={() => navigate("/books")} className="button" id='browsebooks'>Browse Now</button>
                <img src={reading} style={{width: '50%', height: '50%'}}></img>
            </div>
            <div id='featured'>
                <p id="featuredtitle">Featured Books</p>
                <div id='frontbackbtns'>
                    <img onClick={() => setCounter(back())} id='back' className='frontbackbtn' src={backward}></img>
                    <img onClick={() => setCounter(front())} id='front' className='frontbackbtn' src={forward}></img>
                </div>
                <div key={bookslist[counter].id} id='featuredbook'>
                    <img id='featuredbookimg' src={bookslist[counter].image}></img>
                    <div style={{marginTop: '2%'}} className='featuredbookinfo'>{bookslist[counter].title}</div>
                    <div className='featuredbookinfo'>{bookslist[counter].price}</div>
                </div>
                <div ref={circles} id='circles'>
                    <circle className='circle'></circle>
                    <circle className='circle'></circle>
                    <circle className='circle'></circle>
                    <circle className='circle'></circle>
                </div>
            </div>
            <Discount bookslist={bookslist} />
        </div>
     );
}
 
export default Home;