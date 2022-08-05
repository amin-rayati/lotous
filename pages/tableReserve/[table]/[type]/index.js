import Head from 'next/head'
import { React, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footer from '../../../../components/Footer/Footer'

import { Cookies, useCookies } from 'react-cookie'

import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Stack from '@mui/material/Stack'

import { useProjectContext } from '../../../../context/ProjectProvider'

import Header from '../../../../components/Header/Header'
import { useRouter } from 'next/router'
import ForceLogin from '../../../../components/forceLogin/ForceLogin'

export default function Home() {
  const [state, setState] = useState()

  const router = useRouter()
  const { table } = router.query
  const { type } = router.query
  const [date, setDate] = useState(new Date())
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const elementRef = useRef(null)
  const { inTime, setInTime, duration, setDuration, tableName } =
    useProjectContext()

  const handleDurationChange = (e) => {
    if (e.target.value.length <= 1) {
      if (e.target.value < 10) {
        if (e.target.value === '0') {
          e.preventDefault()
        } else {
          setDuration(e.target.value)
        }
      }
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

  return (
    <>
      <div className='text-center div' ref={elementRef}>
        {state == null ? (
          <></>
        ) : state ? (
          <>
            <div className='div py-3'>
              <div className='mainResponsive'>
                <Header />

                <div style={{ marginTop: '60px' }}>
                  <h2 style={{ color: '#AE1010', fontWeight: 'bold' }}>
                    {type == 'ordinary' ? 'عادی' : 'vip'} {tableName} میز
                  </h2>
                </div>

                <div className=' my-3 py-5'>
                  <div className='clockBox'>
                    <p>ساعت ورود</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <TimePicker
                          ampm={false}
                          openTo='hours'
                          views={['hours']}
                          inputFormat='HH'
                          mask='__'
                          label='.'
                          value={date}
                          minTime={new Date()}
                          onChange={(newValue) => {
                            setDate(newValue)
                            setInTime(newValue)
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                    <div className='my-3'>
                      <p>زمان بازی</p>
                      <input
                        value={duration}
                        onChange={handleDurationChange}
                        type='number'
                        style={{
                          width: '100%',
                          height: '50px',
                          border: '1px solid #cdc8c8',
                          borderRadius: '5px',
                          padding: '15px',
                          outline: 'none',
                        }}
                        min='1'
                      />
                    </div>
                  </div>
                  <div className='my-3'>
                    <Link
                      href={`/tableReserve/${table}/${type}/compeleteReserve`}
                    >
                      <button className='continueBtn'>ادامه</button>
                    </Link>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </>
        ) : (
          <ForceLogin />
        )}
      </div>
    </>
  )
}
