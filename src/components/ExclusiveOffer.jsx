import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffer = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#091523] px-4 py-20 text-white md:px-16 md:py-28 lg:px-24 xl:px-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,rgba(185,145,85,0.16),transparent_32%),radial-gradient(circle_at_90%_90%,rgba(52,92,112,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#d8b77d]/50 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#d8b77d]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d8b77d]">
                The private collection
              </p>
            </div>
            <h2 className="font-playfair text-4xl font-medium leading-tight tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Exceptional stays,
              <span className="block font-normal italic text-[#d8b77d]">reserved for you.</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-sm leading-7 text-slate-300 sm:text-base">
              A limited selection of signature escapes, with thoughtful extras and privileged rates.
            </p>
            <button
              type="button"
              className="group mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:text-[#e4c794]"
            >
              View all offers
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 transition duration-300 group-hover:border-[#d8b77d] group-hover:bg-[#d8b77d]">
                <img src={assets.arrowIcon} alt="" className="h-3.5 w-3.5 brightness-0 invert transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {exclusiveOffers.map((offer, index) => (
            <article
              key={offer._id}
              className={`group relative min-h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:min-h-[500px] ${
                index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#091523]/15 via-[#091523]/5 to-[#091523]/95" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#091523]/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                    0{index + 1}
                  </span>
                  <div className="rounded-full border border-white/25 bg-[#091523]/35 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                    Save {offer.priceOff}%
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e4c794]">
                    <span>Limited edition</span>
                    <span className="h-px flex-1 bg-white/20" />
                    <span>Until {offer.expiryDate}</span>
                  </div>
                  <h3 className="max-w-sm font-playfair text-3xl font-medium leading-tight sm:text-[2.1rem]">
                    {offer.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                    {offer.description}
                  </p>
                  <button
                    type="button"
                    className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                  >
                    Discover
                    <span className="h-px w-8 bg-[#d8b77d] transition-all duration-300 group-hover:w-14" />
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/0 transition duration-500 group-hover:border-white/20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExclusiveOffer
