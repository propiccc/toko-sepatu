import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
function Delete({ onClick }) {
  return (
    <>
      <button className='flex items-center bg-red-500 text-white hover:bg-red-300 hover:text-red-700 transition-all duration-200 py-2 px-4 justify-center cursor-pointer rounded-md active:scale-95' onClick={onClick}>
        <BsFillTrashFill className='w-[15px] h-[15px]' />
      </button>
    </>
  )
}

export default Delete