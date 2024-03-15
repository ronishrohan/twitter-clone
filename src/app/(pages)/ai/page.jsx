"use client"
import axios from 'axios'
import React, {useState, useRef} from 'react'

const AiPage = () => {
  const [content, setContent] = useState("test")
  const query = useRef(null)
  async function generatePost(){
    const res = await axios.post("/api/generate", {query: query.current.value})
    console.log(res.data)
    if(res.data.response){
      setContent(res.data.response)
    }
  }
  return (
    <main className="size-full flex flex-col p-4 justify-center items-center">
      <input ref={query} placeholder="Let ai write posts for you" type="text" className="outline-none bg-grays-200 p-4 rounded-2xl w-3/4 text-white font-semibold" />
      <button onClick={() => generatePost()} className="bg-accent-900 p-4 rounded-2xl">generate</button>
      {true && <div className="max-h-72 overflow-x-hidden overflow-y-scroll">{content}</div>}
    
    </main>
  )
}

export default AiPage