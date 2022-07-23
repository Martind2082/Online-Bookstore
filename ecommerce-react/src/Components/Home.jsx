import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBoltLightning, faBookOpen, faTags } from '@fortawesome/free-solid-svg-icons';
import Discount from './Discount';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { booksContext } from '../App';

const Home = ({rating, addCart, cartItem}) => {
    const bookslist = useContext(booksContext);
    const booknames = [];
    bookslist.forEach(book => {
        booknames.push(book.title);
    });
    function scrolltop() {
        window.scrollTo(0, 0);
    }
    let navigate = useNavigate();
    const input = useRef();
    const results = useRef();

    function inputChange(val) {
        results.current.textContent = '';
        if (val === '') {
            results.current.style.display = 'none';
            return;
        }
        for (let i = 0; i < booknames.length; i++) {
            let str = booknames[i].toLowerCase().split(' ').join('');
            let r = new RegExp(val.toLowerCase().split(' ').join(''));
            if (r.test(str)) {
                results.current.style.display = 'block';
                let div = booknames[i];
                results.current.append(div);
            }
        }
    }
    return ( 
        <div>
            <section id='welcome'>
                <div id='welcome_library--background'>
                    <div id='welcome_top'>
                        <p>Welcome to the Bookstore!</p>
                        <p>Find your dream book</p>
                        <button onClick={() => navigate("/books")} className="button" id='browsebooks'>Browse Now</button>
                    </div>
                </div>
                <div id="searchbar_container">
                    <div id="searchbar">
                        <input ref={input} onChange={() => inputChange(input.current.value)} placeholder='Search'/>
                        <FontAwesomeIcon id='magnify' icon={faMagnifyingGlass}/>
                    </div>
                </div>
                <div ref={results} id='search_results'></div>
                <img style={{width: '90%', height: '60vh'}} src="https://react-library1.firebaseapp.com/static/media/Undraw_Books.64f45ed25262241aba12eff6dcb25d88.svg" />
            </section>
            <div id="highlights">
                <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(239, 231, 244)" fillOpacity="1" d="M0,224L40,208C80,192,160,160,240,165.3C320,171,400,213,480,213.3C560,213,640,171,720,181.3C800,192,880,256,960,256C1040,256,1120,192,1200,149.3C1280,107,1360,85,1400,74.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
                <p style={{textAlign: 'center', fontSize: '2.5rem', position: 'relative', top: '-70px'}}>About</p>
                <div id='highlights_container'>
                    <div className='highlight'>
                        <div className="highlight_img--container">
                            <FontAwesomeIcon className="highlight_icon" icon={faBoltLightning}/>
                        </div>
                        <p>Easy and quick</p>
                        <p>Get access to the book you purchased instantly</p>
                    </div>
                    <div className='highlight'>
                        <div className="highlight_img--container">
                            <FontAwesomeIcon className="highlight_icon" icon={faBookOpen}/>
                        </div>
                        <p>1000+ books</p>
                        <p>Library has books in all your favourite categories</p>
                    </div>
                    <div className='highlight'>
                        <div className="highlight_img--container">
                            <FontAwesomeIcon className="highlight_icon" icon={faTags}/>
                        </div> 
                        <p>Affordable</p>
                        <p>Get your hands on popular books at an affordable prices</p>   
                    </div>
                </div>
                <svg style={{marginTop: '-150px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(239, 231, 244)" fillOpacity="1" d="M0,128L40,128C80,128,160,128,240,133.3C320,139,400,149,480,176C560,203,640,245,720,240C800,235,880,181,960,170.7C1040,160,1120,192,1200,213.3C1280,235,1360,245,1400,250.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            </div>
            <div id='featureddeal'>
                <div id='featured'>
                    <p id="featured_title">Featured Books</p>
                    <Swiper id='swiper'
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                    >
                    <SwiperSlide onClick={() => navigate("/books/2")}><img src={bookslist[1].image} /></SwiperSlide>
                    <SwiperSlide onClick={() => navigate("/books/4")}><img src={bookslist[3].image} /></SwiperSlide>
                    <SwiperSlide onClick={() => navigate("/books/5")}><img src={bookslist[4].image} /></SwiperSlide>
                    </Swiper>
                </div>
                <div id='deal'>
                    <h1>Deal of the Day!</h1>
                    <p>Get the full Percy Jackson series for $9.99!</p>
                    <img onClick={() => {navigate("/books/9"); scrolltop()}} src="https://cdn.shopify.com/s/files/1/0579/9139/7559/products/age-7-9-percy-jackson-5-books-young-adult-collection-paperback-box-set-by-rick-riordan-3.jpg?v=1629404424"/>
                    <button className="button" onClick={() => {
                        if (cartItem.includes(bookslist[8])) {
                            navigate("/cart");
                        } else {
                            addCart(bookslist[8])
                        }
                    }}>{
                        cartItem.includes(bookslist[8]) ? 'Checkout' : 'Add to Cart'
                    }</button>
                </div>
            </div>
            <Discount rating={rating}/>
        </div>
     );
}
 
export default Home;