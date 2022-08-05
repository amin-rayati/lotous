import React from 'react'
import Link from 'next/link'

const ForceLogin = () => {
  return (
    <>
      <div className='div'>
        <div className='mainResponsive'>
          <div className='flex-column  py-5'>
            <div className=' my-3'>
              <div
                className='forceLoginBox'
                style={{ justifyContent: 'center' }}
              >
                <h6
                  style={{
                    fontWeight: 'bold ',
                    fontSize: '15px',
                    lineHeight: '30px',
                  }}
                >
                  برای دسترسی به این صفحه ابتدا باید در سایت ثبت نام کنید
                </h6>
                <Link href={`/welcome`}>
                  <button className='mainBtn'>ورود و ثبت نام</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForceLogin
