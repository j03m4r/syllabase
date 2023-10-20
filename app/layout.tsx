import SupabaseProvider from '@/providers/SupabaseProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserProvider from '@/providers/UserProvider'
import Navbar from '@/components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Syllabase',
  description: 'Find out how to succeed in your classes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <UserProvider>
            <Navbar />
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
