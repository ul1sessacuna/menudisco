import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PublicMenu from './pages/PublicMenu'
import AdminMenu from './pages/AdminMenu'
import Login from './componentes/Login'
import { useEffect, useState } from 'react'
import { auth } from './firebase/config'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicMenu />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={user ? <AdminMenu /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
