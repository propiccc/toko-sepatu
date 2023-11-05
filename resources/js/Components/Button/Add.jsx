import React from 'react'
import { GoPlus } from 'react-icons/go'
function Add({ onClick }) {
  return (
    <>
      <button className='flex items-center bg-blue-700 text-white hover:bg-blue-200 hover:text-blue-700 transition-all duration-200 py-[5px] justify-center w-[90px] cursor-pointer rounded-md active:scale-95' onClick={onClick}>
        <div className="h-full flex justify-center items-center">
          <GoPlus />
          <span className='font-semibold text-lg px-1'>Add</span>
        </div>
      </button>
    </>
  )
}

export default Add
