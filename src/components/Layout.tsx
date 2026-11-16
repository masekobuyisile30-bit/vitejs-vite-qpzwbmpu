import { ArrowRight, Menu, X } from 'lucide-react'

export const Navbar = ({ currentPage, setCurrentPage, menuOpen, setMenuOpen, scrolled, scrollToContact, scrollToPricing }: any) => {
  
  // This forces the browser to scroll to the top when navigating
  const handleNavClick = (page: string) => {
    setCurrentPage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || currentPage !== 'home' ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-1 focus:outline-none">
          <span className="text-xl font-bold tracking-tight text-slate-900">DOV<span className="text-blue-800">LIX</span></span>
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <button onClick={() => handleNavClick('services')} className={`hover:text-blue-800 transition-colors ${currentPage === 'services' ? 'text-blue-800 font-medium' : ''}`}>Services</button>
          <button onClick={() => handleNavClick('why-us')} className={`hover:text-blue-800 transition-colors ${currentPage === 'why-us' ? 'text-blue-800 font-medium' : ''}`}>Why Us</button>
          <button onClick={() => { scrollToPricing(); setMenuOpen(false); }} className="hover:text-blue-800 transition-colors">Pricing</button>
          <button onClick={() => handleNavClick('services')} className="hover:text-blue-800 transition-colors">FAQ</button>
          <button onClick={() => { scrollToContact(); setMenuOpen(false); }} className="hover:text-blue-800 transition-colors">Contact</button>
        </div>
        <button onClick={scrollToContact} className="hidden md:inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all">
          Get Started <ArrowRight size={14} />
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-900 p-2">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-8 py-8 flex flex-col gap-6 shadow-xl absolute w-full">
          <button onClick={() => handleNavClick('services')} className="text-left text-lg font-medium text-slate-700">Services</button>
          <button onClick={() => handleNavClick('why-us')} className="text-left text-lg font-medium text-slate-700">Why Us</button>
          <button onClick={() => { scrollToPricing(); setMenuOpen(false); }} className="text-left text-lg font-medium text-slate-700">Pricing</button>
          <button onClick={() => handleNavClick('services')} className="text-left text-lg font-medium text-slate-700">FAQ</button>
          <button onClick={() => { scrollToContact(); setMenuOpen(false); }} className="text-left text-lg font-medium text-slate-700">Contact</button>
        </div>
      )}
    </nav>
  )
}

export const Footer = ({ setCurrentPage, scrollToPricing, scrollToContact }: any) => {
  
  const handleFooterClick = (page: string) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <button onClick={() => handleFooterClick('home')} className="text-lg font-bold tracking-tight text-slate-900 hover:opacity-80 transition-opacity">DOV<span className="text-blue-800">LIX</span></button>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs text-slate-500 font-light">
          <button onClick={() => handleFooterClick('services')} className="hover:text-blue-800 transition-colors">Services</button>
          <button onClick={() => handleFooterClick('why-us')} className="hover:text-blue-800 transition-colors">Why Us</button>
          <button onClick={scrollToPricing} className="hover:text-blue-800 transition-colors">Pricing</button>
          <button onClick={() => handleFooterClick('privacy')} className="hover:text-blue-800 transition-colors">Privacy Policy</button>
          <button onClick={scrollToContact} className="hover:text-blue-800 transition-colors">Contact</button>
        </div>
        <div className="text-xs text-slate-500 font-light">
          <a href="mailto:info@dovlix.com" className="hover:text-blue-800 transition-colors">info@dovlix.com</a>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-[10px] text-slate-400 font-light">© 2026 Dovlix Solutions. Engineered in South Africa.</div>
    </footer>
  )
}