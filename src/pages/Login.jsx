import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  const { login, forgotPassword } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    if (!email) {
      setError('Por favor, informe seu email')
      setLoading(false)
      return
    }
    
    try {
      const result = await forgotPassword(email)
      setSuccessMessage(result.message)
    } catch (err) {
      setError('Erro ao processar a solicitação')
    } finally {
      setLoading(false)
    }
  }

  const toggleForgotPassword = () => {
    setForgotPasswordMode(!forgotPasswordMode)
    setError('')
    setSuccessMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <span className="text-2xl font-bold text-white">GC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Sistema de Gestão de Comandas
          </h1>
          <p className="text-gray-600 mt-2">
            {forgotPasswordMode ? 'Recupere sua senha' : 'Faça login para continuar'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
              {successMessage}
            </div>
          )}

          {forgotPasswordMode ? (
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mb-4"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar instruções'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleForgotPassword}
                  className="text-primary-600 hover:underline text-sm"
                >
                  Voltar para o login
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mb-4"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleForgotPassword}
                  className="text-primary-600 hover:underline text-sm"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Para fins de demonstração, use:</p>
          <p>Email: admin@exemplo.com</p>
          <p>Senha: senha123</p>
        </div>
      </div>
    </div>
  )
}

export default Login