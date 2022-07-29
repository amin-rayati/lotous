import React from 'react'
import { AiOutlineHistory } from 'react-icons/ai'
import Link from 'next/link'
import { Cookies, useCookies } from 'react-cookie'

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  return (
    <>
      <Link href={cookies['user'] ? '/history' : '/welcome'}>
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
            <span style={{ fontSize: '15px' }}>تاریخچه</span>
            <AiOutlineHistory />
          </div>
        </div>
      </Link>
    </>
  )
}

export default Header
