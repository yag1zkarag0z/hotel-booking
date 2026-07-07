import React from 'react'
import { Link } from 'react-router-dom'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { assets } from '../assets/assets';

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'My Bookings', path: '/my-bookings' },
        { name: 'Dashboard', path: '/owner' },
      
    ];

 

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <nav className={`fixed top-0 left-0 z-50 w-full px-4 transition-all duration-500 md:px-16 lg:px-24 xl:px-32 ${
        isScrolled
          ? "bg-slate-950/80 py-3 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
          : "bg-slate-950/25 py-4 text-white backdrop-blur-md"
      }`}>
        <div className="mx-auto flex w-full items-center justify-between gap-6">
          {/* Logo */}
          <Link to='/' className="shrink-0">
            <img src={assets.logo} alt="Logo" className="h-9 drop-shadow-[0_1px_12px_rgba(255,255,255,0.18)]" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden flex-1 justify-center md:flex">
            <div className="flex items-center gap-10">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="group flex flex-col gap-0.5 text-white/90 transition hover:text-white"
                >
                  {link.name}
                  <div className="h-0.5 w-0 rounded-full bg-amber-300 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center justify-end min-w-[170px]">
            <div className="flex items-center gap-3">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="inline-flex cursor-pointer rounded-full bg-white px-6 py-2.5 font-medium text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="inline-flex cursor-pointer rounded-full border border-white/20 bg-white/10 px-6 py-2.5 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20">
                    Sign up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <svg
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-6 w-6 cursor-pointer text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
             
            </svg>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center gap-6 bg-slate-950 text-base font-medium text-white transition-all duration-500 md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2" onClick={() => setIsMenuOpen(false)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-xl transition hover:text-amber-300">
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="inline-flex cursor-pointer rounded-full bg-white px-8 py-2.5 font-medium text-slate-950 transition hover:bg-amber-300">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex cursor-pointer rounded-full border border-white/20 bg-white/10 px-8 py-2.5 font-medium text-white transition hover:bg-white/20">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
