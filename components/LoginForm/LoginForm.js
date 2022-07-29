import React from 'react'
import style from './login.module.css'
import { FiPhoneCall, FiLock } from 'react-icons/fi'
import { BiUser } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import { useState, useCallback, useEffect } from 'react'
import { useProjectContext } from '../../context/ProjectProvider'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Cookies, useCookies } from 'react-cookie'
import Loading from '../Loader/Loader'
import ResendCodeLoading from '../Loader/Loader'
import Grow from '@mui/material/Grow'
import Select from 'react-select'
import { useRouter } from 'next/router'

const LoginForm = () => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const handleCookie = (infoObject) => {
    setUserData(infoObject)
    setCookie(
      'user',
      {
        mobile: infoObject.mobile,
      },
      {
        path: '/',
        expires: new Date(Date.now() + 5000000),
      }
    )
  }

  const options = [
    { value: '0', label: 'اینستاگرام' },
    { value: '1', label: 'وبسایت' },
    { value: '2', label: 'تبلیغات طراحی' },
    { value: '3', label: 'دوستان و آشنایان' },
    { value: '4', label: 'سایر' },
  ]
  const { userData, setUserData } = useProjectContext()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [newpass1, setnewpass1] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [Referer, setReferer] = useState('')
  const [name1, setName1] = useState()
  const [lastName1, setLastName1] = useState()
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [tip, setTip] = useState('')

  const [seconds, setSeconds] = useState(30)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [ispass, setIsPass] = useState(false)
  const [btn, setBtn] = useState(true)
  const [btnLogin, setBtnLogin] = useState(false)
  const [btnRegister, setBtnRegister] = useState(false)
  const [resendcode, setresendcode] = useState(false)
  const [coundown, setCountdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [btnsetpass, setbtnsetpass] = useState(false)
  const [inputcode1, setinputcode1] = useState(false)
  const [btncode1, setbtncode1] = useState(false)
  const [setnewpass, setsetnewpass] = useState(false)
  const [btnnewpass, setbtnnewpass] = useState(false)
  const [registerShow, setRegisterShow] = useState(false)

  const colourStyles = {
    control: (styles) => ({ ...styles, border: 'none', textAlign: 'initial' }),
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleNewPassChange = (e) => {
    setnewpass1(e.target.value)
  }
  const handleCodeChange = (e) => {
    setCode(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleLnameChange = (e) => {
    setLastName(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleLRefererChange = (e) => {
    setReferer(e.target.value)
  }
  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }
  const validateMobilephone = (input) => {
    let mobile = /^09{1}[\d]{9}$/
    if (mobile.test(input)) {
      return input
    } else {
      Swal.fire({
        type: 'error',
        text: 'لطفا شماره تماس را درست وارد کنید',
        confirmButtonText: 'فهمیدم',
      })
      return false
    }
  }
  const handleCountDown = useCallback(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    } else {
      setCountdown(false)
      setresendcode(true)
      setTimeout(() => {
        setLoading1(false)
      }, 4000)
    }
  }, [seconds])

  // startloginregister ok
  const sendMobile = (e) => {
    e.preventDefault()
    validateMobilephone(phone)
    if (validateMobilephone(phone) === false) return
    setLoading(true)
    axios
      .post(
        'https://pool.demoworks.ir/admin/Customers/API/_startLoginRegister?token=test',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          if (response.data.data['status'] == '1') {
            setBtn(false)
            setBtnLogin(true)
            setIsPass(true)
            setbtnsetpass(true)
          } else if (response.data.data['status'] == '2') {
            handleCountDown()
            setCountdown(true)
            setBtn(false)
            setBtnRegister(true)
            setIsCodeSent(true)
          }
        } else {
          Swal.fire({
            type: 'error',
            text: 'دوباره تلاش کنید',
            confirmButtonText: 'فهمیدم',
          })
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  //register ok
  const Register = (e) => {
    e.preventDefault()
    setLoading(true)
    if (name === '' || lastName === '' || password === '' || tip == '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
        confirmButtonText: 'فهمیدم',
        onAfterClose: () => {
          setLoading(false)
        },
      })
    } else {
      axios
        .post(
          'https://pool.demoworks.ir/admin/Customers/API/_register?token=test',
          {
            fname: name,
            lname: lastName,
            mobile: phone,
            password: password,
            gender: 2,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )
        .then((response) => {
          if (response.data.isDone) {
            Swal.fire({
              type: 'success',
              text: 'به لوتوس خوش آمدید',
              confirmButtonText: 'فهمیدم',
            })
            getIndividualInfo(e)
            setIsCodeSent(true)
            setLoading(false)

            // window.location.reload(true)
            // router.push('/')
          } else {
            Swal.fire({
              type: 'error',
              text: 'مشکلی به وجود امده است',
              confirmButtonText: 'فهمیدم',
            })
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  //login ok
  const sendPass = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
        confirmButtonText: 'فهمیدم',
        onAfterClose: () => {
          setLoading(false)
        },
      })
    } else {
      axios
        .post(
          'https://pool.demoworks.ir/admin/Customers/API/_login?token=test',
          {
            mobile: phone,
            password: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          setLoading(false)
          if (response.data.isDone) {
            getIndividualInfo(e)
            setLoading(false)
            Swal.fire({
              type: 'success',
              text: 'به لوتوس خوش آمدید',
              confirmButtonText: 'فهمیدم',
              // onAfterClose: () => {
              //   loginModalClose()
              //   setLoading(false)
              // },
            })
            // window.location.reload(true)
            router.push('/')
          } else {
            Swal.fire({
              type: 'error',
              text: 'شماره موبایل یا رمز عبور اشتباه است',
              confirmButtonText: 'فهمیدم',
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  //codeValidate ok
  const sendCode = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
        confirmButtonText: 'فهمیدم',
        showConfirmButton: false,
        showCloseButton: true,
        onAfterClose: () => {
          setLoading(false)
        },
      })
    } else {
      axios
        .post(
          'https://pool.demoworks.ir/admin/Customers/API/_codeValidate?token=test',
          {
            mobile: phone,
            code: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.status === 200) {
            setIsCodeSent(true)

            if (response.data.isDone === true) {
              setRegisterShow(true)
            } else {
              Swal.fire({
                type: 'error',
                text: 'کد اشتباه است',
                confirmButtonText: 'فهمیدم',
              })
            }
          } else {
            Swal.fire({
              type: 'error',
              text: 'دوباره تلاش کنید',
              confirmButtonText: 'فهمیدم',
            })
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  //codeValidate ok
  const sendCode1 = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
        confirmButtonText: 'فهمیدم',
        onAfterClose: () => {
          setLoading(false)
        },
      })
    } else {
      axios
        .post(
          'https://pool.demoworks.ir/admin/Customers/API/_codeValidate?token=test',
          {
            mobile: phone,
            code: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone === true) {
            Swal.fire({
              type: 'success',
              text: 'کد درست است ',
            })
            setCountdown(false)
            setinputcode1(false)
            setsetnewpass(true)
            setbtnnewpass(true)
            setbtncode1(false)
            setresendcode(false)
            // getIndividualInfo(e)
            // setLoading(false)
            // Swal.fire({
            //   type: 'success',
            //   text: 'به منودیجیتال خوش آمدید',
            //   confirmButtonText: 'فهمیدم',
            // })
            // loginModalClose()
            // setLoading(false)
          } else {
            Swal.fire({
              type: 'error',
              text: 'کد اشتباه است',
              confirmButtonText: 'فهمیدم',
            })
          }

          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  //setNewPassWord ok
  const setNewpassword = (e) => {
    e.preventDefault()
    setLoading(true)
    if (newpass1 === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
        }
      })
    } else {
      axios
        .post(
          'https://pool.demoworks.ir/admin/Customers/API/_setPassword?token=test',
          {
            mobile: phone,
            password: newpass1,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone === true) {
            getIndividualInfo(e)
            Swal.fire({
              type: 'success',
              text: ' به لوتوس خوش آمدید, رمز جدید با موفقیت ثبت شد',
            })
            getIndividualInfo(e)
          }

          setLoading(false)
          router.push('/')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  //forgetPassWord ok
  const foregtpass = (e) => {
    e.preventDefault()
    setBtnLogin(false)
    setIsPass(false)
    setbtnsetpass(false)
    setbtncode1(true)
    handleCountDown()
    setCountdown(true)
    setinputcode1(true)
    e.preventDefault()

    axios
      .post(
        'https://pool.demoworks.ir/admin/Customers/API/_forgetPassword?token=test',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {})
      .catch((error) => {
        console.error(error)
      })
  }

  //forgetPassWord ok
  const resendCode = (e) => {
    e.preventDefault()
    setLoading1(true)
    setTimeout(() => {
      setCountdown(true)
      setresendcode(false)
      setSeconds(30)
    }, 1000)

    e.preventDefault()
    validateMobilephone(phone)
    if (validateMobilephone(phone) === false) return

    axios
      .post(
        'https://pool.demoworks.ir/admin/Customers/API/_forgetPassword?token=test',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            type: 'success',
            text: 'کد تایید ارسال شد',
            confirmButtonText: 'فهمیدم',
          })
        } else {
          Swal.fire({
            type: 'error',
            text: 'دوباره تلاش کنید',
            confirmButtonText: 'فهمیدم',
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  //getInfo ok
  const getIndividualInfo = (e) => {
    e.preventDefault()
    axios
      .post(
        'https://pool.demoworks.ir/admin/Customers/API/_getCustomerInfo?token=test',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          handleCookie(response.data.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleKeyDownSendCode1 = (event) => {
    if (event.key === 'Enter') {
      sendCode1(event)
    }
  }

  const handleKeyDownSetNewpassword = (event) => {
    if (event.key === 'Enter') {
      setNewpassword(event)
    }
  }

  const handleKeyDownSendMobile = (event) => {
    if (event.key === 'Enter') {
      sendMobile(event)
    }
  }

  const handleKeyDownSendCode = (event) => {
    if (event.key === 'Enter') {
      sendCode(event)
    }
  }

  const handleKeyDownSendPass = (event) => {
    if (event.key === 'Enter') {
      sendPass(event)
    }
  }

  useEffect(() => {
    if (isCodeSent) {
      const timerID = setInterval(() => handleCountDown(), 1000)
      return () => clearInterval(timerID)
    }
    if (inputcode1) {
      const timerID = setInterval(() => handleCountDown(), 1000)
      return () => clearInterval(timerID)
    }
  }, [handleCountDown, isCodeSent, inputcode1])

  return (
    <>
      {!registerShow ? (
        <>
          <div className='mt-5'>
            <Grow in={true} timeout={500}>
              <div>
                <input
                  onChange={handlePhoneChange}
                  onKeyDown={handleKeyDownSendMobile}
                  value={phone}
                  required
                  pattern='[0-9]*'
                  type='number'
                  title='Ten digits code'
                  placeholder='شماره موبایل'
                  className={style.loginInput}
                />
                <FiPhoneCall
                  style={{
                    position: 'relative',
                    right: '20px',
                    cursor: 'pointer',
                    color: '#6a7270',
                    marginTop: '5px',
                  }}
                  size={14}
                />
              </div>
            </Grow>

            {isCodeSent ? (
              <>
                <Grow in={isCodeSent} timeout={500}>
                  <div>
                    <input
                      onChange={handleCodeChange}
                      onKeyDown={handleKeyDownSendCode}
                      value={code}
                      required
                      pattern='[0-9]*'
                      type='number'
                      title='Ten digits code'
                      placeholder='کد تایید'
                      className={style.loginInput}
                    />
                    <FiLock
                      style={{
                        position: 'relative',
                        right: '20px',
                        cursor: 'pointer',
                        color: '#6a7270',
                        marginTop: '5px',
                      }}
                      size={14}
                    />
                  </div>
                </Grow>
              </>
            ) : null}

            {ispass ? (
              <Grow in={ispass} timeout={500}>
                <div>
                  <input
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDownSendPass}
                    value={code}
                    required
                    pattern='[0-9]*'
                    type='password'
                    title='Ten digits code'
                    placeholder='رمز عبور'
                    className={style.loginInput}
                  />
                  <FiLock
                    style={{
                      position: 'relative',
                      right: '20px',
                      cursor: 'pointer',
                      color: '#6a7270',
                      marginTop: '5px',
                    }}
                    size={14}
                  />
                </div>
              </Grow>
            ) : null}

            {inputcode1 ? (
              <Grow in={inputcode1} timeout={500}>
                <div>
                  <input
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDownSendCode1}
                    value={code}
                    required
                    type='number'
                    pattern='[0-9]*'
                    title='Ten digits code'
                    placeholder='کد تایید'
                    className={style.loginInput}
                  />
                  <FiLock
                    style={{
                      position: 'relative',
                      right: '20px',
                      cursor: 'pointer',
                      color: '#6a7270',
                      marginTop: '5px',
                    }}
                    size={14}
                  />
                </div>
              </Grow>
            ) : null}

            {setnewpass ? (
              <Grow in={setnewpass} timeout={500}>
                <div>
                  <input
                    onChange={handleNewPassChange}
                    onKeyDown={handleKeyDownSetNewpassword}
                    value={newpass1}
                    required
                    type='number'
                    pattern='[0-9]*'
                    title='Ten digits code'
                    placeholder='رمز عبور جدید'
                    className={style.loginInput}
                  />
                  <FiLock
                    style={{
                      position: 'relative',
                      right: '20px',
                      cursor: 'pointer',
                      color: '#6a7270',
                      marginTop: '5px',
                    }}
                    size={14}
                  />
                </div>
              </Grow>
            ) : null}

            <div className='d-flex justify-content-center mt-1'>
              {resendcode ? (
                <Grow in={resendcode} timeout={500}>
                  <p
                    onClick={resendCode}
                    className='text-center mt-2'
                    style={{
                      fontSize: '12px',
                      color: '#AE1010',
                      fontWeight: 'bold',
                    }}
                  >
                    ارسال مجدد کد
                  </p>
                </Grow>
              ) : null}

              {coundown ? (
                <Grow in={coundown} timeout={500}>
                  <p
                    className='text-center mt-2'
                    style={{
                      fontSize: '12px',
                      color: '#AE1010',
                      fontWeight: 'bold',
                    }}
                  >
                    {`${
                      seconds !== 0
                        ? ` کد تایید در  ${seconds} ثانیه  `
                        : ` ارسال مجدد کد تایید`
                    }`}
                  </p>
                </Grow>
              ) : null}
            </div>

            <div className='d-flex justify-content-center mt-1'>
              {btnsetpass ? (
                <Grow in={btnsetpass} timeout={500}>
                  <p
                    onClick={foregtpass}
                    className='text-center mt-2'
                    style={{
                      fontSize: '12px',
                      color: '#AE1010',
                      fontWeight: 'bold',
                    }}
                  >
                    فراموشی رمز
                  </p>
                </Grow>
              ) : null}
            </div>
          </div>

          <div style={{ marginTop: '50px' }}>
            <div className='d-flex ' style={{ justifyContent: 'center' }}>
              {btn ? (
                <Grow in={btn} timeout={500}>
                  <button onClick={sendMobile} className='mainBtn'>
                    {!loading ? 'ورود/ثبت نام' : <Loading />}
                  </button>
                </Grow>
              ) : null}

              {btnRegister ? (
                <Grow in={btnRegister} timeout={500}>
                  <button onClick={sendCode} className='mainBtn'>
                    {!loading ? 'ورود/ثبت نام' : <Loading />}
                  </button>
                </Grow>
              ) : null}

              {btnLogin ? (
                <Grow in={btnLogin} timeout={500}>
                  <button onClick={sendPass} className='mainBtn'>
                    {!loading ? 'ورود/ثبت نام' : <Loading />}
                  </button>
                </Grow>
              ) : null}

              {btncode1 ? (
                <Grow in={btncode1} timeout={500}>
                  <button onClick={sendCode1} className='mainBtn'>
                    {!loading ? 'ورود/ثبت نام' : <Loading />}
                  </button>
                </Grow>
              ) : null}

              {btnnewpass ? (
                <Grow in={btnnewpass} timeout={500}>
                  <button onClick={setNewpassword} className='mainBtn'>
                    {!loading ? 'ورود/ثبت نام' : <Loading />}
                  </button>
                </Grow>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <Grow in={registerShow} timeout={500}>
          <div>
            <Grow in={registerShow} timeout={700}>
              <div>
                <input
                  onChange={handleNameChange}
                  value={name}
                  required
                  pattern='[0-9]*'
                  type='text'
                  title='Ten digits code'
                  placeholder='نام'
                  className={style.loginInput}
                />
                <BiUser
                  style={{
                    position: 'relative',
                    right: '20px',
                    cursor: 'pointer',
                    color: '#6a7270',
                    marginTop: '5px',
                  }}
                  size={14}
                />
              </div>
            </Grow>
            <Grow in={registerShow} timeout={700}>
              <div>
                <input
                  onChange={handleLnameChange}
                  value={lastName}
                  required
                  pattern='[0-9]*'
                  type='text'
                  title='Ten digits code'
                  placeholder='نام خانوادگی'
                  className={style.loginInput}
                />
                <BiUser
                  style={{
                    position: 'relative',
                    right: '20px',
                    cursor: 'pointer',
                    color: '#6a7270',
                    marginTop: '5px',
                  }}
                  size={14}
                />
              </div>
            </Grow>
            <Grow in={registerShow} timeout={700}>
              <div>
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  required
                  pattern='[0-9]*'
                  type='text'
                  title='Ten digits code'
                  placeholder='رمز عبور'
                  className={style.loginInput}
                />
                <FiLock
                  style={{
                    position: 'relative',
                    right: '20px',
                    cursor: 'pointer',
                    color: '#6a7270',
                    marginTop: '5px',
                  }}
                  size={14}
                />
              </div>
            </Grow>
            <Grow in={registerShow} timeout={700}>
              <div>
                <Select
                  isRtl={true}
                  className={style.loginInputSelect}
                  placeholder={<div>نحوه آشنایی با ما</div>}
                  onChange={(e) => {
                    setTip(e.value)
                  }}
                  styles={colourStyles}
                  options={options}
                ></Select>
              </div>
            </Grow>

            <div
              className='d-flex '
              style={{ justifyContent: 'center', marginTop: '20px' }}
            >
              <Grow in={registerShow} timeout={500}>
                <button onClick={Register} className='mainBtn'>
                  {!loading ? 'ورود/ثبت نام' : <Loading />}
                </button>
              </Grow>
            </div>
          </div>
        </Grow>
      )}
    </>
  )
}

export default LoginForm
