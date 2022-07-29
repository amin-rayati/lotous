import Head from 'next/head'
import { React, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'

import Footer from '../../../../components/Footer/Footer'
import { Cookies, useCookies } from 'react-cookie'
import { Modal, ThemeProvider } from 'react-bootstrap'

import Header from '../../../../components/Header/Header'
import { useProjectContext } from '../../../../context/ProjectProvider'
import Loading from '../../../../components/Loader/Loader'
import ForceLogin from '../../../../components/forceLogin/ForceLogin'

export default function Home({ data }) {
  const [state, setState] = useState()

  const router = useRouter()
  const { table } = router.query
  const { type } = router.query
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [loading, setLoading] = useState(false)

  const {
    inTime,
    setInTime,
    duration,
    setDuration,
    tableName,
    setUserData,
    userData,
  } = useProjectContext()

  const [reservedList, setReservedList] = useState('')
  const [selectedTable, setSelectedtable] = useState('')

  const elementRef = useRef(null)

  const [showModal, setShowModal] = useState(false)
  const ModalClose = () => setShowModal(false)
  const ModalShow = () => setShowModal(true)

  const getReservedTable = async () => {
    const res = await fetch(
      `https://pool.demoworks.ir/admin/Tables/API/_availableTables?token=test`,
      {
        method: 'POST',
        headers: { token: 'test' },
        body: JSON.stringify({
          tableTypeId: table,
          start: inTime.toString().split(' ')['4'],
          duration: duration,
          vip: type == 'vip' ? '1' : '0',
        }),
      }
    )
    const data = await res.json()
    if (data.isDone) {
      setReservedList(data.data)
    }
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
          table_id: selectedTable['id'],
          start: inTime.toString().split(' ')['4'],
          sans: duration,
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
          ModalClose()

          router.push(response.data.data)

          // Swal.fire({
          //   type: 'success',
          //   text: 'میز شما رزرو شد',
          //   confirmButtonText: 'فهمیدم',
          //   onAfterClose: () => {
          //     getReservedTable()
          //   },
          // })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleModal = (e) => {
    if (e.available) {
      ModalShow()
    } else {
      Swal.fire({
        type: 'error',
        text: 'این میز رزرو شده است',
        confirmButtonText: 'فهمیدم',
      })
    }
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
    getReservedTable()
    if (cookies['user']) {
      getIndividualInfo()
    }
  }, [router])

  return (
    <>
      <div className='text-center div' ref={elementRef}>
        {state == null ? (
          <></>
        ) : state ? (
          <>
            {' '}
            <div className='div py-3'>
              <Header />

              <div style={{ marginTop: '60px' }}>
                <h2 style={{ color: '#AE1010', fontWeight: 'bold' }}>
                  {type == 'ordinary' ? 'عادی' : 'vip'} {tableName} میز
                </h2>
              </div>
              <div className='py-5'>
                <div className=' my-3'>
                  <div className='tableBox'>
                    <div className='my-3'>
                      <div
                        className='row '
                        style={{
                          justifyContent: 'space-between',
                          direction: 'rtl',
                        }}
                      >
                        {reservedList &&
                          reservedList.map((e) => {
                            return (
                              <div
                                key={e.id}
                                onClick={() => {
                                  setSelectedtable(e)
                                  handleModal(e)
                                }}
                                className='col-5 tableDiv'
                                style={
                                  e.available
                                    ? { background: '#10AE46' }
                                    : { background: '#AE1010' }
                                }
                              >
                                <span style={{ color: 'white' }}>
                                  {e.number}
                                </span>
                              </div>
                            )
                          })}
                      </div>
                      <div
                        className='row mt-3 '
                        style={{ justifyContent: 'right' }}
                      >
                        <div
                          className='col-6 d-flex'
                          style={{ justifyContent: 'space-around' }}
                        >
                          <span style={{ fontSize: '10px' }}>میز پر</span>
                          <span
                            className='Tablebadge'
                            style={{ background: '#AE1010' }}
                          ></span>
                        </div>
                        <div
                          className='col-6 d-flex'
                          style={{ justifyContent: 'space-around' }}
                        >
                          <span style={{ fontSize: '10px' }}>میز خالی</span>
                          <span
                            className='Tablebadge'
                            style={{ background: '#10AE46' }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className='my-2'>
                <button onClick={ModalShow} className='continueBtn'>
                  ادامه
                </button>
              </div> */}
                </div>
              </div>
            </div>
            <Modal show={showModal} onHide={ModalClose} centered size='sm'>
              <Modal.Header
                style={{ justifyContent: 'center', borderBottom: 'none' }}
              >
                <p style={{ fontWeight: 'bold' }}>
                  {selectedTable['number']} رزرو میز شماره
                </p>
              </Modal.Header>
              <Modal.Body style={{ textAlign: 'center' }}>
                <p
                  style={{
                    color: '#AE1010',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  {type == 'ordinary' ? 'عادی' : 'vip'}{' '}
                  {selectedTable['tableTypeName']} میز
                </p>
                <p style={{ direction: 'rtl' }}>
                  {selectedTable['price']} تومان
                </p>
                <div className='my-2'>
                  <button onClick={ReserveTable} className='continueBtn'>
                    {loading ? <Loading /> : 'رزرو'}
                  </button>
                </div>
              </Modal.Body>
            </Modal>
            <Footer />
          </>
        ) : (
          <ForceLogin />
        )}
      </div>
    </>
  )
}
