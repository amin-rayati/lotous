import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { ProjectProvider } from '../context/ProjectProvider'
import { CookiesProvider } from 'react-cookie'
import { React, useEffect, useRef } from 'react'
function MyApp({ Component, pageProps }) {
  return (
    <ProjectProvider>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ProjectProvider>
  )
}

export default MyApp
