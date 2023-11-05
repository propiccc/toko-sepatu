import React, { useState, useEffect } from 'react'
import Add from '../../../Components/Button/Add';
import Form from './Form';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import Delete from '../../../Components/Button/Delete';
import Swal from 'sweetalert2';
import Edit from '../../../Components/Button/Edit';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineNavigateNext, MdNavigateBefore } from 'react-icons/md'

function DateKu() {
  var d = (new Date() + "").split(" ");
  return [d[2], d[1], d[3]].join(" ");
}

function Index() {

  const [type, setType] = useState('create')
  const [toggle, setToggle] = useState(false)
  const [block, setBlock] = useState(true)
  const [User, setUser] = useState([])
  const [page, setPage] = useState(1)
  const [DataEdit, setDataEdit] = useState([])
  const [Paginate, setPagiante] = useState({
    search: "",
    tampilkan: ""
  })

  // * Api Call & Request
  const SwitchPage = (url, page) => {
    setBlock(true)
    axios.post(url + page, Paginate).then(res => {
      setUser(res.data);
    }).catch(error => {
      setUser([]);
      console.log(error);
    }).finally(
      setTimeout(() => {
        setBlock(false)
      }, 600)
    );
  }

  const GetUser = (uuid) => {
    setToggle(false)
    var url = `/api/user/${uuid}/edit`
    axios.post(url).then(res => {
      setType('update');
      setDataEdit(res.data.data)
      setToggle(true)
    }).catch(error => {
      toast.error(error.response.data.message);
    })
  }

  // * function
  const HandleDelete = (uuid) => {
    var url = `/api/user/${uuid}/delete`
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Please Wait !',
          html: 'Loading...',// add html attribute if you want or remove
          allowOutsideClick: false,
          showConfirmButton: false
        });
        axios.delete(url).then(res => {
          if (res.data.success === true) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            SwitchPage('/api/user?page=', page)
          }
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Data Failed To Delete!',
            text: 'Something went wrong!',
          })
        });
      }
    })
  }

  const HandleSwitchPage = (type) => {
    switch (type) {
      case "next":
        setPage(e => e + 1)
        break;
      case "prev":
        setPage(e => e - 1)
        break;
    }
  }

  const HandleCancel = () => {
    setToggle(false)
    setDataEdit([]);
  }

  const HandleToggle = () => {
    setType('create')
    setToggle(e => !e)
  }

  const HandleClose = () => {
    setDataEdit([]);
    setToggle(false)
    setTimeout(() => {
      SwitchPage('/api/user?page=', page)
    }, 400);
  }

  // * Debonce Search && Paginate && Show
  useEffect(() => {
    const debounce = setTimeout(() => {
      SwitchPage('/api/user?page=', page)
    }, 700);
    return () => clearTimeout(debounce)
  }, [Paginate, page])

  return (
    <>
    
      <Toaster />
      {toggle ? (<Form cancle={HandleCancel} DataEdit={DataEdit} type={type} close={HandleClose} />) : null}
      <div className="bg-white rounded-lg p-6 shadow-lg transition-all duration-1000">
        <div className="flex justify-between items-center">
          <span className='font-semibold text-xl'>User Data</span>
          <Add onClick={HandleToggle} />
        </div>
        <div className="h-[2px] w-full bg-gray-300 my-3"></div>
        <div className="flex justify-between items-center mb-4">
          <input type="number" className='p-2 border-[1px] border-gray-400 rounded-md w-[80px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' value={Paginate.tampilkan} onChange={(e) => setPagiante({ ...Paginate, tampilkan: e.target.value })} />
          <input type="text" className='p-2 border-[1px] border-gray-400 rounded-md' placeholder='Search' value={Paginate.search} onChange={(e) => setPagiante({ ...Paginate, search: e.target.value })} />
        </div>
        <div className="overflow-y-auto">
          <table className='w-full'>
            <thead className='h-10 bg-gray-300 rounded-lg text-start'>
              <tr className='rounded-lg'>
                <th className='text-start px-2'>No.</th>
                <th className='text-start'>Name</th>
                <th className='text-start'>Email</th>
                <th className='text-start'>Tgl Dibuat</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody className=''>
              {block ? (<Loading colSpan={5} />) :
                (User?.data?.map((item, index) => (
                  <tr className={`${index % 2 ? 'bg-gray-100' : 'bg-white'} h-14 hover:bg-gray-200`} key={item.id}>
                    <td className='text-start px-2 font-semibold'>{index + User.from}</td>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{DateKu(item.created_at)}</td>
                    <td>
                      <div className="flex justify-center gap-x-1">
                        <Edit onClick={() => { GetUser(item.uuid) }} />
                        <Delete onClick={() => { HandleDelete(item.uuid) }} />
                      </div>
                    </td>
                  </tr>)
                ))
              }
              {User?.data?.length == 0 && !block ? (
                <tr className='bg-gray-200 h-14'>
                  <td colSpan={5} className='font-semibold'><span className='ml-1'>Not Found</span></td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <div className="flex justify-between mt-2">
            <span className='font-semibold'>Page {User.current_page ?? null} of {User?.last_page ?? null}</span>
            <div className="flex">
              {page != 1 ? (
                <button className='bg-blue-600 p-1 rounded-md active:scale-95 transition-transform duration-200' onClick={() => HandleSwitchPage('prev')} readOnly><MdNavigateBefore className='text-white' /></button>
              ) : null}

              <input disabled type="number" className='h-8 w-8 max-w-fit rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-black border-[2px] p-1 mx-1 active:scale-10' value={page} />
              {page != User?.last_page ? (
                <button className='bg-blue-600 p-1 rounded-md active:scale-95 transition-transform duration-200' onClick={() => HandleSwitchPage('next')}><MdOutlineNavigateNext className='text-white' /></button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Index
