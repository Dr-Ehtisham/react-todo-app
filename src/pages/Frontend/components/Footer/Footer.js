import React from 'react'

function Footer() {

    const year = new Date().getFullYear();

  return (

    <footer className='bg-dark py-2'>
      <div className="container">
        <div className="row">
            <div className="col">
                <p className="mb-0 text-center text-white">&copy; {year}. All Rights Reserved.</p>
            </div>
        </div>
      </div>
    </footer>
    
  )
}

export default Footer
