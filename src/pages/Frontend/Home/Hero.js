import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { setDoc, serverTimestamp, doc } from 'firebase/firestore/lite';
import { async } from '@firebase/util';
import { firestore } from '../../../config/firebase';


const initialState = {
  title: '',
  location: '',
  description: ''
}

function Hero() {

  const { user } = useContext(AuthContext);

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault();

    let { title, location, description } = state

    title = title.trim();
    location = location.trim();
    description = description.trim();

    if(title.length < 3) {
    return window.notify("Title length should be at least 3 characters", 'error');
    }

    if(location.length < 3) {
      return window.notify("Please enter location", 'error');
    }

    if(description.length < 10) {
      return window.notify("Please enter description", 'error');
    }

    let formData = { title, location, description }

    formData.dateCreated = serverTimestamp();
    formData.id = window.getRandomId();
    formData.status = 'active';
    formData.createdBy = {
      email: user.email,
      uid: user.uid
    }
    createDocument(formData);
}

    const createDocument = async (formData) => {
      setIsProcessing(true);
    try{
        await setDoc(doc(firestore, "todos", formData.id), formData);
        window.notify('Todo has been successfully added', 'success')
      }catch(err){
        console.error(err)
        window.notify('Something went wrong, Todo is not added', 'error')
      }
      setIsProcessing(false);
    }

  return (
    <div className='py-5 home w-100 d-flex justify-content-center align-items-center'>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card p-3 p-md-4 p-lg-5">

            <form onSubmit={handleSubmit}>
             <div className="row">
              <div className="col">
              <h2 className="text-center mb-4">Add Todo</h2>
              </div>
             </div>

            <div className="row">
              <div className="col-12 col-md-6 mb-3">
               <input type="text" className='form-control' name="title" placeholder='Enter Title'
               onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
               <input type="text" className='form-control' name="location" placeholder='Enter Location'
               onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
              <textarea name="description" className='form-control'  rows="5" placeholder='Enter Description'
              onChange={handleChange}
              ></textarea>
              </div>
              </div>

              <div className="row">
                <div className="col">
                 <button className='btn btn-danger w-100' disabled={isProcessing}>
                  {
                    !isProcessing ? 'Add Todo' 
                    : <div className="spinner-border spinner-border-sm"></div>
                  }
                 </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Hero
