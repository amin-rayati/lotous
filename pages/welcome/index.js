import Head from 'next/head'
import { React, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/home.module.css'
import mainImg from '../../public/image/mainImg.png'

export default function Home() {
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
            <div style={{ marginTop: '100px' }}>
              <div className='displayFlex'>
                <Link href='/welcome/login'>
                  <button className={styles.registerBtn}>ثبت نام</button>
                </Link>
              </div>
              <div className='displayFlex'>
                <Link href='/welcome/login'>
                  <button className={styles.loginBtn}>ورود</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='displayFlex'>
        <div style={{ position: 'absolute', bottom: '0px' }}>
          <h6
            style={{
              lineHeight: '30px',
              textAlign: 'justify',
              fontWeight: 'lighter',
              fontSize: '12px',
              direction: 'rtl',
              margin: '0 10px 10px 10px',
            }}
          >
            با ثبت نام و ورود به شب نما اقرار مینماییم که{' '}
            <span style={{ color: 'red' }}>حریم خصوصی</span> و{' '}
            <span style={{ color: 'red' }}>قوانین استفاده</span> را مطالعه نموده
            و پذیرفته ام.
          </h6>
        </div>
      </div>
    </div>
  )
}
