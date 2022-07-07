import './App.css'
import Header from './Header'
import Home from './Home'

function App() {
  // const getData=()=>{
  //   fetch('Books.json'
  //   ,{
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   }
  //   )
  //     .then(function(response){
  //       console.log(response)
  //       return response.json();
  //     })
  //     .then(function(myJson) {
  //       console.log(myJson);
  //     });
  // }
  console.log('hi')
  return (
    <div>
      <Header />
      <Home />
    </div>
  )
}

export default App
