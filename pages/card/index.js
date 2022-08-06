import Head from 'next/head'
import { React, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer/Footer'
import { useRouter } from 'next/router'

import Header from '../../components/Header/Header'
import { useProjectContext } from '../../context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'
import ForceLogin from '../../components/forceLogin/ForceLogin'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loading from '../../components/Loader/Loader'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { status } = router.query
  const [state, setState] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const elementRef = useRef(null)

  const {
    setUserData,
    userData,
    cart,
    setCart,
    addToCart,
    removeFromCartTotaly,
  } = useProjectContext()

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const deleteTable = (table) => {
    Swal.fire({
      title: 'آیا  این میز را حذف میکنید',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر',
    }).then((result) => {
      if (result.value) {
        removeFromCartTotaly(table)
      }
    })
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

  const ReserveTable = () => {
    setLoading(true)

    axios
      .post(
        'https://pool.demoworks.ir/admin/Reservations/API/_reserveTable?token=test',
        {
          customerId: userData['id'],
          reserveList: cart,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          setLoading(false)
          router.push(response.data.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    elementRef.current.style.height = `${window.innerHeight}px`
    if (cookies['user']) {
      setState(true)
    } else {
      setState(false)
    }
  }, [])

  useEffect(() => {
    if (cookies['user']) {
      getIndividualInfo()
    }
    if (status == 'true') {
      setCart({})
      window.localStorage.clear()
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
                    سبد پرداخت
                  </h2>
                </div>

                <div className='flex-column  py-5'>
                  <div className=' my-3'>
                    <div
                      className='cardBox'
                      style={{ justifyContent: 'center' }}
                    >
                      {Object.values(cart).length !== 0 ? (
                        Object.values(cart).map((e) => {
                          return (
                            <>
                              <div
                                className='d-flex'
                                style={{ justifyContent: 'space-around' }}
                              >
                                <FaTrash
                                  onClick={() => {
                                    deleteTable(e.table)
                                  }}
                                  style={{
                                    color: '#ae1010',
                                    cursor: 'pointer',
                                  }}
                                  size={15}
                                />
                                <h6 style={{ fontSize: '12px' }}>
                                  {nummber(e.price)}
                                </h6>
                                <h6
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: 'bolder',
                                  }}
                                >
                                  {e.type == 'ordinary' ? 'عادی' : 'vip'}{' '}
                                  {e.table.tableTypeName} میز
                                </h6>
                              </div>
                              <hr />
                            </>
                          )
                        })
                      ) : (
                        <div>
                          <h6>سبد خرید شما خالی است</h6>{' '}
                        </div>
                      )}
                    </div>
                    {Object.values(cart).length !== 0 ? (
                      <button onClick={ReserveTable} className='continueBtn'>
                        پرداخت
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              <Footer />
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
