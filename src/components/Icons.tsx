'use client'

import dynamic from 'next/dynamic'

// Dynamically import icons with SSR disabled
const TrendingUp = dynamic(() => import('lucide-react').then(mod => ({ default: mod.TrendingUp })), { ssr: false })
const TrendingDown = dynamic(() => import('lucide-react').then(mod => ({ default: mod.TrendingDown })), { ssr: false })
const Minus = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Minus })), { ssr: false })
const Bell = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Bell })), { ssr: false })
const Calendar = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Calendar })), { ssr: false })
const FileText = dynamic(() => import('lucide-react').then(mod => ({ default: mod.FileText })), { ssr: false })
const Users = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Users })), { ssr: false })
const DollarSign = dynamic(() => import('lucide-react').then(mod => ({ default: mod.DollarSign })), { ssr: false })
const UserPlus = dynamic(() => import('lucide-react').then(mod => ({ default: mod.UserPlus })), { ssr: false })
const CalendarCheck = dynamic(() => import('lucide-react').then(mod => ({ default: mod.CalendarCheck })), { ssr: false })
const Receipt = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Receipt })), { ssr: false })
const CreditCard = dynamic(() => import('lucide-react').then(mod => ({ default: mod.CreditCard })), { ssr: false })
const Wrench = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Wrench })), { ssr: false })
const Car = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Car })), { ssr: false })
const Package = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Package })), { ssr: false })
const QrCode = dynamic(() => import('lucide-react').then(mod => ({ default: mod.QrCode })), { ssr: false })
const LayoutDashboard = dynamic(() => import('lucide-react').then(mod => ({ default: mod.LayoutDashboard })), { ssr: false })
const ClipboardList = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ClipboardList })), { ssr: false })
const ShieldCheck = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ShieldCheck })), { ssr: false })

// Re-export all icons with consistent sizing and props
export {
  TrendingUp,
  TrendingDown,
  Minus,
  Bell,
  Calendar,
  FileText,
  Users,
  DollarSign,
  UserPlus,
  CalendarCheck,
  Receipt,
  CreditCard,
  Wrench,
  Car,
  Package,
  QrCode,
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
}

// Default icon size for consistency
export const ICON_SIZE = 20