import { useMemo, useState } from 'react'

export default function Table({ head, data }) {
    const [value, setValue] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')

    const filteredData = useMemo(() => {
        const query = value.trim().toLowerCase()
        const filtered = data.filter(movie =>
            Object.values(movie).some(field =>
                String(field ?? '').toLowerCase().includes(query)
            )
        )

        return filtered.sort((first, second) => {
            const yearDifference = Number(first.year) - Number(second.year)
            return sortOrder === 'asc' ? yearDifference : -yearDifference
        })
    }, [data, sortOrder, value])

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    placeholder="Search movies"
                    aria-label="Search movies"
                />
                <button type="button" onClick={() => setValue('')}>Clear search</button>
            </div>
            <div>
                <button type="button" onClick={() => setSortOrder('asc')}>Year: Oldest first</button>
                <button type="button" onClick={() => setSortOrder('desc')}>Year: Newest first</button>
            </div>
            <table>
                <thead>
                    <tr>
                        {head.map(column => <th key={column}>{column}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((movie, index) => (
                        <tr key={movie.id ?? index}>
                            {Object.values(movie).map((field, fieldIndex) => (
                                <td key={`${movie.id ?? index}-${fieldIndex}`}>{field}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
