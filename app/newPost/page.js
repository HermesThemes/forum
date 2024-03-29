"use client"

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'
import MDEditor from '@uiw/react-md-editor';


export default function Page(params) {

    const {data: session, status} = useSession()

    let [postdata, setData] = useState()
    let [title, setTitle] = useState()
    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    let router = useRouter()

    let cat = searchParams.get('cat')



    const {mutate: handleSubmit, isPending} = useMutation({
        
        mutationFn: async() => await axios.post("api/createPost", {data: {
            title: title,
            content: postdata,
            userId: session.id,
            categorieId: cat}}),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
            router.back()
        },
        
    })
    
    
    

  return (
    <div className='container main me-4 mt-5 newPost'>
        <form>
            <label className='form-label mt-4'><h4><strong>Enter Title</strong></h4></label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} className='form-control mb-3'/>
            
            <MDEditor
                value={postdata}
                onChange={setData}
            />
            
            <button onClick={(e) => {
                e.preventDefault()
                handleSubmit()
            }} className='btn btn-dark my-3' disabled={isPending}>New Post</button>            
            
        </form>
    </div>
  )
}
