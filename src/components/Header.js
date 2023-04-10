import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppState } from '../App'

function Header() {
  const useAppState = useContext(AppState)
  return (
    <div className='sticky top-0 text-3xl font-bold p-3 border-b-2 border-b-gray-400 flex justify-between'>
        <Link to={'/'}><span><span className='text-red-600'>Vega</span>Movies</span></Link>
        {
          useAppState.login ?
        <Link to={'/addMovie'}>
        <div className='cursor-pointer'>
        <button><h4>Add</h4></button>
        </div>
        </Link>
        : 
        <Link to={'/login'}>
        <div className='cursor-pointer bg-green-500 w-20 h-10 flex items-center justify-center'>
        <button className='text-white text-sm'>Login</button>
        </div>
        </Link>
        }
    </div>
  )
}

export default Header