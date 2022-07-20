import read from '../Images/read.png';
import backward from '../Images/back.png';
import forward from '../Images/forward.png';
import Discount from './Discount';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({bookslist, rating}) => {
    let navigate = useNavigate();
    const circles = useRef();
    const featured = useRef();
    let counter = 0;
    
    // function bookslide() {
        
    // }
    return ( 
        <div>
            <section id='welcome'>
                <div id="welcome_left">
                    <p style={{fontSize: "3rem", height: '1rem', fontWeight: 'bold'}}>Welcome to the Bookstore!</p>
                    <p style={{fontSize: '2rem'}}>Find your dream book</p>
                    <button onClick={() => navigate("/books")} className="button" id='browsebooks'>Browse Now</button>
                    <br />
                    <div id='welcome_left--search'>
                        <input />
                        <button className="button">Search Book</button>
                    </div>
                </div>
                <div id='welcome_right'>
                    <img src={read} style={{width: '100%', height: '100%'}}></img>
                </div>
            </section>
            <div id='featureddeal'>
                <div id='featured' ref={featured}>
                    <p id="featured_title">Featured Books</p>
                    {/* <div id='frontbackbtns'>
                        <img onClick={() => setCounter(back())} id='back' className='frontbackbtn' src={backward}></img>
                        <img onClick={() => {front()}} id='front' className='frontbackbtn' src={forward}></img>
                    </div> */}

                    <div ref={circles} id='circles'>
                        <circle className='circle'></circle>
                        <circle className='circle'></circle>
                        <circle className='circle'></circle>
                        <circle className='circle'></circle>
                    </div>
                </div>
                <div id='deal'>
                    <h1>Deal of the Day!</h1>
                    <p>Get the full Percy Jackson series for $9.99!</p>
                    <img src="https://cdn.shopify.com/s/files/1/0579/9139/7559/products/age-7-9-percy-jackson-5-books-young-adult-collection-paperback-box-set-by-rick-riordan-3.jpg?v=1629404424"/>
                </div>
            </div>
            <Discount bookslist={bookslist} rating={rating}/>
        </div>
     );
}
 
export default Home;