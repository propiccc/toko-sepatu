import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Menu({ href, name, icon, toggle, setToggle}) {
  return (
    <>
      <NavLink to={href} className={`hidden lg:flex ${href == window.location.pathname ? "bg-white text-black  h-12 flex font-semibold shadow-2xl" : "bg-[#00092b] text-gray-300 h-12 flex hover:scale-x-105"} transition-all duration-300 rounded-md`}>
        <div className="flex justify-center h-full w-32 p-1 text-white font-semibold">
          {icon}
        </div>
        {toggle ? (
          <div className={"w-full flex  text-center h-full items-center"}>{name}</div>
        ) : null}
      </NavLink>
      <NavLink onClick={() => setToggle(false)} to={href} className={`sm:flex lg:hidden ${href == window.location.pathname ? "bg-white text-black h-12 flex font-semibold shadow-2xl" : "bg-[#00092b] text-gray-300 h-12 flex hover:scale-x-105"} transition-all duration-300 rounded-md`}>
        <div className="flex justify-center h-full w-32 p-1 text-white font-semibold">
          {icon}
        </div>
        <div className={"w-full flex  text-center h-full items-center"}>{name}</div>
      </NavLink>
    </>
  )
}

export default Menu
