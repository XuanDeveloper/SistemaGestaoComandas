import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário no localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simulação de autenticação
    // Em um ambiente real, isso seria uma chamada de API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@exemplo.com' && password === 'senha123') {
          const userData = {
            id: 1,
            name: 'Administrador',
            email: 'admin@exemplo.com',
            role: 'admin'
          }
          
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          resolve(userData)
        }else {
          reject(new Error('Credenciais inválidas'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const forgotPassword = (email) => {
    // Simulação de recuperação de senha
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Instruções enviadas para o email' })
      }, 1000)
    })
  }

  const value = {
    user,
    loading,
    login,
    logout,
    forgotPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}