const NewsLetter = () => {
  return (
    <section className="bg-[#f4f0e8] px-4 pb-20 pt-6 md:px-16 md:pb-28 lg:px-24 xl:px-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#101c2c] px-6 py-14 text-white shadow-[0_30px_80px_rgba(16,28,44,0.2)] sm:px-10 md:py-16 lg:px-16">
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#d8b77d]/20" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#d8b77d]/20" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-96 bg-[radial-gradient(ellipse,rgba(216,183,125,0.12),transparent_70%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#d8b77d]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d8b77d]">
                The private list
              </p>
            </div>
            <h2 className="font-playfair text-4xl font-medium leading-tight sm:text-5xl">
              Be first to discover
              <span className="block font-normal italic text-[#d8b77d]">your next escape.</span>
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/65">
              Receive handpicked destinations, private rates and seasonal inspiration directly in your inbox.
            </p>
          </div>

          <form className="w-full min-w-0" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="newsletter-email" className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Email address
            </label>
            <div className="grid w-full min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
              <input
                id="newsletter-email"
                className="h-14 w-full min-w-0 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-white outline-none backdrop-blur placeholder:text-white/40 focus:border-[#d8b77d] focus:ring-4 focus:ring-[#d8b77d]/10 sm:px-6"
                type="email"
                placeholder="you@example.com"
                required
              />
              <button
                type="submit"
                className="h-14 w-full rounded-full bg-[#d8b77d] px-6 text-sm font-bold text-[#101c2c] transition duration-300 hover:bg-[#e8ca96] sm:w-auto sm:px-9"
              >
                Join the list
              </button>
            </div>
            <p className="mt-3 text-xs text-white/40">No noise. Just considered travel inspiration.</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewsLetter
