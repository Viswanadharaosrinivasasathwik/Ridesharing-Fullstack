import { useEffect, useState } from 'react'
import { API_URL } from '../config.js'

const emptyForm = { pickupLocation: '', dropLocation: '', fare: '', completed: 'false' }

export default function TripManager({ page }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null) // { type: 'success' | 'danger', text }

  const showAlert = (type, text) => {
    setAlert({ type, text })
    setTimeout(() => setAlert(null), 4000)
  }

  // ---------- READ ----------
  const loadTrips = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/trips`)
      if (!res.ok) throw new Error('Server returned ' + res.status)
      setTrips(await res.json())
    } catch (e) {
      showAlert('danger', 'Could not load trips. Is the backend running? (' + e.message + ')')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (page === 'view') loadTrips() }, [page])

  // ---------- VALIDATION ----------
  const validate = () => {
    const e = {}
    const p = form.pickupLocation.trim()
    const d = form.dropLocation.trim()
    if (!p) e.pickupLocation = 'Pickup location is required'
    else if (p.length < 2 || p.length > 100) e.pickupLocation = 'Must be 2 to 100 characters'
    if (!d) e.dropLocation = 'Drop location is required'
    else if (d.length < 2 || d.length > 100) e.dropLocation = 'Must be 2 to 100 characters'
    else if (p && p.toLowerCase() === d.toLowerCase()) e.dropLocation = 'Drop must differ from pickup'
    if (form.fare === '') e.fare = 'Fare is required'
    else if (isNaN(Number(form.fare))) e.fare = 'Fare must be a number'
    else if (Number(form.fare) < 1 || Number(form.fare) > 100000) e.fare = 'Fare must be between 1 and 100000'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (ev) => setForm({ ...form, [ev.target.name]: ev.target.value })

  // ---------- CREATE (no id is sent) ----------
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      const res = await fetch(`${API_URL}/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupLocation: form.pickupLocation.trim(),
          dropLocation: form.dropLocation.trim(),
          fare: Number(form.fare),
          completed: form.completed === 'true',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.errors ? Object.values(data.errors).join(', ') : data.message)
      }
      showAlert('success', `Trip added successfully (ID ${data.id})`)
      setForm(emptyForm)
      setErrors({})
    } catch (e) {
      showAlert('danger', 'Failed to add trip: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    if (!window.confirm(`Delete trip ${id}?`)) return
    try {
      const res = await fetch(`${API_URL}/trips/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      showAlert('success', data.message)
      loadTrips()
    } catch (e) {
      showAlert('danger', 'Failed to delete: ' + e.message)
    }
  }

  const field = (name) => `form-control ${errors[name] ? 'is-invalid' : ''}`

  return (
    <>
      {alert && <div className={`alert alert-${alert.type}`} role="alert">{alert.text}</div>}

      {page === 'add' && (
        <div className="card p-4">
          <h4 className="mb-3">Add New Trip</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Pickup Location</label>
                <input name="pickupLocation" className={field('pickupLocation')}
                       value={form.pickupLocation} onChange={handleChange} placeholder="e.g. Benz Circle" />
                <div className="invalid-feedback">{errors.pickupLocation}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Drop Location</label>
                <input name="dropLocation" className={field('dropLocation')}
                       value={form.dropLocation} onChange={handleChange} placeholder="e.g. Railway Station" />
                <div className="invalid-feedback">{errors.dropLocation}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Fare (₹)</label>
                <input name="fare" type="number" step="0.01" className={field('fare')}
                       value={form.fare} onChange={handleChange} placeholder="e.g. 250" />
                <div className="invalid-feedback">{errors.fare}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Trip Completed?</label>
                <select name="completed" className="form-select" value={form.completed} onChange={handleChange}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary mt-4" disabled={saving}>
              {saving ? 'Saving...' : 'Add Trip'}
            </button>
          </form>
        </div>
      )}

      {page === 'view' && (
        <div className="card p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">All Trips</h4>
            <button className="btn btn-outline-primary btn-sm" onClick={loadTrips}>Refresh</button>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
              <div className="mt-2">Loading trips...</div>
            </div>
          ) : trips.length === 0 ? (
            <div className="text-center text-muted py-4">No trips found. Add one from the “Add Trip” page.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th><th>Pickup</th><th>Drop</th><th>Fare (₹)</th><th>Status</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((t) => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.pickupLocation}</td>
                      <td>{t.dropLocation}</td>
                      <td>{Number(t.fare).toFixed(2)}</td>
                      <td>
                        <span className={`badge ${t.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {t.completed ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  )
}
