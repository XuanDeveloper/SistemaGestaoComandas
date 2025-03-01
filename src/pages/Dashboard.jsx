import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlusCircle, FiFilter, FiClock, FiUser, FiDollarSign, FiCheckCircle } from 'react-icons/fi'

// Dados de exemplo
const comandasExemplo = [
  { id: 1, cliente: 'Mesa 01', status: 'em_andamento', valor: 78.50, horario: '14:30', atendente: 'João' },
  { id: 2, cliente: 'Mesa 03', status: 'em_andamento', valor: 45.00, horario: '14:45', atendente: 'Maria' },
  { id: 3, cliente: 'Balcão 02', status: 'pronto', valor: 22.90, horario: '15:00', atendente: 'João' },
  { id: 4, cliente: 'Mesa 05', status: 'finalizado', valor: 63.75, horario: '13:20', atendente: 'Ana' },
  { id: 5, cliente: 'Mesa 02', status: 'em_andamento', valor: 105.30, horario: '15:15', atendente: 'Maria' },
]

const Dashboard = () => {
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [filtroAtendente, setFiltroAtendente] = useState('todos')
  
  // Estatísticas
  const totalComandas = comandasExemplo.length
  const comandasAtivas = comandasExemplo.filter(c => c.status !== 'finalizado').length
  const valorTotal = comandasExemplo.reduce((acc, curr) => acc + curr.valor, 0).toFixed(2)
  
  // Filtrar comandas
  const comandasFiltradas = comandasExemplo.filter(comanda => {
    const passaFiltroStatus = filtroStatus === 'todos' || comanda.status === filtroStatus
    const passaFiltroAtendente = filtroAtendente === 'todos' || comanda.atendente === filtroAtendente
    return passaFiltroStatus && passaFiltroAtendente
  })
  
  // Função para obter a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800'
      case 'pronto': return 'bg-green-100 text-green-800'
      case 'finalizado': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  // Função para obter o texto do status
  const getStatusText = (status) => {
    switch (status) {
      case 'em_andamento': return 'Em andamento'
      case 'pronto': return 'Pronto'
      case 'finalizado': return 'Finalizado'
      default: return 'Desconhecido'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link to="/criar-comanda" className="btn btn-primary inline-flex items-center gap-2">
          <FiPlusCircle />
          <span>Nova Comanda</span>
        </Link>
      </div>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-white p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <FiClock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Comandas Ativas</p>
            <p className="text-2xl font-bold">{comandasAtivas}</p>
          </div>
        </div>
        
        <div className="card bg-white p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total de Comandas</p>
            <p className="text-2xl font-bold">{totalComandas}</p>
          </div>
        </div>
        
        <div className="card bg-white p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <FiDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Valor Total</p>
            <p className="text-2xl font-bold">R$ {valorTotal}</p>
          </div>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="card bg-white p-4">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter className="text-gray-500" />
          <h2 className="font-medium">Filtros</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="filtroStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="filtroStatus"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="input"
            >
              <option value="todos">Todos</option>
              <option value="em_andamento">Em andamento</option>
              <option value="pronto">Pronto</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="filtroAtendente" className="block text-sm font-medium text-gray-700 mb-1">
              Atendente
            </label>
            <select
              id="filtroAtendente"
              value={filtroAtendente}
              onChange={(e) => setFiltroAtendente(e.target.value)}
              className="input"
            >
              <option value="todos">Todos</option>
              <option value="João">João</option>
              <option value="Maria">Maria</option>
              <option value="Ana">Ana</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Lista de comandas */}
      <div className="card bg-white overflow-hidden">
        <h2 className="font-medium p-4 border-b">Comandas Recentes</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atendente
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comandasFiltradas.map((comanda) => (
                <tr key={comanda.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{comanda.cliente}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(comanda.status)}`}>
                      {getStatusText(comanda.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {comanda.valor.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {comanda.horario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiUser className="mr-2 text-gray-400" />
                      {comanda.atendente}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/gerenciamento?id=${comanda.id}`} className="text-primary-600 hover:text-primary-900 mr-3">
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {comandasFiltradas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma comanda encontrada com os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard