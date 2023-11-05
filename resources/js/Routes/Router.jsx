import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// ? components
import Dashboard from '../Layouts/Dashboard'
import Login from '../pages/Auth/Login';
import NotFound from '../pages/Auth/NotFound';
import PrivateRoute from '../util/PrivateRoute';
import Guest from '../util/Guest';
import Home from '../pages/View/Home/Home'

// ? lazy component
const UserIndex = lazy(() => import('../pages/System/User/Index'));
function Router() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route element={<Guest />}>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path="/system" element={<PrivateRoute />}>
          <Route element={<Dashboard />}>
            <Route path='user' element={<UserIndex />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
export default Router