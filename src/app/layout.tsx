import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'

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
      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link href="/" className="navbar-brand">CineJaro</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/peliculas" className="nav-link">Películas</Link>
                </li>
                <li className="nav-item">
                  <Link href="/peliculas/crear" className="nav-link">Crear Película</Link>
                </li>
                <li className="nav-item">
                  <Link href="/series" className="nav-link">Series</Link>
                </li>
                <li className="nav-item">
                  <Link href="/series/crear" className="nav-link">Crear Serie</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container mt-4">
          {children}
        </main>
      </body>
    </html>
  )
}