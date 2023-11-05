import React from 'react'
import { GoPlus } from 'react-icons/go'
function Create({ onClick }) {
  return (
    <>
      <button type='submit' className='flex items-center bg-blue-700 text-white hover:bg-blue-300 hover:text-blue-700 transition-all duration-200 py-2 justify-center w-[100px] cursor-pointer rounded-md active:scale-95' onClick={onClick}>
        <div className="h-full flex justify-center items-center">
          {/* <GoPlus/> */}
          <span className='font-semibold text-lg px-1'>Create</span>
        </div>
      </button>
    </>
  )
}

export default Create
