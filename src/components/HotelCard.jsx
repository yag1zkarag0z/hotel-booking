import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index = 0 }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(15,23,42,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.16)]"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={room.images[0]}
          alt={`${room.hotel.name} - ${room.roomType}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {index % 2 === 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
            Best Seller
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-playfair text-xl font-semibold text-slate-900">
              {room.hotel.name}
            </p>
            <p className="mt-1 text-sm text-slate-500">{room.roomType}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-slate-800">
            <img className="h-4 w-4" src={assets.starIconFilled} alt="" />
            4.5
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <img className="h-4 w-4" src={assets.locationIcon} alt="" />
          <span className="truncate">{room.hotel.address}</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">Per night</p>
          <p className="text-2xl font-semibold text-slate-900">
            ${room.pricePerNight}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
