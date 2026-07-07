export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const addDays = (date, dayCount) => {
  if (!date) return "";

  const result = new Date(`${date}T00:00:00Z`);
  result.setUTCDate(result.getUTCDate() + dayCount);
  return result.toISOString().slice(0, 10);
};

export const isValidDateRange = (checkIn, checkOut) =>
  Boolean(checkIn && checkOut && checkOut > checkIn);

export const getNightCount = (checkIn, checkOut) => {
  if (!isValidDateRange(checkIn, checkOut)) return 0;

  const milliseconds = new Date(checkOut) - new Date(checkIn);
  return Math.ceil(milliseconds / (1000 * 60 * 60 * 24));
};

export const isRoomAvailable = (
  roomId,
  checkIn,
  checkOut,
  bookings,
  excludeBookingId = null,
) => {
  if (!isValidDateRange(checkIn, checkOut)) return true;

  return !bookings.some((booking) => {
    if (
      booking.room._id !== roomId ||
      booking._id === excludeBookingId ||
      booking.status === "cancelled"
    ) {
      return false;
    }

    const bookedCheckIn = booking.checkInDate.slice(0, 10);
    const bookedCheckOut = booking.checkOutDate.slice(0, 10);

    return checkIn < bookedCheckOut && checkOut > bookedCheckIn;
  });
};
