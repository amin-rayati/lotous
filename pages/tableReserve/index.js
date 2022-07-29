import Head from 'next/head'
import { React, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer/Footer'
import { useRouter } from 'next/router'

import Header from '../../components/Header/Header'
import { useProjectContext } from '../../context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'
import ForceLogin from '../../components/forceLogin/ForceLogin'

export async function getServerSideProps() {
  const res = await fetch(
    `https://pool.demoworks.ir/admin/TableTypes/API/_TableTypes?token=test`,
    {
      method: 'POST',
      headers: { token: 'test' },
    }
  )
  const data = await res.json()

  return { props: { data } }
}

export default function Home({ data }) {
  const [state, setState] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const { setTableName } = useProjectContext()
  const elementRef = useRef(null)
  const [tableList, settableList] = useState('')

  useEffect(() => {
    elementRef.current.style.height = `${window.innerHeight}px`
    if (data.isDone) {
      settableList(data.data)
    }
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
            <div className='div'>
              <Header />

              <div style={{ marginTop: '60px' }}>
                <h2 style={{ color: '#AE1010', fontWeight: 'bold' }}>
                  رزرو میز
                </h2>
              </div>

              <div className='flex-column  py-5'>
                {tableList &&
                  tableList.map((e) => {
                    return (
                      <div
                        onClick={() => setTableName(e.name)}
                        key={e.id}
                        className=' my-3'
                      >
                        <Link href={`/tableReserve/${e.id}`}>
                          <div
                            className='mainBox'
                            style={{ justifyContent: 'center' }}
                          >
                            <h6
                              style={{ fontWeight: 'bold ', fontSize: '15px' }}
                            >
                              {e.name}
                            </h6>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
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
