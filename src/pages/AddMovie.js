import React, { useContext, useState } from 'react'
import {TailSpin} from 'react-loader-spinner'
import { addDoc } from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'


function AddMovie() {
  const useAppState = useContext(AppState)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rated: 0,
    rating: 0
  })

  const [loading, setLoading] = useState(false)

  const addMovie = async () => {
    if((form.title && form.image && form.year && form.description) === ""){
      swal({
        title:"Fileds can't be empty! server ke paise padte hain",
        icon: "error",
        timer: 3000,
        buttons: false
      })
    }
    else {
    setLoading(true)
    if(useAppState.login) {
    await addDoc(moviesRef, form)
    swal({
      title: "Successfully added",
      icon: "success",
      buttons: false,
      timer: 3000
    })
    setLoading(false)
    form.title = ""
    form.image = ""
    form.year = ""
    form.description = ""
  }
  else{
    navigate('/login')
  }
} 
}
  return (
    <div>
        <section class="text-gray-600 body-font relative">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-red-600">Add Movie</h1>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-md text-blue-600">Title</label>
            <input type="text" id="name" name="name" value={form.title} onChange={(e) => setForm({...form, title:e.target.value})} className="w-full bg-transparent bg-opacity-50 focus:border-yellow-500 text-base outline-none text-white border-b-2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="year" class="leading-7 text-md text-blue-600">Year</label>
            <input type="number" id="year" name="year" value={form.year} onChange={(e) => setForm({...form, year:e.target.value})} class="w-full bg-transparent border-b-2 focus:border-yellow-500 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="year" class="leading-7 text-md text-blue-600">Image Link</label>
            <input type="text" id="year" name="year" value={form.image} onChange={(e) => setForm({...form, image:e.target.value})} class="w-full bg-transparent border-b-2 focus:border-yellow-500 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-md text-blue-600">Description</label>
            <textarea id="message" name="message" value={form.description} onChange={(e) => setForm({...form, description:e.target.value})} class="w-full bg-transparent border border-gray-300 focus:border-yellow-500 h-32 text-base outline-none text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button onClick={addMovie} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
            {loading ? <TailSpin height={25} color="white"/> : 'Submit'}
            
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default AddMovie