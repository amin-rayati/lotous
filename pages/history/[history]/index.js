import Head from 'next/head'
import { React, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FooterHome from '../../../components/Footer/FooterHome'
import Header from '../../../components/Header/Header'
import DatePicker from 'react-datepicker2'
import { Cookies, useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useProjectContext } from '../../../context/ProjectProvider'
import axios from 'axios'
import ForceLogin from '../../../components/forceLogin/ForceLogin'
export default function Home({ data }) {
  const [state, setState] = useState()
  const [reserveList, setReserveList] = useState()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const { setUserData, userData } = useProjectContext()
  const [date, setDate] = useState('')
  const today = new Date()
  const elementRef = useRef(null)

  const handleDateChange = (e) => {
    setDate(document.getElementsByClassName('datepicker-input')[0].value)
    setTimeout(() => {
      reserveHistory()
    }, 1000)
  }
  const convertDate = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-PE')
  }
  const getIndividualInfo = () => {
    axios
      .post(
        'https://pool.demoworks.ir/admin/Customers/API/_getCustomerInfo?token=test',
        {
          mobile: cookies['user']['mobile'],
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          setUserData(response.data.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const reserveHistory = async () => {
    const res = await fetch(
      `https://pool.demoworks.ir/admin/Customers/API/_getCustomerReservations?token=test`,
      {
        method: 'POST',
        headers: { token: 'test' },
        body: JSON.stringify({
          customerId: userData['id'],
          date: document.getElementsByClassName('datepicker-input')[0].value,
        }),
      }
    )
    const data = await res.json()
    if (data.isDone) {
      setReserveList(data.data)
    }
  }

  useEffect(() => {
    elementRef.current.style.height = `${window.innerHeight}px`
    if (cookies['user']) {
      setState(true)
      getIndividualInfo()
    } else {
      setState(false)
    }
  }, [])

  useEffect(() => {
    if (cookies['user']) {
      getIndividualInfo()
    }
  }, [router])

  return (
    <>
      <div className='text-center div ' ref={elementRef}>
        {state == null ? (
          <></>
        ) : state ? (
          <>
            <div className='div'>
              <div className='mainResponsive'>
                <Header />
                <div style={{ marginTop: '60px' }}>
                  <h2 style={{ color: '#AE1010', fontWeight: 'bold' }}>
                    سوابق رزرو میز
                  </h2>
                </div>

                <div className='mt-5'>
                  <DatePicker
                    onChange={handleDateChange}
                    placeholder='انتخاب تاریخ'
                    timePicker={false}
                    isGregorian={false}
                    className='date'
                    max={{ after: today }}
                  />
                </div>
                <div className=' pb-5 pt-3'>
                  <div className='historyBox'>
                    <div>
                      {reserveList ? (
                        reserveList.length > 0 ? (
                          <>
                            <div>
                              <div
                                className='d-flex'
                                style={{ justifyContent: 'space-between' }}
                              >
                                <p
                                  style={{
                                    fontSize: '12px',
                                    color: '#AE1010',
                                    margin: 'auto',
                                  }}
                                >
                                  {
                                    document.getElementsByClassName(
                                      'datepicker-input'
                                    )[0].value
                                  }
                                </p>
                                <hr style={{ width: '100%' }} />
                              </div>

                              {reserveList.map((e) => {
                                return (
                                  <>
                                    <div
                                      key={e.id}
                                      className='d-flex my-2'
                                      style={{
                                        justifyContent: 'space-between',
                                      }}
                                    >
                                      <p style={{ direction: 'rtl' }}>
                                        {e.sans} ساعت
                                      </p>
                                      <p style={{ textAlign: 'right' }}>
                                        {e.vip == '0' ? ' عادی ' : ' ویژه  '}
                                        <span> </span>
                                        شماره
                                        <span> </span>
                                        {e.tableNumber}
                                        <span> </span>
                                        {e.type}
                                        <span> </span>
                                        میز
                                      </p>
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                          </>
                        ) : (
                          <h6> !هیچ میزی در این تاریخ رزرو نکردید</h6>
                        )
                      ) : (
                        <h6> !لطفا یک تاریخ را انتخاب کنید</h6>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <FooterHome />
            </div>
          </>
        ) : (
          <ForceLogin />
        )}
      </div>
    </>
  )
}
