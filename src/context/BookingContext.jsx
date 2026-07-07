import { useEffect, useState } from "react";
import { userBookingsDummyData, userDummyData } from "../assets/assets";
import { getNightCount, isRoomAvailable } from "../utils/bookingDates";
import BookingStore from "./BookingStore";

const STORAGE_KEY = "quickstay-bookings";
const fallbackGuestNames = [
  "Olivia Bennett",
  "Ethan Carter",
  "Sophia Martinez",
  "Noah Williams",
];

const normalizeGuestNames = (bookings) =>
  bookings.map((booking, index) =>
    booking.user?.username === "Great Stack"
      ? {
          ...booking,
          user: {
            ...booking.user,
            username: fallbackGuestNames[index % fallbackGuestNames.length],
          },
        }
      : booking,
  );

const getInitialBookings = () => {
  try {
    const storedBookings = localStorage.getItem(STORAGE_KEY);
    const initialBookings = storedBookings
      ? JSON.parse(storedBookings)
      : userBookingsDummyData.map((booking) => ({ ...booking }));

    return normalizeGuestNames(initialBookings);
  } catch {
    return userBookingsDummyData.map((booking) => ({ ...booking }));
  }
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(getInitialBookings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const bookRoom = ({
    room,
    checkInDate,
    checkOutDate,
    guests,
    guestName,
  }) => {
    if (
      !isRoomAvailable(room._id, checkInDate, checkOutDate, bookings)
    ) {
      return {
        success: false,
        message: "This room is already booked for part of that date range.",
      };
    }

    const timestamp = new Date().toISOString();
    const booking = {
      _id: `booking-${Date.now()}`,
      user: {
        ...userDummyData,
        username: guestName || "QuickStay Guest",
      },
      room,
      hotel: room.hotel,
      checkInDate: `${checkInDate}T00:00:00.000Z`,
      checkOutDate: `${checkOutDate}T00:00:00.000Z`,
      totalPrice:
        room.pricePerNight * getNightCount(checkInDate, checkOutDate),
      guests,
      status: "confirmed",
      paymentMethod: "Pay At Hotel",
      isPaid: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setBookings((currentBookings) => [booking, ...currentBookings]);
    return { success: true, booking };
  };

  const markAsPaid = (bookingId) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking._id === bookingId && booking.status !== "cancelled"
          ? {
              ...booking,
              isPaid: true,
              paymentMethod: "Online",
              updatedAt: new Date().toISOString(),
            }
          : booking,
      ),
    );
  };

  const cancelBooking = (bookingId) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking._id === bookingId
          ? {
              ...booking,
              status: "cancelled",
              updatedAt: new Date().toISOString(),
            }
          : booking,
      ),
    );
  };

  const updateBooking = (
    bookingId,
    { checkInDate, checkOutDate, guests },
  ) => {
    const booking = bookings.find((item) => item._id === bookingId);

    if (!booking || booking.status === "cancelled") {
      return { success: false, message: "This booking cannot be edited." };
    }

    if (guests < 1 || guests > booking.room.maxGuests) {
      return {
        success: false,
        message: `This room accepts up to ${booking.room.maxGuests} guests.`,
      };
    }

    if (
      !isRoomAvailable(
        booking.room._id,
        checkInDate,
        checkOutDate,
        bookings,
        bookingId,
      )
    ) {
      return {
        success: false,
        message: "This room is not available for the new dates.",
      };
    }

    setBookings((currentBookings) =>
      currentBookings.map((item) =>
        item._id === bookingId
          ? {
              ...item,
              checkInDate: `${checkInDate}T00:00:00.000Z`,
              checkOutDate: `${checkOutDate}T00:00:00.000Z`,
              guests,
              totalPrice:
                item.room.pricePerNight *
                getNightCount(checkInDate, checkOutDate),
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );

    return { success: true };
  };

  return (
    <BookingStore.Provider
      value={{
        bookings,
        bookRoom,
        markAsPaid,
        cancelBooking,
        updateBooking,
      }}
    >
      {children}
    </BookingStore.Provider>
  );
};
