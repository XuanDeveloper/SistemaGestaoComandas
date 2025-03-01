import React, { useState } from 'react'
import { FiClock, FiCheck, FiPrinter, FiAlertCircle } from 'react-icons/fi'

// Dados de exemplo
const pedidosExemplo = [
  { 
    id: 1, 
    comanda: 1,
    cliente: 'Mesa 01', 
    status: 'em_preparo', 
    horario: '14:30',
    tempoEspera: '10 min',
    itens: [
      { id: 1, nome: 'X-Burger', quantidade: 2, observacao: 'Sem cebola' },
      { id: 2, nome: 'Batata Frita P', quantidade: 1, observacao: '' }
    ]
  },
  { 
    id: 2, 
    comanda: 2,
    cliente: 'Mesa 03', 
    status: 'em_preparo', 
    horario: '14:45',
    tempoEspera: '5 min',
    itens: [
      { id: 1, nome: 'X-Salada', quantidade: 1, observacao: '' }
    ]
  },
  { 
    id: 3, 
    comanda: 3,
    cliente: 'Balcão 02', 
    status: 'pronto', 
    horario: '15:00',
    tempoEspera: '15 min',
    itens: [
      { id: 1, nome: 'X-Burger', quantidade: 1, observacao: '' }
    ]
  },
  { 
    id: 5, 
    comanda: 5,
    cliente: 'Mesa 02', 
    status: 'em_preparo', 
    horario: '15:15',
    tempoEspera: '2 min',
    itens: [
      { id: 1, nome: 'X-Burger', quantidade: 3, observacao: '' },
      { id: 2, nome: 'Batata Frita G', quantidade: 2, observacao: '' }
    ]
  },
]

const TelaCozinha = () => {
  const [pedidos, setPedidos] = useState(pedidosExemplo)
  
  // Marcar pedido como pronto
  const marcarComoPronto = (id) => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === id ? { ...pedido, status: 'pronto' } : pedido
    ))
  }
  
  // Imprimir pedido
  const imprimirPedido = (id) => {
    // Aqui seria feita a integração com a impressora
    alert(`Pedido ${id} enviado para impressão!`)
  }
  
  // Filtrar pedidos em preparo e prontos
  const pedidosEmPreparo = pedidos.filter(pedido => pedido.status === 'em_preparo')
  const pedidosProntos = pedidos.filter(pedido => pedido.status === 'pronto')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tela da Cozinha</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Atualizado em: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      {/* Pedidos em preparo */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Pedidos em Preparo</h2>
        
        {pedidosEmPreparo.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            Não há pedidos em preparo no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pedidosEmPreparo.map(pedido => (
              <div key={pedido.id} className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-yellow-500">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{pedido.cliente}</h3>
                      <p className="text-sm text-gray-500">Comanda #{pedido.comanda}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      <FiClock size={14} />
                      <span>{pedido.tempoEspera}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-2 my-2">
                    <h4 className="font-medium text-sm text-gray-500 mb-2">Itens:</h4>
                    <ul className="space-y-2">
                      {pedido.itens.map(item => (
                        <li key={item.id} className="flex justify-between">
                          <div>
                            <span className="font-medium">{item.quantidade}x {item.nome}</span>
                            {item.observacao && (
                              <p className="text-xs text-gray-500 mt-1">
                                <FiAlertCircle className="inline mr-1" size={12} />
                                {item.observacao}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Horário: {pedido.horario}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => imprimirPedido(pedido.id)}
                        className="p-1 hover:text-gray-700"
                      >
                        <FiPrinter size={18} />
                      </button>
                      <button 
                        onClick={() => marcarComoPronto(pedido.id)}
                        className="p-1 text-green-600 hover:text-green-700"
                      >
                        <FiCheck size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Pedidos prontos */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Pedidos Prontos</h2>
        
        {pedidosProntos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            Não há pedidos prontos no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pedidosProntos.map(pedido => (
              <div key={pedido.id} className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-green-500">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{pedido.cliente}</h3>
                      <p className="text-sm text-gray-500">Comanda #{pedido.comanda}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      <FiCheck size={14} />
                      <span>Pronto</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-2 my-2">
                    <h4 className="font-medium text-sm text-gray-500 mb-2">Itens:</h4>
                    <ul className="space-y-2">
                      {pedido.itens.map(item => (
                        <li key={item.id} className="flex justify-between">
                          <div>
                            <span className="font-medium">{item.quantidade}x {item.nome}</span>
                            {item.observacao && (
                              <p className="text-xs text-gray-500 mt-1">
                                <FiAlertCircle className="inline mr-1" size={12} />
                                {item.observacao}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Horário: {pedido.horario}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => imprimirPedido(pedido.id)}
                        className="p-1 hover:text-gray-700"
                      >
                        <FiPrinter size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TelaCozinha