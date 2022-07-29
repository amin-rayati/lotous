import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <div className='text-center'>
      <Spinner
        animation='border'
        role='status'
        style={{ width: '15px', height: '15px', marginTop: '3px' }}
      >
        <span className='visually-hidden'></span>
      </Spinner>
    </div>
  )
}

export default Loader
