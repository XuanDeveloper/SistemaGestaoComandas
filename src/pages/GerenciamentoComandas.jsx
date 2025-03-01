import React, { useState } from 'react'
import { FiFilter, FiEye, FiEdit2, FiTrash2, FiPrinter, FiCheck, FiX } from 'react-icons/fi'

// Dados de exemplo
const comandasExemplo = [
  { 
    id: 1, 
    cliente: 'Mesa 01', 
    status: 'em_andamento', 
    valor: 78.50, 
    horario: '14:30', 
    atendente: 'João',
    itens: [
      { id: 1, nome: 'X-Burger', quantidade: 2, preco: 18.90, observacao: 'Sem cebola' },
      { id: 2, nome: 'Batata Frita P', quantidade: 1, preco: 8.90, observacao: '' },
      { id: 3, nome: 'Refrigerante Lata', quantidade: 2, preco: 5.00, observacao: 'Coca-Cola' }
    ]
  },
  { 
    id: 2, 
    cliente: 'Mesa 03', 
    status: 'em_andamento', 
    valor: 45.00, 
    horario: '14:45', 
    atendente: 'Maria',
    itens: [
      { id: 1, nome: 'X-Salada', quantidade: 1, preco: 20.90, observacao: '' },
      { id: 2, nome: 'Suco Natural', quantidade: 2, preco: 7.50, observacao: 'Laranja' }
    ]
  },
  { 
    id: 3, 
    cliente: 'Balcão 02', 
    status: 'pronto', 
    valor: 22.90, 
    horario: '15:00', 
    atendente: 'João',
    itens: [
      { id: 1, nome: 'X-Burger', quantidade: 1, preco: 18.90, observacao: '' },
      { id: 2, nome: 'Água Mineral', quantidade: 1, preco: 3.50, observacao: 'Sem gás' }
    ]
  },
  { 
    id: 4, 
    cliente: 'Mesa 05', 
    status: 'finalizado', 
    valor: 63.75, 
    horario: '13:20', 
    atendente: 'Ana',
    itens: [
      { id: 1, nome: 'X-Salada', quantidade: 2, preco: 20.90, observacao: '' },
      { id: 2, nome: 'Batata Frita G', quantidade: 1, preco: 14.90, observacao: '' },
      { id: 3, nome: 'Refrigerante Lata', quantidade: 1, preco: 5.00, observacao: 'Sprite' }
    ]
  },
  { 
    id: 5, 
    cliente: 'Mesa 02', 
    status: 'em_andamento', 
    valor: 105.30, 
    horario: '15:15', 
    atendente: 'Maria',
    itens: [
      { id: 1, nome: 'X-Burger', quantidade: 3, preco: 18.90, observacao: '' },
      { id: 2, nome: 'Batata Frita G', quantidade: 2, preco: 14.90, observacao: '' },
      { id: 3, nome: 'Cerveja', quantidade: 2, preco: 8.90, observacao: 'Bem gelada' }
    ]
  },
]

const GerenciamentoComandas = () => {
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [filtroAtendente, setFiltroAtendente] = useState('todos')
  const [comandaDetalhada, setComandaDetalhada] = useState(null)
  const [modalConfirmacao, setModalConfirmacao] = useState(null)
  
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
  
  // Abrir modal de detalhes
  const abrirDetalhes = (comanda) => {
    setComandaDetalhada(comanda)
  }
  
  // Fechar modal de detalhes
  const fecharDetalhes = () => {
    setComandaDetalhada(null)
  }
  
  // Abrir modal de confirmação
  const abrirConfirmacao = (tipo, comanda) => {
    setModalConfirmacao({ tipo, comanda })
  }
  
  // Fechar modal de confirmação
  const fecharConfirmacao = () => {
    setModalConfirmacao(null)
  }
  
  // Finalizar comanda
  const finalizarComanda = (id) => {
    // Aqui seria feita a integração com a API
    alert(`Comanda ${id} finalizada com sucesso!`)
    fecharConfirmacao()
  }
  
  // Excluir comanda
  const excluirComanda = (id) => {
    // Aqui seria feita a integração com a API
    alert(`Comanda ${id} excluída com sucesso!`)
    fecharConfirmacao()
  }
  
  // Imprimir comanda
  const imprimirComanda = (id) => {
    // Aqui seria feita a integração com a impressora
    alert(`Comanda ${id} enviada para impressão!`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Comandas</h1>
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
        <h2 className="font-medium p-4 border-b">Comandas</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
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
                    #{comanda.id}
                  </td>
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
                    {comanda.atendente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => abrirDetalhes(comanda)}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      <FiEye size={18} />
                    </button>
                    
                    {comanda.status !== 'finalizado' && (
                      <>
                        <button 
                          onClick={() => abrirConfirmacao('finalizar', comanda)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          <FiCheck size={18} />
                        </button>
                        
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <FiEdit2 size={18} />
                        </button>
                      </>
                    )}
                    
                    <button 
                      onClick={() => imprimirComanda(comanda.id)}
                      className="text-gray-600 hover:text-gray-900 mr-3"
                    >
                      <FiPrinter size={18} />
                    </button>
                    
                    <button 
                      onClick={() => abrirConfirmacao('excluir', comanda)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 size={18} />
                    </button>
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
      
      {/* Modal de detalhes da comanda */}
      {comandaDetalhada && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    Detalhes da Comanda #{comandaDetalhada.id}
                  </h3>
                  <button
                    onClick={fecharDetalhes}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Cliente</p>
                      <p className="font-medium">{comandaDetalhada.cliente}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(comandaDetalhada.status)}`}>
                          {getStatusText(comandaDetalhada.status)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horário</p>
                      <p className="font-medium">{comandaDetalhada.horario}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Atendente</p>
                      <p className="font-medium">{comandaDetalhada.atendente}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Itens</h4>
                    
                    <div className="space-y-3">
                      {comandaDetalhada.itens.map((item) => (
                        <div key={item.id} className="flex justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{item.nome}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantidade} x R$ {item.preco.toFixed(2)}
                            </p>
                            {item.observacao && (
                              <p className="text-xs text-gray-500 mt-1">
                                Obs: {item.observacao}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              R$ {(item.quantidade * item.preco).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-lg font-bold">
                        R$ {comandaDetalhada.valor.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => imprimirComanda(comandaDetalhada.id)}
                  className="btn btn-primary w-full sm:w-auto sm:ml-3"
                >
                  <FiPrinter className="mr-2" />
                  Imprimir
                </button>
                <button
                  type="button"
                  onClick={fecharDetalhes}
                  className="btn btn-secondary mt-3 sm:mt-0 w-full sm:w-auto"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de confirmação */}
      {modalConfirmacao && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                    modalConfirmacao.tipo === 'excluir' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    {modalConfirmacao.tipo === 'excluir' ? (
                      <FiTrash2 className="h-6 w-6 text-red-600" />
                    ) : (
                      <FiCheck className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {modalConfirmacao.tipo === 'excluir' 
                        ? 'Excluir Comanda' 
                        : 'Finalizar Comanda'}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {modalConfirmacao.tipo === 'excluir'
                          ? `Tem certeza que deseja excluir a comanda #${modalConfirmacao.comanda.id}? Esta ação não pode ser desfeita.`
                          : `Tem certeza que deseja finalizar a comanda #${modalConfirmacao.comanda.id}?`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => modalConfirmacao.tipo === 'excluir' 
                    ? excluirComanda(modalConfirmacao.comanda.id)
                    : finalizarComanda(modalConfirmacao.comanda.id)
                  }
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                    modalConfirmacao.tipo === 'excluir' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {modalConfirmacao.tipo === 'excluir' ? 'Excluir' : 'Finalizar'}
                </button>
                <button
                  type="button"
                  onClick={fecharConfirmacao}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GerenciamentoComandas