import React from 'react'

const Alert = ({children}) => {
  return (
    <div className='bg-red-400 py-2 px-3 text-center my-2 rounded-md text-white'>
      {children}
    </div>
  )
}

export default Alert
