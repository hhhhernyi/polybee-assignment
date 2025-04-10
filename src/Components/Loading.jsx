import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <p>Loading...</p>
    </div>

  )
}

export default Loading