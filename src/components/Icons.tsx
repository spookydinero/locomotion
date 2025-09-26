import dynamic from 'next/dynamic'

// Dynamically import icons with SSR disabled to prevent hydration issues
export const TrendingUp = dynamic(() => import('lucide-react').then(mod => ({ default: mod.TrendingUp })), { ssr: false })
export const TrendingDown = dynamic(() => import('lucide-react').then(mod => ({ default: mod.TrendingDown })), { ssr: false })
export const Minus = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Minus })), { ssr: false })
export const Bell = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Bell })), { ssr: false })
export const Calendar = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Calendar })), { ssr: false })
export const FileText = dynamic(() => import('lucide-react').then(mod => ({ default: mod.FileText })), { ssr: false })
export const Users = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Users })), { ssr: false })
export const DollarSign = dynamic(() => import('lucide-react').then(mod => ({ default: mod.DollarSign })), { ssr: false })
export const UserPlus = dynamic(() => import('lucide-react').then(mod => ({ default: mod.UserPlus })), { ssr: false })
export const CalendarCheck = dynamic(() => import('lucide-react').then(mod => ({ default: mod.CalendarCheck })), { ssr: false })
export const Receipt = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Receipt })), { ssr: false })
export const CreditCard = dynamic(() => import('lucide-react').then(mod => ({ default: mod.CreditCard })), { ssr: false })
export const Wrench = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Wrench })), { ssr: false })
export const Car = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Car })), { ssr: false })
export const Package = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Package })), { ssr: false })
export const QrCode = dynamic(() => import('lucide-react').then(mod => ({ default: mod.QrCode })), { ssr: false })
export const LayoutDashboard = dynamic(() => import('lucide-react').then(mod => ({ default: mod.LayoutDashboard })), { ssr: false })
export const ClipboardList = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ClipboardList })), { ssr: false })
export const ShieldCheck = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ShieldCheck })), { ssr: false })

// Default icon size for consistency
export const ICON_SIZE = 20