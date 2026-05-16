'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Dumbbell,
  Languages,
  CheckSquare,
  BookOpen,
  BarChart2,
  TrendingUp,
  CalendarDays,
} from 'lucide-react'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/tasks', icon: CheckSquare, label: 'Zadania' },
  { href: '/training', icon: Dumbbell, label: 'Kalistenika' },
  { href: '/polski', icon: Languages, label: 'Polski' },
  { href: '/review', icon: BookOpen, label: 'Review' },
  { href: '/stats', icon: BarChart2, label: 'Statystyki' },
  { href: '/calendar', icon: CalendarDays, label: 'Życie' },
  { href: '/trading', icon: TrendingUp, label: 'Trading' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 z-20"
        style={{
          background: 'rgba(8, 15, 10, 0.95)',
          borderRight: '1px solid rgba(34, 197, 94, 0.12)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(34, 197, 94, 0.1)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #22C55E, #4ADE80)', boxShadow: '0 0 15px rgba(34,197,94,0.4)' }}
            >
              LD
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: '#f0fdf4' }}>Life Dashboard</div>
              <div className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>by Jędrzej</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                style={{
                  background: active ? 'rgba(34, 197, 94, 0.12)' : 'transparent',
                  border: active ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid transparent',
                  color: active ? '#4ADE80' : 'rgba(240,253,244,0.55)',
                }}
              >
                <Icon
                  size={18}
                  style={{ color: active ? '#4ADE80' : 'rgba(240,253,244,0.4)' }}
                />
                <span className="text-sm font-medium">{label}</span>
                {active && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'rgba(34, 197, 94, 0.08)' }}>
          <div
            className="px-4 py-3 rounded-xl text-xs"
            style={{ color: 'rgba(240,253,244,0.3)', background: 'rgba(34,197,94,0.04)' }}
          >
            <div className="font-semibold mb-1" style={{ color: 'rgba(74,222,128,0.6)' }}>
              Zasada dnia
            </div>
            Sport, głęboka praca, bez wymówek.
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around px-2 py-3"
        style={{
          background: 'rgba(8, 15, 10, 0.97)',
          borderTop: '1px solid rgba(34, 197, 94, 0.15)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {navItems.slice(0, 6).map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-2 py-1"
              style={{ color: active ? '#4ADE80' : 'rgba(240,253,244,0.4)' }}
            >
              <Icon size={20} />
              <span className="text-xs">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
