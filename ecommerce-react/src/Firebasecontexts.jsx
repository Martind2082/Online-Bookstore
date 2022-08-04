import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import {auth, db} from './Firebase.js';

export const Firebasecontext = createContext();
const FirebaseContexts = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        })
        return unsub;
    })

    const signinwithgoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const signout = () => {
        signOut(auth);
    }


    return (
        <Firebasecontext.Provider value={{signinwithgoogle, signout, user}}>
            {!loading && children}
        </Firebasecontext.Provider>
    );
}
 
export default FirebaseContexts;