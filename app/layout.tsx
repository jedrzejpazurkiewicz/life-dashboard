import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Life Dashboard',
  description: 'Twój codzienny hub',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh flex">
        <Sidebar />
        <main className="flex-1 min-h-dvh overflow-y-auto relative z-10 lg:ml-64">
          <div className="max-w-4xl mx-auto px-4 py-6 pb-24 lg:pb-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
