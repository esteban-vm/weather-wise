export default function SearchBox() {
  return (
    <>
      <label htmlFor='city_name'>Search for local weather</label>
      <input
        type='search'
        placeholder='City name'
        className='mb-3 block w-64 rounded-lg bg-gray-200 p-2'
        id='city_name'
      />
    </>
  )
}
