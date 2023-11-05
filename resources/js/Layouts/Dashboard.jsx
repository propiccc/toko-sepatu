import React, { useEffect, useState, Suspense } from 'react'
import { FaRegSun, FaUserAlt, FaUsers } from 'react-icons/fa'
import { BsImages, BsInstagram, BsFillDiagram3Fill } from 'react-icons/bs'
import { BiNews, BiNotepad } from 'react-icons/bi'
import { GiHamburgerMenu} from 'react-icons/gi'

import Menu from './../Components/Menu';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'


function ResPonsiveMenu({toggle, setToggle}){
  return( <div className={`bg-[#00092b] absolute w-full z-20 flex flex-col overflow-auto transition-all duration-300`}>
  <div className="h-full overflow-y-auto p-2 py-1 scrollbar-none flex flex-col lg:hidden  max-h-fit bg-[#00092b]">
    <Menu setToggle={setToggle} toggle={toggle} href='/system/user' name="User" icon={<FaUserAlt className={`w-[27px] h-[37px] ${"/system/user" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/user" == window.location.pathname ? 'text-black' : "text-white"}`} />
    {/* <Menu setToggle={setToggle} toggle={toggle} href='/system/slider' name="Slider" icon={<BsImages className={`w-[27px] h-[37px] ${"/system/slider" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/slider" == window.location.pathname ? 'text-black' : "text-white"}`} />
    <Menu setToggle={setToggle} toggle={toggle} href='/system/divisi' name="Divisi" icon={<BsFillDiagram3Fill className={`w-[27px] h-[37px] ${"/system/divisi" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/divisi" == window.location.pathname ? 'text-black' : "text-white"}`} />
    <Menu setToggle={setToggle} toggle={toggle} href='/system/news' name="News" icon={<BiNews className={`w-[27px] h-[37px] ${"/system/news" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/news" == window.location.pathname ? 'text-black' : "text-white"}`} />
    <Menu setToggle={setToggle} toggle={toggle} href='/system/content' name="Content" icon={<BiNotepad className={`w-[27px] h-[37px] ${"/system/content" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/content" == window.location.pathname ? 'text-black' : "text-white"}`} />
    <Menu setToggle={setToggle} toggle={toggle} href='/system/jabatan' name="Jabatan" icon={<FaUsers className={`w-[27px] h-[37px] ${"/system/jabatan" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/jabatan" == window.location.pathname ? 'text-black' : "text-white"}`} />
    <Menu setToggle={setToggle} toggle={toggle} href='/system/instagram' name="Instagram" icon={<BsInstagram className={`w-[27px] h-[37px] ${"/system/instagram" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/instagram" == window.location.pathname ? 'text-black' : "text-white"}`} />
    <Menu setToggle={setToggle} toggle={toggle} href='/system/setting' name="Setting" icon={<FaRegSun className={`w-[27px] h-[37px] ${"/system/setting" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/setting" == window.location.pathname ? 'text-black' : "text-white"}`} /> */}
  </div>
</div>
)}


function Dashboard({ className }) {
  // * settup
  const navigate = useNavigate()
  const [Time, setTime] = useState(null)
  const [toggle, setToggle] = useState(true)

  // * Api Call
  const HandleLogout = () => {
    axios.post('/api/logout').then(res => {
      if (res.data.success === true) {
        localStorage.removeItem('access_token');
        setTimeout(() => {
          return navigate('/');
        }, 400);
        localStorage.removeItem('access_token');
      }
    }).catch(err => {
      setTimeout(() => {
        localStorage.removeItem('access_token');
        return navigate('/');
      }, 400);
    })
  }

  // * functions
  function DateKu() {
    var d = (new Date() + "").split(" ");
    return [d[2], d[1], d[3]].join(" ");
  }

  useEffect(() => {
    const test = setInterval(() => {
      var d = (new Date() + "").split(" ");
      setTime(d[4])
    }, 1000);
    return (() => clearInterval(test))
  }, [])

  return (
    <>
      {/* Navabr Start */}
      <div className="bg-[#00092b] w-full flex h-24 justify-between text-white border-b-2 border-gray-200 px-1">
        <div className="w-full flex items-center justify-start h-[80px]">
          {/* <img className='h-[80px] w-fit text-white' src="/storage/asset/LogoDashboard.png"/> */}
        </div>
        <div className="flex items-center w-full justify-center">
          <div className="bg-white bg-opacity-5 text-white text-sm px-3 py-2 md:px-10 md:py-2 lg:px-10 lg:py-2 xl:px-10 xl:py-2 rounded-lg">
            {DateKu()}  {Time}
          </div>
        </div>
        {/* <div className="flex justify-center items-center text-lg font-semibold ml-4">{header}</div> */}
        <div className="hidden justify-end items-center mr-2 w-full gap-x-2 font-semibold  xl:flex">
          <NavLink to='/' className=' text-sm sm:text-sm md:text-md py-2 px-4 transition-color duration-300 rounded-lg hover:bg-gray-100 hover:bg-opacity-10'>Home</NavLink>
          <button onClick={HandleLogout} className='py-2 px-4 transition-color duration-300 rounded-lg hover:bg-gray-100 hover:bg-opacity-10'>Logout</button>
        </div>
        <div className="h-full w-full flex justify-end items-center lg:hidden">
        <GiHamburgerMenu className='scale-125 text-white cursor-pointer mr-2' onClick={() => {setToggle(e => !e)}}/>
        </div>
      </div>
      {/* Navabr end */}
      <div className="flex w-full bg-gray-300 h-[calc(100vh-96px)] flex-col lg:flex-row" >
        <div className={`bg-[#00092b] ${toggle ? 'w-80' : 'w-16'} hidden flex-col overflow-auto transition-all duration-300 lg:flex`}>
        <div className={`flex p-4  ${toggle ? 'justify-end' : 'justify-center'} transition-all duration-300`}>
          <GiHamburgerMenu className='scale-125 text-white cursor-pointer' onClick={() => {setToggle(e => !e)}}/>
        </div>
          <div className="h-full overflow-y-auto p-2 py-1 scrollbar-none max-h-fit bg-[#00092b]">
            <Menu toggle={toggle} href='/system/user' name="User" icon={<FaUserAlt className={`w-[27px] h-[37px] ${"/system/user" == window.location.pathname ? 'text-black' : "text-white"}`} />} className={`w-[27px] h-[37px] ${"/system/user" == window.location.pathname ? 'text-black' : "text-white"}`} />
          </div>
        </div>
        {/* Responsive Menu Start*/}
        {toggle ? (<ResPonsiveMenu toggle={toggle} setToggle={setToggle}/>) : null}
        {/* Responsive Menu ENd*/}
        <div className="w-full overflow-y-auto scrollbar-none">
          {/* Componenet start */}
          <div className={`bg-gray-300 h-[calc(100vh-96px)]  ${className} px-2 py-5  lg:py-10 lg:px-24 transition-all duration-500 overflow-y-scroll scrollbar-none`}>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
          {/* Componenet end */}
        </div>
      </div>
    </>
  )
}

function Loading() {
  return (<>
    <div className="flex p-40 bg-white rounded-lg shadow-lg justify-center">
      <span className='text-lg text-center'>Loading...</span>
    </div>
  </>)
}

export default Dashboard
