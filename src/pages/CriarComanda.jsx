import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiPlus, FiTrash2, FiSave, FiX } from 'react-icons/fi'

// Dados de exemplo
const produtosExemplo = [
  { id: 1, nome: 'X-Burger', categoria: 'Lanches', preco: 18.90 },
  { id: 2, nome: 'X-Salada', categoria: 'Lanches', preco: 20.90 },
  { id: 3, nome: 'Batata Frita P', categoria: 'Acompanhamentos', preco: 8.90 },
  { id: 4, nome: 'Batata Frita G', categoria: 'Acompanhamentos', preco: 14.90 },
  { id: 5, nome: 'Refrigerante Lata', categoria: 'Bebidas', preco: 5.00 },
  { id: 6, nome: 'Suco Natural', categoria: 'Bebidas', preco: 7.50 },
  { id: 7, nome: 'Água Mineral', categoria: 'Bebidas', preco: 3.50 },
  { id: 8, nome: 'Cerveja', categoria: 'Bebidas', preco: 8.90 },
  { id: 9, nome: 'Pudim', categoria: 'Sobremesas', preco: 9.90 },
  { id: 10, nome: 'Sorvete', categoria: 'Sobremesas', preco: 7.90 },
]

const CriarComanda = () => {
  const navigate = useNavigate()
  
  const [cliente, setCliente] = useState('')
  const [mesa, setMesa] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [busca, setBusca] = useState('')
  const [itensSelecionados, setItensSelecionados] = useState([])
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [quantidade, setQuantidade] = useState(1)
  const [observacaoItem, setObservacaoItem] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  
  // Filtrar produtos com base na busca
  const produtosFiltrados = busca.trim() === '' 
    ? produtosExemplo 
    : produtosExemplo.filter(produto => 
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(busca.toLowerCase())
      )
  
  // Calcular valor total da comanda
  const valorTotal = itensSelecionados.reduce((total, item) => {
    return total + (item.preco * item.quantidade)
  }, 0)
  
  // Adicionar item à comanda
  const adicionarItem = () => {
    if (!produtoSelecionado) return
    
    const novoItem = {
      id: Date.now(),
      produtoId: produtoSelecionado.id,
      nome: produtoSelecionado.nome,
      preco: produtoSelecionado.preco,
      quantidade,
      observacao: observacaoItem
    }
    
    setItensSelecionados([...itensSelecionados, novoItem])
    fecharModal()
  }
  
  // Remover item da comanda
  const removerItem = (id) => {
    setItensSelecionados(itensSelecionados.filter(item => item.id !== id))
  }
  
  // Abrir modal para adicionar produto
  const abrirModal = (produto) => {
    setProdutoSelecionado(produto)
    setQuantidade(1)
    setObservacaoItem('')
    setModalAberto(true)
  }
  
  // Fechar modal
  const fecharModal = () => {
    setProdutoSelecionado(null)
    setModalAberto(false)
  }
  
  // Salvar comanda
  const salvarComanda = () => {
    // Aqui seria feita a integração com a API
    alert('Comanda salva com sucesso!')
    navigate('/gerenciamento')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Nova Comanda</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Informações da comanda */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <h2 className="font-medium mb-4">Informações da Comanda</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="mesa" className="block text-sm font-medium text-gray-700 mb-1">
                  Mesa/Balcão
                </label>
                <select
                  id="mesa"
                  value={mesa}
                  onChange={(e) => setMesa(e.target.value)}
                  className="input"
                >
                  <option value="">Selecione...</option>
                  <option value="Mesa 01">Mesa 01</option>
                  <option value="Mesa 02">Mesa 02</option>
                  <option value="Mesa 03">Mesa 03</option>
                  <option value="Mesa 04">Mesa 04</option>
                  <option value="Mesa 05">Mesa 05</option>
                  <option value="Balcão 01">Balcão 01</option>
                  <option value="Balcão 02">Balcão 02</option>
                  <option value="Balcão 03">Balcão 03</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Cliente (opcional)
                </label>
                <input
                  type="text"
                  id="cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  className="input"
                  placeholder="Nome do cliente"
                />
              </div>
              
              <div>
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações Gerais
                </label>
                <textarea
                  id="observacoes"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="input min-h-[100px]"
                  placeholder="Observações sobre a comanda"
                />
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="font-medium mb-4">Resumo</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Itens:</span>
                <span>{itensSelecionados.length}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Quantidade total:</span>
                <span>{itensSelecionados.reduce((acc, item) => acc + item.quantidade, 0)}</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span>R$ {valorTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col gap-2">
              <button 
                onClick={salvarComanda}
                disabled={itensSelecionados.length === 0 || !mesa}
                className={`btn btn-primary flex items-center justify-center gap-2 ${
                  (itensSelecionados.length === 0 || !mesa) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiSave />
                <span>Salvar Comanda</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Coluna da direita - Produtos e itens selecionados */}
        <div className="lg:col-span-2 space-y-6">
          {/* Busca de produtos */}
          <div className="card">
            <h2 className="font-medium mb-4">Buscar Produtos</h2>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="input pl-10"
                placeholder="Buscar por nome ou categoria..."
              />
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {produtosFiltrados.map(produto => (
                <div 
                  key={produto.id}
                  onClick={() => abrirModal(produto)}
                  className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{produto.nome}</div>
                  <div className="text-sm text-gray-500">{produto.categoria}</div>
                  <div className="mt-2 text-primary-600 font-medium">R$ {produto.preco.toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            {produtosFiltrados.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                Nenhum produto encontrado com o termo "{busca}".
              </div>
            )}
          </div>
          
          {/* Itens selecionados */}
          <div className="card">
            <h2 className="font-medium mb-4">Itens da Comanda</h2>
            
            {itensSelecionados.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                Nenhum item adicionado à comanda.
                <div className="mt-2 text-sm">
                  Busque e clique em um produto para adicionar.
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produto
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qtd
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço Unit.
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {itensSelecionados.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{item.nome}</div>
                          {item.observacao && (
                            <div className="text-xs text-gray-500 mt-1">
                              Obs: {item.observacao}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {item.quantidade}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          R$ {item.preco.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <button
                            onClick={() => removerItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal para adicionar produto */}
      {modalAberto && produtoSelecionado && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    Adicionar Item
                  </h3>
                  <button
                    onClick={fecharModal}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="font-medium">{produtoSelecionado.nome}</div>
                    <div className="text-sm text-gray-500">{produtoSelecionado.categoria}</div>
                    <div className="mt-1 text-primary-600 font-medium">
                      R$ {produtoSelecionado.preco.toFixed(2)}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      id="quantidade"
                      min="1"
                      value={quantidade}
                      onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="observacaoItem" className="block text-sm font-medium text-gray-700 mb-1">
                      Observação (opcional)
                    </label>
                    <textarea
                      id="observacaoItem"
                      value={observacaoItem}
                      onChange={(e) => setObservacaoItem(e.target.value)}
                      className="input"
                      placeholder="Ex: Sem cebola, bem passado, etc."
                      rows="3"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={adicionarItem}
                  className="btn btn-primary w-full sm:w-auto sm:ml-3"
                >
                  <FiPlus className="mr-2" />
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={fecharModal}
                  className="btn btn-secondary mt-3 sm:mt-0 w-full sm:w-auto"
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

export default CriarComanda