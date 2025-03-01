import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CriarComanda from './pages/CriarComanda'
import GerenciamentoComandas from './pages/GerenciamentoComandas'
import TelaCozinha from './pages/TelaCozinha'
import Configuracoes from './pages/Configuracoes'

// Layout
import Layout from './components/Layout'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="criar-comanda" element={<CriarComanda />} />
          <Route path="gerenciamento" element={<GerenciamentoComandas />} />
          <Route path="cozinha" element={<TelaCozinha />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App