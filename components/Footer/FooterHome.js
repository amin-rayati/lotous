import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <Link href='/'>
        <div
          className='d-flex'
          style={{ justifyContent: 'center', cursor: 'pointer' }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '3px',
              display: 'flex',
              justifyContent: 'center',
              width: 'fit-content',
              padding: '5px 10px',
              borderRadius: '7px',
              alignItems: 'center',
              position: 'fixed',
              bottom: '0px',
              margin: '10px',
            }}
          >
            <span style={{ fontSize: '15px' }}>خانه</span>
            <AiOutlineHome />
          </div>
        </div>
      </Link>
    </>
  )
}

export default Header
