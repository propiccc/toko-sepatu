import React from 'react'
import { MdCancel } from 'react-icons/md'

function Cancel({ onClick }) {
  return (
    <button className='flex items-center hover:bg-red-600 hover:text-white bg-red-200 text-red-700 transition-all duration-200 py-[6px] justify-center w-[100px] cursor-pointer rounded-md active:scale-95' onClick={onClick}>
      <div className="h-full flex justify-center items-center">
        <MdCancel />
        <span className='font-semibold text-md px-1'>Cancel</span>
      </div>
    </button>
  )
}

export default Cancel
