import { useState } from 'react'
import TripManager from './components/TripManager.jsx'

export default function App() {
  const [page, setPage] = useState('add')
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (p) => { setPage(p); setMenuOpen(false) }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark brand-bar">
        <div className="container">
          <span className="navbar-brand fw-bold">🚖 RideShare Trips</span>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation"
                  onClick={() => setMenuOpen(!menuOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className={`nav-link btn btn-link ${page === 'add' ? 'active fw-bold' : ''}`}
                        onClick={() => go('add')}>Add Trip</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link btn btn-link ${page === 'view' ? 'active fw-bold' : ''}`}
                        onClick={() => go('view')}>View / Delete Trips</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <h2 className="mb-4">Ride Sharing Trip Management : 2400030159</h2>
        <TripManager page={page} />
      </div>
    </>
  )
}
