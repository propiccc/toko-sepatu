import React from 'react'
import { TbEdit } from 'react-icons/tb'
function Edit({ onClick }) {
  return (
    <>
      <button className='flex items-center bg-yellow-500 text-white hover:bg-yellow-300 hover:text-yellow-700 transition-all duration-200 py-2 px-3 justify-center cursor-pointer rounded-md active:scale-95' onClick={onClick}>
        <TbEdit className='w-[20px] h-[20px]' />
      </button>
    </>
  )
}

export default Edit