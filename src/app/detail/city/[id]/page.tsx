import type { CityData, WeatherData } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
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
    weatherData: {
      main: { temp_max, temp_min },
      weather: [{ icon, description }],
    },
  } = await fetchCityDetail(id)

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <main className='mx-5 mt-5'>
      <h1>Weather Wise</h1>
      <Link href='/' className='text-sm'>
        &larr; Home
      </Link>
      <div className='py-5'>
        <div className='rounded bg-blue-500 p-4'>
          <div className='grid grid-cols-2'>
            <div>
              <h2 className='mb-4 text-2xl text-white'>
                {name} ({country})
              </h2>
              <span className='text-lg font-medium text-white'>{temp_max.toFixed(0)}&deg;C</span>&nbsp;
              <span className='text-sm text-gray-300'>{temp_min.toFixed(0)}&deg;C</span>
            </div>
            <div className='justify-self-end'>
              <Image src={iconUrl} alt='Weather Icon' width={50} height={50} />
              <div className='text-sm text-white'>{description}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
