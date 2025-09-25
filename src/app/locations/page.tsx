'use client';

import { useState } from 'react';
import Link from 'next/link'

export default function LocationsPage() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <main className="min-h-screen font-display bg-base-bg">
      {/* Mobile Layout */}
      <section className="md:hidden max-w-sm mx-auto bg-base-bg p-3">
        <header className="flex justify-between items-center py-3">
          <h1 className="text-xl font-extrabold tracking-widest text-brand-yellow">LOCOMOTION</h1>
          <button 
            className="text-text-primary p-2 min-w-[48px] min-h-[48px] flex items-center justify-center hover:text-brand-yellow transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </header>
      </section>

      {/* Desktop Layout */}
      <section className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <span className="text-3xl font-bold text-brand-yellow">LOCOMOTION</span>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-text-secondary">
            <Link href="/track-vehicle" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Track Vehicle</Link>
            <Link href="/auto-sales" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Auto Sales</Link>

            <Link href="/parts" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Parts</Link>
            <Link href="/locations" className="hover:text-text-primary transition-colors py-2 px-4 rounded min-h-[48px] flex items-center whitespace-nowrap">Locations</Link>

          </nav>
          <section className="flex items-center space-x-4">
            <Link href="/login" className="btn-primary px-6 py-2">
              Login
            </Link>
          </section>
        </header>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Locations */}
          <section>
            <h1 className="text-3xl font-bold mb-8 text-text-primary">Our Locations</h1>
            
            {/* Location Categories */}
            <section className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-brand-yellow">TX Shops/Parts</h3>
                <section className="space-y-4">
                  <article className="card p-4">
                    <h3 className="font-semibold text-lg text-text-primary">Arlington</h3>
                    <p className="text-text-secondary">1234 Main St, Arlington, TX 76010</p>
                    <p className="text-text-secondary">(817) 555-0123</p>
                  </article>
                  <article className="card p-4">
                    <h3 className="font-semibold text-lg text-text-primary">Mansfield</h3>
                    <p className="text-text-secondary">5678 Oak Ave, Mansfield, TX 76063</p>
                    <p className="text-text-secondary">(817) 555-0456</p>
                  </article>
                  <article className="card p-4">
                    <h3 className="font-semibold text-lg text-text-primary">Houston</h3>
                    <p className="text-text-secondary">9012 Pine Rd, Houston, TX 77001</p>
                    <p className="text-text-secondary">(713) 555-0789</p>
                  </article>
                </section>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-brand-yellow">Mexico Ops</h3>
                <article className="card p-4">
                  <h3 className="font-semibold text-lg text-text-primary">Juarez, MX</h3>
                  <p className="text-text-secondary">Av. Tecnológico 1234, Juarez, Chihuahua</p>
                  <p className="text-text-secondary">+52 656 555-0123</p>
                </article>
              </section>
            </section>

            <button className="mt-8 btn-primary px-6 py-3 font-medium">
              Find Nearest Location
            </button>
          </section>

          {/* Right Column - Map */}
          <section className="relative">
            <article className="card p-6 h-96 relative overflow-hidden">
              <h3 className="text-xl font-semibold mb-4 text-text-primary">Texas Locations</h3>
              
              {/* Simplified Texas Map */}
              <section className="relative w-full h-full bg-base-surface rounded-lg">
                {/* Map Background */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Simplified Texas outline */}
                  <path
                    d="M50 150 L100 50 L350 80 L380 120 L370 200 L300 250 L200 280 L100 250 L50 200 Z"
                    fill="#1a1a1a"
                    stroke="#333333"
                    strokeWidth="2"
                  />
                  
                  {/* Location pins */}
                  {/* Arlington */}
                  <circle
                    cx="200"
                    cy="150"
                    r="8"
                    fill="#FFD700"
                    className="cursor-pointer hover:fill-yellow-300"
                    onMouseEnter={() => setHoveredLocation('Arlington')}
                    onMouseLeave={() => setHoveredLocation(null)}
                  />
                  
                  {/* Mansfield */}
                  <circle
                    cx="210"
                    cy="160"
                    r="8"
                    fill="#FFD700"
                    className="cursor-pointer hover:fill-yellow-300"
                    onMouseEnter={() => setHoveredLocation('Mansfield')}
                    onMouseLeave={() => setHoveredLocation(null)}
                  />
                  
                  {/* Houston */}
                  <circle
                    cx="250"
                    cy="200"
                    r="8"
                    fill="#FFD700"
                    className="cursor-pointer hover:fill-yellow-300"
                    onMouseEnter={() => setHoveredLocation('Houston')}
                    onMouseLeave={() => setHoveredLocation(null)}
                  />
                  
                  {/* Juarez, MX */}
                  <circle
                    cx="120"
                    cy="180"
                    r="8"
                    fill="#FFD700"
                    className="cursor-pointer hover:fill-yellow-300"
                    onMouseEnter={() => setHoveredLocation('Juarez')}
                    onMouseLeave={() => setHoveredLocation(null)}
                  />
                </svg>

                {/* Location tooltips */}
                {hoveredLocation && (
                  <article className="absolute top-4 right-4 card p-3 z-10">
                    <section className="text-sm">
                      {hoveredLocation === 'Arlington' && (
                        <>
                          <h4 className="font-semibold text-text-primary">Arlington</h4>
                          <p className="text-text-secondary">1234 Main St</p>
                          <p className="text-text-secondary">(817) 555-0123</p>
                        </>
                      )}
                      {hoveredLocation === 'Mansfield' && (
                        <>
                          <h4 className="font-semibold text-text-primary">Mansfield</h4>
                          <p className="text-text-secondary">5678 Oak Ave</p>
                          <p className="text-text-secondary">(817) 555-0456</p>
                        </>
                      )}
                      {hoveredLocation === 'Houston' && (
                        <>
                          <h4 className="font-semibold text-text-primary">Houston</h4>
                          <p className="text-text-secondary">9012 Pine Rd</p>
                          <p className="text-text-secondary">(713) 555-0789</p>
                        </>
                      )}
                      {hoveredLocation === 'Juarez' && (
                        <>
                          <h4 className="font-semibold text-text-primary">Juarez, MX</h4>
                          <p className="text-text-secondary">Av. Tecnológico 1234</p>
                          <p className="text-text-secondary">+52 656 555-0123</p>
                        </>
                      )}
                    </section>
                  </article>
                )}
              </section>
            </article>
          </section>
        </section>
      </section>

      {/* Footer */}
      <footer className="card border-t border-base-border mt-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <section>
              <h3 className="text-lg font-semibold mb-4 text-text-primary">Locomotion</h3>
              <p className="text-text-secondary text-sm">
                Your trusted partner for transmission repairs, parts, and used auto sales across Texas and Mexico.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-4 text-text-primary">Services</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/repairs" className="hover:text-text-primary transition-colors">Transmission Repair</Link></li>
                <li><Link href="/parts" className="hover:text-text-primary transition-colors">Parts Sales</Link></li>
                <li><Link href="/auto-sales" className="hover:text-text-primary transition-colors">Used Auto Sales</Link></li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-4 text-text-primary">Company</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/about" className="hover:text-text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-text-primary transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-text-primary transition-colors">Careers</Link></li>
              </ul>
            </section>
          </section>
          <section className="border-t border-base-border mt-8 pt-8 text-center text-sm text-text-muted">
            <p>&copy; 2024 Locomotion. All rights reserved.</p>
          </section>
        </section>
      </footer>
    </main>
  );
}