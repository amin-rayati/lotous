import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  return (
    <>
      <div className=' px-3 pt-4' style={{ alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', margin: '0' }}>لوتوس</h1>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          padding: '15px',
        }}
      >
        <IoIosArrowForward onClick={() => router.back()} size={25} />
      </div>
    </>
  )
}

export default Header
