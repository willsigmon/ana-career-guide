import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Ana's Career Guide - Roadmap to Full-Time Worship Ministry",
  description: 'Interactive career transition guide helping Ana move from education to full-time worship ministry',
  openGraph: {
    title: "Ana's Career Guide",
    description: 'Your roadmap to full-time worship ministry',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
