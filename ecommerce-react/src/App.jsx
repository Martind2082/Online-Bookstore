import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as empty } from '@fortawesome/free-regular-svg-icons';
import './App.css'
import Header from './Components/Header'
import Home from './Components/Home'
import Bookslist from './Bookslist.json'
import Books from './Components/Books'
import Cart from './Components/Cart'
import {BrowserRouter as Router, Route, Routes, HashRouter} from 'react-router-dom';
import Footer from './Components/Footer'
import Bookinfo from './Components/Bookinfo'
import { useCallback, useState } from 'react'
import React from 'react';
import Search from './Components/Search';
import Firebasecontext from './Firebasecontexts.jsx';

export const booksContext = React.createContext();
function App() {
    const {bookslist} = Bookslist;
    const [code, setCode] = useState(false);

    const [cartItem, setcartItem] = useState([]);
    const addCart = useCallback((item) => {
        setcartItem(cartItem => [...cartItem, item]);
        let div = document.createElement('div');
        div.classList.add('add_alert');
        let img = document.createElement('img');
        img.src = item.image;
        img.style.width = '40%';
        img.style.height = '100%';
        let text = document.createElement('div');
        text.textContent = `${item.title} has been added to cart!`;
        text.style.paddingRight = '10%';
        text.style.paddingLeft = '5%';
        let X = document.createElement('div');
        X.textContent = 'X';
        X.style.position = 'absolute';
        X.style.top = '7px';
        X.style.right = '10px';
        X.classList.add('hover');
        let bottom = document.createElement('div');
        bottom.classList.add('bottom');
        div.append(bottom);
        div.append(X);
        div.append(img);
        div.append(text);
        document.body.append(div);
        X.onclick = () => {
            div.remove();
        }
        setTimeout(() => {
            div.remove();
        }, 4000)
    }, [cartItem])

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
    <Firebasecontext>
        <booksContext.Provider value={bookslist}>
            <HashRouter>
            <Header cartItem={cartItem}/>
            <Routes>
                <Route exact path="/" element={<Home rating={rating} addCart={addCart} cartItem={cartItem}/>} />
                <Route exact path="/books" element={<Books rating={rating} />}/>
                <Route exact path="/cart" element={<Cart cartItem={cartItem} setcartItem={setcartItem} code={code} setCode={setCode} />} />
                <Route exact path="/books/:id" element={<Bookinfo addCart={addCart} cartItem={cartItem}/>}/>
                <Route exact path="/search/:value" element={<Search cartItem={cartItem} addCart={addCart} rating={rating}/>}/>
            </Routes>
            <Footer />
            </HashRouter>
        </booksContext.Provider>
    </Firebasecontext>
  )
}

export default App



