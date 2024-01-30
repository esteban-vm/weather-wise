import { SearchBox } from '@/components'

export default function Home() {
  return (
    <main className='mx-5 mt-5'>
      <h1 className='mb-4 text-xl font-medium'>Weather Wise</h1>
      <form>
        <SearchBox />
      </form>
    </main>
  )
}
