'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TrackVehicle() {
  const [selectedEntity, setSelectedEntity] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen font-display bg-base-bg">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <header className="flex justify-between items-center py-6 px-4">
          <div className="text-3xl font-bold text-brand-yellow">LOCOMOTION</div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn-primary px-6 py-2">
              Login
            </Link>
          </div>
        </header>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">Track Your Service</h1>
            <p className="mt-4 text-lg text-text-secondary">Enter your tracking information to see the latest updates.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 card p-8">
            <div className="rounded-lg shadow-sm -space-y-px">
              <div>
                <label className="sr-only" htmlFor="entity-select">Select Entity</label>
                <select 
                  className="w-full px-4 py-3 border border-base-border bg-base-surface text-text-secondary focus:ring-brand-yellow focus:border-brand-yellow rounded-t-lg appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23FFD700' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                  id="entity-select" 
                  name="entity"
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                >
                  <option value="">Select Entity</option>
                  <option value="arlington">Arlington Shop</option>
                  <option value="houston">Houston Parts</option>
                  <option value="mansfield">Mansfield HQ</option>
                </select>
              </div>
              <div>
                <label className="sr-only" htmlFor="tracking-number">QR/Tracking Number</label>
                <input 
                  className="w-full px-4 py-3 border border-base-border bg-base-surface text-text-primary focus:ring-brand-yellow focus:border-brand-yellow rounded-b-lg placeholder-text-muted" 
                  id="tracking-number" 
                  name="tracking-number" 
                  placeholder="Enter QR/Tracking Number" 
                  required 
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button 
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-brand-yellow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow focus:ring-offset-base-bg transition-colors" 
                type="submit"
                disabled={isLoading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <span className="material-symbols-outlined h-5 w-5 text-black/60 group-hover:text-black">qr_code_scanner</span>
                </span>
                {isLoading ? 'Tracking...' : 'Track'}
              </button>
            </div>
          </form>

          {/* Results Section */}
          {showResults && (
            <div className="text-center space-y-4">
              <div className="card p-6" id="status-result">
                <h3 className="font-bold text-lg text-brand-yellow">Status: In Progress</h3>
                <p className="text-text-secondary">Your transmission repair is currently at the <span className="font-semibold text-text-primary">Mansfield</span> facility.</p>
                <p className="text-text-secondary">Estimated Completion: <span className="font-semibold text-text-primary">2 Days</span></p>
                <div className="w-full bg-base-border rounded-full h-2.5 mt-4">
                  <div className="bg-brand-yellow h-2.5 rounded-full transition-all duration-1000" style={{width: '45%'}}></div>
                </div>
              </div>
              <button className="w-full bg-brand-yellow/20 text-text-primary px-6 py-3 rounded-lg text-sm font-bold hover:bg-brand-yellow/30 transition-colors">
                Schedule New Repair
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="text-center">
            <Link href="/" className="text-sm font-medium text-text-secondary hover:text-brand-yellow transition-colors underline">
              Back to Home
            </Link>
            <span className="mx-2 text-text-muted">|</span>
            <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-brand-yellow transition-colors underline">
              Owner Dashboard
            </Link>
          </div>
          </div>
        </main>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4 text-white">
            <svg className="animate-spin h-12 w-12 text-brand-yellow" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
            </svg>
            <p className="text-lg font-semibold">Tracking your order...</p>
          </div>
        </div>
      )}
    </div>
  )
}