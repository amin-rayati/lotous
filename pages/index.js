import Head from 'next/head'
import { React, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Cookies, useCookies } from 'react-cookie'
import Image from 'next/image'
import Footer from '../components/Footer/Footer'

import vec1 from '../public/image/vec1.png'
import vec2 from '../public/image/vec2.png'
import vec3 from '../public/image/vec3.png'

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const elementRef = useRef(null)

  useEffect(() => {
    elementRef.current.style.height = `${window.innerHeight}px`
  }, [])
  return (
    <>
      <div className='text-center div' ref={elementRef}>
        <div className='div py-3'>
          <div style={{ marginTop: '60px' }}>
            <h1 style={{ fontWeight: 'bold' }}>لوتوس</h1>
          </div>

          <div className='flex-column py-5'>
            <div className=' mt-3'>
              <Link href={!cookies['user'] ? '/welcome' : '/tableReserve'}>
                <div className='mainBox'>
                  <Image src={vec1} alt='vec1' />
                  <h6
                    style={{
                      fontWeight: 'bold ',
                      fontSize: '15px',
                      textAlign: 'right',
                    }}
                  >
                    رزرو میز
                  </h6>
                </div>
              </Link>
            </div>
            <div className=' mt-3'>
              <div className='mainBox'>
                <Image src={vec2} alt='vec2' />
                <h6
                  style={{
                    fontWeight: 'bold ',
                    fontSize: '15px',
                    textAlign: 'right',
                  }}
                >
                  ثبت نام کلاس آموزشی
                </h6>
              </div>
            </div>
            <div className=' mt-3'>
              <div className='mainBox'>
                <Image src={vec3} alt='vec3' />

                <h6
                  style={{
                    fontWeight: 'bold ',
                    fontSize: '15px',
                    textAlign: 'right',
                  }}
                >
                  کافه
                </h6>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
