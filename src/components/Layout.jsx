import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  FiHome, 
  FiPlusCircle, 
  FiList, 
  FiCoffee, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi'

const Layout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const NavItem = ({ to, icon, label }) => (
    <NavLink 
      to={to} 
      onClick={closeSidebar}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary-100 text-primary-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">GC</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Comandas</h1>
            </div>
            <button 
              className="p-1 rounded-md lg:hidden hover:bg-gray-100"
              onClick={closeSidebar}
            >
              <FiX size={24} />
            </button>
          </div>

          {/* User info */}
          <div className="p-4 border-b">
            <p className="font-medium text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role === 'admin' ? 'Administrador' : 'Atendente'}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <NavItem to="/" icon={<FiHome size={20} />} label="Dashboard" />
            <NavItem to="/criar-comanda" icon={<FiPlusCircle size={20} />} label="Nova Comanda" />
            <NavItem to="/gerenciamento" icon={<FiList size={20} />} label="Gerenciamento" />
            <NavItem to="/cozinha" icon={<FiCoffee size={20} />} label="Cozinha" />
            <NavItem to="/configuracoes" icon={<FiSettings size={20} />} label="Configurações" />
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-left text-red-600 rounded-lg hover:bg-red-50"
            >
              <FiLogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              className="p-1 rounded-md lg:hidden hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 lg:hidden">
              Comandas
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout