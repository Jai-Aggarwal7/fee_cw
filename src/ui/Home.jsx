import { useEffect, useState } from 'react'
import Table from '../components/Table.jsx'

export default function Home() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Movie API returned ${res.status}`)
                }
                return res.json()
            })
            .then(movies => setData(movies))
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }, [])

  return (
    <div>
        <h2>My HomePage</h2>
        {
            isLoading
                ? <h2>Loading...</h2>
                : error
                    ? <p role="alert">Unable to load movies: {error}. Start the API at http://localhost:3000/movies.</p>
                    : <Table
                        head={["ID", "Title", "Genre", "Director", "Year", "Rating", "Plot"]}
                        data={data}
                    />
        }
    </div>
  )
}
