import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./Home"
import About from "./About"
import Todos from './Todos'
import Contact from "./Contact"
import Header from "./components/Header"
import Footer from "./components/Footer"


function index() {
  return (
    <>
    <Header/>
    <main >
     <Routes>
        <Route path='/'>
            <Route index element={<Home />} />
            <Route path='todos' element={<Todos/>} />
            <Route path='about' element={<About/>} />
            <Route path='contact' element={<Contact/>} />
       </Route>
     </Routes> 
     </main>
     <Footer/>
    </>
  )
}

export default index
