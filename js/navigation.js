class LocomotionDashboard {
    constructor() {
        this.currentPage = 'home';
        this.previousPage = 'home';
        this.moduleMapping = {
            'owner-dashboard': 'owner_dashboard',
            'reports-overview': 'reports_overview',
            'operations-dashboard': 'operations_dashboard',
            'lifts-management': 'lifts_management',
            'quotes-pos': 'quotes_&_pos',
            'inventory-management': 'inventory_management',
            'warranty-management': 'warranty_management',
            'qc-road-test': 'qc_&_road_test',
            'technician-interface': 'technician_interface',
            'bay-worker-main': 'bay_worker_main_selection'
        };
        this.init();
    }

    init() {
        this.updateNavigation();
        this.initializeDarkMode();
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            this.previousPage = this.currentPage;
            this.currentPage = pageId;
            targetPage.classList.add('active');
        }
        
        // Update navigation
        this.updateNavigation();
    }

    async loadModule(moduleName) {
        try {
            const response = await fetch(`modules/${moduleName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load module: ${moduleName}`);
            }
            const content = await response.text();
            return content;
        } catch (error) {
            console.error('Error loading module:', error);
            return `<div class="text-center py-8"><p class="text-red-500">Error loading ${moduleName} module</p></div>`;
        }
    }

    async showModule(moduleName) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Show loading state
        mainContent.innerHTML = '<div class="text-center py-8"><div class="loading"></div><p class="mt-2">Loading...</p></div>';

        // Load and display module
        const moduleContent = await this.loadModule(moduleName);
        mainContent.innerHTML = moduleContent;

        // Update current page state
        this.currentPage = moduleName;
        this.updateActiveNavigation();
    }

    goBack() {
        this.showPage(this.previousPage);
    }

    updateNavigation() {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-primary');
            link.classList.add('text-subtext-light', 'dark:text-subtext-dark');
        });
        
        // Highlight current page nav link
        const currentNavLink = document.querySelector(`[onclick*="showPage('${this.currentPage}')"]`);
        if (currentNavLink) {
            currentNavLink.classList.remove('text-subtext-light', 'dark:text-subtext-dark');
            currentNavLink.classList.add('text-primary');
        }
    }

    updateActiveNavigation() {
        // Update navigation highlighting for modules
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-primary');
            link.classList.add('text-subtext-light', 'dark:text-subtext-dark');
        });
    }

    toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        
        // Update dark mode icon
        const darkModeBtn = document.querySelector('[onclick="dashboard.toggleDarkMode()"] .material-symbols-outlined');
        if (darkModeBtn) {
            darkModeBtn.textContent = document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode';
        }
    }

    initializeDarkMode() {
        // Initialize dark mode from localStorage
        if (localStorage.getItem('darkMode') === 'true') {
            document.documentElement.classList.add('dark');
        }
        
        // Set initial icon
        const darkModeBtn = document.querySelector('[onclick="dashboard.toggleDarkMode()"] .material-symbols-outlined');
        if (darkModeBtn) {
            darkModeBtn.textContent = document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode';
        }
    }

    // Mobile menu toggle
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }
}

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', function() {
    dashboard = new LocomotionDashboard();
});

// Global functions for onclick handlers
function showPage(pageId) {
    if (dashboard) dashboard.showPage(pageId);
}

function showModule(moduleId) {
    if (dashboard) dashboard.showModule(moduleId);
}

function goBack() {
    if (dashboard) dashboard.goBack();
}

function toggleDarkMode() {
    if (dashboard) dashboard.toggleDarkMode();
}

function toggleMobileMenu() {
    if (dashboard) dashboard.toggleMobileMenu();
}