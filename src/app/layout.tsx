import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <title>CineJaro</title>
      </head>
      <body className="bg-custom">
        <Navbar />
        <main className="container mt-4">
          {children}
        </main>
      </body>
    </html>
  )
}