"use client"

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';


export default function Page() {

    const {data: session, status} = useSession()

    let [postdata, setData] = useState({})
    const queryClient = useQueryClient()
    let router = useRouter()



    const {mutate: handleSubmit} = useMutation({
        
        mutationFn: async() => await axios.post("api/createPost", {data: {
            ...postdata,
            userId: session.id}}),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
            router.push("/posts")
        },
        
    })
    
    function handleChange(event){
        
        setData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
        
    }
    

  return (
    <div>
        <form>
            <label className='form-label'>Enter Title</label>
            <input type='text' onChange={handleChange} name='title' className='form-control'/>
            <label className='form-label'>Enter thread</label>
            <input type='text' onChange={handleChange} name='categorieId' className='form-control'/>
            
            <textarea defaultValue="Enter Content" onChange={handleChange} name='content'></textarea>
            
            <button onClick={(e) => {
                e.preventDefault()
                handleSubmit()
            }} className='btn btn-dark'>New Post</button>            
            
        </form>
    </div>
  )
}
