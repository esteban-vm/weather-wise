import type { CityData } from '@/types'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cities } from '@/lib'

const cityList = <CityData[]>cities
const NUM_SUGGESTIONS = 5

const searchCities = (value: string) => {
  const matchingCities = cityList
    .filter(({ name }) => name.toLowerCase().startsWith(value.toLowerCase()))
    .slice(0, NUM_SUGGESTIONS)

  return matchingCities
}

const handler = (_: NextRequest, { params: { name } }: { params: { name: string } }) => {
  const filteredCities = searchCities(name)
  return NextResponse.json(filteredCities)
}

export { handler as GET }
