import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeToggle'

const StarryBackground = dynamic(() => import('./components/StarryBackground'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <title>CineJaro</title>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
      </head>
      <ThemeProvider>
        <body>
          <StarryBackground />
          <Navbar />
          <ThemeToggle />
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}