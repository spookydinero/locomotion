'use client'

import Image from 'next/image';

export default function LiftsManagement() {
  return (
    <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
              <h1 className="text-xl font-bold text-text-light dark:text-text-dark">Locomotion AI</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="/operations-dashboard">Dashboard</a>
              <a className="text-sm font-medium text-primary" href="/lifts-management">Work Orders</a>
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="/quotes-pos">Quotes & POs</a>
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="/inventory-management">Inventory</a>
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="/warranty-management">Warranty</a>
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="#">Reporting</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark">
                <span className="material-symbols-outlined text-subtext-light dark:text-subtext-dark">notifications</span>
              </button>
              <Image alt="User avatar" className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFWFFlhBU5v8rOwkXZfHqAGPOwEK7pQX42PAdbdPDJFF4Qz4MPqAiVztz33ycyV0kH90phSC9Kj_QNiwcy08nYrUOP4RzoSTJlJ7n6XIxyge0ZW3kvMDUgLA69-Nkbj9ySk1HpLk5bgKSyXlYtQEaD10xObX-qKHXJYrKD8L5Rzzbj2NCe63MgainHn_FDKLMmakG9o0vx5O7jSUhi2o9bexlmJOEstXLKWj2h2iLVrTehoxUsJW-DWcUO6DtRRL4uZqaXWFMKfyA" width={40} height={40}/>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lift Board</h1>
            <p className="text-subtext-light dark:text-subtext-dark mt-1">Welcome back, Alex. Manage your lifts here.</p>
          </div>
            <div className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 font-medium" scope="col">Lift</th>
                      <th className="px-6 py-3 font-medium" scope="col">Status</th>
                      <th className="px-6 py-3 font-medium" scope="col">Job</th>
                      <th className="px-6 py-3 font-medium" scope="col">Countdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-background-dark/50 border-b dark:border-gray-700/50">
                      <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" scope="row">Lift 1</th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                          <span className="size-2 bg-primary rounded-full mr-2"></span>In Use
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Job #12345 - Vehicle Repair</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-mono">00:30:00</td>
                    </tr>
                    <tr className="bg-white dark:bg-background-dark/50 border-b dark:border-gray-700/50">
                      <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" scope="row">Lift 2</th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          <span className="size-2 bg-green-500 rounded-full mr-2"></span>Available
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 dark:text-gray-500">-</td>
                      <td className="px-6 py-4 text-gray-400 dark:text-gray-500">-</td>
                    </tr>
                    <tr className="bg-white dark:bg-background-dark/50 border-b dark:border-gray-700/50">
                      <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" scope="row">Lift 3</th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          <span className="size-2 bg-yellow-500 rounded-full mr-2"></span>Cleaning
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 dark:text-gray-500">-</td>
                      <td className="px-6 py-4 text-gray-400 dark:text-gray-500">-</td>
                    </tr>
                    <tr className="bg-white dark:bg-background-dark/50">
                      <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" scope="row">Lift 4</th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          <span className="size-2 bg-red-500 rounded-full mr-2"></span>Maintenance
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 dark:text-gray-500">-</td>
                      <td className="px-6 py-4 text-gray-400 dark:text-gray-500">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">build_circle</span>
                Now
              </h3>
              <div className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/50 p-4">
                <div className="space-y-4">
                  <div className="font-medium text-gray-900 dark:text-white">Job #12345 - Vehicle Repair</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p><strong>Vehicle:</strong> 2020 Sedan</p>
                    <p><strong>Customer:</strong> Ethan Carter</p>
                    <p><strong>Lift:</strong> Lift 1</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">update</span>
                Next (Pre-lift staging)
              </h3>
              <div className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/50 p-4 space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700/50 pb-4">
                  <div className="font-medium text-gray-900 dark:text-white">Job #67890 - Tire Change</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <p><strong>Vehicle:</strong> 2018 SUV</p>
                    <p><strong>Customer:</strong> Olivia Bennett</p>
                    <p><strong>Est. Lift Time:</strong> 10:00 AM</p>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Job #24680 - Brake Service</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <p><strong>Vehicle:</strong> 2015 Truck</p>
                    <p><strong>Customer:</strong> Noah Thompson</p>
                    <p><strong>Est. Lift Time:</strong> 11:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event</span>
                Later
              </h3>
              <div className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/50 p-4 space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700/50 pb-4">
                  <div className="font-medium text-gray-900 dark:text-white">Job #13579 - Oil Change</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <p><strong>Vehicle:</strong> 2022 Hatchback</p>
                    <p><strong>Customer:</strong> Sophia Davis</p>
                    <p><strong>Scheduled Time:</strong> 1:00 PM</p>
                  </div>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700/50 pb-4">
                  <div className="font-medium text-gray-900 dark:text-white">Job #97531 - Alignment</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <p><strong>Vehicle:</strong> 2019 Crossover</p>
                    <p><strong>Customer:</strong> Liam Walker</p>
                    <p><strong>Scheduled Time:</strong> 2:30 PM</p>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Job #11223 - Transmission Check</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <p><strong>Vehicle:</strong> 2017 Minivan</p>
                    <p><strong>Customer:</strong> Isabella Harris</p>
                    <p><strong>Scheduled Time:</strong> 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}