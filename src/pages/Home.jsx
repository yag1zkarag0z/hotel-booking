import Hero from '../components/Hero'
import HotelCard from '../components/HotelCard'
import { roomsDummyData } from '../assets/assets'
import ExclusiveOffer from '../components/ExclusiveOffer'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'
const Home = () => {
  return (
    <>
      <Hero />
      <ExclusiveOffer />
      <section className="bg-slate-50 px-4 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">
              Featured stays
            </p>
            <h2 className="mt-2 font-playfair text-3xl font-semibold text-slate-900 md:text-4xl">
              Rooms picked for you
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roomsDummyData.map((room, index) => (
              <HotelCard key={room._id} room={room} index={index} />
            ))}
          </div>
        </div>
        
      </section>
      <Testimonials />
      <NewsLetter />
    </>
  )
}

export default Home
