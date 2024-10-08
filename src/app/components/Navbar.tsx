import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">CineJaro</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/peliculas" className="nav-link">Películas</Link>
            </li>
            <li className="nav-item">
              <Link href="/series" className="nav-link">Series</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}