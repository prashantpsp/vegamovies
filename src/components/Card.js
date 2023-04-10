import React, { useEffect, useState } from 'react'
import { Dna } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { getDocs } from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import { Link } from 'react-router-dom'

function Card() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      const _data = await getDocs(moviesRef)
      _data.forEach((doc) => {
        setData((prev) => [...prev, {...(doc.data()), id: doc.id}])
      })
      setLoading(false)
    }
    getData()
  },[])

  return (
    <div className='flex flex-wrap justify-between p-3 mt-2 m-2'>
      {loading ? <div className='w-full min-h-screen flex justify-center items-center'>
                  <Dna
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                  </div> :
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}>
            <div key={i} className='card font-medium shadow-lg p-2 mt-3 hover:-translate-y-2 transition-all duration-300 '>
              <img src={e.image} alt="" className='h-72'/>
              <h1 className='mt-1'>{e.title}</h1>
              <h1>Rating: <ReactStars size={20} half={true} edit={false} value={e.rating/e.rated} /> 
              </h1>
              <h1>Year: {e.year}</h1>
            </div>
            </Link>
          )
        })
      }

    </div>
  )
}

export default Card