'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CustomerLanding() {
  const [trackingInput, setTrackingInput] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to track-vehicle page
    router.push('/track-vehicle')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen font-display bg-base-bg">
      {/* Mobile Layout */}
      <div className="md:hidden max-w-sm mx-auto bg-base-bg p-3">
        <header className="flex justify-between items-center py-3">
          <h1 className="text-xl font-extrabold tracking-widest text-brand-yellow">LOCOMOTION</h1>
          <button 
            className="text-text-primary p-2 min-w-[48px] min-h-[48px] flex items-center justify-center hover:text-brand-yellow transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </header>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="absolute top-14 left-0 right-0 bg-base-card border border-base-border rounded-lg mx-3 p-2 z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              <Link href="/track-vehicle" className="text-text-primary font-medium py-3 px-4 rounded hover:bg-base-card-hover transition-colors block min-h-[48px] flex items-center">
                Track Vehicle
              </Link>
              <Link href="/auto-sales" className="text-text-primary font-medium py-3 px-4 rounded hover:bg-base-card-hover transition-colors block min-h-[48px] flex items-center">
                Auto Sales
              </Link>

              <Link href="/parts" className="text-text-primary font-medium py-3 px-4 rounded hover:bg-base-card-hover transition-colors block min-h-[48px] flex items-center">
                Parts
              </Link>
              <Link href="/locations" className="text-text-primary font-medium py-3 px-4 rounded hover:bg-base-card-hover transition-colors block min-h-[48px] flex items-center">
                Locations
              </Link>

              <div className="border-t border-base-border pt-2 mt-2">
                <Link href="/login" className="text-text-secondary font-medium py-3 px-4 rounded hover:bg-base-card-hover transition-colors block min-h-[48px] flex items-center">
                  Owner Dashboards
                </Link>
              </div>
            </div>
          </nav>
        )}

        <main className="mt-6">
          <div className="animate-in fade-in duration-500">
            <h2 className="font-display font-extrabold tracking-[-0.01em] text-text-primary" style={{fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: '1.1'}}>Track Your Vehicle Repair</h2>
            <p className="text-text-secondary mt-3 text-base font-medium">Enter QR or Tracking #</p>
          </div>
          
          <form onSubmit={handleTrackSubmit} className="mt-5">
             <input 
               className="input-dark w-full text-base font-medium min-h-[48px]" 
               placeholder="QR Code or Tracking Number" 
               type="text"
               value={trackingInput}
               onChange={(e) => setTrackingInput(e.target.value)}
             />
             <button type="submit" className="btn-primary w-full py-4 mt-3 text-lg font-semibold min-h-[48px] active:scale-95 transition-transform">
               Track Now
             </button>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <a href="tel:214-416-1044" className="btn-danger py-4 flex items-center justify-center gap-2 text-base font-semibold min-h-[48px] active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-lg">call</span>
                Call Now
              </a>
              <a href="#contact" className="bg-base-card hover:bg-base-card-hover text-text-primary border border-base-border py-4 flex items-center justify-center gap-2 text-base font-semibold transition-all duration-200 min-h-[48px] hover:transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95" style={{borderRadius: '4px'}}>
                <span className="material-symbols-outlined text-lg">schedule</span>
                Schedule Repair
              </a>
            </div>
          </form>

          {/* Sample Progress Card */}
          <div className="card mt-8 p-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-base font-semibold text-text-primary">In Progress at Arlington -</p>
                <p className="text-base font-semibold text-text-primary">ETA: 2 Days</p>
              </div>
            </div>
            <div className="w-full bg-base-border rounded-full h-2 mb-4">
              <div className="bg-brand-yellow h-2 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <Image alt="Blue SUV" className="w-1/2 rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFdCEdRznAMCU4yC1OLy74FWsujf8eLaVi-Ht3oOhTfu-hJb5LcCTtpM-dftfz4wqtoHx499w6pTqmejzMYgZ0RwvouJ9uUh3bPsy090zNz8LWzzW41mAsBHjL7wvrbed1oG8KDfWtslH2Ct0zu4t9evRY_IIkhIoWxaPg_LhydSnnGQkggscULyMOI7x9nYWGj9WM8SAc-xu-Z3-p4-lg95OD8_GC24tOyV8IQRTCLDrn6OuJQzr1_DRGMGR_3wnoqi4onzAziWQb" width={200} height={150}/>
              <Image alt="QR Code" className="w-20 h-20 rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUpQ0R67INuzqMem27K4AK5xRs7-nZRSEFiFFDs2xH0ABQVYI3FW4ZRfjHZi--I1dTYI8WibxH-9pCWjGI-tBUVBtd9Rn75hhGhls8O59xoEsyuKFLeqnqlc-0Qk5BQu5UGYYyaInHh5T4KrDHG8L5qVYqA6s9oJW41bT_N7hOzkf4i_jmqBNP-oKZdcTAjyduOAwzZ22Dp8NxDjVeGo9VOU64eHZnRdv6AQIB6DgU7ov9ueBAkZB1R7EO1qat_0UQuZ-j76Xuw0-Y" width={80} height={80}/>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-card-hover transition-colors">
                <span className="material-symbols-outlined text-brand-yellow text-lg">build_circle</span>
                <span className="text-text-primary font-medium text-sm">Transmission Rebuilds</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-card-hover transition-colors">
                <span className="material-symbols-outlined text-brand-yellow text-lg">sell</span>
                <span className="text-text-primary font-medium text-sm">Parts Sales</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-card-hover transition-colors">
                <span className="material-symbols-outlined text-brand-yellow text-lg">check_circle</span>
                <span className="text-text-primary font-medium text-sm">Diagnostic Scans</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg">
                <span className="material-symbols-outlined text-states-inactive text-lg">directions_car</span>
                <div>
                  <p className="text-text-primary font-medium text-sm">Used Auto Sales</p>
                  <p className="text-xs text-text-muted">(Inactive)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg">
                <span className="material-symbols-outlined text-states-inactive text-lg">local_shipping</span>
                <div>
                  <p className="text-text-primary font-medium text-sm">Parts Sales</p>
                  <p className="text-xs text-text-muted">Inactive</p>
                </div>
              </div>

            </div>
          </div>

          {/* Locations */}
          <div className="mb-5 animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <h3 className="text-lg font-bold text-text-primary mb-3">Locations</h3>
            <div className="space-y-2">
              <div className="bg-base-card rounded-lg p-3 hover:bg-base-card-hover transition-colors">
                <h4 className="font-bold text-text-primary text-sm">Arlington</h4>
                <p className="text-text-secondary text-xs">1721 Susan Dr</p>
                <p className="text-text-secondary text-xs">(214) 441-1844</p>
              </div>
              <div className="bg-base-card rounded-lg p-3 hover:bg-base-card-hover transition-colors">
                <h4 className="font-bold text-text-primary text-sm">Mansfield</h4>
                <p className="text-text-secondary text-xs">617 S 4th Ave</p>
                <p className="text-text-secondary text-xs">(623) 479-2820</p>
              </div>
              <div className="bg-base-card rounded-lg p-3 hover:bg-base-card-hover transition-colors">
                <h4 className="font-bold text-text-primary text-sm">Houston Parts</h4>
                <p className="text-text-secondary text-xs">2300 Marda Dr</p>
                <p className="text-text-secondary text-xs">(622) 470-8810</p>
              </div>
            </div>
          </div>

          {/* Location Navigation */}
          <nav className="footer-tabbar flex justify-around items-center mt-8 pb-4">
            <a className="active font-bold relative min-h-[48px] min-w-[48px] flex items-center justify-center" href="#">
              Arlington
              <div className="indicator absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-6 rounded-full"></div>
            </a>
            <a href="#" className="hover:text-brand-yellow transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">Mansfield</a>
            <a href="#" className="hover:text-brand-yellow transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">Mexico</a>
          </nav>
        </main>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
        <header className="flex justify-between items-center py-6">
          <div className="text-3xl font-bold text-brand-yellow">LOCOMOTION</div>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-text-secondary">
            <Link href="/track-vehicle" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Track Vehicle</Link>
            <Link href="/auto-sales" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Auto Sales</Link>

            <Link href="/parts" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Parts</Link>
            <Link href="/locations" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Locations</Link>

          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn-primary px-6 py-2">
              Login
            </Link>
          </div>
        </header>

        <main className="mt-12">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <div>
              <h1 className="text-6xl font-extrabold leading-tight text-text-primary">
                Track Your Vehicle <br/> Repair Instantly
              </h1>
              <p className="mt-4 text-text-secondary">Enter Your QR Code or Tracking # for Real-Time Updates</p>
              <form onSubmit={handleTrackSubmit} className="mt-8 space-y-4">
                <div className="flex space-x-4">
                  <input 
                    className="input-dark flex-grow" 
                    placeholder="e.g. QR123" 
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                  />
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary px-8 py-3 flex-1">
                    Track Now
                  </button>
                  <a href="tel:214-416-1044" className="btn-danger px-8 py-3 flex items-center justify-center gap-2 min-w-[160px]">
                    <span className="material-symbols-outlined">call</span>
                    Call Now
                  </a>
                  <a href="#contact" className="bg-base-card hover:bg-base-card-hover text-text-primary border border-base-border px-8 py-3 flex items-center justify-center gap-2 transition-all duration-200 min-w-[180px] hover:transform hover:-translate-y-0.5 hover:shadow-lg" style={{borderRadius: '4px'}}>
                    <span className="material-symbols-outlined">schedule</span>
                    Schedule Repair
                  </a>
                </div>
              </form>
            </div>
            <div className="relative">
              <Image 
                alt="A dark image of a car's rear, suggesting a repair in progress." 
                className="rounded-lg" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkr1kdUYpn62Ucbmrbm3-FHALuFIDnqQLnMp5AZXNGsdrbpkDio9F9TsIl3s_3uBV53ykAhMUbMX4nh1rDUCijtagw0rNMeNeVK7VjJuAxmDPlOuVP8Gd3tYuaEEvD24fm6ZysgVTRk_68HFNVaDSNclSpLCMOwLNVcdxJ9saxhrJ9MUYrYLMpZOJAtw_86-8EhNXwid2jz82Qv4hWoTEM9VgMbaAORTScuztZIbABHNrGjRc1Ak1g2ag-VKJTy4HtlGlJiEuOED4"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="card p-6 w-full max-w-sm mx-4">
                  <h3 className="font-bold text-xl text-text-primary">In Progress at Arlington —</h3>
                  <p className="text-lg text-text-secondary">ETA: 2 Days</p>
                  <div className="progress mt-4" style={{width: '75%'}}></div>
                  <p className="text-xs text-text-muted mt-2 text-right">ARJHSI$9!1 14.Al 1.62 C1, 3B23</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mt-24 animate-in slide-in-from-bottom-8 duration-700 delay-300" id="services">
            <h2 className="text-4xl font-bold text-text-primary text-center mb-12">Our Services</h2>
            
            {/* All Services in One Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6 hover:bg-base-card-hover transition-colors">
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="material-symbols-outlined text-brand-yellow text-4xl">build</span>
                  <div>
                    <h4 className="font-semibold text-text-primary text-lg">Transmission Rebuilds</h4>
                    <p className="text-text-secondary text-sm mt-2">Expert transmission repair and rebuilding services with quality parts and experienced technicians.</p>
                    <Link href="/parts" className="mt-4 bg-brand-yellow text-base-bg px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors min-h-[48px] active:scale-95 inline-block text-center">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card p-6 hover:bg-base-card-hover transition-colors">
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="material-symbols-outlined text-brand-yellow text-4xl">tune</span>
                  <div>
                    <h4 className="font-semibold text-text-primary text-lg">Diagnostic Scans</h4>
                    <p className="text-text-secondary text-sm mt-2">Advanced diagnostic services to identify vehicle issues quickly and accurately.</p>
                    <button className="mt-4 bg-brand-yellow text-base-bg px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors min-h-[48px] active:scale-95">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="card p-6 hover:bg-base-card-hover transition-colors">
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="material-symbols-outlined text-brand-yellow text-4xl">inventory_2</span>
                  <div>
                    <h4 className="font-semibold text-text-primary text-lg">Torque Converter Parts</h4>
                    <p className="text-text-secondary text-sm mt-2">Remanufactures torque converters and supplies quality transmission parts to repair shops nationwide.</p>
                    <Link href="/parts" className="mt-4 bg-brand-yellow text-base-bg px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors min-h-[48px] active:scale-95 inline-block text-center">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card p-6 hover:bg-base-card-hover transition-colors">
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="material-symbols-outlined text-brand-yellow text-4xl">directions_car</span>
                  <div>
                    <h4 className="font-semibold text-text-primary text-lg">Quality Used Vehicles</h4>
                    <p className="text-text-secondary text-sm mt-2">Locomotion Auto Sales: Sells quality used vehicles with thorough inspections and reliable service history.</p>
                    <Link href="/auto-sales" className="mt-4 bg-brand-yellow text-base-bg px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors min-h-[48px] active:scale-95 inline-block text-center">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brands Logo Grid */}
          <div className="mt-24 animate-in slide-in-from-bottom-8 duration-700 delay-400" id="brands">
            <h2 className="text-4xl font-bold text-text-primary text-center mb-12">Trusted by Leading Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              <div className="flex justify-center">
                <div className="text-text-muted font-bold text-xl">FORD</div>
              </div>
              <div className="flex justify-center">
                <div className="text-text-muted font-bold text-xl">CHEVY</div>
              </div>
              <div className="flex justify-center">
                <div className="text-text-muted font-bold text-xl">DODGE</div>
              </div>
              <div className="flex justify-center">
                <div className="text-text-muted font-bold text-xl">TOYOTA</div>
              </div>
              <div className="flex justify-center">
                <div className="text-text-muted font-bold text-xl">HONDA</div>
              </div>
              <div className="flex justify-center">
                <div className="text-text-muted font-bold text-xl">NISSAN</div>
              </div>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div className="mt-24 animate-in slide-in-from-bottom-8 duration-700 delay-500" id="testimonials">
            <h2 className="text-4xl font-bold text-text-primary text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-brand-yellow">star</span>
                    ))}
                  </div>
                </div>
                <p className="text-text-secondary italic mb-6">&quot;Excellent service! They rebuilt my transmission and it runs like new. The tracking system kept me informed throughout the entire process.&quot;</p>
                <div className="border-t border-base-border pt-4">
                  <p className="font-semibold text-text-primary">Sarah Johnson</p>
                  <p className="text-text-muted text-sm">Arlington Customer</p>
                </div>
              </div>
              <div className="card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-brand-yellow">star</span>
                    ))}
                  </div>
                </div>
                <p className="text-text-secondary italic mb-6">&quot;Fast, reliable parts delivery. Locomotion Parts has everything we need for our shop. Great quality and competitive prices.&quot;</p>
                <div className="border-t border-base-border pt-4">
                  <p className="font-semibold text-text-primary">Mike Rodriguez</p>
                  <p className="text-text-muted text-sm">Shop Owner, Houston</p>
                </div>
              </div>
              <div className="card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-brand-yellow">star</span>
                    ))}
                  </div>
                </div>
                <p className="text-text-secondary italic mb-6">&quot;Bought a used car from Locomotion Auto Sales. Great condition, fair price, and excellent customer service throughout the process.&quot;</p>
                <div className="border-t border-base-border pt-4">
                  <p className="font-semibold text-text-primary">David Chen</p>
                  <p className="text-text-muted text-sm">Auto Sales Customer</p>
                </div>
              </div>
            </div>
          </div>



          {/* Locations Section */}
          <div className="mt-24 animate-in slide-in-from-bottom-8 duration-700 delay-700" id="locations">
            <h2 className="text-4xl font-bold text-text-primary">Locations</h2>
            
            {/* Entity 1: Repair Shop Locations */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Repair Shop Locations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <a 
                  href="https://maps.google.com/?q=1721+Susan+Dr,+Arlington,+TX+76010" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card p-6 hover:bg-base-card-hover transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary group-hover:text-brand-yellow transition-colors">Arlington</h4>
                      <p className="mt-2 text-text-secondary">1721 Susan Dr<br/>Arlington, TX 76010<br/>(214) 441-1844</p>
                    </div>
                    <span className="material-symbols-outlined text-brand-yellow">directions</span>
                  </div>
                </a>
                <a 
                  href="https://maps.google.com/?q=617+S+4th+Ave,+Mansfield,+TX+76063" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card p-6 hover:bg-base-card-hover transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary group-hover:text-brand-yellow transition-colors">Mansfield</h4>
                      <p className="mt-2 text-text-secondary">617 S 4th Ave<br/>Mansfield, TX 76063<br/>(623) 479-2820</p>
                    </div>
                    <span className="material-symbols-outlined text-brand-yellow">directions</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Entity 2: Parts Sales Locations */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Parts Sales Locations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href="https://maps.google.com/?q=1721+Susan+Dr,+Arlington,+TX+76010" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card p-6 hover:bg-base-card-hover transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary group-hover:text-brand-yellow transition-colors">Arlington Parts</h4>
                      <p className="mt-2 text-text-secondary">1721 Susan Dr<br/>Arlington, TX 76010<br/>(214) 441-1844</p>
                      <p className="mt-2 text-xs text-brand-yellow">Torque Converter Parts</p>
                    </div>
                    <span className="material-symbols-outlined text-brand-yellow">directions</span>
                  </div>
                </a>
                <a 
                  href="https://maps.google.com/?q=2300+Marda+Dr,+Houston,+TX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card p-6 hover:bg-base-card-hover transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary group-hover:text-brand-yellow transition-colors">Houston Parts</h4>
                      <p className="mt-2 text-text-secondary">2300 Marda Dr<br/>Houston, TX<br/>(622) 470-8810</p>
                      <p className="mt-2 text-xs text-brand-yellow">Parts Distribution</p>
                    </div>
                    <span className="material-symbols-outlined text-brand-yellow">directions</span>
                  </div>
                </a>
              </div>
            </div>


          </div>
        </main>

        {/* Footer */}
        <footer className="mt-24 py-12 border-t border-base-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-text-primary font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <Link href="/parts" className="block text-text-muted hover:text-text-secondary transition-colors">Parts</Link>
                <Link href="/auto-sales" className="block text-text-muted hover:text-text-secondary transition-colors">Auto Sales</Link>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-text-primary font-semibold mb-4">Locations</h3>
              <div className="space-y-2">
                <a className="block text-text-muted hover:text-text-secondary transition-colors" href="https://maps.google.com/?q=Arlington+TX">Arlington, TX</a>
                <a className="block text-text-muted hover:text-text-secondary transition-colors" href="https://maps.google.com/?q=Mansfield+TX">Mansfield, TX</a>
                <a className="block text-text-muted hover:text-text-secondary transition-colors" href="https://maps.google.com/?q=Houston+TX">Houston, TX</a>
                <a className="block text-text-muted hover:text-text-secondary transition-colors" href="https://maps.google.com/?q=Juarez+Chihuahua+Mexico">Juarez, Chihuahua</a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-text-primary font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <a className="block text-text-muted hover:text-text-secondary transition-colors" href="tel:214-416-1044">214-416-1044</a>
                <a className="block text-text-muted hover:text-text-secondary transition-colors" href="mailto:info@locomotion.com">info@locomotion.com</a>

              </div>
            </div>

            {/* Quick Contact Form */}
            <div>
              <h3 className="text-text-primary font-semibold mb-4">Quick Contact</h3>
              <form className="space-y-3">
                <input 
                  className="w-full px-3 py-2 bg-base-card border border-base-border rounded text-text-primary placeholder-text-muted text-sm"
                  placeholder="Your Name"
                  type="text"
                />
                <input 
                  className="w-full px-3 py-2 bg-base-card border border-base-border rounded text-text-primary placeholder-text-muted text-sm"
                  placeholder="Phone Number"
                  type="tel"
                />
                <textarea 
                  className="w-full px-3 py-2 bg-base-card border border-base-border rounded text-text-primary placeholder-text-muted text-sm resize-none"
                  placeholder="How can we help?"
                  rows={3}
                ></textarea>
                <button type="submit" className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-base-bg font-semibold py-2 px-4 rounded text-sm transition-colors min-h-[48px] active:scale-95">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-base-border flex flex-col md:flex-row justify-between items-center text-sm text-text-muted">
            <p>© 2025 Locomotion. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a className="hover:text-text-secondary transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-text-secondary transition-colors" href="#">Terms of Service</a>
              <Link href="/login" className="hover:text-text-secondary transition-colors">Owner Dashboards</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}