import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {

  return (
    <footer
      className="relative w-full overflow-hidden border-t border-white/10 bg-slate-950/80 px-4 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl md:px-16 lg:px-24 xl:px-32"
      style={{ backgroundColor: 'rgba(2, 6, 23, 0.8)', color: '#ffffff' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,125,0.14),transparent_45%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_30%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d8b77d]/45 to-transparent" />

      <div className="relative mx-auto max-w-7xl py-12 md:py-14">
        <div className="max-w-md">
            <Link to="/" aria-label="QuickStay homepage" className="inline-block">
              <img src={assets.logo} alt="QuickStay" className="h-9 w-auto" />
            </Link>
            <p className="mt-5 text-sm leading-7 text-white/50">
              Extraordinary places. Considered details.
              <span className="block">Stays that remain with you.</span>
            </p>
        </div>

        <div className="my-9 h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5" />

        <div className="flex flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>&copy; {new Date().getFullYear()} QuickStay</p>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <Link to="/" className="transition hover:text-white/70">Privacy</Link>
            <Link to="/" className="transition hover:text-white/70">Terms</Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/yagiz-karagoz-b18820358/"
              target="_blank"
              rel="noreferrer"
              aria-label="Yagiz Karagoz LinkedIn profile"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.03] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b77d]/70 hover:bg-[#d8b77d]/10"
            >
              <img src={assets.linkendinIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-65" />
            </a>
            <p className="text-white/40">
              by{' '}
              <a
                href="https://www.linkedin.com/in/yagiz-karagoz-b18820358/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#d8b77d] transition hover:text-[#efd8ae]"
              >
                {'Ya\u011f\u0131z Karag\u00f6z'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
