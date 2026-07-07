import { useContext } from "react";
import BookingStore from "./BookingStore";

const useBookings = () => {
  const context = useContext(BookingStore);

  if (!context) {
    throw new Error("useBookings must be used inside BookingProvider");
  }

  return context;
};

export default useBookings;
