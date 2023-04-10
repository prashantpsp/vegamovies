import { query, where, getDocs } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { usersRef } from '../firebase/firebase'
import bcrypt from 'bcryptjs'
import { AppState } from '../App'
import { TailSpin } from 'react-loader-spinner'

function Login() {
  const usesAppState = useContext(AppState)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    })

    const login = async () => {
      setLoading(true)
      try {
        const quer = query(usersRef, where("mobile", "==", form.mobile))
        const querySnapshot = await getDocs(quer)

        querySnapshot.forEach((doc) => {
          const _data = doc.data()
          const isUser = bcrypt.compareSync(form.password, _data.password)

          if(isUser) {
            usesAppState.setLogin(true)
            usesAppState.setUsername(_data.name)
            swal({
              text: "Logged In",
              icon: "success",
              buttons: "OK",
              timer: 3000
            })
            navigate('/')
          } else {
            swal({
              text: "Invalid Credentials",
              icon: "error",
              timer: 3000
            })
          }
        })
      } catch (error) {
        swal({
          text: "Some error! occured",
          icon: "error",
          timer: 3000
        })
      }
      setLoading(false)
    }
  return (
    <div className=''>
        <section class="h-screen">
        <div class="h-full">
    <div
      class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="" />
      </div>
      <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <form>
        
          {/* <!-- Email input --> */}
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
                onChange={(e) => setForm({...form, mobile: e.target.value})}
                value={form.mobile}
              type="number"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200" />
            <label
              for="exampleFormControlInput2"
              class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Mobile No.
            </label>
          </div>

          {/* <!-- Password input --> */}
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput22"
              placeholder="Password" />
            <label
              for="exampleFormControlInput22"
              class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Password
            </label>
          </div>

          <div class="mb-6 flex items-center justify-between">
            
            <a href="#!">Forgot password?</a>
          </div>

          <div class="text-center lg:text-left">
            <button
            onClick={login}
              type="button"
              class="inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              {loading ? <TailSpin/> : "Login"}
            </button>
            <p class="mt-4 mb-0 pt-1 text-sm font-semibold">
              Don't have an account?
             <Link to={'/signup'}><span
                className=" text-blue-500 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                > Register</span></Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Login