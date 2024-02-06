import type { CityData } from '@/types'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cities } from '@/lib'

const cityList = <CityData[]>cities
const NUM_SUGGESTIONS = 5

function searchCities(value: string) {
  const matchingCities = cityList
    .filter(({ name }) => name.toLowerCase().startsWith(value.toLowerCase()))
    .slice(0, NUM_SUGGESTIONS)

  return matchingCities
}

export function handler() {}
