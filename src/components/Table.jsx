import React from 'react'
import { useState } from 'react'

export default function ({head,data}) {
    const [value,setValue] = useState("")
    const [filteredData,setFilteredData] = useState(data)
    const handleSearch = (e)=> {
        const debounce = setTimeout(()=> {
            clearTimeout(debounce)
            setFilteredData((prev) => {
            return prev.filter(product => product.name.toLowerCase().includes(value.trim().toLowerCase()))
        })
        },500)
        
    }
    return (
        <div>
            <div>
                <input type="text" value={value} onChange={(e)=> {setValue(e.target.value)}}/>
                <button onClick={handleSearch}>Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        {
                            head.map(h => <th>{h}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map(d => {
                            return (
                                <tr>
                                    {
                                        Object.keys(d).map(k => <td>{d[k]}</td>)
                                    }
                                    {/* head.map(<td>d[]</td>) */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}