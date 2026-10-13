import React from 'react'
import {useState,useEffect} from 'react'
export default function Home() {
    const [data,setData] = useState()
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
    fetch("http://localhost:3001/movies")
    .then(res => res.json())
    .then(data => setData(data))
    .finally(()=> {setIsLoading(false)})
  },[])
  return (
    <div>
        <h2>My HomePage</h2>4
        {
             isLoading ? <h2>Loading...</h2> : <Table 
                    head={["ID","Name","Category","Price","Brand","Instock"]}
                    data={data}
                    />
        }
    </div>
  )
}
