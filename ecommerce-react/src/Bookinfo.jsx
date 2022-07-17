import { useParams } from "react-router-dom";
import Bookslist from './Bookslist.json';

const Bookinfo = () => {
    const {id} = useParams();
    const {bookslist} = Bookslist;
    return ( 
        <div id='bookinfo'>
            <div id='bookinfo_left'>
                <img src={bookslist[id - 1].image} />
            </div>
            <div id='bookinfo_right'>
                <p>{bookslist[id - 1].title}</p>
                <p>{bookslist[id - 1].body}</p>
                <p>{bookslist[id - 1].price}</p>
            </div>
        </div>
     );
}
 
export default Bookinfo;