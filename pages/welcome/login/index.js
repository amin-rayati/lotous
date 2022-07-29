import { React, useEffect, useRef } from 'react'
import Image from 'next/image'
import mainImg from '../../../public/image/mainImg.png'
import LoginForm from '../../../components/LoginForm/LoginForm'
export default function Start() {
  const elementRef = useRef(null)

  useEffect(() => {
    elementRef.current.style.height = `${window.innerHeight}px`
  }, [])
  return (
    <div className='text-center div' ref={elementRef}>
      <div className='mainImg'>
        <div style={{ width: '100%' }}>
          <Image src={mainImg} alt='mainImg' />
        </div>

        <div className='displayFlex'>
          <div className='mainDiv'>
            <h1 style={{ fontSize: '20px', fontWeight: 'bolder' }}>
              به <span style={{ color: '#AE1010' }}>لوتوس</span> خوش آمدید
            </h1>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
