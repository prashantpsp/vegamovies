import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Dna } from 'react-loader-spinner'
import Reviews from '../components/Reviews'

function Detail() {
  const {id} = useParams();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0
  })

  useEffect(() => {
    
    async function getData(){
      setLoading(true)
      const _doc = doc(db, "movies", id)
      const _data = await getDoc(_doc)
      setData(_data.data())
      setLoading(false)
    }
    getData()
    
  },[])

  return (<>
  {loading ? <div className='w-full min-h-screen flex justify-center items-center'>
                <Dna visible={true}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
              </div> :
              
    <div className='flex flex-col md:flex-row items-center md:items-start justify-center p-4 m-4'>
        <div>
            <img className='h-96 ' src={data.image} alt="" />
        </div>
        <div className='md:w-1/2 ml-4 w-full mt-5'>
            <span className='text-4xl font-bold text-gray-500'>{data.title}<span className='text-2xl'>({data.year})</span></span>
            <ReactStars size={20} half={true} edit={false} value={data.rating/data.rated}/>    
            <p className='mt-4 text-gray-300'>{data.description}</p>

            <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
        </div>

    </div>
}
    </>
  )
}

export default Detail