import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore/lite';
import { auth, firestore } from '../../../config/firebase';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const initialState = { email: "", password: "" };

function Login() {

  const myStyle = {
    color: 'white',
    backgroundColor: '#ee5784',
};

  const navigate = useNavigate()

  const { dispatch } = useContext(AuthContext);

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  };


  const handleLogin = e => {
    e.preventDefault()
    let {email, password} = state
    
    setIsProcessing(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    let user = userCredential.user
    // addDocument(user)
    console.log(user);

    dispatch({ type: 'LOGIN', payload: {user}})

    navigate('/dashboard')
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      setIsProcessing(false);
    })

  };

//   const addDocument = async (user) => {
//     try {
//     await setDoc(doc(firestore, "users", user.uid), {
//       firstName: "",
//       lastName: "",
//       uid: user.uid, 
//     });
//     console.log('user document created at firestore');
//     dispatch({ type: 'LOGIN' })
//   }
//   catch(err) {
//     console.error(err);
//   }

//  }
  
  return (
    <div className='auth'>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card p-2 p-md-3 p-lg-4">
              <div className="row">
                <div className="col">
                <h3 className='mb-4'>LOGIN</h3>
                </div>
              </div>

            <form onSubmit={handleLogin}>
              <div className="row mb-3">
                <div className="col">
                <label htmlFor="email">Email</label>
                  <input type="email" className='form-control' placeholder='Email' name='email' onChange={handleChange} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                <label htmlFor="password">Password</label>
                  <input type="password" className='form-control' placeholder='Password' name='password' onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button style={myStyle} className='login btn w-100'  disabled={isProcessing}>
                  {
                    !isProcessing ? "Login" : <div className='spinner-grow spinner-grow-sm'></div>
                  }
                  </button>
                </div>
              </div>
              </form>
              <div className="row mt-4">
                <div className="col">
                  <p className='mb-0 text-center'>Need an acount <Link to='/authentication/register' className='text-dark'>Register</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
