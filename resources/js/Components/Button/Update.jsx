import React from 'react'
import { GoPlus } from 'react-icons/go'
function Update({ onClick }) {
  return (
    <>
      <button className='flex items-center bg-green-500 text-white hover:bg-green-300 hover:text-green-700 transition-all duration-200 py-2 justify-center w-[100px] cursor-pointer rounded-md active:scale-95' onClick={onClick}>
        <div className="h-full flex justify-center items-center">
          <span className='font-semibold text-lg px-1'>Update</span>
        </div>
      </button>
    </>
  )
}

export default Update
