import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../page/auth/login'
import Register from '../page/auth/register'
import Home from '../page/home';
import ProtectPage from './protectPage';

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
            path='/auth/login'
            element={<Login />}
        >            
        </Route>
        <Route 
            path='/auth/register'
            element={<Register />}
        >            
        </Route> 
        <Route 
            path='/' 
            element={
              <ProtectPage>
                <Home />
              </ProtectPage>
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router