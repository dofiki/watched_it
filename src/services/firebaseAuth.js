import {auth, db} from './firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

// sign up 
export async function signupUser(email,password){
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;

    // firestore document for user
    await setDoc(doc(db, "users", user.uid),{
        email,
        watchlist:[],
        watchedlist:[]
    })

    return user;
}

// login
export async function loginUser(email,password){
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

// logout
export async function logoutUser(){
    await signOut(auth);
}