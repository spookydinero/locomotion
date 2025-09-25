'use client';

import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'

export default function PartsPage() {
  const [uploadResult, setUploadResult] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadResult(true);
    
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);

    setTimeout(() => {
      setUploadResult(false);
    }, 5000);
  };

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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Division Selector */}
              <div className="card p-6">
                <h3 className="font-display text-xl font-bold mb-4 text-text-primary">Select Division</h3>
                <div className="flex space-x-2 rounded-lg bg-base-surface p-1">
                  <button className="flex-1 rounded-md py-2 text-sm font-semibold transition-colors bg-brand-yellow text-base-bg">Arlington</button>
                  <button className="flex-1 rounded-md py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-brand-yellow/20">Houston</button>
                </div>
              </div>

              {/* AI Photo Upload */}
              <div className="card p-6">
                <h3 className="font-display text-xl font-bold mb-4 text-text-primary">Can&apos;t Find Your Part?</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Use our AI-powered tool to identify any part from a photo.
                </p>
                {!uploadResult && (
                  <button 
                    onClick={handleUpload}
                    className="w-full flex items-center justify-center gap-2 rounded-md border-2 border-brand-yellow py-3 font-display font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-base-bg"
                  >
                    <span className="material-symbols-outlined">photo_camera</span>
                    Upload Photo
                  </button>
                )}
                {uploadResult && (
                  <div className={`mt-4 ${isUploading ? 'animate-pulse' : ''}`}>
                    <p className="text-center text-sm text-brand-yellow">
                      {isUploading ? 'Recognizing part...' : 'Part Identified!'}
                    </p>
                    <div className="mt-2 flex items-center gap-3 rounded-md bg-base-surface p-3">
                      <div className="h-12 w-12 rounded bg-base-border"></div>
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold text-text-primary">4L60E Torque Converter</p>
                        <p className="text-xs text-text-muted">Confidence: 98%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Reorder Alerts */}
              <div className="rounded-lg border border-dashed border-brand-yellow/50 bg-base-card/50 p-6 text-center">
                <h3 className="font-display text-xl font-bold mb-2 text-text-primary">Never Run Out</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Set up reorder alerts for your most used parts and stay ahead of schedule.
                </p>
                <button className="font-bold text-brand-yellow text-sm underline-offset-4 hover:underline">
                  Set Up Alerts
                </button>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-text-primary">Parts Inventory</h2>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                <input 
                  className="w-full sm:w-80 rounded-md border border-base-border bg-base-surface text-text-primary py-2.5 pl-10 pr-4 placeholder:text-muted focus:border-brand-yellow focus:ring-brand-yellow" 
                  placeholder="Search by name or part number..." 
                  type="text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" id="parts-grid">
              {/* Torque Converters */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative h-48 w-full bg-base-surface flex items-center justify-center overflow-hidden">
                  <Image 
                    alt="Torque Converter" 
                    className="h-full w-full object-contain transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/pw/AP1GczN-d55_sY462PqD1v0X1d497Uu9304j50rS2r_3j6yX1y5_1b4h2c3j4o5k6l7m8n9p0q1r2s3t4u5v6w7x8y9z0a=s500"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">Torque Converters</h3>
                  <p className="text-sm text-text-secondary mt-1 flex-grow">High-stall & heavy-duty options available for various models.</p>
                  <p className="mt-4 text-2xl font-bold text-brand-yellow">$150.00+</p>
                </div>
              </div>

              {/* Transmission Fluids */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative h-48 w-full bg-base-surface flex items-center justify-center overflow-hidden">
                  <Image 
                    alt="Transmission Fluid" 
                    className="h-full w-full object-contain transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/pw/AP1GczP2G1v0_1h2i3j4k5l6m7n8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3p4q5r=s500"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">Transmission Fluids</h3>
                  <p className="text-sm text-text-secondary mt-1 flex-grow">Synthetic and conventional fluids for all transmission types.</p>
                  <p className="mt-4 text-2xl font-bold text-brand-yellow">$25.00 / quart</p>
                </div>
              </div>

              {/* Solenoid Packs */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative h-48 w-full bg-base-surface flex items-center justify-center overflow-hidden">
                  <Image 
                    alt="Solenoid Packs" 
                    className="h-full w-full object-contain transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/pw/AP1GczPz8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3z2y1x0w9v8u7t6s5r4q3p2o1=s500"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">Solenoid Packs</h3>
                  <p className="text-sm text-text-secondary mt-1 flex-grow">OEM and aftermarket solenoids for precise shifting control.</p>
                  <p className="mt-4 text-2xl font-bold text-brand-yellow">$120.00+</p>
                </div>
              </div>

              {/* Master Rebuild Kits */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative h-48 w-full bg-base-surface flex items-center justify-center overflow-hidden">
                  <Image 
                    alt="Rebuild Kits" 
                    className="h-full w-full object-contain transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/pw/AP1GczP5m4l3k2j1i0h9g8f7e6d5c4b3a2z1y0x9w8v7u6t5s4r3q2p1o0n9m8l7k6j5i4h3g2f1e0d9c8b7a=s500"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">Master Rebuild Kits</h3>
                  <p className="text-sm text-text-secondary mt-1 flex-grow">Comprehensive kits with all necessary seals, gaskets, and clutches.</p>
                  <p className="mt-4 text-2xl font-bold text-brand-yellow">$350.00+</p>
                </div>
              </div>

              {/* Valve Bodies */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative h-48 w-full bg-base-surface flex items-center justify-center overflow-hidden">
                  <Image 
                    alt="Valve Bodies" 
                    className="h-full w-full object-contain transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/pw/AP1GczM_9a8b7c6d5e4f3g2h1i0j9k8l7m6n5p4q3r2s1t0u9v8w7x6y5z4a3b2c1d0e9f8g7h6i5j4k3l2=s500"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">Valve Bodies</h3>
                  <p className="text-sm text-text-secondary mt-1 flex-grow">Remanufactured and performance-upgraded valve bodies.</p>
                  <p className="mt-4 text-2xl font-bold text-brand-yellow">$280.00+</p>
                </div>
              </div>

              {/* Filters & Gaskets */}
              <div className="card group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all hover:bg-base-card-hover hover:-translate-y-1">
                <div className="relative h-48 w-full bg-base-surface flex items-center justify-center overflow-hidden">
                  <Image 
                    alt="Transmission Filter" 
                    className="h-full w-full object-contain transition-transform group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/pw/AP1GczOC9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a0z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5=s500"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">Filters & Gaskets</h3>
                  <p className="text-sm text-text-secondary mt-1 flex-grow">Keep your transmission clean and sealed with quality parts.</p>
                  <p className="mt-4 text-2xl font-bold text-brand-yellow">$15.00+</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}