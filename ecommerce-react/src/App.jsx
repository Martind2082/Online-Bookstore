import './App.css'
import Header from './Header'
import Home from './Home'
import Books from './Books.json'

function App() {
  const {books} = Books;
  return (
    <div>
      <Header />
      <Home books={books}/>
    </div>
  )
}

export default App
