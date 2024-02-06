export interface CityData {
  id: number
  name: string
  state: string
  country: string
  coord: {
    lon: number
    lat: number
  }
}

export interface CityResponse {
  cities: CityData[]
}
