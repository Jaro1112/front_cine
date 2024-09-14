import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import dynamic from 'next/dynamic'
import Script from 'next/script'

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
      <body className="bg-custom">
        <StarryBackground />
        <Navbar />
        <main className="container mt-4">
          {children}
        </main>
      </body>
    </html>
  )
}