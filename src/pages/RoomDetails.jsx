import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth, useClerk, useUser } from "@clerk/react";
import {
  roomsDummyData,
  assets,
  facilityIcons,
  roomCommonData,
} from "../assets/assets";
import StarRating from "../components/StarRating";
import {
  addDays,
  getNightCount,
  getToday,
  isValidDateRange,
} from "../utils/bookingDates";
import useBookings from "../context/useBookings";
import { showToast } from "../utils/toast";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const clerk = useClerk();
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const { bookRoom } = useBookings();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(
    searchParams.get("checkIn") || "",
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchParams.get("checkOut") || "",
  );
  const [guests, setGuests] = useState(
    Number(searchParams.get("guests")) || 1,
  );
  const [availabilityMessage, setAvailabilityMessage] = useState(null);
  const today = getToday();

  useEffect(() => {
    const foundRoom = roomsDummyData.find((r) => r._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images?.[0] ?? null);
      const requestedGuests = Number(searchParams.get("guests")) || 1;
      setGuests(Math.min(Math.max(requestedGuests, 1), foundRoom.maxGuests));
    }
  }, [id, searchParams]);

  const handleCheckInChange = (event) => {
    const nextCheckIn = event.target.value;
    setCheckInDate(nextCheckIn);
    setAvailabilityMessage(null);

    if (checkOutDate && checkOutDate <= nextCheckIn) {
      setCheckOutDate("");
    }
  };

  const handleBooking = (event) => {
    event.preventDefault();

    if (!isSignedIn) {
      showToast("Please sign in before creating a booking.", "error");
      clerk.openSignIn();
      return;
    }

    if (!isValidDateRange(checkInDate, checkOutDate)) {
      setAvailabilityMessage({
        type: "error",
        text: "Check-out must be at least one day after check-in.",
      });
      return;
    }

    if (guests < 1 || guests > room.maxGuests) {
      setAvailabilityMessage({
        type: "error",
        text: `This room accepts up to ${room.maxGuests} guests.`,
      });
      return;
    }

    const result = bookRoom({
      room,
      checkInDate,
      checkOutDate,
      guests,
      guestName: user?.fullName || user?.firstName || "QuickStay Guest",
    });

    if (!result.success) {
      setAvailabilityMessage({ type: "error", text: result.message });
      showToast(result.message, "error");
      return;
    }

    showToast("Your booking was created successfully.");
    navigate("/my-bookings", { state: { bookingCreated: true } });
  };

  const nightCount = getNightCount(checkInDate, checkOutDate);
  const bookingTotal = room ? nightCount * room.pricePerNight : 0;

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/*   Room Details   */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 ">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">{room.roomType}</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% Off
          </p>
        </div>
        {/*   Room Raiting    */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2"> 200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/*  Room Images    */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="Room Image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image ? "outline-3 outline-orange-500" : ""}`}
                />
              ))}
          </div>
        </div>

        {/* Room Highlights*/}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-col md:flex-row md:justify-between mt-10">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Room Price */}
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>

        {/*  CheckIn CheckOut Form  */}
        <form onSubmit={handleBooking} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-3 md:gap-6 text-gray-500">
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                min={today}
                value={checkInDate}
                onChange={handleCheckInChange}
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                min={addDays(checkInDate || today, 1)}
                value={checkOutDate}
                onChange={(event) => {
                  setCheckOutDate(event.target.value);
                  setAvailabilityMessage(null);
                }}
                disabled={!checkInDate}
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(event) => {
                  setGuests(Number(event.target.value));
                  setAvailabilityMessage(null);
                }}
                className="min-w-24 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              >
                {Array.from({ length: room.maxGuests }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="max-md:mt-6 max-md:w-full md:text-right">
            {nightCount > 0 && (
              <p className="mb-2 text-sm text-gray-500">
                {nightCount} {nightCount === 1 ? "night" : "nights"} - ${bookingTotal}
              </p>
            )}
            <button
              type="submit"
              disabled={!isLoaded}
              className="cursor-pointer rounded-lg bg-blue-600 px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-wait disabled:opacity-60 max-md:w-full"
            >
              {isSignedIn ? "Book Now" : "Sign In to Book"}
            </button>
          </div>
        </form>
        {availabilityMessage && (
          <p
            className={`mx-auto mt-4 max-w-6xl text-sm font-medium ${
              availabilityMessage.type === "success"
                ? "text-emerald-600"
                : "text-red-600"
            }`}
            role="status"
          >
            {availabilityMessage.text}
          </p>
        )}
        {/* Common Specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-5oo">
          <p>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability.</p>
        </div>
        {/*  Hosted By  */}
        <div className="flex flex-col items-start gap-4">
             <div className="flex gap-4">
              <div>
                  <p className="text-lg md:text-xl">Hosted by UrbanzaSuits</p>
                  <div className="flex items-center mt-1">
                    <StarRating />
                    <p className="ml-2">200+ Reviews</p>
                  </div>
              </div>
             </div>
             <a href="https://www.linkedin.com/in/yagiz-karagoz-b18820358/"> <button className="px-6 py-2.5 mt-4 rounded text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer">Contact Now</button></a>
            
        </div>

      </div>
    )
  );
};

export default RoomDetails;

