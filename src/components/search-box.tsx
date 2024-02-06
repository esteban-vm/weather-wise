'use client'
import type { CityData } from '@/types'
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

interface CityResponse {
  cities: CityData[]
}

export default function SearchBox() {
  const [inputValue, setInputValue] = useState('')
  const [cities, setCities] = useState<CityData[]>([])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`/api/city/${inputValue}`)
        const { cities }: CityResponse = await response.json()
        setCities(cities)
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
      <form>
        <label>
          Search for local weather
          <input
            type='search'
            placeholder='City name'
            className='mb-3 block w-64 rounded-lg bg-gray-200 p-2'
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </label>
      </form>

      {inputValue.length >= MIN_CITY_CHARS && (
        <ul>
          {cities.map(({ id, name, state, country }) => (
            <li key={id}>
              <Link href={`/detail/city/${id}`}>
                {name} {state} ({country})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
