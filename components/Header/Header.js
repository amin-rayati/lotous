import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { BsBasket3Fill } from 'react-icons/bs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Cookies, useCookies } from 'react-cookie'

const Header = () => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  return (
    <>
      <div className='d-flex p-3' style={{ justifyContent: 'space-between' }}>
        <Link href={!cookies['user'] ? '/welcome' : '/card'}>
          <BsBasket3Fill
            style={{ color: '#ae1010', cursor: 'pointer' }}
            size={20}
          />
        </Link>
        <div>
          <h1 style={{ fontWeight: 'bold', margin: '0' }}>لوتوس</h1>
        </div>
        {/* <div
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          padding: '15px',
        }}
        > */}
        {/* </div> */}
        <IoIosArrowForward
          style={{ cursor: 'pointer' }}
          onClick={() => router.back()}
          size={20}
        />
      </div>
    </>
  )
}

export default Header
