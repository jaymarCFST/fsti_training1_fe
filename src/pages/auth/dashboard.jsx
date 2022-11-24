import React, { useState } from 'react'
import Users from './components/users'
import * as APIServices from './api-services'
import { useNavigate } from 'react-router-dom'
import Categories from './components/categories/categories'
import Articles from './components/articles/articles'

const Dashboard = () => {

  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState('users');

  async function logout()
  {
    await APIServices.logout().then(
      (res) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    )
  }
  return (
    <div className="grid grid-cols-5">
        <div className='flex flex-col col-span-2 lg:col-span-1 items-start text-white px-5 bg-blue-500 lg:px-10 py-10 space-y-2 h-screen'>
            <span className="text-lg font-medium cursor-pointer" onClick={()=>setSelectedMenu('users')}>Users</span>
            <span className="text-lg font-medium cursor-pointer" onClick={()=>setSelectedMenu('articles')}>Articles</span>
            <span className="text-lg font-medium cursor-pointer" onClick={()=>setSelectedMenu('categories')}>Categories</span>
            <span className="text-lg font-medium cursor-pointer" onClick={logout}>Logout</span>
        </div>
        {
          selectedMenu === 'users' &&
          <div className="col-span-4">
              <Users />
          </div>
        }
        {
          selectedMenu === 'categories' &&
          <div className="col-span-4">
              <Categories />
          </div>
        }
        {
          selectedMenu === 'articles' &&
          <div className="col-span-4">
              <Articles />
          </div>
        }
    </div>
  )
}

export default Dashboard