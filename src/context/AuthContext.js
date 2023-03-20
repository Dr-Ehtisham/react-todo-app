import { onAuthStateChanged } from 'firebase/auth';
import React, {createContext, useEffect, useReducer} from 'react'
import { auth } from '../config/firebase';

export const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: { uid: ''} };

const reducer = ((state, action) => {
    
        switch (action.type) {
        case "LOGIN":
        return { isAuthenticated: true, user: action.payload.user }   
        case "LOGOUT":
        return { isAuthenticated: false } 
        default:
        return state    
        }
    
    
}); 

function AuthContextProvider(props) {

   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // console.log(user);
        // console.log('User is signed in');
        dispatch({ type: 'LOGIN', payload: { user } })
        // ...
      } else {
        // User is signed out
        console.log('User is signed out');
        // ...
      }
    });
   }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
