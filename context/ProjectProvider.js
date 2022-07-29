import React, { useContext, useState, useEffect } from 'react'

const ProjectContext = React.createContext()

export const ProjectProvider = ({ children }) => {
  const [userData, setUserData] = useState('')
  const [inTime, setInTime] = useState(new Date())
  const [duration, setDuration] = useState('1')
  const [tableName, setTableName] = useState('')
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export const useProjectContext = () => {
  return useContext(ProjectContext)
}
