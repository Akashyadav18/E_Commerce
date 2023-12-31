import { Inter } from 'next/font/google'
import './globals.css'
import GlobalState from '@/context/Index'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E commerce',
  description: 'website that allows people to buy and sell goods, services, and digital products online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
        <Toaster />
          <Navbar />
          <main className='flex min-h-[calc(100vh-5rem)] flex-col mt-[75px]'>
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  )
}
