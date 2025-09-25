'use client';

import Link from 'next/link'
import Image from 'next/image'

export default function AutoSalesPage() {
  return (
    <div className="min-h-screen font-display bg-base-bg">
      {/* Mobile Layout */}
      <div className="md:hidden max-w-sm mx-auto bg-base-bg p-3">
        <header className="flex justify-between items-center py-3">
          <h1 className="text-xl font-extrabold tracking-widest text-brand-yellow">LOCOMOTION</h1>
          <button 
            className="text-text-primary p-2 min-w-[48px] min-h-[48px] flex items-center justify-center hover:text-brand-yellow transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </header>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <div className="text-3xl font-bold text-brand-yellow">LOCOMOTION</div>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-text-secondary">
            <Link href="/track-vehicle" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Track Vehicle</Link>
            <Link href="/auto-sales" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Auto Sales</Link>
            <a className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap" href="#services">Services</a>
            <Link href="/parts" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Parts</Link>
            <Link href="/locations" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Locations</Link>
            <a className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn-primary px-6 py-2">
              Login
            </Link>
          </div>
        </header>
      </div>

      <main className="container mx-auto flex-grow px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="font-display text-4xl font-bold mb-4 text-text-primary">Find Your Next Vehicle</h2>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                <input 
                  className="w-full rounded-lg border border-base-border bg-base-surface text-text-primary py-3 pl-12 pr-4 focus:border-brand-yellow focus:ring-brand-yellow placeholder-text-muted" 
                  placeholder="Search by make, model, or keyword..." 
                  type="text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Ford F-150 */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <Image 
                    alt="Ford F-150" 
                    className="h-56 w-full object-cover transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCITA1AJdGnxEadc7_sf0hSLJsW-Q1WZMUIgMMuzoSnNKqAufG5G4CLnyjp3AOjkubkjRzfiv6tmU8nN5_jmZlf42sDtreLj9aGoNgO77kM84PGLJfdWFU3t67EJbidhF-cj5QTDsScaLp_LMVB5q91hTmrz6WX_I6U8rdvUYL47lAHCqgSaMJac2N1CGYT6qieAqgKd0NkEFBEWmgDpLDmyXD9TiWhDDvobpHrqkAkw9ZsbKRy4LeQlQV36Kchrlgklt9KwUK2qrQ"
                    width={400}
                    height={224}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="font-display text-xl font-bold text-white">2018 Ford F-150</h3>
                  </div>
                </div>
                <div className="flex flex-col p-4 flex-grow">
                  <p className="mb-4 text-3xl font-display font-bold text-brand-yellow">$28,500</p>
                  <p className="text-sm text-text-secondary flex-grow">120,000 miles | Automatic | V8 Engine</p>
                  <button className="mt-4 w-full rounded-lg border-2 border-brand-yellow py-2 font-display font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-base-bg">
                    Inquire
                  </button>
                </div>
              </div>

              {/* Chevrolet Silverado */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <Image 
                    alt="Chevrolet Silverado" 
                    className="h-56 w-full object-cover transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuASDbQXU8fvPTfZzJ-6h_jcFx7e4kwVfBbo8hf2fUfyOKaOJxu4hpKb3jdkf2IRzblO_9e6Rr5w7jx44UU3hqXN3KRFx2baztbnoXqq4PMhhuVo7OmBkJR0z6HL8H1NFsBRc7N9op9NBnpHQssmbo4Kj3GPoXA-5LwCjWWIHa6zGzOiaEbxWMqjvDp4yq0OhuNxjsLHGbnSHTi74_PYfhXWpBrhIp0UCeZ3khtsZHnDk1uct7Fz_YAeV8LBucGBC_eaERuri3PA54U"
                    width={400}
                    height={224}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="font-display text-xl font-bold text-white">2019 Chevrolet Silverado</h3>
                  </div>
                </div>
                <div className="flex flex-col p-4 flex-grow">
                  <p className="mb-4 text-3xl font-display font-bold text-brand-yellow">$32,000</p>
                  <p className="text-sm text-text-secondary flex-grow">95,000 miles | Automatic | V8 Engine</p>
                  <button className="mt-4 w-full rounded-lg border-2 border-brand-yellow py-2 font-display font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-base-bg">
                    Inquire
                  </button>
                </div>
              </div>

              {/* Toyota Tacoma */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <Image 
                    alt="Toyota Tacoma" 
                    className="h-56 w-full object-cover transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1F6S0RZj0mG6g0e5Hb4JMGa8BZ_uAF2xrt5l20lNYkNFD-VrP_y21EI0Jgqe-NtZr_ItUTG5nJJEJqunLw-yYCv_uTxCgg3eIzDuloP8OEk9MbIskIQNss1vIj_au5-HLl6W37HPOuP3e-r_JasEfwkonpgAgOgCEoTZwkkmrgH7mU6IuJqg3gLDhLvkU9r016zgKwdeHmN8C7ubtd_nyKb9Jt9NU8tLYgHtzB3L86y5UT2ApIhsAiHa7jy7Mnm0W-7SMgYUN-AQ"
                    width={400}
                    height={224}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="font-display text-xl font-bold text-white">2020 Toyota Tacoma</h3>
                  </div>
                </div>
                <div className="flex flex-col p-4 flex-grow">
                  <p className="mb-4 text-3xl font-display font-bold text-brand-yellow">$26,800</p>
                  <p className="text-sm text-text-secondary flex-grow">70,000 miles | Automatic | V6 Engine</p>
                  <button className="mt-4 w-full rounded-lg border-2 border-brand-yellow py-2 font-display font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-base-bg">
                    Inquire
                  </button>
                </div>
              </div>

              {/* Dodge Ram 1500 */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <Image 
                    alt="Dodge Ram 1500" 
                    className="h-56 w-full object-cover transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAunC2eileArnDE82N4s1to-i3TvX3YxvegotQw_Rs5OIEOzZIgg-bBUvRXi9vcDEcgap45oYLmsmEvHvWC1OB_EQhlce9CX65hGonVRQv4jtci50mCP96HT1TuCIK7yChNPDwBRoC_PelotqP8BynVTpCZWUleSkhUlVWsqLbi4e4rv5PHusBVy3gZpI7M7BhLeWIwP9LWjUO0CKqghSEVBWpSRJ4Vrkw3zZf62GV7KXf9SwpjNru5-WTbIYmKSSNxERlvCzf2vzY"
                    width={400}
                    height={224}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="font-display text-xl font-bold text-white">2017 Dodge Ram 1500</h3>
                  </div>
                </div>
                <div className="flex flex-col p-4 flex-grow">
                  <p className="mb-4 text-3xl font-display font-bold text-brand-yellow">$24,500</p>
                  <p className="text-sm text-text-secondary flex-grow">110,000 miles | Automatic | V8 Engine</p>
                  <button className="mt-4 w-full rounded-lg border-2 border-brand-yellow py-2 font-display font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-base-bg">
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Finance Application */}
              <div className="card p-6">
                <h3 className="font-display text-2xl font-bold mb-4 text-text-primary">Finance Application</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-text-secondary" htmlFor="name">Full Name</label>
                    <input 
                      className="w-full rounded-lg border border-base-border bg-base-surface text-text-primary py-2 px-3 focus:border-brand-yellow focus:ring-brand-yellow placeholder-text-muted" 
                      id="name" 
                      placeholder="John Doe" 
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-text-secondary" htmlFor="email">Email Address</label>
                    <input 
                      className="w-full rounded-lg border border-base-border bg-base-surface text-text-primary py-2 px-3 focus:border-brand-yellow focus:ring-brand-yellow placeholder-text-muted" 
                      id="email" 
                      placeholder="you@example.com" 
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-text-secondary" htmlFor="phone">Phone Number</label>
                    <input 
                      className="w-full rounded-lg border border-base-border bg-base-surface text-text-primary py-2 px-3 focus:border-brand-yellow focus:ring-brand-yellow placeholder-text-muted" 
                      id="phone" 
                      placeholder="(555) 555-5555" 
                      type="tel"
                    />
                  </div>
                  <button 
                    className="btn-primary w-full py-3 font-display font-bold transition-transform hover:scale-105" 
                    type="submit"
                  >
                    Submit Application
                  </button>
                </form>
              </div>

              {/* Owner's Dashboard */}
              <div className="card p-6">
                <h3 className="font-display text-2xl font-bold mb-2 text-text-primary">Owner&apos;s Dashboard</h3>
                <p className="text-sm text-text-secondary mb-4">Last 12 Months Sales</p>
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-4xl font-bold text-text-primary">$1.2M</p>
                  <p className="text-states-success font-bold flex items-center">
                    <span className="material-symbols-outlined text-lg">arrow_upward</span>+15%
                  </p>
                </div>
                <div className="mt-4 h-40">
                  <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 472 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      className="text-brand-yellow" 
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeWidth="3"
                    />
                    <path 
                      d="M0 150 V 109 C 18.1538 109 18.1538 21 36.3077 21 C 54.4615 21 54.4615 41 72.6154 41 C 90.7692 41 90.7692 93 108.923 93 C 127.077 93 127.077 33 145.231 33 C 163.385 33 163.385 101 181.538 101 C 199.692 101 199.692 61 217.846 61 C 236 61 236 45 254.154 45 C 272.308 45 272.308 121 290.462 121 C 308.615 121 308.615 149 326.769 149 C 344.923 149 344.923 1 363.077 1 C 381.231 1 381.231 81 399.385 81 C 417.538 81 417.538 129 435.692 129 C 453.846 129 453.846 25 472 25 L 472 150 Z"
                      fill="url(#sales-gradient)"
                    />
                    <defs>
                      <linearGradient gradientUnits="userSpaceOnUse" id="sales-gradient" x1="236" x2="236" y1="1" y2="150">
                        <stop stopColor="#FFD700" stopOpacity="0.3" />
                        <stop offset="1" stopColor="#FFD700" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}