import { useState, useEffect, useRef } from 'react'
import { Globe, Zap, TrendingUp, Layers, Shield, Server, Activity, CheckCircle, ArrowRight, ChevronDown, Mail, Phone, Play, Lock, MessageCircle, Bot } from 'lucide-react'
import { Navbar, Footer } from './components/Layout'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'why-us' | 'services' | 'privacy'>('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')
  
  // PRELOADER STATE
  const [isLoading, setIsLoading] = useState(true)
  const [loadStep, setLoadStep] = useState(0)

  // HERO MAC ANIMATION STATE
  const [typedUrl, setTypedUrl] = useState('')
  const [showCards, setShowCards] = useState(false)
  const fullUrl = 'www.dovlix.com'

  // FAQ STATE
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // STATS ANIMATION STATE
  const [statsVisible, setStatsVisible] = useState(false)
  const [counts, setCounts] = useState({ stat1: 0, stat2: 0, stat3: 0, stat4: 0, stat5: 0, stat6: 0 })
  const statsRef = useRef<HTMLDivElement>(null)

  // PRELOADER EFFECT
  useEffect(() => {
    if (loadStep < 6) {
      const timer = setTimeout(() => setLoadStep(prev => prev + 1), 300)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [loadStep])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // MAC BROWSER ANIMATION SEQUENCE
  useEffect(() => {
    if (currentPage !== 'home' || isLoading) return
    setTypedUrl('')
    setShowCards(false)
    let i = 0
    const typingInterval = setInterval(() => {
      setTypedUrl(fullUrl.slice(0, i + 1))
      i++
      if (i === fullUrl.length) {
        clearInterval(typingInterval)
        setTimeout(() => setShowCards(true), 800)
      }
    }, 150)
    return () => clearInterval(typingInterval)
  }, [currentPage, isLoading])

  // SCROLL TRIGGER FOR STATS
  useEffect(() => {
    if (currentPage !== 'why-us') return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.2 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [currentPage])

  // NUMBER COUNTING LOGIC
  useEffect(() => {
    if (!statsVisible) return
    let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0
    const interval = setInterval(() => {
      let done = true
      if (c1 < 42.9) { c1 = Math.min(c1 + 1, 42.9); done = false }
      if (c2 < 39.7) { c2 = Math.min(c2 + 1, 39.7); done = false }
      if (c3 < 59.4) { c3 = Math.min(c3 + 1, 59.4); done = false }
      if (c4 < 15) { c4 += 1; done = false }
      if (c5 < 82) { c5 += 1; done = false }
      if (c6 < 30) { c6 += 2; done = false }
      setCounts({ stat1: parseFloat(c1.toFixed(1)), stat2: parseFloat(c2.toFixed(1)), stat3: parseFloat(c3.toFixed(1)), stat4: c4, stat5: c5, stat6: c6 })
      if (done) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [statsVisible])

  // SCROLL TO TOP NAVIGATION
  const navigateTo = (page: 'home' | 'why-us' | 'services' | 'privacy') => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToPricing = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home')
      setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 150)
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home')
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150)
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    const formPayload = new FormData()
    formPayload.append('access_key', 'd7491172-e669-4746-8755-8ed0e4eb5c61')
    formPayload.append('name', formData.name)
    formPayload.append('email', formData.email)
    formPayload.append('message', formData.message)
    formPayload.append('subject', 'New Dovlix Enquiry')
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formPayload })
      const data = await response.json()
      if (data.success) {
        setFormStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('idle')
      }
    } catch {
      setFormStatus('idle')
    }
  }

  const services = [
    { icon: <Globe size={24} />, title: 'Professional Websites', desc: 'We build high performance business websites designed to convert visitors into paying customers. Every site is mobile first and built to make your brand look credible.' },
    { icon: <Zap size={24} />, title: 'AI Automation', desc: 'We connect your tools and integrate smart AI assistants into your workflow. Bookings, follow ups, invoices, and WhatsApp chatbots all running silently in the background.' },
    { icon: <TrendingUp size={24} />, title: 'SEO & Growth', desc: 'We optimise your site so you get found on Google by the right people. Organic search traffic turned into predictable revenue.' },
    { icon: <Layers size={24} />, title: 'Marketing Assets', desc: 'Branded content and graphics that make your business look world class across every digital touchpoint.' },
    { icon: <Play size={24} />, title: 'Content Creation', desc: 'Social graphics, short form video editing, email newsletters, and blog posts that actually build your brand.' },
    { icon: <Shield size={24} />, title: 'Security & Maintenance', desc: 'SSL certificates, DDoS protection, daily backups, and ongoing updates to keep your site safe and fast.' },
    { icon: <Server size={24} />, title: 'Digital Strategy', desc: 'We map your goals, audience, and budget into a clear roadmap so you know exactly what to build and when.' },
  ]

  const tiers = [
    { name: 'Launch', price: '3,500', monthly: '350', features: ['3 page custom website', 'Mobile responsive', 'Contact form', 'Basic SEO setup', 'Domain and hosting', '1 revision round'], popular: false },
    { name: 'Grow', price: '7,500', monthly: '650', features: ['Everything in Launch', '5 to 7 page website', 'Booking system or lead capture', 'WhatsApp integration', '3 professional emails', 'Google Business Profile'], popular: true },
    { name: 'Elevate', price: '14,000', monthly: '1,100', features: ['Everything in Grow', 'Unlimited pages', 'Custom AI chatbot', 'Advanced automation', 'Client portal', 'Analytics dashboard'], popular: false },
  ]

  const faqs = [
    { q: "How long does a website take to build?", a: "Most projects kick off within 24 to 48 hours of our first conversation. A standard website takes 1 to 2 weeks to design, build, and launch. More complex systems with automation or AI take 2 to 4 weeks." },
    { q: "Do I own the website and domain?", a: "Yes completely. Once the final payment is made, the website, domain, and all the code belong entirely to you. We do not hold your business hostage." },
    { q: "How does the payment structure work?", a: "We require a full deposit upfront to secure your spot in our build queue and begin the design phase. This ensures we are fully committed to your project from day one. There are no surprise fees later." },
    { q: "What does the monthly fee actually cover?", a: "The monthly fee covers cloud hosting, SSL security certificates, daily backups, minor content updates, and ongoing technical support. It ensures your site stays fast, secure, and online." },
    { q: "Are there any hidden costs?", a: "No. We believe in transparent pricing. The once off build fee and the monthly hosting fee are exactly what you see on our pricing page." },
    { q: "Can I cancel the monthly plan?", a: "Yes you can cancel your monthly hosting and maintenance plan at any time with 30 days notice. If you cancel, we will hand over all the website files to you." }
  ]

  const letters = ['D', 'O', 'V', 'L', 'I', 'X']

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex gap-2 text-5xl md:text-7xl font-bold tracking-tight">
          {letters.map((char, i) => (
            <span key={i} className={`transition-all duration-500 ease-out ${i < loadStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className={i < 3 ? 'text-slate-900' : 'text-blue-800'}>{char}</span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-900" style={{fontFamily: 'Inter, system-ui, sans-serif', scrollBehavior: 'smooth'}}>
      
      <style>{`
        .page-transition { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .scroll-reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <a href="https://wa.me/27662135026" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-[100] bg-[#25D366] p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>

      <Navbar currentPage={currentPage} setCurrentPage={navigateTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} scrollToContact={scrollToContact} scrollToPricing={scrollToPricing} />

      {currentPage === 'home' && (
        <div className="page-transition">
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 bg-gradient-to-b from-blue-50/50 via-white to-white">
            <div className="relative z-10 text-center px-8 md:px-6 max-w-4xl mx-auto w-full">
              <button onClick={() => navigateTo('why-us')} className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-2.5 text-xs font-medium text-slate-600 mb-10 shadow-sm hover:shadow-md transition-all">
                <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>
                Dovlix Systems Online <ArrowRight size={14} className="text-slate-400" />
              </button>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight leading-tight mb-8">
                We build the <span className="text-blue-800 font-normal">digital engine</span><br className="hidden md:block" /> behind your business.
              </h1>
              <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-light px-2">
                Premium websites, AI automation, and digital infrastructure engineered for South African businesses ready to grow.
              </p>
              
              <div className="w-full max-w-2xl mx-auto mt-6 mb-12 rounded-xl overflow-hidden shadow-2xl shadow-blue-200/50 border border-slate-200 bg-white">
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-amber-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                  <div className="flex-1 ml-4 bg-white rounded-md border border-slate-200 px-3 py-1.5 flex items-center gap-2">
                    <Lock size={12} className="text-green-500" /><span className="text-xs text-slate-600 font-mono truncate">{typedUrl}<span className="animate-pulse">|</span></span>
                  </div>
                </div>
                <div className="bg-slate-50 h-[200px] md:h-[240px] flex items-center justify-center relative overflow-hidden">
                  {!showCards ? (
                    <div className="text-slate-400 flex flex-col items-center gap-3"><div className="w-6 h-6 border-2 border-blue-800 border-t-transparent rounded-full animate-spin"></div><span className="text-xs font-light">Connecting...</span></div>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-4 px-6 w-full">
                      <div className="flex-1 bg-white border border-blue-100 shadow-sm rounded-lg p-4 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-800"><Globe size={16} /></div>
                        <p className="text-xs font-semibold text-slate-800">Websites</p>
                      </div>
                      <div className="flex-1 bg-white border border-blue-100 shadow-sm rounded-lg p-4 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-800"><Bot size={16} /></div>
                        <p className="text-xs font-semibold text-slate-800">Automation</p>
                      </div>
                      <div className="flex-1 bg-white border border-blue-100 shadow-sm rounded-lg p-4 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-800"><TrendingUp size={16} /></div>
                        <p className="text-xs font-semibold text-slate-800">SEO & Growth</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <button onClick={() => navigateTo('services')} className="w-full sm:w-auto bg-blue-800 text-white px-8 py-4 rounded-xl text-base font-medium shadow-lg hover:-translate-y-1 transition-transform">Explore Services</button>
                <a href="https://wa.me/27662135026" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-base font-medium hover:-translate-y-1 transition-transform">WhatsApp Us</a>
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="mx-auto max-w-4xl px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">Who is Dovlix?</h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">We are a South African digital agency that builds the digital engine behind your business. We do not just make things look good. We build systems that work. Every project is engineered to save you time, bring in more clients, and run smoothly without constant attention from you.</p>
              <button onClick={() => navigateTo('why-us')} className="inline-flex items-center gap-2 text-blue-800 font-medium hover:text-blue-900 transition-colors">Read our full story <ArrowRight size={16} /></button>
            </div>
          </section>

          <section className="py-24 bg-slate-50 border-y border-slate-200">
             <div className="mx-auto max-w-7xl px-8 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">What We Build For You</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-500 cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-800 mb-6"><Globe size={24} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Websites</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">A high performance website built to convert visitors into paying customers. We design mobile first, fast loading sites that make your business look credible and professional.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-500 cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-800 mb-6"><Zap size={24} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">AI Automation</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">We connect your tools and integrate smart AI assistants into your workflow. Bookings, follow ups, invoices, and chatbots running silently in the background.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-500 cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-800 mb-6"><Activity size={24} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">SEO & Growth</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">We optimise your site so you get found on Google by the right people. Organic search traffic turned into predictable revenue.</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-16">
                <div className="text-center mb-10"><h3 className="text-3xl font-light text-slate-900 mb-4">See the Digital Engine in Action</h3></div>
                <div className="max-w-4xl mx-auto">
                  <a href="https://youtu.be/MHD1K_ViwCo" target="_blank" rel="noopener noreferrer" className="group block relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl aspect-video flex items-center justify-center hover:-translate-y-1 transition-all duration-500">
                    <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"><Play size={32} className="text-white ml-1" fill="currentColor" /></div>
                    <p className="absolute bottom-6 text-white font-medium text-lg">Watch the Concept Rundown</p>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-8 md:px-6">
              <div className="mb-16 text-center"><h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">Transparent Pricing</h2></div>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {tiers.map((tier, i) => (
                  <div key={i} className={`relative bg-white border rounded-3xl p-8 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-xl ${tier.popular ? 'border-blue-400 shadow-xl ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-200'}`}>
                    {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-800 text-white px-4 py-1 rounded-full text-xs font-semibold">MOST POPULAR</div>}
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">{tier.name}</h3>
                    <div className="mb-6"><span className="text-4xl font-light text-slate-900">R{tier.price}</span><span className="text-slate-500 text-sm"> once off</span></div>
                    <div className="mb-6 pb-6 border-b border-slate-100"><span className="text-lg font-medium text-blue-800">R{tier.monthly}</span><span className="text-slate-500 text-sm"> /month</span></div>
                    <ul className="space-y-3 mb-8">{tier.features.map((f, j) => (<li key={j} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-blue-700 mt-0.5" />{f}</li>))}</ul>
                    <button onClick={scrollToContact} className={`block w-full py-3.5 rounded-xl font-medium text-sm transition-all ${tier.popular ? 'bg-blue-800 text-white hover:bg-blue-900' : 'border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-800'}`}>Get Started</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-5xl px-8 md:px-6">
              <div className="mb-16 text-center"><h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">Let's Build Something</h2></div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  {formStatus === 'sent' ? (
                    <div className="bg-white border border-green-200 rounded-3xl p-10 text-center flex flex-col justify-center items-center h-full"><CheckCircle size={28} className="text-green-600 mb-5" /><h4 className="text-lg font-semibold text-slate-900 mb-2">Submitted</h4></div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="text" placeholder="Your name" required className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-base outline-none focus:border-blue-400 transition-colors" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      <input type="email" placeholder="Your email" required className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-base outline-none focus:border-blue-400 transition-colors" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      <textarea placeholder="Your message" rows={4} required className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-base outline-none focus:border-blue-400 transition-colors" onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                      <button type="submit" className="w-full py-4 rounded-xl text-base font-medium bg-blue-800 text-white hover:bg-blue-900 transition-colors">Send Message</button>
                    </form>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <a href="tel:0662135026" className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:-translate-y-1 hover:border-blue-200 transition-all duration-300"><Phone size={20} className="text-blue-800" /><div><p className="text-base font-medium">Call Us</p><p className="text-sm text-slate-500">066 213 5026</p></div></a>
                  <a href="mailto:info@dovlix.com" className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:-translate-y-1 hover:border-blue-200 transition-all duration-300"><Mail size={20} className="text-blue-800" /><div><p className="text-base font-medium">Email Us</p><p className="text-sm text-slate-500">info@dovlix.com</p></div></a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {currentPage === 'services' && (
        <div className="pt-32 pb-24 min-h-screen bg-white page-transition">
          <div className="mx-auto max-w-7xl px-8 md:px-6">
            <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-12 text-center">What We Build For You</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl hover:bg-white hover:border-blue-200 transition-all duration-500 cursor-pointer">
                  <div className="text-blue-800 mb-6">{s.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-32 pt-16 border-t border-slate-200 max-w-3xl mx-auto">
              <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left"><span className="font-medium text-slate-900">{faq.q}</span><ChevronDown size={20} className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} /></button>
                    <div className={`transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-96 pb-6 px-6 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-sm text-slate-600">{faq.a}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'why-us' && (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 page-transition">
          <div className="mx-auto max-w-7xl px-8 md:px-6">
            
            <div className="max-w-3xl mx-auto mb-24">
              <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4 text-center">Our Story</p>
              <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-8 text-center leading-tight">
                The digital agency industry is broken. We are fixing it.
              </h1>
              
              <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  For decades, South African businesses have been held hostage by a frustrating choice. Pay a massive corporate agency a fortune for a website that takes six months to build, or hire a freelancer who disappears halfway through the project leaving you with broken links and no support.
                </p>
                <p>
                  We got tired of watching great local businesses suffer because of bad tech. We saw plumbers, doctors, and retailers doing incredible work, but losing out to competitors simply because their online presence looked cheap, outdated, or did not exist at all.
                </p>
                <p className="font-medium text-slate-900">
                  That is why we built Dovlix Solutions.
                </p>
                <p>
                  We are not a template factory. We are not a call center. We are a lean, specialized engineering team that builds the exact same high performance digital infrastructure used by enterprise companies, but tailored specifically for growing South African businesses.
                </p>
                <p>
                  We believe that a website is not just a digital business card. It is an engine. It should be capturing leads while you sleep, automating your bookings, answering your customers questions, and actively growing your revenue. 
                </p>
                <p>
                  We do not just make things look good. We build systems that work. And we back them up with real, human support. If your business is ready to stop being invisible and start operating like a modern enterprise, you are in the right place.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-24 mb-16 text-center">
              <p className="text-blue-800 text-xs font-semibold tracking-widest uppercase mb-4">The Reality</p>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">Why You Need Dovlix</h2>
              <p className="text-slate-500 text-base font-light max-w-2xl mx-auto">The numbers do not lie. South African businesses are losing customers every day because they are invisible online.</p>
            </div>

            <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
              <div className={`bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm scroll-reveal hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${statsVisible ? 'visible' : ''}`}>
                <p className="text-5xl font-light text-blue-800 mb-3">{counts.stat1}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">of South African small businesses have no real website</p>
                <p className="text-slate-400 text-xs font-light">Watts Digital, 2026</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm scroll-reveal hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">{counts.stat2}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">have no web presence at all, no site, no social page</p>
                <p className="text-slate-400 text-xs font-light">Watts Digital, 2026</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm scroll-reveal hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">{counts.stat3}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">of businesses in small towns are invisible online</p>
                <p className="text-slate-400 text-xs font-light">Watts Digital, 2026</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm scroll-reveal hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">+{counts.stat4}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">growth in online sales while traditional sales stay flat</p>
                <p className="text-slate-400 text-xs font-light">SACCI, 2025</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm scroll-reveal hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">{counts.stat5}%</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">of consumers look up a business online before deciding</p>
                <p className="text-slate-400 text-xs font-light">Industry Data, 2026</p>
              </div>
              <div className={`bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm scroll-reveal hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '500ms' }}>
                <p className="text-5xl font-light text-blue-800 mb-3">&lt;{counts.stat6}min</p>
                <p className="text-slate-700 text-sm font-medium mb-3 leading-relaxed">is all the time you have to win a customer online</p>
                <p className="text-slate-400 text-xs font-light">BrightLocal, 2026</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-12 mb-20">
              <div className={`bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm scroll-reveal hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
                <h3 className="text-2xl font-light text-slate-900 mb-4">The Risk of Waiting</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  When a potential customer searches for a service you offer, they almost always choose one of the first three businesses they find. If you do not have a website, or if it looks outdated, you are instantly handing those clients to your competitors.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
                    <p className="text-4xl font-light text-red-500 mb-2">5-20</p>
                    <p className="text-slate-600 text-sm font-medium">potential clients lost every month</p>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
                    <p className="text-4xl font-light text-red-500 mb-2">R0</p>
                    <p className="text-slate-600 text-sm font-medium">earned online without a system</p>
                  </div>
                </div>
              </div>

              <div className={`bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm scroll-reveal hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${statsVisible ? 'visible' : ''}`} style={{ transitionDelay: '700ms' }}>
                <h3 className="text-2xl font-light text-slate-900 mb-4">How Dovlix Changes the Game</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We do not just build a website. We build a digital engine that works for you 24/7. We combine high converting design with automation and AI to ensure you capture every lead and operate more efficiently. 
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3"><CheckCircle className="text-blue-800 shrink-0 mt-0.5" size={20} /><span className="text-slate-600"><strong className="text-slate-900">Capture more leads:</strong> A modern website builds instant trust.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="text-blue-800 shrink-0 mt-0.5" size={20} /><span className="text-slate-600"><strong className="text-slate-900">Save time:</strong> Automation handles bookings and follow ups.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="text-blue-800 shrink-0 mt-0.5" size={20} /><span className="text-slate-600"><strong className="text-slate-900">Never miss out:</strong> AI chatbots answer questions at 2 AM.</span></li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button onClick={scrollToContact} className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-xl text-base font-medium transition-all shadow-lg shadow-blue-200 hover:-translate-y-1">
                Let's Modernise Your Business <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'privacy' && (
        <div className="pt-32 pb-24 min-h-screen bg-white page-transition">
          <div className="mx-auto max-w-4xl px-8 md:px-6">
            <h1 className="text-4xl font-light text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-slate-500 mb-8">Last updated: November 2026</p>
            
            <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">1. Introduction</h2>
                <p>Dovlix Solutions respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">2. The Data We Collect About You</h2>
                <p>Personal data means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Identity Data:</strong> includes first name, last name, or similar identifier.</li>
                  <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                  <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">3. How We Use Your Personal Data</h2>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">4. Data Security</h2>
                <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">5. Third Party Links and Integrations</h2>
                <p>This website may include links to third party websites, plug ins and applications, including WhatsApp and YouTube. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third party websites and are not responsible for their privacy statements.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">6. Your Legal Rights</h2>
                <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and to withdraw consent.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">7. Contact Us</h2>
                <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>info@dovlix.com</strong>.</p>
              </section>
            </div>
          </div>
        </div>
      )}

      <Footer setCurrentPage={navigateTo} scrollToPricing={scrollToPricing} scrollToContact={scrollToContact} />
    </div>
  )
}