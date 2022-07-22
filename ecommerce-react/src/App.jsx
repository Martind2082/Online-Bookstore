import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as empty } from '@fortawesome/free-regular-svg-icons';
import './App.css'
import Header from './Components/Header'
import Home from './Components/Home'
import Bookslist from './Bookslist.json'
import Books from './Components/Books'
import Cart from './Components/Cart'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './Components/Footer'
import Bookinfo from './Components/Bookinfo'
import { useState } from 'react'
import React from 'react';

export const booksContext = React.createContext();
function App() {
    const {bookslist} = Bookslist;

    const [cartItem, setcartItem] = useState([]);
    function addCart(id) {
        setcartItem(cartItem => [...cartItem, id]);
    }

  function rating(rating) {
    let fullstar = <FontAwesomeIcon icon={faStar} color="#f5be27"/>
    let halfstar = <FontAwesomeIcon icon={faStarHalfStroke} color="#f5be27"/>
    let emptystar = <FontAwesomeIcon icon={empty} color="#f5be27"/>
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
    <booksContext.Provider value={bookslist}>
        <Router>
        <Header />
        <Routes>
            <Route exact path="/" element={<Home rating={rating}/>} />
            <Route exact path="/books" element={<Books rating={rating}/>}/>
            <Route exact path="/cart" element={<Cart cartItem={cartItem} setcartItem={setcartItem}/>} />
            <Route exact path="/books/:id" element={<Bookinfo addCart={addCart} cartItem={cartItem}/>}/>
        </Routes>
        <Footer />
        </Router>
    </booksContext.Provider>
  )
}

export default App



