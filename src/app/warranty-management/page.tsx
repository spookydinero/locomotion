'use client';

export default function WarrantyManagementPage() {
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
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="/lifts-management">Work Orders</a>
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="/quotes-pos">Quotes & POs</a>
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="/inventory-management">Inventory</a>
              <a className="text-sm font-medium text-primary" href="/warranty-management">Warranty</a>
              <a className="text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary" href="#">Reporting</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark">
                <span className="material-symbols-outlined text-subtext-light dark:text-subtext-dark">notifications</span>
              </button>
              <img alt="User avatar" className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFWFFlhBU5v8rOwkXZfHqAGPOwEK7pQX42PAdbdPDJFF4Qz4MPqAiVztz33ycyV0kH90phSC9Kj_QNiwcy08nYrUOP4RzoSTJlJ7n6XIxyge0ZW3kvMDUgLA69-Nkbj9ySk1HpLk5bgKSyXlYtQEaD10xObX-qKHXJYrKD8L5Rzzbj2NCe63MgainHn_FDKLMmakG9o0vx5O7jSUhi2o9bexlmJOEstXLKWj2h2iLVrTehoxUsJW-DWcUO6DtRRL4uZqaXWFMKfyA"/>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Warranty Approval</h1>
            <p className="text-subtext-light dark:text-subtext-dark mt-1">Welcome back, Alex. Approve warranties here.</p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark shadow-sm">
            {/* Warranty Details Section */}
            <div className="p-6 border-b border-border-light dark:border-border-dark">
              <h2 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Warranty Details</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-subtext-light dark:text-subtext-dark">Unit Family</dt>
                  <dd className="mt-1 text-base font-semibold text-text-light dark:text-text-dark">Engine</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-subtext-light dark:text-subtext-dark">Coverage</dt>
                  <dd className="mt-1 text-base font-semibold text-text-light dark:text-text-dark">24 mo / 24,000 mi</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-subtext-light dark:text-subtext-dark">Root Cause</dt>
                  <dd className="mt-1 text-base font-semibold text-text-light dark:text-text-dark">Faulty Fuel Injector</dd>
                </div>
              </dl>
            </div>
            
            {/* Evidence Section */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Evidence</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 md:col-span-2 md:row-span-2 rounded-lg overflow-hidden group relative">
                  <img 
                    alt="Evidence photo 1" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDywHGBCwhJ7OH-dvDI872c5S02tTnzWCvzlS-IkGU8InemzGz_AMEdPheWypft35qYP_gPbCInBFi5unUJO1fDKXQk75kZx8S3YjEc9R0fxhFet4WD0mOGpVaUSe9sxNwFyHNl1Jm2Ju3ZOs1DabcFD-nGcIiKUY_D9Tjv4z5UEpJD6qUvTlvE8pFwlsZMkp-AU30HSyZu-ugocRGj63vZwHXSvK9kKoV58xikV8OKO3yy1oFOysT4WpIoq-qW2950ASFBqmtLcao"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="col-span-1 md:col-span-2 rounded-lg overflow-hidden group relative">
                  <img 
                    alt="Evidence photo 2" 
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF532qSq5PyeJd11lYiWLGJ85GaC446q4IBYqG9XYAK4GgC1O_BEpIlYjNTWDzQrbkY09Jl31ZEfw9zRA5pkN814MAnfDFTQ3BH2amRLBBOit9oyxspq4dr3_PL-XSJ-wi54Y6jA3eXOxlCAkGdC7Mw991MvDdCCApzg9ZQIchOL2O1X8k2mr_q8nUTxWPczhZ-NXqI3T67koos0O9OxikCO_cpbCREoLltxISfRACjlFncECyLIcAkLbnJsv4C1e6A5IYn0Eokeg"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="col-span-1 md:col-span-2 rounded-lg overflow-hidden group relative">
                  <img 
                    alt="Evidence photo 3" 
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNCgp79GsO3ez2e7ssdz1VURp0deHR4voYA2jVtcPzvP3HSe0pAaPjnjgFwGxgd6n93xBYa0ILUYMVq3WFyXjaji9PN25VlMIbWRmwqEXwsACSDKetqwEHMLm4TRfhuTt147YkP6QTzN5551ieoTXFZLvatp2HnJTKaMOtpNYpQI8tDxXXYZteHpp3-W023K4kHJLvIKn_NjwI8sRAFIA0X5iGHsW5IR9OPeAfizqVIejPOkS4eYyoQfnQNXGZJDu7hO84dL1rVhM"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 dark:focus:ring-offset-background-dark transition-colors duration-300">
              Approve and Log Warranty
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}