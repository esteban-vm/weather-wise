import type { CityData, WeatherData } from '@/types'
import Link from 'next/link'
import { cities } from '@/lib'

const cityList = cities as CityData[]

const fetchCityDetail = async (id: string) => {
  const cityData = cityList.find((city) => city.id.toString() === id)
  if (!cityData) throw new Error('City not found')
  const url = `${process.env.API_URL}?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
  const response = await fetch(url, { cache: 'no-store' })
  const weatherData: WeatherData = await response.json()
  return { cityData, weatherData }
}

export default async function Detail({ params: { id } }: { params: { id: string } }) {
  const {
    cityData: { name, country },
    weatherData: { main, weather },
  } = await fetchCityDetail(id)

  return (
    <main>
      <div className='container'>
        <Link href='/'>&larr; Home</Link>
        <h1>
          {name} ({country})
        </h1>
        <h2>
          {main.temp_max.toFixed(0)}&deg;C {main.temp_min.toFixed(0)}&deg;C
        </h2>
        <span>{weather[0].description}</span>
      </div>
    </main>
  )
}
