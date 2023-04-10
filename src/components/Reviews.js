import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import swal from 'sweetalert'
import { reviewsRef, db } from '../firebase/firebase'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'

function Reviews({id, prevRating, userRated}) {
  const useAppState = useContext(AppState)
  const navigate = useNavigate()

  const [newAdded, setNewAdded] = useState(0)
  const [rating, setRating] = useState(0)
  const [form, setForm] = useState("")
  const [loading, setLoading] = useState(false)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [data, setData] = useState([])

  const sendReview = async () => {
    setLoading(true)
    try {
      if(useAppState.login) {
      await addDoc(reviewsRef, {
        movieid: id,
        name: useAppState.username,
        rating: rating,
        thought: form,
        timestamp: new Date().getTime()
      })

      const ref = doc(db, "movies", id)
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1
      })
      setRating(0)
      setForm("")
      setNewAdded(newAdded + 1)
      swal({
        title: "Review Sent",
        icon: "success",
        buttons: "OK",
        timer: 3000
      })
    }
    else{
      navigate('/login')
    }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: "OK",
        timer: 3000
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    async function getData() {
      setReviewLoading(true)
      setData([])
      let quer = query(reviewsRef, where('movieid', '==', id))
      const querySnapshot = await getDocs(quer)
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()])
      })
      setReviewLoading(false)
    }
    getData()
  },[newAdded])
  return (
    <div className='w-full mt-4 border-t-2 border-gray-800'>
      <div className='h-64'>
        <ReactStars 
        size={35}
        value={rating}
        edit={true}
        half={true}
        onChange={(rate) => {setRating(rate)}}
        />
        <input value={form} onChange={(e) => setForm(e.target.value)} placeholder='Share your views...' className='w-full outline-none bg-gray-800 p-3' />
        <button onClick={sendReview} className='bg-green-600 p-2 pl-3 pr-3 mt-1 float-right hover:bg-green-700'>{loading? <TailSpin height={20} color="white"/> : "Share"}</button>
        </div>
        {
          reviewLoading ? <div className='flex justify-center mt-40'> <ThreeDots height={10} color="white"/></div> :
          <div className='h-96 overflow-y-auto overflow-x-hidden customscroll'>
            {
              data.map((e,i) => {
                return (
                  <div key={i} className='mb-10 bg-neutral-900 ml-5'>
                    <div className='flex items-center'>
                    <p className='text-blue-600 ml-2'>{e.name}</p>
                    
                    <p className='ml-3 text-xs'>{new Date(e.timestamp).toLocaleString()}</p>
                    </div>
                    <ReactStars 
                      size={20}
                      value={e.rating}
                      edit={false}
                      half={true}
                    />
                    <p>{e.thought}</p>
                  </div>
                )
              })
            }
          </div>
        }
    </div>
  )
}

export default Reviews