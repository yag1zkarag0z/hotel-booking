import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignInButton, useAuth } from "@clerk/react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import useBookings from "../context/useBookings";
import {
  addDays,
  getNightCount,
  getToday,
  isValidDateRange,
} from "../utils/bookingDates";
import { showToast } from "../utils/toast";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const MyBookings = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const {
    bookings,
    markAsPaid,
    cancelBooking,
    updateBooking,
  } = useBookings();
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });
  const today = getToday();

  const handlePayment = (bookingId) => {
    markAsPaid(bookingId);
    showToast("Payment completed successfully.");
  };

  const handleCancel = (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    cancelBooking(bookingId);
    showToast("Booking cancelled successfully.");
  };

  const openEditModal = (booking) => {
    setEditingBooking(booking);
    setEditForm({
      checkInDate: booking.checkInDate.slice(0, 10),
      checkOutDate: booking.checkOutDate.slice(0, 10),
      guests: booking.guests,
    });
  };

  const handleEditCheckIn = (event) => {
    const nextCheckIn = event.target.value;
    setEditForm((current) => ({
      ...current,
      checkInDate: nextCheckIn,
      checkOutDate:
        current.checkOutDate > nextCheckIn ? current.checkOutDate : "",
    }));
  };

  const handleUpdateBooking = (event) => {
    event.preventDefault();

    if (!isValidDateRange(editForm.checkInDate, editForm.checkOutDate)) {
      showToast("Check-out must be after check-in.", "error");
      return;
    }

    const result = updateBooking(editingBooking._id, editForm);

    if (!result.success) {
      showToast(result.message, "error");
      return;
    }

    setEditingBooking(null);
    showToast("Booking updated successfully.");
  };

  if (!isLoaded) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center pt-24 text-slate-500">
        Loading bookings...
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-32 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <Title
            title="Sign in to view your bookings"
            subTitle="Your reservations and payment details are available after you sign in."
          />
          <SignInButton mode="modal">
            <button className="mt-7 cursor-pointer rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-blue-600">
              Sign In
            </button>
          </SignInButton>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_26%)] px-4 pb-24 pt-28 md:px-16 md:pb-32 md:pt-36 lg:px-24 xl:px-32">
      <div className="mx-auto max-w-6xl">
        <Title
          align="left"
          title="My Bookings"
          subTitle="Manage your upcoming stays, review booking details, and keep track of payments in one place."
        />

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
          <div className="hidden grid-cols-[minmax(0,2.5fr)_minmax(240px,1.4fr)_minmax(170px,0.8fr)] gap-6 border-b border-slate-200 bg-slate-50/80 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 md:grid">
            <p>Hotel</p>
            <p>Dates & Guests</p>
            <p className="text-right">Payment</p>
          </div>

          {bookings.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {bookings.map((booking) => {
                const nightCount = getNightCount(
                  booking.checkInDate,
                  booking.checkOutDate,
                );
                const status = booking.status || "pending";
                const isCancelled = status === "cancelled";
                const statusColor = isCancelled
                  ? "bg-red-50 text-red-700 ring-red-200"
                  : status === "confirmed"
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-amber-50 text-amber-700 ring-amber-200";

                return (
                  <article
                    key={booking._id}
                    className="grid gap-6 p-5 transition-colors hover:bg-slate-50/70 md:grid-cols-[minmax(0,2.5fr)_minmax(240px,1.4fr)_minmax(170px,0.8fr)] md:items-center md:px-7 md:py-6"
                  >
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                      <Link
                        to={`/rooms/${booking.room._id}`}
                        className="shrink-0 overflow-hidden rounded-xl"
                      >
                        <img
                          src={booking.room.images[0]}
                          alt={`${booking.hotel.name} ${booking.room.roomType}`}
                          className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-28 sm:w-44"
                        />
                      </Link>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${statusColor}`}>
                            {status}
                          </span>
                          <span className="text-xs text-slate-400">
                            {nightCount} {nightCount === 1 ? "night" : "nights"}
                          </span>
                        </div>
                        <Link
                          to={`/rooms/${booking.room._id}`}
                          className="font-playfair text-xl text-slate-900 transition-colors hover:text-blue-600 md:text-2xl"
                        >
                          {booking.hotel.name}
                        </Link>
                        <p className="mt-1 text-sm text-slate-500">
                          {booking.room.roomType}
                        </p>
                        <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                          <img
                            src={assets.locationIcon}
                            alt=""
                            className="mt-0.5 h-4 w-4 shrink-0"
                          />
                          <span>{booking.hotel.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-sm md:grid-cols-1 md:bg-transparent md:p-0">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Check-in
                        </p>
                        <p className="mt-1 font-medium text-slate-700">
                          {formatDate(booking.checkInDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Check-out
                        </p>
                        <p className="mt-1 font-medium text-slate-700">
                          {formatDate(booking.checkOutDate)}
                        </p>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Guests
                        </p>
                        <p className="mt-1 font-medium text-slate-700">
                          {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-4 md:flex-col md:items-end md:border-0 md:pt-0 md:text-right">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Total price
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-slate-900">
                          ${booking.totalPrice}
                        </p>
                      </div>

                      {isCancelled ? (
                        <span className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
                          Cancelled
                        </span>
                      ) : booking.isPaid ? (
                        <div className="flex flex-col items-end gap-1">
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Paid
                          </span>
                          <span className="text-xs text-slate-400">
                            via {booking.paymentMethod}
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePayment(booking._id)}
                          className="cursor-pointer rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Pay Now
                        </button>
                      )}

                      {!isCancelled && (
                        <div className="flex items-center gap-3 text-sm">
                          <button
                            type="button"
                            onClick={() => openEditModal(booking)}
                            className="cursor-pointer font-medium text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCancel(booking._id)}
                            className="cursor-pointer font-medium text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-20 text-center">
              <p className="font-playfair text-2xl text-slate-800">
                No bookings yet
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Your future stays will appear here.
              </p>
              <Link
                to="/hotels"
                className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
              >
                Explore Hotels
              </Link>
            </div>
          )}
        </div>

        {editingBooking && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
            <form
              onSubmit={handleUpdateBooking}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-booking-title"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="edit-booking-title" className="font-playfair text-2xl text-slate-900">
                    Edit Booking
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {editingBooking.hotel.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="cursor-pointer text-2xl leading-none text-slate-400 hover:text-slate-700"
                  aria-label="Close edit window"
                >
                  &times;
                </button>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Check-in
                  <input
                    type="date"
                    min={today}
                    value={editForm.checkInDate}
                    onChange={handleEditCheckIn}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Check-out
                  <input
                    type="date"
                    min={addDays(editForm.checkInDate || today, 1)}
                    value={editForm.checkOutDate}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        checkOutDate: event.target.value,
                      }))
                    }
                    disabled={!editForm.checkInDate}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 disabled:bg-slate-100"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Guests
                  <select
                    value={editForm.guests}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        guests: Number(event.target.value),
                      }))
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                  >
                    {Array.from(
                      { length: editingBooking.room.maxGuests },
                      (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ),
                    )}
                  </select>
                </label>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookings;
