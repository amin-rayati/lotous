import { React, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import { useRouter } from 'next/router'
import { useProjectContext } from '../../../context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'
import ForceLogin from '../../../components/forceLogin/ForceLogin'

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [state, setState] = useState()

  const { tableName, setTableName } = useProjectContext()

  const router = useRouter()
  const { table } = router.query
  const elementRef = useRef(null)

  useEffect(() => {
    elementRef.current.style.height = `${window.innerHeight}px`

    if (cookies['user']) {
      setState(true)
    } else {
      setState(false)
    }
  }, [])

  return (
    <>
      <div className='text-center div ' ref={elementRef}>
        {state == null ? (
          <></>
        ) : state ? (
          <>
            {' '}
            <div className='div'>
              <Header />

              <div style={{ marginTop: '60px' }}>
                <h2 style={{ color: '#AE1010', fontWeight: 'bold' }}>
                  {' '}
                  {tableName} میز
                </h2>
              </div>

              <div className='flex-column   py-5'>
                <Link href={`/tableReserve/${table}/ordinary`}>
                  <div className=' my-3'>
                    <div
                      className='mainBox'
                      style={{ justifyContent: 'center' }}
                    >
                      <h6 style={{ fontWeight: 'bold ', fontSize: '15px' }}>
                        میز معمولی
                      </h6>
                    </div>
                  </div>
                </Link>
                <Link href={`/tableReserve/${table}/vip`}>
                  <div className=' my-3'>
                    <div
                      className='mainBox'
                      style={{ justifyContent: 'center' }}
                    >
                      <h6 style={{ fontWeight: 'bold ', fontSize: '15px' }}>
                        میز vip
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <ForceLogin />
        )}
      </div>
    </>
  )
}
export default Home
