import React, { useState, useEffect } from 'react';
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import SidebarComp from "./Sidebar";
import { RiAdminFill } from "react-icons/ri";
// import HeaderDash from "../components/HeaderDash";

export const Layout = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
 
  const navigate = useNavigate()
 
  useEffect(() => {
     refreshToken();
  }, []);
 
  const refreshToken = async() => {
     try {
       const response = await axios.get('http://localhost:5000/token');
       setToken(response.data.accessToken);
       const decoded = jwtDecode(response.data.accessToken)
       setName(decoded.name);
       setExpire(decoded.exp)
     } catch (error) {
       if(error.response){
         navigate('/login')
       }
     }
  }
 
  const axiosJWT = axios.create();
 
  axiosJWT.interceptors.request.use(async(config) => {
   const currentDate = new Date()
   if(expire * 1000 < currentDate.getTime()){
     const response = await axios.get('http://localhost:5000/token')
     config.headers.Authorization = `Bearer ${response.data.accessToken}`
     setToken(response.data.accessToken)
     const decoded = jwtDecode(response.data.accessToken)
     setName(decoded.name);
     setExpire(decoded.exp)
   }
   return config;
  }, (error) => {
   return Promise.reject(error);
  })
 
  //get All USER
  // const getUsers = async() => {
  //  const response = await axiosJWT.get('http://localhost:5000/users', {
  //    headers: {
  //      Authorization: `Bearer ${token}`
  //    }
  //  });
  //  console.log(response.data)
  // }
 
  const Logout = async() => {
   try {
     await axios.delete('http://localhost:5000/logout')
     navigate('/login')
   } catch (error) {
     console.log(error);
   }
  }

  return (
    <>
      <div className="flex flex-row bg-neutral-100 h-screen w-screen">
        <SidebarComp />
        <div className="flex-1 overflow-auto">
          <div className="p-4">
          <div className="navbar bg-white border border-gray-400 rounded-lg">
      <div className="flex justify-center items-center flex-1">
        <h3 className="hover:no-underline text-stone-900 text-wrap text-center font-semibold text-xl cursor-default">
          Digital Arsip BMKG Banyuwangi
        </h3>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
                <RiAdminFill size="2.5rem" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60"
          >
            <li className='flex justify-center items-center'>Halo, {name}</li>
            <li>
              <a className="hover:no-underline text-neutral-950 flex justify-center" onClick={Logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
          </div>
          <div className="p-4">{<Outlet />}</div>
        </div>
      </div>
    </>
  );
};
