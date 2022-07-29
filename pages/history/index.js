import Head from 'next/head'
import { React, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FooterHome from '../../components/Footer/FooterHome'
import Header from '../../components/Header/Header'
import { Cookies, useCookies } from 'react-cookie'
import ForceLogin from '../../components/forceLogin/ForceLogin'
export default function Home({ data }) {
  const [state, setState] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const elementRef = useRef(null)

  useEffect(() => {
    elementRef.current.style.height = `${window.innerHeight}px`
  })

  useEffect(() => {
    if (cookies['user']) {
      setState(true)
    } else {
      setState(false)
    }
  })

  return (
    <>
      <div className='text-center div ' ref={elementRef}>
        {state == null ? (
          <></>
        ) : state ? (
          <>
            <div className='div'>
              <Header />

              <div style={{ marginTop: '60px' }}>
                <h2 style={{ color: '#AE1010', fontWeight: 'bold' }}>
                  رزرو میز
                </h2>
              </div>

              <div className='flex-column  py-5'>
                <div className=' my-3'>
                  <Link href='/history/table'>
                    <div
                      className='mainBox'
                      style={{ justifyContent: 'center' }}
                    >
                      <h6 style={{ fontWeight: 'bold ', fontSize: '15px' }}>
                        سوابق رزرو میز
                      </h6>
                    </div>
                  </Link>
                </div>
                <div className=' my-3'>
                  <Link href='/history'>
                    <div
                      className='mainBox'
                      style={{ justifyContent: 'center' }}
                    >
                      <h6 style={{ fontWeight: 'bold ', fontSize: '15px' }}>
                        سوابق شرکت در دوره های آموزشی
                      </h6>
                    </div>
                  </Link>
                </div>
                <div className=' my-3'>
                  <Link href='/history'>
                    <div
                      className='mainBox'
                      style={{ justifyContent: 'center' }}
                    >
                      <h6 style={{ fontWeight: 'bold ', fontSize: '15px' }}>
                        سوابق خرید از کافه
                      </h6>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <FooterHome />
          </>
        ) : (
          <ForceLogin />
        )}
      </div>
    </>
  )
}
