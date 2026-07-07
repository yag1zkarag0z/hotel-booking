import { SignInButton, useAuth, useUser } from "@clerk/react";
import { Link } from "react-router-dom";
import { assets, roomsDummyData } from "../assets/assets";
import useBookings from "../context/useBookings";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const OwnerDashboard = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { bookings } = useBookings();

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
        Loading dashboard...
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-center text-white">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Owner Area
          </p>
          <h1 className="mt-4 font-playfair text-4xl">Sign in to continue</h1>
          <p className="mt-3 text-slate-400">
            The owner dashboard is available after authentication.
          </p>
          <SignInButton mode="modal">
            <button className="mt-7 cursor-pointer rounded-lg bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-white">
              Sign In
            </button>
          </SignInButton>
          <Link to="/" className="mt-5 block text-sm text-slate-400 hover:text-white">
            Back to website
          </Link>
        </div>
      </main>
    );
  }

  const activeBookings = bookings.filter(
    (booking) => booking.status !== "cancelled",
  );
  const paidBookings = activeBookings.filter((booking) => booking.isPaid);
  const totalRevenue = paidBookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0,
  );
  const pendingPayments = activeBookings.filter(
    (booking) => !booking.isPaid,
  ).length;
  const cancelledBookings = bookings.length - activeBookings.length;
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const stats = [
    {
      label: "Active Bookings",
      value: activeBookings.length,
      detail: `${bookings.length} total reservations`,
      icon: assets.totalBookingIcon,
    },
    {
      label: "Paid Revenue",
      value: formatCurrency(totalRevenue),
      detail: `${paidBookings.length} paid bookings`,
      icon: assets.totalRevenueIcon,
    },
    {
      label: "Pending Payments",
      value: pendingPayments,
      detail: "Requires attention",
      icon: assets.dashboardIcon,
    },
    {
      label: "Cancellations",
      value: cancelledBookings,
      detail: "Dates returned to inventory",
      icon: assets.listIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-slate-950 px-5 py-7 text-white md:flex">
        <Link to="/" className="px-2">
          <img src={assets.logo} alt="QuickStay" className="h-8" />
        </Link>
        <div className="mt-3 px-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          Owner workspace
        </div>

        <nav className="mt-10 space-y-2">
          <a
            href="#overview"
            className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 font-medium text-slate-950"
          >
            <img src={assets.dashboardIcon} alt="" className="h-5 w-5" />
            Overview
          </a>
          <a
            href="#reservations"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <img src={assets.listIcon} alt="" className="h-5 w-5" />
            Reservations
          </a>
          <Link
            to="/hotels"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <img src={assets.homeIcon} alt="" className="h-5 w-5 brightness-0 invert" />
            View Rooms
          </Link>
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-medium">{user?.fullName || "Hotel Owner"}</p>
          <p className="mt-1 truncate text-xs text-slate-400">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
          <Link to="/" className="mt-4 inline-flex text-sm text-amber-300 hover:text-white">
            Back to website
          </Link>
        </div>
      </aside>

      <header className="flex items-center justify-between bg-slate-950 px-4 py-4 text-white md:hidden">
        <Link to="/">
          <img src={assets.logo} alt="QuickStay" className="h-7" />
        </Link>
        <Link to="/" className="text-sm text-amber-300">
          Back to site
        </Link>
      </header>

      <main className="md:ml-64">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10 xl:px-12">
          <section id="overview">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Property overview
                </p>
                <h1 className="mt-2 font-playfair text-4xl md:text-5xl">
                  Welcome back, {user?.firstName || "Owner"}
                </h1>
              </div>
              <p className="text-sm text-slate-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="mt-2 text-3xl font-semibold tracking-tight">
                        {stat.value}
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                      <img src={stat.icon} alt="" className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-5 text-xs text-slate-400">{stat.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="reservations" className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 md:px-7">
              <div>
                <h2 className="font-playfair text-2xl">Recent Reservations</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Latest booking activity across your properties.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {bookings.length} total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-7 py-4 font-semibold">Guest</th>
                    <th className="px-5 py-4 font-semibold">Property</th>
                    <th className="px-5 py-4 font-semibold">Stay</th>
                    <th className="px-5 py-4 font-semibold">Amount</th>
                    <th className="px-7 py-4 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentBookings.map((booking) => {
                    const isCancelled = booking.status === "cancelled";

                    return (
                      <tr key={booking._id} className="hover:bg-slate-50/70">
                        <td className="px-7 py-4">
                          <p className="font-medium text-slate-800">
                            {booking.user?.username || "QuickStay Guest"}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium">{booking.hotel.name}</p>
                          <p className="mt-1 text-xs text-slate-400">{booking.room.roomType}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {formatDate(booking.checkInDate)}
                          <span className="mx-1 text-slate-300">/</span>
                          {formatDate(booking.checkOutDate)}
                        </td>
                        <td className="px-5 py-4 font-semibold">
                          {formatCurrency(booking.totalPrice)}
                        </td>
                        <td className="px-7 py-4 text-right">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              isCancelled
                                ? "bg-red-50 text-red-700"
                                : booking.isPaid
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {isCancelled ? "Cancelled" : booking.isPaid ? "Paid" : "Payment pending"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-950 p-6 text-white shadow-xl md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Room performance
                </p>
                <h2 className="mt-2 font-playfair text-3xl">Booking distribution</h2>
              </div>
              <Link to="/hotels" className="text-sm text-slate-300 hover:text-white">
                Browse room listings
              </Link>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              {roomsDummyData.map((room) => {
                const roomBookings = activeBookings.filter(
                  (booking) => booking.room._id === room._id,
                ).length;
                const share = activeBookings.length
                  ? Math.round((roomBookings / activeBookings.length) * 100)
                  : 0;

                return (
                  <article key={room._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={room.images[0]}
                        alt={room.hotel.name}
                        className="h-16 w-20 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate font-medium">{room.hotel.name}</p>
                          <span className="text-sm text-amber-300">{roomBookings}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{room.hotel.city} - {room.roomType}</p>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-amber-300"
                            style={{ width: `${share}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
