import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import app, { usersRef } from '../firebase/firebase'
import swal from 'sweetalert'
import { addDoc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'
import { TailSpin } from 'react-loader-spinner'
const auth = getAuth(app)
function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [OTP, setOTP] = useState("")
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: ""
    })

    // generating recaptcha
    const generateRecaptcha = () => {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size' : 'invisible',
        'callback' : (response) => {

        }
      }, auth)
    }

    const verifyOTP = () => {
      try {
        setLoading(true)
        window.confirmationResult.confirm(OTP).then((result) => {
          uploadData();
          swal({
            text: "Successfully Registered",
            icon: "success",
            buttons: "OK",
            timer: 3000
          })
          navigate('/login')
          setLoading(false)
        })
      } catch (error) {
        setLoading(false)
        swal({
          text: "Error",
          icon: "error",
          buttons: "OK",
          timer: 3000
        })
      }
    }

    const uploadData = async () => {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(form.password, salt)
      await addDoc(usersRef, {
        name: form.name,
        mobile: form.mobile,
        password: hash
      })
    }
    const requestOTP = () => {
      setLoading(true)
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier).then(confirmationResult =>{
        window.confirmationResult = confirmationResult
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: "OK",
          timer: 3000
        })
        setOtpSent(true)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        swal({
          text: "Error Occured",
          icon: "error",
          buttons: "OK",
          timer: 3000
        })
      })
    }
  return (
    <>
    {
      otpSent ? 
      <div className='flex justify-center items-center flex-col h-screen'>
      <div className='flex justify-center items-center'>
      {/* Otp Input */}
      <div class="relative mb-6" data-te-input-wrapper-init>
            <input
                onChange={(e) => setOTP(e.target.value)}
                value={OTP}
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200" />
            <label
              for="exampleFormControlInput2"
              class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Enter OTP
            </label>
      </div>
      <div class="text-center lg:text-left">
            <button
              onClick={verifyOTP}
              type="button"
              class="inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              {loading ? <TailSpin height={20} width={55}/> : "Confirm OTP"}
            </button>
      </div>
      </div>
      <div>
            <p class="mt-4 mb-0 pt-1 text-sm font-semibold">
              Didn't get OTP?
             <Link to={'/login'}><span
                className=" text-blue-500 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >  Resend</span></Link>
            </p>
          </div>
      </div>
      :
    <div className=''>
      
      <h2 className='flex justify-center mt-5 font-medium text-2xl'>SIGN UP</h2>
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
        {/* Name Input */}
        <div class="relative mb-6" data-te-input-wrapper-init>
            <input
                onChange={(e) => setForm({...form, name: e.target.value})}
                value={form.name}
              type="text"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200" />
            <label
              for="exampleFormControlInput2"
              class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Enter your name
            </label>
          </div>

          {/* <!-- Mobile No. input --> */}
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
              type={'password'}
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

         
          <div class="text-center lg:text-left">
            <button
              onClick={requestOTP}
              type="button"
              class="inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              {loading ? <TailSpin height={20} width={55}/> : 'Get OTP'}
            </button>
            </div>
            
            <div>
            <p class="mt-4 mb-0 pt-1 text-sm font-semibold">
              Already Have an Account?
             <Link to={'/login'}><span
                className=" text-blue-500 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                > Sign In</span></Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    
    </div>
}
    <div id='recaptcha-container'>

    </div>
    </>
  )
}

export default Signup