'use client'
import type { CityData, CityResponse } from '@/types'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const MIN_CITY_CHARS = 3
let timeoutId: ReturnType<typeof setTimeout>

const debounce = (fn: () => void) => {
  return function (this: unknown) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this), 300)
  }
}

export default function SearchBox() {
  const [inputValue, setInputValue] = useState('')
  const [cities, setCities] = useState<CityData[]>([])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`/api/city/${inputValue}`)
        const data: CityResponse = await response.json()
        setCities(data.cities)
      } catch (error) {
        console.error(error)
      }
    }

    if (inputValue.length >= MIN_CITY_CHARS) {
      debounce(fetchCities)()
    }
  }, [inputValue])

  return (
    <>
      <label htmlFor='city_name'>Search for local weather</label>
      <input
        type='search'
        placeholder='City name'
        className='mb-3 block w-64 rounded-lg bg-gray-200 p-2'
        id='city_name'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      {inputValue.length >= MIN_CITY_CHARS && (
        <ul>
          {cities.map((city) => (
            <li key={city.id}>
              <Link href={`/detail/${city.id}`}>
                {city.name} {city.state} ({city.country})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
