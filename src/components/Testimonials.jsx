import { assets, testimonials } from '../assets/assets'

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-[#f4f0e8] px-4 py-20 md:px-16 md:py-28 lg:px-24 xl:px-32">
      <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full border border-[#b78b4d]/20" />
      <div className="pointer-events-none absolute -left-12 top-24 h-40 w-40 rounded-full border border-[#b78b4d]/20" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#966b30]">
            Guest stories
          </p>
          <h2 className="mt-4 font-playfair text-4xl font-medium leading-tight tracking-tight text-[#101c2c] sm:text-5xl md:text-6xl">
            Moments worth
            <span className="block font-normal italic text-[#a4783a]">remembering.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
            Thoughtful service, remarkable places and the experiences our guests carry home.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className={`group relative flex min-h-[360px] flex-col rounded-[1.75rem] border p-7 transition duration-500 hover:-translate-y-1 md:p-8 ${
                index === 1
                  ? 'border-[#101c2c] bg-[#101c2c] text-white shadow-[0_24px_60px_rgba(16,28,44,0.22)]'
                  : 'border-[#101c2c]/10 bg-white/80 text-[#101c2c] shadow-[0_18px_45px_rgba(16,28,44,0.07)] backdrop-blur-sm hover:shadow-[0_24px_55px_rgba(16,28,44,0.12)]'
              }`}
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <img
                      key={starIndex}
                      src={starIndex < testimonial.rating ? assets.starIconFilled : assets.starIconOutlined}
                      alt=""
                      className="h-4 w-4"
                    />
                  ))}
                </div>
                <span className={`font-playfair text-6xl leading-none ${index === 1 ? 'text-[#d8b77d]' : 'text-[#b78b4d]/35'}`}>
                  &ldquo;
                </span>
              </div>

              <blockquote className={`flex-1 font-playfair text-xl leading-8 ${index === 1 ? 'text-white/90' : 'text-[#1c2b3d]'}`}>
                {testimonial.review}
              </blockquote>

              <div className={`mt-8 flex items-center gap-4 border-t pt-6 ${index === 1 ? 'border-white/15' : 'border-[#101c2c]/10'}`}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className={`h-12 w-12 rounded-full object-cover ring-2 ring-offset-2 ${
                    index === 1
                      ? 'ring-[#d8b77d] ring-offset-[#101c2c]'
                      : 'ring-[#b78b4d]/40 ring-offset-[#fdfcf9]'
                  }`}
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className={`mt-1 text-xs uppercase tracking-[0.16em] ${index === 1 ? 'text-white/55' : 'text-slate-500'}`}>
                    {testimonial.address}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          <span className="h-px w-10 bg-[#b78b4d]/50" />
          Trusted by travelers worldwide
          <span className="h-px w-10 bg-[#b78b4d]/50" />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
