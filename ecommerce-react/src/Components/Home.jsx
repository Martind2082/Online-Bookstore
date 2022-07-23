import read from '../Images/read.png';
import Discount from './Discount';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { booksContext } from '../App';

const Home = ({rating}) => {
    const bookslist = useContext(booksContext);

    let navigate = useNavigate();
    const featured = useRef();
    
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
                </div>
                <div id='deal'>
                    <h1>Deal of the Day!</h1>
                    <p>Get the full Percy Jackson series for $9.99!</p>
                    <img src="https://cdn.shopify.com/s/files/1/0579/9139/7559/products/age-7-9-percy-jackson-5-books-young-adult-collection-paperback-box-set-by-rick-riordan-3.jpg?v=1629404424"/>
                </div>
            </div>
            <Discount rating={rating}/>
        </div>
     );
}
 
export default Home;