import React, { useContext, useState, useEffect } from 'react'

const ProjectContext = React.createContext()

export const ProjectProvider = ({ children }) => {
  const [userData, setUserData] = useState('')
  const [inTime, setInTime] = useState(new Date())
  const [duration, setDuration] = useState('1')
  const [tableName, setTableName] = useState('')

  const [cart, setCart] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : {}
      : ''
  )
  const [totalCount, setTotalCount] = useState('')
  const count = []
  const [updateUi, setUpdateUi] = useState(true)

  const addToCart = (item, start, sans, price, type) => {
    setUpdateUi(false)
    let tmpCart = cart
    if (!tmpCart.hasOwnProperty(item.id.toString())) {
      tmpCart[item.id.toString()] = 0
    }

    tmpCart[item.id.toString()] = {
      table: item,
      start: start,
      sans: sans,
      price: price,
      type: type,
    }

    setCart(tmpCart)
    updateCart(item)
  }

  const removeFromCartTotaly = (item) => {
    setUpdateUi(false)
    let tmpCart = cart
    if (tmpCart.hasOwnProperty(item.id.toString())) {
      delete tmpCart[item.id.toString()]
    }
    setCart(tmpCart)
    updateCart(item)
  }
  const updateCart = (item) => {
    localStorage.setItem('cart', JSON.stringify(cart))
    setTimeout(() => setUpdateUi(true), 0)
    Object.keys(cart).map((index) => {
      count.push(cart[index]['amount'])
      setTotalCount(count.reduce((partial_sum, a) => partial_sum + a, 0))
    })
  }
  return (
    <ProjectContext.Provider
      value={{
        userData,
        setUserData,
        inTime,
        setInTime,
        duration,
        setDuration,
        tableName,
        setTableName,

        cart,
        setCart,
        addToCart,
        removeFromCartTotaly,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export const useProjectContext = () => {
  return useContext(ProjectContext)
}
