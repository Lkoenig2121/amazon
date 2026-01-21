import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { CartProvider } from '@/contexts/CartContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { WishlistProvider } from '@/contexts/WishlistContext'

export const metadata: Metadata = {
  title: 'Amazon.com: Online Shopping',
  description: 'Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              {children}
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

